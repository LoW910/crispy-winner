import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http"
import { tap } from "rxjs";

export class LoggingInterceptorService implements HttpInterceptor{
  intercept( req: HttpRequest<any>, next: HttpHandler) {
    console.log('OutBound Request')
    console.log(req.url);
    console.log(req.headers);
    return next.handle(req)
      .pipe(
        tap(event => {
          if (event.type === HttpEventType.Response) {
            console.log('Incoming Resonse')
          }
        })
      );
  }
}
