$(document).ready(function () {
	// this first modal code 
	$('.heading-btn').on('click', function () {
		let input_heading = $('.input-heading').val()
		$('main').append(`<h1>${input_heading}</h1>`)
		let select_head = $('.heading-select')
		if (select_head) {
			$(select_head).append(`<option value=${input_heading}>${input_heading}</option>`)
		}
		console.log(select_head);
		$('#heading').modal('hide');
	})

	// this second modal code
	$('#button').click(function (e) {
		e.preventDefault();
		var inputValue = $('#sub-input').val();
		if (inputValue !== '') {
			var newOption = $('<option/>', {
				value: inputValue,
				text: inputValue
			});

			$('#selectfield').append(newOption);
			$('#sub-input').val('');
			$('#subheading').modal('hide');
			
		}
})
	$('#sub-select').change(function () {
		let subval = $(this).val();
		$('#sub-input').val(subval);
	})

$("#selectfield").change(function() {
	var selectedValue = $(this).val();
	var selectedValue = $(this).val();
	$("#subheadselect").append("<option value='" + selectedValue + "'>" + selectedValue + "</option>");
	$("#fields1").append("<option value='" + selectedValue + "'>" + selectedValue + "</option>");

$('#fields1').change(function () {
	let fieldval = $(this).val();
	$('#floatingInputValue').val(fieldval);
})


  });
  


	})
	
