jQuery(document).ready(function($){
	$('#edit-field-stock-und-0-value').attr("disabled", "disabled");
	$('#edit-field-caracteristica-und').change(function(){
		var caracteristica = $('#edit-field-caracteristica-und').val();
		if(caracteristica == 'multiple'){
			$('#edit-field-stock-und-0-value').removeAttr("disabled");
		}else{
			$('#edit-field-stock-und-0-value').attr("disabled", "disabled");
		}
	});

	$('#edit-field-stock-und-0-value').blur(function(){
		var stock = $('#edit-field-stock-und-0-value').val();
		if(stock < 1 || isNaN(stock)){
			alert("El stock no puede ser menor a 1. Ponga un valor permitido");
			$('#edit-field-stock-und-0-value').val(1);
		}
	});

	$('#field-contactar-autor-add-more-wrapper').css('display','none');
	$('#field-hacer-trato-add-more-wrapper').css('display', 'none');
});