import { Injectable } from '@angular/core';

const _EXTENSION = '.csv';

@Injectable()
export class CSVService {

  constructor() { }

    saveAsCSVFile(data: any, fileName: string){
    const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
    const header = Object.keys(data[0]);
    let csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    let csvArray = csv.join('\r\n');
    var a = document.createElement('a');
    console.log("csv file--->",csvArray)
    var blob = new Blob([csvArray], {type: 'text/csv' }),
    url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName + new Date().getTime() + _EXTENSION
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

}