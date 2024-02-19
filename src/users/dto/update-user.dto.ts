import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { 
  IsEmail,
  IsString,
  MinLength,
  ValidateIf
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @ValidateIf((o) => o.email !== undefined)
  @IsEmail()
  email: string;

  @ApiHideProperty()
  @ValidateIf((o) => o.password !== undefined)
  @IsString()
  @MinLength(8)
  password: string;
}
