import {
    Directive, ViewContainerRef, ComponentFactoryResolver,
    AfterViewInit, OnDestroy, OnInit, Renderer2, ElementRef, Input
} from '@angular/core';

import { IconInputAbstractDirective } from './icon-input-abstract.directive';

// tslint:disable-next-line: directive-selector
@Directive({ selector: '[iconInput]' })
export class IconInputDirective extends IconInputAbstractDirective implements OnInit, AfterViewInit, OnDestroy {

    @Input() iconInput: string;
    @Input() position: 'right' | 'left';

    constructor(
        componentFactoryResolver: ComponentFactoryResolver,
        renderer: Renderer2,
        targetEl: ElementRef,
        viewContainerRef: ViewContainerRef,
    ) {
        super(componentFactoryResolver, renderer, targetEl, viewContainerRef);
    }

    ngOnInit() {
        this.createIconComponent(this.iconInput);
        this.validParentClass();
    }

    ngAfterViewInit() {
        const klasses = ['form-control-feedback'];
        if (this.position) {
            klasses.push(`feedback-${this.position}`);
        }
        this.appendElement(klasses);
    }
}
