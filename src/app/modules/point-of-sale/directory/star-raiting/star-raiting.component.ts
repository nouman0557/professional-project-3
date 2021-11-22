import { Component, OnInit, Input, EventEmitter, Output, ElementRef } from '@angular/core';

@Component({
  selector: 'app-star-raiting',
  templateUrl: './star-raiting.component.html',
  styleUrls: ['./star-raiting.component.css']
})
export class StarRaitingComponent implements OnInit {
  @Input('radius') radius: number;
    @Input('type') type: string;
    @Input('items') items: number;
    @Input('sel-color') selectedColor: string;
    @Input('back-color') backColor: string;
    @Input('star-back-color') starBackColor: string;
    @Input('percent') percent: string;
    @Input('stars-selected') starsSelected: number;
    @Input('disabled') disabled: boolean;

    securedWidth: string;
    selectedWidth: string;
    itemsIterable: number[];
    elDimensions: ClientRect;
    el: ElementRef;
    nativeEl: HTMLElement;

    constructor(el: ElementRef) {
        this.nativeEl = el.nativeElement;
        this.el = el;
    }

    ngOnInit() {
        const getAttr = (nEl: HTMLElement, attr: string, def?: string) :string => nEl.getAttribute(attr) || def;

        // Pass attributes into app
        this.selectedColor = this.selectedColor || getAttr(this.nativeEl, 'sel-color', '#5bdbbf');
        this.backColor = this.backColor || getAttr(this.nativeEl, 'back-color', 'white');
        this.starBackColor = this.starBackColor || getAttr(this.nativeEl, 'star-back-color', 'lightgray');
        this.radius = this.radius || parseInt(getAttr(this.nativeEl, 'radius', '30'), 10);
        this.items = this.items || parseInt(getAttr(this.nativeEl, 'items', '5'), 10);
        this.percent = this.percent || getAttr(this.nativeEl, 'percent', '0') + '%';
        this.starsSelected = this.starsSelected || parseFloat(getAttr(this.nativeEl, 'stars-selected', '0'));
        this.disabled = this.disabled || !!getAttr(this.nativeEl, 'disabled');
        this.type = this.type || getAttr(this.nativeEl, 'type', 'star');

        this.itemsIterable = new Array(this.items);
        this.securedWidth = this.starsSelected ? 100 / this.items * this.starsSelected + '%' : this.percent;
        this.elDimensions = this.nativeEl.getBoundingClientRect();

        // initial rating setup
        this.selectedWidth = this.securedWidth;
    }

    changeRating(e: MouseEvent) {
        this.selectedWidth = !this.disabled && e.clientX - this.elDimensions.left + 'px';
        this.percent = parseInt(this.selectedWidth, 10) / this.radius * 2 * this.items + '%';
    }

    leaveRating() {
        this.selectedWidth = this.securedWidth;
    }

    secureNewRating() {
        this.securedWidth = this.percent;
    }
}

  /*@Input() mode: ModeModel;
  @Input() rate: number;
  @Output() emitRate: EventEmitter<any> = new EventEmitter()

  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number;

  constructor() { }

  ngOnInit() {
    if(this.rate != null) {
      this.selectedValue = this.rate;
    }
  }

  emitterRate(star) {
    this.selectedValue = star;
    this.emitRate.emit(star);
    console.log('Value of star', star);
  }

}

export class ModeModel {
  mode: 'view' | 'rate';
}*/
