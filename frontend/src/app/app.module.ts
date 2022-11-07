import { NgModule,LOCALE_ID} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { AuthGuard } from './shared/guards/auth.guard';
// import { AuthService } from './shared/services/http/auth.service';
import { AppComponent } from './app.component';
import {ClimaTempoService  } from "../app/shared/services/http/climatempo.service";
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt, 'pt-BR');
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,HttpClientModule
  ],
  providers: [ClimaTempoService,{ provide: LOCALE_ID, useValue: 'pt-BR' } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
