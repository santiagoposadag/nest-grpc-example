import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DetailError } from './models/detail-error-entity';
import { ResponseEntity } from './models/response-entity';

@Injectable()
export class ControladorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map<any, ResponseEntity>((x) => {
        return {
          code: x.code,
          origin: context.switchToHttp().getRequest().url,
          response: x.data,
        };
      }),
      catchError((err) => {
        return of<DetailError>({
          status: context.switchToHttp().getResponse().statusCode,
          detail: err,
          origin: context.switchToHttp().getRequest().url,
        });
      }),
    );
  }
}
