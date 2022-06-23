import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, tap } from "rxjs";

export class AuthIntercepterService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.headers.get('Authorization') === 'TrueDude' ) {
      // console.log('authorized: request is on its way');
      const modifiedReq = req.clone({
        headers: req.headers.append('Passed', 'true')
      })
      return next.handle(modifiedReq).pipe(
        tap(event => {
          // console.log(event)
          // console.log('$$$$$$$$$$$$$$$$$$$')
          if (event.type === HttpEventType.Response) {
            // console.log(event.body)
          }
          // console.log('$$$$$$$$$$$$$$$$$$$')
        })
      );
    }
    return next.handle(req);
  }

}
