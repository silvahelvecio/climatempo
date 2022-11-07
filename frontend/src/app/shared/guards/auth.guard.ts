import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Location } from '@angular/common';
import { AuthService } from '../services/http/auth.service';
import { RouteDictionaryService } from 'src/app/route-dictionary.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {


  constructor(private authService: AuthService, private location: Location, private routeDictionaryService: RouteDictionaryService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // TODO - avaliar e implementar de acordo com característica e requisitos do projeto ou criar endpoint para obter permissão da BasCore
    return true;
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // TODO - avaliar e implementar de acordo com característica e requisitos do projeto ou criar endpoint para obter permissão da BasCore
    return true;
  }

}
