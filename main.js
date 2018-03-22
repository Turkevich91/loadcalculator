$('document').ready(function() {
    $('#result').html('Подсказка:<br>Используй клавишу "TAB" для перехода между полями ввода и колесико мыши чтоб изменить значение внутри него.');
    $('#calculator input').on("change", function(){
        var truckBoxLength, 				// длинна коробки трака
            truckBoxWidth, 					// ширина коробки трака
            truckBoxHeight,					// высота коробки трака

            pallets, 						// колличество паллет
            stack, 							// Можно ли паллеты ставить друг на друга?
            palletLength, 					// длинна паллеты
            palletWidth, 					// ширина паллеты
            palletHeight,					// высота паллеты

            piecesInWidth,					// Сколько надо поставить палет в ширину
            howPiecesCanFitInLength,		// Сколько паллет вмещается в длинну
            piecesInLength,					// Сколько надо поставить паллет в длинну
            howPiecesCanFit,				// Сколько всего палет может вместиться в грузовик
            isItFit,						// Вмещается ли груз в трак?
            isStackFit;                     // Вмещается ли груз стаком?
        
            
        function getCargoInfo(){			// Забираем информацию с формы.
            truckBoxLength = +($('#truckBoxLength').val());
            truckBoxWidth = +($('#truckBoxWidth').val());
            truckBoxHeight = +($('#truckBoxHeight').val());
            palletLength = +($('#palletLength').val());
            palletWidth = +($('#palletWidth').val());
            palletHeight = +($('#palletHeight').val());
            pallets = +($('#pallets').val());
            isStack = $('#stackable').is(":checked");
        }
        function countCargoSize(sideA,sideB){ //at first sideA should be longer that sideB
            piecesInWidth = Math.trunc(truckBoxWidth / sideB);// сколько паллет влезет в ширину бокса боком.
            piecesInLength = Math.ceil(pallets/piecesInWidth);// сколько рядов займет груз.

            howPiecesCanFitInLength = Math.trunc(truckBoxLength/sideA);// сколько рядов может поместиться в трак.
            howPiecesCanFitInHeight = Math.trunc(truckBoxHeight/palletHeight);//сколько паллет вместится в высоту.

            howPiecesCanFit = (piecesInWidth * howPiecesCanFitInLength);// сколько подобных паллет может поместиться в трак
            howPiecesCanFitIfStack = (howPiecesCanFit*howPiecesCanFitInHeight);

            isItFit = (howPiecesCanFit >= pallets & truckBoxHeight >= palletHeight);
            isStackFit = (howPiecesCanFitIfStack >= pallets);
        }
        getCargoInfo();
        countCargoSize(palletLength,palletWidth);
        
        //Проверяем условия.
        if(isItFit & howPiecesCanFit > pallets) {
            $('#result').html('Влезет! разместим их так:<br> в ширину <b>' + piecesInWidth +'</b> паллет <br>в длинну <b>' + piecesInLength + '</b><br> еще и останется свободного места на <b>'+ (howPiecesCanFit - pallets) +'</b> подобных палет.');
        } else if(isItFit){
            $('#result').html('Вместится, но займет весь трак.');
        } else if(isStack & howPiecesCanFitIfStack >= pallets){
            $('#result').html('Влезет только <b>ЕСЛИ</b> ставить палеты <b>"одну на другую."</b>');
        } else if(!isItFit){  // Если не влазит пробуем их запихнуть боком.
            countCargoSize(palletWidth,palletLength);

            if(isItFit & howPiecesCanFit > pallets) {
                $('#result').html('Поместится <b>ЕСЛИ</b> ставить палеты <b>БОКОМ!</b> разместим их так:<br> в ширину <b>' + piecesInWidth +'</b> паллет <br>в длинну <b>' + piecesInLength + '</b><br> еще и останется свободного места на <b>'+ (howPiecesCanFit - pallets) +'</b> подобных палет.');
            } else if (isItFit){
                $('#result').html('Вместится <b>БОКОМ</b> и займет весь трак.');
            } else if(isStack & howPiecesCanFitIfStack >= pallets){
                $('#result').html('Влезет только <b>ЕСЛИ</b> ставить палеты <b>"одну на другую"</b> и то <b>БОКОМ</b>');
            } else {    
                $('#result').html('К сожалению, мы <b>НИКАК</b> не можем это вместить ;(');
            }
        }
    })
});