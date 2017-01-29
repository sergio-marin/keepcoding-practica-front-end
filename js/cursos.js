$(document).ready(function() {

	var API_URL = 'http://localhost:8000/api/';
	var cursos = [];
	var tituloInput = $('#courseName');
	var academiaInput = $('#courseAcademy');
	var fechaInput = $('#courseDate');
	var descInput = $('#courseDescription');
	var coursesContainer = $('#coursesContainer');
	
	var mostrarCursos = function () {
		coursesContainer.empty();

		if (cursos.length == 0) {
			coursesContainer.append('<div class="course-item">No has añadido ningún curso.</div>');
		} else {
			var contentToAdd = '';

			for (var i = 0; i < cursos.length; i++) {
				contentToAdd += '<div class="row course-container"><div class="cursos-info"><h3>' + cursos[i].academia + '</h3><p class="info">' + cursos[i].titulo + '<span>  &bull;  </span><em class="fecha">' + cursos[i].fecha + '</em></p><p class="desc">' + cursos[i].desc + '</p></div></div>';
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

	$('#enviarNuevoCurso').on("click", function(event){
		if (tituloInput.val() != '' && academiaInput.val() != '' && fechaInput.val() != '') {
			event.preventDefault();
			anadirCurso(tituloInput.val(), academiaInput.val(), fechaInput.val(), descInput.val());
		}
	});
});