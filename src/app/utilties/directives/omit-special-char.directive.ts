import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[omitSpecialChar]'
})
export class OmitSpecialChar {
  constructor() {
  }
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    var k;  
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57)); 
  }
}