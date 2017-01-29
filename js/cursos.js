$(document).ready(function() {

	var API_URL = 'http://localhost:8000/api/';
	var cursos = [];
	var tituloInput = $('#courseName');
	var academiaInput = $('#courseAcademy');
	var fechaInput = $('#courseDate');
	var descInput = $('#courseDescription');
	var coursesContainer = $('#coursesContainer');
	var loader = $('#image-loader');
	
	var mostrarCursos = function () {
		coursesContainer.empty();

		if (cursos.length == 0) {
			coursesContainer.append('<div class="course-item">No has añadido ningún curso.</div>');
		} else {
			var contentToAdd = '';

			for (var i = 0; i < cursos.length; i++) {
				contentToAdd += '<div class="row course-container"><div class="curso-info col-11"><h3 class="tituloCurso">' + cursos[i].academia + '</h3><p class="info">' + cursos[i].titulo + '<span>  &bull;  </span><em class="fecha">' + cursos[i].fecha + '</em></p><p class="desc">' + cursos[i].desc + '</p></div><div class="curso-buttons col-1"><button class="editar" data-curso-id="' + cursos[i].id + '"><i class="fa fa-pencil"></i></button><button class="eliminar" data-curso-id="' + cursos[i].id + '"><i class="fa fa-trash-o"></i></button></div></div>';
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



	setTimeout(function() {
		obtenerCursos();
	}, 1);
});