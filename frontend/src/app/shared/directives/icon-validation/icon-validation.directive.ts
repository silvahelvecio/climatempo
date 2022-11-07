import {
    Directive, ViewContainerRef, ComponentFactoryResolver,
    AfterViewInit, OnDestroy, OnInit, Renderer2, ElementRef
} from '@angular/core';

import { IconInputAbstractDirective } from '../icon-input/icon-input-abstract.directive';

// tslint:disable-next-line: directive-selector
@Directive({ selector: '[iconValidation]' })
export class IconValidationDirective extends IconInputAbstractDirective implements OnInit, AfterViewInit, OnDestroy {

    constructor(
        componentFactoryResolver: ComponentFactoryResolver,
        renderer: Renderer2,
        targetEl: ElementRef,
        viewContainerRef: ViewContainerRef,
    ) {
        super(componentFactoryResolver, renderer, targetEl, viewContainerRef);
    }

    ngOnInit() {
        this.createIconComponent('warning');
        this.validParentClass();
    }

    ngAfterViewInit() {
        this.appendElement(['form-control-feedback', 'feedback-right', 'feedback-error']);
    }

}
