import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GenericUtility } from '../utilties/generic-utility';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PrintService {
  isPrinting = false;

  constructor(private router: Router,
    private _httpServiceCaller: GenericUtility) { }

  printDocument(documentName: string, data: {}) {
    this.isPrinting = true;
    this.router.navigate(['/',
      {
        outlets: {
          'print': ['print', documentName]
        }
      }], { state: { data: data } });
  }

  onDataReady() {
    setTimeout(() => {
      window.print();
      this.isPrinting = false;
      this.router.navigate([{ outlets: { print: null } }]);
    });
  }


  printAndExportOrders(url, data, isExport, fileName) {

    if (!isExport) {
      this.getAndPrintDocument(url, data)
    } else if (isExport && data.fileType == 'csv' && data.orderId.length == 1) {
      this.downloadCSV(url, data, fileName)
    } else if (isExport && data.fileType == 'pdf' && data.orderId.length == 1) {
      this.downloadPDF(url, data, fileName)
    } else if (isExport && data.orderId.length > 1) {
      this.downloadZip(url, data, fileName)
    }
  }

  downloadPDF(url, data, fileName) {
    this._httpServiceCaller.getFileFromPost(url, data)
      .subscribe(
        (response) => { // download file
          var file = new Blob([response], { type: 'application/pdf' });
          var NameOfFile = fileName + '.pdf'
          var a = document.createElement("a");
          var fileURL = window.URL.createObjectURL(file);
          a.href = fileURL;
          a.download = NameOfFile;
          a.click();
        }, (err) => {
          console.log(err)
        });
  }

  downloadCSV(url, data, fileName) {
    this._httpServiceCaller.getFileFromPost(url, data)
      .subscribe(
        (response) => { // download file
          var file = new Blob([response], { type: 'text/csv' });
          var NameOfFile = fileName + '.csv'
          var a = document.createElement("a");
          var fileURL = window.URL.createObjectURL(file);
          a.href = fileURL;
          a.download = NameOfFile;
          a.click();
        }, (err) => {
          console.log(err)
        });
  }

  getAndPrintDocument(url, data) {
    this._httpServiceCaller.getFileFromPost(url, data)
      .subscribe(
        (response) => { // download file
          var blob = new Blob([response], { type: 'application/pdf' });
          const blobUrl = URL.createObjectURL(blob)
          var objFra = document.createElement('iframe');   // Create an IFrame.
          objFra.style.visibility = "hidden";    // Hide the frame.
          objFra.src = blobUrl;                      // Set source.
          document.body.appendChild(objFra);  // Add the frame to the web page.
          objFra.contentWindow.focus();       // Set focus.
          objFra.contentWindow.print();
        }, (err) => {
          console.log(err)
        });
  }

  downloadZip(url, data, fileName) {
    this._httpServiceCaller.getTextFromPost(url, data)
      .subscribe(
        (response) => { // download file
          var link = document.createElement("a");
          link.download = fileName + '.zip';
          link.href = "data:application/zip;base64," + response;
          document.body.appendChild(link);
          link.click();
          // Cleanup the DOM
          document.body.removeChild(link);
          //delete link;

        }, (err) => {
          console.log(err)
        });

  }

  downloadFile(filePath, fileName) {
    this._httpServiceCaller.downloadFile(filePath).subscribe(
      (data) => {
        if(data && data != undefined && data != null){
          var a = document.createElement('a');
          var blob = new Blob([data], {type: data.type }),
          url = window.URL.createObjectURL(blob);
          a.href = url;
          a.download = fileName
          a.click();
          window.URL.revokeObjectURL(url);
          a.remove();
        }
      }
    )
  }

}
