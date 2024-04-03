import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class HideSensitiveDataInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<UserEntity | UserEntity[]> {
    return next
      .handle()
      .pipe(
        map((data) => this.hideSensitiveData(data))
      );
  }

  private hideSensitiveData(data: UserEntity | UserEntity[]): UserEntity | UserEntity[] {
    if (Array.isArray(data)) {
      return data.map(item => this.hideSensitiveDataInObject(item));
    } else {
      return this.hideSensitiveDataInObject(data);
    }
  }

  private hideSensitiveDataInObject(data: UserEntity): UserEntity {
    const dataCopy = { ...data };
    delete dataCopy.password;
    delete dataCopy.refreshToken;
    return dataCopy;
  }
}
