$(document).ready(function() {

	var API_URL = 'http://localhost:8000/api/';
	var cursos = [];
	var tituloInput = $('#courseName');
	var academiaInput = $('#courseAcademy');
	var fechaInput = $('#courseDate');
	var descInput = $('#courseDescription');
	var coursesContainer = $('#coursesContainer');
	var loader = $('#image-loader-cursos');
	
	var mostrarCursos = function () {
		coursesContainer.empty();

		if (cursos.length == 0) {
			coursesContainer.append('<div class="course-item">No has añadido ningún curso.</div>');
		} else {
			var contentToAdd = '';

			for (var i = 0; i < cursos.length; i++) {
				contentToAdd += '<div class="row course-container"><div class="curso-info col-11"><h3 id="academia" class="academia curso' + cursos[i].id + '">' + cursos[i].academia + '</h3><p><span id="titulo" class="info curso' + cursos[i].id + '">' + cursos[i].titulo + '</span><span>  &bull;  </span><em id="fecha" class="fecha curso' + cursos[i].id + '">' + cursos[i].fecha + '</em></p><p id="desc" class="desc curso' + cursos[i].id + '">' + cursos[i].desc + '</p></div><div class="curso-buttons col-1"><button class="editar curso' + cursos[i].id + '" data-curso-id="' + cursos[i].id + '"><i class="fa fa-pencil"></i></button><button class="guardar  curso' + cursos[i].id + '" data-curso-id="' + cursos[i].id + '"><i class="fa fa-floppy-o"></i></button><button class="eliminar" data-curso-id="' + cursos[i].id + '"><i class="fa fa-trash-o"></i></button></div></div>';
			}

			coursesContainer.append(contentToAdd);
		}
	}

	var anadirCurso = function (titulo,academia,fecha,desc) {
		var success = function(data) {
			tituloInput.val('');
			academiaInput.val('');
			fechaInput.val('');
			descInput.val('');
			cursos.push(data);
			mostrarCursos();
		};

		var data = {
			'titulo': titulo,
			'academia': academia,
			'fecha': fecha,
			'desc': desc
		};

		$.ajax({
			type: "POST",
			url: API_URL + "cursos",
			data: data,
			success: success
		})
		.fail(function (error) {
			console.error("Error al añadir el curso.", error);
		});
	}

	var obtenerCursos = function () {
		var success = function(data) {
			cursos = data;
			mostrarCursos();
		}

		var error = function(error) {
			console.error("Error obteniendo los cursos.", error);
		} 

		var complete = function(object, textStatus) {
			loader.fadeOut();
			if (textStatus == 'error') {
				console.log("Ha habido un error, revisalo.");
			} else {
				console.log("Se han obtenido los cursos correctamente.")
			}
		}

		var beforeSend = function() {
			console.log("Enviando...");
			loader.show();
		}

		$.ajax({
			type: "GET",
			url: API_URL + "cursos",
			success: success,
			error: error,
			complete: complete,
			beforeSend: beforeSend
		});
	}

	var eliminarCurso = function(id) {
		$.ajax({
			type: "DELETE",
			url: API_URL + "cursos/" + id
		})
		.done(function(data){
			cursos = $.grep(cursos, function(item){
				return item.id != id;
			});

			mostrarCursos();
		})
		.fail(function(error) {
			console.error("Error al eliminar el curso.", error);
		})
		.always(function(object, status, error){
			console.log(object, status, error);
		});
	}

	var editarCurso = function(id, titulo, academia, fecha, desc) {
		var data = {
			'titulo': titulo,
			'academia': academia,
			'fecha': fecha,
			'desc': desc
		};

		$.ajax({
			type: "PUT",
			url: API_URL + "cursos/" + id,
			data: data
		})
		.done(function(data){
			for (var i = 0; i < cursos.length; i++){
				if(cursos[i].id == id) {
					cursos[i].titulo = titulo;
					cursos[i].academia = academia;
					cursos[i].fecha = fecha;
					cursos[i].desc = desc;
				}
			}

			mostrarCursos();
		})
		.fail(function(error) {
			console.error("Error al actualizar la información del curso.", error);
		}) 
	}

	$('#enviarNuevoCurso').on("click", function(event){
		if (tituloInput.val() != '' && academiaInput.val() != '' && fechaInput.val() != '') {
			event.preventDefault();
			anadirCurso(tituloInput.val(), academiaInput.val(), fechaInput.val(), descInput.val());
		}
	});

	$(document).on("click", ".eliminar", function(event){
		var id = $(this).data('cursoId');
		eliminarCurso(id);
	});

	$(document).on("click", ".editar", function(event){
		var curso = ".curso" + $(this).data('cursoId');
		$(".editar" + curso).hide();
		$(".guardar" + curso).show();
		$(this).parent().prev().find(curso).attr('contenteditable','true');
		$(".academia" + curso).focus();
	});

	$(document).on("click", ".guardar", function(event){
		var id = $(this).data('cursoId');
		var curso = ".curso" + id;
		var titulo = $(this).parent().prev().find('#titulo').text();
		var academia = $(this).parent().prev().find('#academia').text();
		var fecha = $(this).parent().prev().find('#fecha').text();
		var desc = $(this).parent().prev().find('#desc').text();
		console.log(titulo);
		$(".guardar" + curso).hide();
		$(".editar" + curso).show();
		$(this).parent().prev().find(curso).attr('contenteditable','false');
		editarCurso(id, titulo, academia, fecha, desc);
	});

	setTimeout(function() {
		obtenerCursos();
	}, 1);
});