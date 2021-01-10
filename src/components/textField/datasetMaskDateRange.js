let maskDateRange = function(elm){
    elm.addEventListener('keypress', function(e) {
        //keyCodes for numbers only

        if(e.keyCode < 47 || e.keyCode > 57 ) {
            e.preventDefault();
        }
        
        var len = elm.value.length;
        
        // If we're at a particular place, let the user type the slash
        // i.e., 12/12/
        if(len !== 1 || len !== 3) {
            if(e.keyCode == 47) {
            e.preventDefault();
            }
        }
        
        //TODO: normal range
        // If they don't add the slash, do it for them...
        if(len === 2) {
            elm.value += '.';
        }

        if(len == 5) {
            elm.value += ' - ';
        }

        if(len === 10) {
            elm.value += '.';
        }

        if(len === 13) {
            let months = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
            let dateFull = elm.value.split(" - ");
            let dateStart = dateFull[0];
            let dateEnd = dateFull[1];

            let startDay = dateStart.split('.')[0];
            let startMonthNumber = dateStart.split('.')[1];
            let startMonth;
            switch(startMonthNumber){
                case '01': 
                    startMonth = months[0];
                    break;
                case '02': 
                    startMonth = months[1];
                    break;
                case '03': 
                    startMonth = months[2];
                    break;
                case '04': 
                    startMonth = months[3];
                    break;
                case '05': 
                    startMonth = months[4];
                    break;
                case '06': 
                    startMonth = months[5];
                    break;
                case '07': 
                    startMonth = months[6];
                    break;
                case '08': 
                    startMonth = months[7];
                    break;
                case '09': 
                    startMonth = months[8];
                    break;
                case '10': 
                    startMonth = months[9];
                    break;
                case '11': 
                    startMonth = months[10];
                    break;
                case '12': 
                    startMonth = months[11];
                    break;
            }
            let beginning = startDay + ' ' + startMonth;
            
            let endDay = dateEnd.split('.')[0];
            let endMonthNumber = dateEnd.split('.')[1];
            let endMonth;
            switch(endMonthNumber){
                case '01': 
                    endMonth = months[0];
                    break;
                case '02': 
                    endMonth = months[1];
                    break;
                case '03': 
                    endMonth = months[2];
                    break;
                case '04': 
                    endMonth = months[3];
                    break;
                case '05': 
                    endMonth = months[4];
                    break;
                case '06': 
                    endMonth = months[5];
                    break;
                case '07': 
                    endMonth = months[6];
                    break;
                case '08': 
                    endMonth = months[7];
                    break;
                case '09': 
                    endMonth = months[8];
                    break;
                case '10': 
                    endMonth = months[9];
                    break;
                case '11': 
                    endMonth = months[10];
                    break;
                case '12': 
                    endMonth = months[11];
                    break;
            }

            elm.value =  beginning + ' - ' + endDay + ' ' + endMonth;
        }
    })
}

module.exports = maskDateRange