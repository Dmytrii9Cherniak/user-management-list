import { HttpInterceptorFn } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const toastr: ToastrService = inject(ToastrService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMsg = '';
      if (error.error instanceof ErrorEvent) {
        console.log('This is a client-side error');
        errorMsg = `Error: ${error.error.message}`;
      } else {
        console.log('This is a server-side error');
        errorMsg = `Error Code: ${error.status}, Message: ${error.message}`;
        if (error.status === 404) {
          toastr.error('Resource not found (404)');
        } else {
          toastr.error(`Error: ${error.message}`);
        }
      }
      return throwError(() => new Error(errorMsg));
    })
  );
};
