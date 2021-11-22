import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, EMPTY, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EnvironmentUrl } from 'src/environments/environment-url';
import { map } from 'rxjs/operators';

var saveOrderConverter = false
var csLeftTabConverter = 'C'

@Injectable(
)
export class GenericUtility {

    baseApiIp: string;
    constructor(
        public http: HttpClient,
        private router: Router,
    ) {
        this.baseApiIp = EnvironmentUrl.getAPIUrl;
    }



    //===========================================New Work 01-23-2020-=====================================================//

    //============================== Tab Data ==============================//

    public setSaveOrderConverter(Data: any) {
        saveOrderConverter = Data;
    }

    get getSaveOrderConverter(): any {
        return saveOrderConverter;
    }

    public setCSLeftTabConverter(Data: any) {
        csLeftTabConverter = Data;
    }

    get getCSLeftTabConverter(): any {
        return csLeftTabConverter;
    }
    //===========================================End New Work 01-23-2020-=====================================================//

    getBaseIp() {
        return this.baseApiIp;
    }

    public insertActivityLog(logFor: string, logMessage: string) {

    }

    getGetCall(url: string, global: any = true): any {
        url = this.baseApiIp + url;
        return this.http.get(url, this.getHttpOptions).pipe(
            catchError(err => {
                if (err.status == 401) {
                    this.router.navigateByUrl('/login');
                    return EMPTY;
                } else {
                    return throwError(err);
                }
            })
        );
    }

   
    geolUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='
    getGeoLocationInformation(lat, long) {
        return this.http.get(this.geolUrl + lat + ',' + long + '&key=' + EnvironmentUrl.getGoogleKey)
    }

    getFileFromPost(url: string, data: any, global: boolean = true): any {
        url = this.baseApiIp + url;
        return this.http.post(url, data, {
            responseType: "blob",
            headers: new HttpHeaders().append("Content-Type", "application/json")
        }).pipe(
            catchError(err => {
                if (err.status == 401) {
                    this.router.navigateByUrl('/login');
                    return EMPTY;
                } else {
                    return throwError(err);
                }
            })
        );
    }
    getTextFromPost(url: string, data: any, global: boolean = true): any {
        url = this.baseApiIp + url;
        return this.http.post(url, data, {
            responseType: "text",
            headers: new HttpHeaders().append("Content-Type", "application/json")
        }).pipe(
            catchError(err => {
                if (err.status == 401) {
                    this.router.navigateByUrl('/login');
                    return EMPTY;
                } else {
                    return throwError(err);
                }
            })
        );
    }

    getPostCall(url: string, data: any, global: boolean = true): any {
        url = this.baseApiIp + url;
        return this.http.post(url, data, this.getHttpOptions).pipe(
            catchError(err => {
                if (err.status == 401) {
                    this.router.navigateByUrl('/login');
                    return EMPTY;
                } else {
                    return throwError(err);
                }
            })
        );
    }

    putCall(url: string, data: any, global: boolean = true): any {
        url = this.baseApiIp + url;
        return this.http.put(url, data, this.getHttpOptions).pipe(
            catchError(err => {
                if (err.status == 401) {
                    this.router.navigateByUrl('/login');
                    return EMPTY;
                } else {
                    return throwError(err);
                }
            })
        );
    }

    deleteCall(url: string, data: any, global: boolean = true): any {
        url = this.baseApiIp + url;
        return this.http.delete(url, data).pipe(
            catchError(err => {
                if (err.status == 401) {
                    this.router.navigateByUrl('/login');
                    return EMPTY;
                } else {
                    return throwError(err);
                }
            })
        );
    }

    get getHttpOptions(): any {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json; charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Headers': '*',
                'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
                'Accept': 'application/json'
            })
        };
    }


    errorHandler(error: HttpErrorResponse): void {

        window.console.log(error);
        if (error.status >= 500 && error.status < 600) {

            if (error.status == 502) {
                alert("Hi Luna user! Proxy error occurred while processing the request.");
            }
            else {
                alert("Hi Luna user! An error occurred while processing the request.");
            }
        }
        else if (error.status === 401) {

            this.router.navigate(['/login']);
        }
    }

    baseUrl = 'https://apidev.techbar.com/'
    downloadFile(filePath){
        return this.http.get(this.baseUrl+filePath,{
          responseType : 'blob'
        });
      }

}



