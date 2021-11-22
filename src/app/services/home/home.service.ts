import { Injectable } from '@angular/core';
import { GenericUtility } from 'src/app/utilties/generic-utility';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private _serviceCaller: GenericUtility) { }

  
}
