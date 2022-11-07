import { NgModule } from '@angular/core';
import { ValidaPermissaoPaginaDirective } from './valida-permissao-pagina.directive';

@NgModule({
  declarations: [ValidaPermissaoPaginaDirective],
  exports: [ValidaPermissaoPaginaDirective]
})
export class ValidaPermissaoPaginaModule { }
