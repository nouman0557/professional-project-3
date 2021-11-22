import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';
import { leastOneCheckboxes } from 'src/app/utilties/least-one-checkboxes';

@Component({
  selector: 'app-update-directory',
  templateUrl: './update-directory.component.html',
  styleUrls: ['./update-directory.component.css']
})
export class UpdateDirectoryComponent implements OnInit {
  @Output() emitState: EventEmitter<any> = new EventEmitter()

  slideIndex = 1;
  storeData: StoreModel = {
    id: 'QWEQWDQE"#$DDFWERWER',
    name: 'MR. Repair it',
    outstandingimage: 'IMAGE',
    reputation: 'Excelent',
    address: '4694 Cherry Tree Drive, Local number: 45 Floor: 2. Statesville, North Carolina Zip code 28667',
    phone: 7044957746,
    openstore: true,
    distanceoforigin: 100,
    email: 'contact@mrrepait.com',
    aboutUs: 'We are the best repair store in the area!',
    schedule: {
      monday: {
        active: true,
        allDay: false,
        open: '9:00',
        close: '6:00',
        meridiemOpen: '1',
        meridiemClose: '1'
      },
      tuesday: {
        active: true,
        allDay: false,
        open: '9:00',
        close: '5:00',
        meridiemOpen: '1',
        meridiemClose: '1'
      },
      wednesday: {
        active: false,
        allDay: false,
        open: '9:00',
        close: '6:00',
        meridiemOpen: '0',
        meridiemClose: '0'
      },
      thursday: {
        active: false,
        allDay: false,
        open: '9:00',
        close: '3:00',
        meridiemOpen: '0',
        meridiemClose: '0'
      },
      friday: {
        active: false,
        allDay: false,
        open: '9:00',
        close: '6:00',
        meridiemOpen: '0',
        meridiemClose: '0'
      },
      saturday: {
        active: false,
        allDay: false,
        open: '9:00',
        close: '6:00',
        meridiemOpen: '0',
        meridiemClose: '0'
      },
      sunday: {
        active: false,
        allDay: false,
        open: '9:00',
        close: '8:00',
        meridiemOpen: '0',
        meridiemClose: '0'
      },
    },
    socialLinks: {
      website: 'www.mrrepairit.com',
      twitter: 'www.twitter.com/MrRepairit',
      facebook: 'www.facebook.com/MrRepairit',
      instagram:'www.instagram.com/MrRepairit'
    }
  }

  directoryForm: FormGroup;


  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  ngAfterViewInit() {
    this.showSlides(this.slideIndex);
  }

  changeChecked(item) {
    item.active = !item.active;
  }

  createForm() {
    this.directoryForm = this.fb.group({
      phone: [this.storeData.phone, Validators.required ],
      email: [this.storeData.email, Validators.required ],
      aboutUs: [this.storeData.aboutUs ],
      website: [this.storeData.socialLinks.website ],
      twitter: [this.storeData.socialLinks.twitter ],
      facebook: [this.storeData.socialLinks.facebook ],
      instagram: [this.storeData.socialLinks.instagram ],
      scheduleDays: new FormGroup({
        monday: new FormControl(this.storeData.schedule.monday.active),
        tuesday: new FormControl(this.storeData.schedule.tuesday.active),
        wednesday: new FormControl(this.storeData.schedule.wednesday.active),
        thursday: new FormControl(this.storeData.schedule.thursday.active),
        friday: new FormControl(this.storeData.schedule.friday.active),
        saturday: new FormControl(this.storeData.schedule.saturday.active),
        sunday: new FormControl(this.storeData.schedule.sunday.active),
      }, leastOneCheckboxes()),
      mondayOpen: new FormControl(new Date()),
      mondayClose: new FormControl(new Date()),
      tuesdayOpen: new FormControl(new Date()),
      tuesdayClose: new FormControl(new Date()),
      wednesdayOpen: new FormControl(new Date()),
      wednesdayClose: new FormControl(new Date()),
      thursdayOpen: new FormControl(new Date()),
      thursdayClose: new FormControl(new Date()),
      fridayOpen: new FormControl(new Date()),
      fridayClose: new FormControl(new Date()),
      saturdayOpen: new FormControl(new Date()),
      saturdayClose: new FormControl(new Date()),
      sundayOpen: new FormControl(new Date()),
      sundayClose: new FormControl(new Date()),
   });
  }

  save() {
    console.log(this.directoryForm.value);
  }

  plusSlides(n) {
    this.showSlides(this.slideIndex += n);
  }

  currentSlide(n) {
    this.showSlides(this.slideIndex = n);
  }

  showSlides(n) {
    let i;
    let slides: any = document.getElementsByClassName("slidesUpdate");
    let dots = document.getElementsByClassName("dotUpdate");
    if (n > slides.length) {this.slideIndex = 1}
    if (n < 1) {this.slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[this.slideIndex-1].style.display = "block";
    dots[this.slideIndex-1].className += " active";
  }

}

export class StoreModel {
    id: string;
    name: string;
    outstandingimage: string;
    reputation: string;
    address: string;
    phone: number;
    openstore: boolean;
    distanceoforigin: number;
    email: string;
    aboutUs: string;
    schedule: ScheduleModel;
    socialLinks: SocialLinksModel
  }

  export class ScheduleModel {
    monday: ScheduleContentModel;
    tuesday: ScheduleContentModel;
    wednesday: ScheduleContentModel;
    thursday: ScheduleContentModel;
    friday: ScheduleContentModel;
    saturday: ScheduleContentModel;
    sunday: ScheduleContentModel;

  }

  export class ScheduleContentModel {
    active: boolean;
    allDay: boolean;
    open: string;
    close: string;
    meridiemOpen: string;
    meridiemClose: string;
  }

  export class SocialLinksModel {
    website: string
    twitter: string;
    facebook: string;
    instagram: string;
  }
