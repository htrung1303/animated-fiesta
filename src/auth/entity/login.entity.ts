import { ApiProperty } from "@nestjs/swagger";
import { AuthEntity } from "./auth.entity";

export class LoginEntity extends AuthEntity {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  role: string;
}
