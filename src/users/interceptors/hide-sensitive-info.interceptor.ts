import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class HideSensitiveDataInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<Omit<UserEntity | UserEntity[], 'password' | 'refreshToken'>> {
    return next
      .handle()
      .pipe(
        map((data) => this.hideSensitiveData(data))
      );
  }

  private hideSensitiveData(data: UserEntity | UserEntity[]): Omit<UserEntity | UserEntity[], 'password' | 'refreshToken'> {
    if (Array.isArray(data)) {
      return data.map(item => this.hideSensitiveDataInObject(item));
    } else {
      return this.hideSensitiveDataInObject(data);
    }
  }

  private hideSensitiveDataInObject(data: UserEntity): Omit<UserEntity, 'password' | 'refreshToken'> {
    const { password, refreshToken, ...rest } = data;
    return rest;
  }
}
