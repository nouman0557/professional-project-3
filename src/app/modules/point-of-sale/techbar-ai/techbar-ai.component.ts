import { Component, OnInit } from '@angular/core';
import { GetAllDeviceDiagnoseGQL } from 'src/app/generated/graphql';

@Component({
  selector: 'app-techbar-ai',
  templateUrl: './techbar-ai.component.html',
  styleUrls: ['./techbar-ai.component.css']
})
export class TechbarAiComponent implements OnInit {
  deviceLoader=false
  devicesData=[]
  constructor(
    private getAllDeviceDiagnose:  GetAllDeviceDiagnoseGQL
  ) { }

  ngOnInit() {
    this.getDevicesRecord()
  }

  getDevicesRecord(){
    this.deviceLoader=true
    this.getAllDeviceDiagnose.watch().valueChanges.subscribe(
      (res) => {
        this.deviceLoader=false
          console.log(' res', res['data'].getAllDeviceDiagnose);
           this.devicesData= res['data'].getAllDeviceDiagnose
      }, (err) => {
        this.deviceLoader=false
          console.log(' err', err);
      })
  }

  isObjectEmpty(Obj) {
    for (var key in Obj) {
        if (Obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }

}
