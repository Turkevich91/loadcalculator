jQuery('document').ready(function() {
	jQuery('#result').html('Подсказка:<br>Используй клавишу "TAB" для перехода между полями ввода и колесико мыши чтоб изменить значение внутри него.');
	jQuery('#calculator input').on('change', function(){
		var truckBoxLength, 				// длинна коробки трака
            truckBoxWidth, 					// ширина коробки трака
            truckBoxHeight,					// высота коробки трака

			pallets, 						// колличество паллет
            stack, 							// Можно ли паллеты ставить друг на друга?
			palletLength, 					// длинна паллеты
			palletWidth, 					// ширина паллеты
            palletHeight,					// высота паллеты

			//howPiecesCanFitInWidth, 		// сколько паллет вмещается  в ширину
			piecesInWidth,					// Сколько надо поставить палет в ширину
			howPiecesCanFitInLength,		// Сколько паллет вмещается в длинну
			piecesInLength,					// Сколько надо поставить паллет в длинну
			howPiecesCanFit,				// Сколько всего палет может вместиться в грузовик
			isItFit;						// Вмещается ли груз в трак?
		
		
		// Забираем информацию с формы.
		truckBoxLength = jQuery('#truckBoxLength').val();
		truckBoxWidth = jQuery('#truckBoxWidth').val();
		truckBoxHeight = jQuery('#truckBoxHeight').val();
		pallets = jQuery('#pallets').val();
        isStack = jQuery('#stackable').val();
		palletLength = jQuery('#palletLength').val();
		palletWidth = jQuery('#palletWidth').val();
        palletHeight = jQuery('#palletHeight').val();

		
		// Высчитываем необходимые переменные...
		piecesInWidth = Math.trunc(truckBoxWidth / palletWidth); // сколько паллет влезет в ширину бокса.
		piecesInLength = Math.ceil(pallets/piecesInWidth);  // сколько прийдется занять рядов паллетами.
		howPiecesCanFitInLength = Math.trunc(truckBoxLength/palletLength); // сколько рядов может поместиться в трак.
		howPiecesCanFit = (piecesInWidth * howPiecesCanFitInLength); // сколько подобных паллет может поместиться в трак
		isItFit = (howPiecesCanFit >= pallets);
		
		//Проверяем условия.
		if(isItFit == true && howPiecesCanFit > pallets) {
			jQuery('#result').html('Влезет! разместим их так:<br> в ширину <b>' + piecesInWidth +'</b> паллет <br>в длинну <b>' + piecesInLength + '</b><br> еще и останется свободного места на <b>'+ (howPiecesCanFit - pallets) +'</b> подобных палет.');
		} else if(isItFit == true){
        jQuery('#result').html('Вместится, но займет весь трак.');
        } else if (isItFit == false){  // Если не влазит пробуем их запихнуть боком.
			piecesInWidth = Math.trunc(truckBoxWidth / palletLength);				// сколько паллет влезет в ширину бокса боком.
            piecesInLength = Math.ceil(pallets/piecesInWidth);				// сколько прийдется занять рядов паллетами.
            howPiecesCanFitInLength = Math.trunc(truckBoxLength/palletLength);	// сколько рядов может поместиться в трак.
            howPiecesCanFit = (piecesInWidth * howPiecesCanFitInLength);	// сколько подобных паллет может поместиться в трак
            isItFit = (howPiecesCanFit >= pallets);

            if(isItFit == true && howPiecesCanFit > pallets) {
                jQuery('#result').html('Поместится только ЕСЛИ ставить палеты БОКОМ!<br> разместим их так:<br> в ширину ' + piecesInWidth +' паллет <br>в длинну ' + piecesInLength + '<br> еще и останется свободного места на '+ (howPiecesCanFit - pallets) +' подобных палет.');
            } else if (isItFit == true){
                jQuery('#result').html('Вместится только БОКОМ, и займет весь трак.');
            } else {
                jQuery('#result').html('К сожалению, мы не можем это вместить ;(');
            }
		}
	})
});