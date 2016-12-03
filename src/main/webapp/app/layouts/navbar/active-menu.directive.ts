import { Directive, OnInit, ElementRef } from '@angular/core';

import { JhiLanguageService } from '../../shared';

@Directive({
    selector: '[active-menu]',
    inputs: ['language:active-menu']
})
export class ActiveMenuDirective implements OnInit {
    language: string;
    $element: any;

    constructor(private el: ElementRef, private languageService: JhiLanguageService) {
        this.$element = $(el.nativeElement);
    }

    ngOnInit() {
        //TODO implement once translation is migrated
        /*scope.$watch(function() {
            return languageService.reload();
        }, setActive(selectedLanguage));*/
        function setActive(selectedLanguage) {
            if (this.language === selectedLanguage) {
                //tmhDynamicLocale.set(this.language);
                this.$element.addClass('active');
            } else {
                this.$element.removeClass('active');
            }
        }
    }
}
