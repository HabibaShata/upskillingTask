import { HttpHandlerFn, HttpHeaders, HttpRequest } from '@angular/common/http';
import { IUser } from '../models/Iuser';
export function authInterceptor(
  request: HttpRequest<any>,
  next: HttpHandlerFn
) {
  let modifiedReq = request.clone({
    headers: new HttpHeaders({
      'app-id': '64fc4a747b1786417e354f31',
    }),
  });

  return next(modifiedReq);
}
