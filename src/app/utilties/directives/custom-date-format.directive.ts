import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'customDateFormat',
})
export class customDateFormatPipe implements PipeTransform {
    transform(value: string) {
        var datePipe = new DatePipe("en-US");
        let dateFormate = window.localStorage.getItem('dateFormate')
        if (dateFormate == null || dateFormate == '' || dateFormate == "null") {
            dateFormate = 'MMM/dd/yyyy'
        }
        value = datePipe.transform(value, dateFormate);
        return value;
    }
} 