import { AfterContentInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
    selector: '[autoFocus]'
})
export class AutofocusDirective implements AfterContentInit {

    @Input() public appAutoFocus: boolean;

    public constructor(private el: ElementRef) {

    }

    public ngAfterContentInit() {
        if (this.appAutoFocus) {
            setTimeout(() => {
                this.el.nativeElement.focus();
            }, 500);
        }
        else if (this.appAutoFocus == null || this.appAutoFocus == undefined) {
            setTimeout(() => {
                this.el.nativeElement.focus();
            }, 500);
        }
    }

}