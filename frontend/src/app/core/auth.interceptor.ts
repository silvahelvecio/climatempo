import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, Subject, throwError } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import { AuthService } from '../shared/services/http/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private readonly authService: AuthService,
    private router: Router,
  ) {}

  private refreshSubject: Subject<any> = new Subject<any>();

  private refreshToken() {
    this.refreshSubject.subscribe({
      complete: () => {
        this.refreshSubject = new Subject<any>();
      }
    });

    // controle de concorrência para não fazer requisições paralelas de refresh token
    if (this.refreshSubject.observers.length === 1) {
      this.authService.refreshToken().subscribe(this.refreshSubject);
    }

    return this.refreshSubject;
  }

  private checkIsUnauthorizedError(error: HttpErrorResponse): boolean {
    return (
      error.status &&
      error.status === 401
    );
  }

  private userShouldLogIn(error: HttpErrorResponse) {
    if (error.error  === "Erro ao renovar token" || error.error === "Login inválido") {
      return true;
    }
    return false;
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
      return next.handle(req).pipe(
        catchError((error, caught) => {
          if (error instanceof HttpErrorResponse) {
            if(this.userShouldLogIn(error)) {

              // limpa o local storage
              localStorage.removeItem("token");
              localStorage.removeItem("refreshToken");

              // direciona para página não autorizada
              this.router.navigate(['unauthorized']);

              // correção: em alguns casos o http-loader não está fechando
              const spinner = document.getElementById("spinner");
              if(spinner) {
                spinner.remove();
              }

              return throwError(error);
            }
            else if (this.checkIsUnauthorizedError(error)) {
              return this.refreshToken().pipe(
                switchMap(() => {
                  return next.handle(this.updateHeader(req));
                })
              );
            } else {
              return throwError(error);
            }
          }
          return caught;
        })
      );
  }

  updateHeader(req) {
    const authToken = localStorage.getItem("token");
    req = req.clone({
      headers: req.headers.set("Authorization", `Bearer ${authToken}`)
    });
    return req;
  }
}
