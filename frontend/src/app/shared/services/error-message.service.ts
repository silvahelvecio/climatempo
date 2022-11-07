import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ErrorMessageService {
    errorToView(error: HttpErrorResponse | string) {
        if (typeof (error) === 'string') {
            return error;
        } else {
            if (error.error) {
                const errorHandled = error.error;
                if (typeof (errorHandled) === 'string') {
                    return errorHandled;
                }
                if(errorHandled.error) {
                    return errorHandled.error;
                }
                if (errorHandled.Message) {
                    return errorHandled.Message;
                }
                if (errorHandled.message) {
                    return errorHandled.message;
                }
                if (errorHandled.errors) {
                    let message = '';
                    
                    errorHandled.errors.forEach((err: string) => message += err);

                    return message;
                }
                return errorHandled.title;
            }
            if (error.message) {
                return error.message;
            }
        }
    }
}
