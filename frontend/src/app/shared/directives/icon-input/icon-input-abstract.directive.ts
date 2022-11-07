import { ComponentRef, ComponentFactoryResolver, Renderer2, ElementRef, ViewContainerRef, OnDestroy } from '@angular/core';
import { IconComponent } from '../../components/icon/icon.component';


export abstract class IconInputAbstractDirective implements OnDestroy {

    private componentInstance: ComponentRef<IconComponent>;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private renderer: Renderer2,
        private targetEl: ElementRef,
        private viewContainerRef: ViewContainerRef,
    ) { }

    ngOnDestroy(): void {
        if (this.componentInstance) {
            this.componentInstance.destroy();
        }
    }

    protected appendElement(classes: string[]) {

        const element = this.renderer.createElement('div');
        classes.forEach(
            klass => this.renderer.addClass(element, klass)
        );

        this.renderer.appendChild(element, this.componentInstance.location.nativeElement);

        this.renderer.appendChild(this.targetEl.nativeElement.parentElement, element);
    }

    protected createIconComponent(iconName: string): ComponentRef<IconComponent> {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(IconComponent);
        this.componentInstance = this.viewContainerRef.createComponent(componentFactory);
        this.componentInstance.instance.icon = iconName;

        return this.componentInstance;
    }

    protected validParentClass() {
        const parentClasses = this.targetEl.nativeElement.parentElement.className.split(' ');
        if (parentClasses.indexOf('input-group') < 0) {
            throw new Error('The element must be a child of element with class "input-group"');
        }
    }
}
