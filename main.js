jQuery('document').ready(function() {
	jQuery('#result').html('Подсказка:<br>Используй клавишу "TAB" для перехода между полями ввода и колесико мыши чтоб изменить значение внутри него.');
	/* jQuery('body').append('<p>Hello! This is Append after complete document</p>');
	jQuery('p').remove();
	
	var kat1=5,
		kat2=7;
	
	alert(Math.floor(Math.sqrt((kat1*kat1) + (kat2*kat2))));
	alert(5^1); */
	jQuery('#calculator input').on('change or ready', function(){
		//готовим место...
		var boxLength, 						// длинна коробки трака
			boxWidth, 						// ширина коробки трака
			skids, 							// колличество паллет
			skidsLength, 					// длинна паллеты
			skidsWidth, 					// ширина паллеты
			//howPiecesCanFitInWidth, 		// сколько вмещается паллет в ширину
			piecesInWidth,					// Сколько надо поставить палет в ширину
			howPiecesCanFitInLength,		// Сколько вмещается паллет в длинну
			piecesInLength,					// Сколько надо поставить паллет в длинну
			howPiecesCanFit,
			isItFit;						// Вмещается ли груз в трак?
		
		
		// Собираем информацию.
		boxLength = jQuery('#boxLength').val();
		boxWidth = jQuery('#boxWidth').val();
		skids = jQuery('#skids').val();
		skidsLength = jQuery('#skidsLength').val();
		skidsWidth = jQuery('#skidsWidth').val();
		
		
		// Анализируем её...
		piecesInWidth = Math.trunc(boxWidth / skidsWidth); // сколько паллет влезет в ширину бокса.
		piecesInLength = Math.ceil(skids/piecesInWidth);  // сколько прийдется занять рядов паллетами.
		howPiecesCanFitInLength = Math.trunc(boxLength/skidsLength); // сколько рядов может поместиться в трак.
		howPiecesCanFit = (piecesInWidth * howPiecesCanFitInLength); // сколько подобных паллет может поместиться в трак
		isItFit = (howPiecesCanFit >= skids);
		
		//Проверяем условия.
		if(isItFit == true && howPiecesCanFit > skids) {
			jQuery('#result').html('Влезет! разместим их так:<br> в ширину ' + piecesInWidth +' паллет <br>в длинну ' + piecesInLength + '<br> еще и останется свободного места на '+ (howPiecesCanFit - skids) +' подобных палет.');
		} else if(isItFit == true){
        jQuery('#result').html('Вместится, но займет весь трак.');
        } else if (isItFit == false){  // Если не влазит пробуем их запихнуть боком.
			piecesInWidth = Math.trunc(boxWidth / skidsLength);				// сколько паллет влезет в ширину бокса боком.
            piecesInLength = Math.ceil(skids/piecesInWidth);				// сколько прийдется занять рядов паллетами.
            howPiecesCanFitInLength = Math.trunc(boxLength/skidsLength);	// сколько рядов может поместиться в трак.
            howPiecesCanFit = (piecesInWidth * howPiecesCanFitInLength);	// сколько подобных паллет может поместиться в трак
            isItFit = (howPiecesCanFit >= skids);

            if(isItFit == true && howPiecesCanFit > skids) {
                jQuery('#result').html('Поместится только ЕСЛИ ставить палеты БОКОМ!<br> разместим их так:<br> в ширину ' + piecesInWidth +' паллет <br>в длинну ' + piecesInLength + '<br> еще и останется свободного места на '+ (howPiecesCanFit - skids) +' подобных палет.');
            } else if (isItFit == true){
                jQuery('#result').html('Вместится только БОКОМ, и займет весь трак.');
            } else {
                jQuery('#result').html('К сожалению, мы не можем это вместить ;(');
            }
		}   /*else {
            jQuery('#result').html('К сожалению, мы не можем это вместить ;(');
        };*/


        //jQuery('#result').html('площадь бокса: ' + Math.trunc((boxLength / 12) * (boxWidth / 12)) + '<br> палет в ширину: ' + piecesInWidth + '<br> Палет в длинну: ' + piecesInLength);
        /*     // Math.ceil - округление в большую сторону
        gipo = Math.sqrt((value1*value1)+(value2*value2));

        value1 = parseInt(value1);
        value2 = parseInt(value2);

        jQuery('#result').html('gipotenusa is: ' + gipo );
        */
	})
});