import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-view-directory',
  templateUrl: './view-directory.component.html',
  styleUrls: ['./view-directory.component.css']
})
export class ViewDirectoryComponent implements OnInit, AfterViewInit {

  @Output() emitState: EventEmitter<any> = new EventEmitter()

  slideIndex = 1;
  storeData = {
    id: 'QWEQWDQE"#$DDFWERWER',
    name: 'MR. Repair it',
    outstandingimage: 'IMAGE',
    reputation: 'Excelent',
    address: '4694 Cherry Tree Drive, Local number: 45 Floor: 2. Statesville, North Carolina Zip code 28667',
    phone: '7044957746',
    openstore: true,
    distanceoforigin: 100,
    email: 'contact@mrrepait.com',
    aboutUs: 'We are the best repair store in the area!',
    schedule: {
      monday: {
        active: false,
        allDay: false,
        open: '9:00',
        close: '6:00',
        meridiemOpen: 0,
        meridiemClose: 1
      },
      tuesday: {
        active: true,
        allDay: false,
        open: '9:00',
        close: '5:00',
        meridiemOpen: 1,
        meridiemClose: 1
      },
      wednesday: {
        active: true,
        allDay: false,
        open: '9:00',
        close: '6:00',
        meridiemOpen: 0,
        meridiemClose: 0
      },
      thursday: {
        active: false,
        allDay: false,
        open: '9:00',
        close: '3:00',
        meridiemOpen: 0,
        meridiemClose: 0
      },
      friday: {
        active: true,
        allDay: false,
        open: '9:00',
        close: '6:00',
        meridiemOpen: 0,
        meridiemClose: 0
      },
      saturday: {
        active: true,
        allDay: false,
        open: '9:00',
        close: '6:00',
        meridiemOpen: 0,
        meridiemClose: 0
      },
      sunday: {
        active: false,
        allDay: false,
        open: '9:00',
        close: '8:00',
        meridiemOpen: 0,
        meridiemClose: 0
      },
    },
    socialLinks: {
      website: 'www.mrrepairit.com',
      twitter: 'www.twitter.com/MrRepairit',
      facebook: 'www.facebook.com/MrRepairit',
      instagram:'www.instagram.com/MrRepairit'
    }
  }

  angForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    // this.createForm();
  }

  ngAfterViewInit() {
    this.showSlides(this.slideIndex);
  }

  changeChecked(item) {
    debugger
    item.active = !item.active;
  }

  createForm() {
    this.angForm = this.fb.group({
      name: ['', Validators.required ],
      address: ['', Validators.required ]
   });
  }

  plusSlides(n) {
    this.showSlides(this.slideIndex += n);
  }

  currentSlide(n) {
    this.showSlides(this.slideIndex = n);
  }

  showSlides(n) {
    let i;
    let slides: any = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
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
