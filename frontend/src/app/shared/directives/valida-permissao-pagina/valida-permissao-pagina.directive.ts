
import { ElementRef, Renderer2, Directive, Input } from '@angular/core';
import { UserService } from '../../services/http/user.service';

@Directive({ selector: '[validaPermissaoPagina]' })
export class ValidaPermissaoPaginaDirective {

    constructor(
        private element: ElementRef<any>,
        private render: Renderer2,
        private userService: UserService
    ) {}

    @Input() set validaPermissaoPagina(pages: string | Array<string>) {
        this.verifyPermission(pages, this.userService.getPermissionsPage);
    }

    verifyPermission(pages: string | string[], permissions: string[]): void {
        const currentDisplay = getComputedStyle(this.element.nativeElement).display;
        let isValid = false;

        if (permissions) {
            permissions.forEach(permission => {
                if (Array.isArray(pages)) {
                    pages.forEach(x => {
                        if (permission.toLowerCase() === x.toLowerCase()) {
                            isValid = true;
                        }
                    });
                } else {
                    if (permission.toLowerCase() === pages.toLowerCase()) {
                        isValid = true;
                    }
                }
            });
        }

        if (isValid) {
            this.render.setStyle(this.element.nativeElement, 'display', currentDisplay);
        } else {
            this.render.setStyle(this.element.nativeElement, 'display', 'none');
        }
    }
}
