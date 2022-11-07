import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export abstract class HttpBaseService {
 
  protected baseUrl: string;

    constructor(protected httpClient: HttpClient) {
        this.baseUrl = environment.api;
    }

    protected get<T>(path: string) : Observable<T> {
      return this.httpClient.get<T>(environment.api + path, this.getRequestOptions());
    }

    protected post<T>(path: string, body: any) : Observable<T> {
      return this.httpClient.post<T>(environment.api + path, body, this.getRequestOptions());
    }

    protected put<T>(path: string, body: any) : Observable<T> {
      return this.httpClient.put<T>(environment.api + path, body, this.getRequestOptions());
    }

    protected patch<T>(path: string, body: any) : Observable<T> {
      return this.httpClient.patch<T>(environment.api + path, body, this.getRequestOptions());
    }

    protected delete<T>(path: string) : Observable<T> {
      return this.httpClient.delete<T>(environment.api + path, this.getRequestOptions());
    }
 
    protected getRequestOptions(contentType?: string, responseType?: string) {
      let headers = new HttpHeaders();

      headers = headers.set('Access-Control-Allow-Credentials', 'true');

      if (contentType != null && contentType !== undefined && contentType !== '') {
          headers = headers.set('Content-Type', contentType);
      }

      if (responseType != null && responseType !== undefined && responseType !== '') {
        headers = headers.set('Response-Type', responseType);
      }

      const token =  localStorage.getItem('token');
      if(token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }

      return { headers };
    }

}
