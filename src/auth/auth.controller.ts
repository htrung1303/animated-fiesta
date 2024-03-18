import { Controller, Body, Post, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthEntity } from './entity/auth.entity';
import { LoginDto } from './dto/login.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator';
import { JwtPayload } from './types/jwtPayload.type';
import { AccessTokenGuard } from './guards/access-token.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ type: AuthEntity })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Post('logout')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUser() payload: JwtPayload) {
    return this.authService.logout(payload.sub);
  }

  @Post('refresh-tokens')
  @UseGuards(RefreshTokenGuard)
  @ApiOkResponse({ type: AuthEntity })
  @ApiBearerAuth()
  refreshTokens(@GetCurrentUser() payload: JwtPayload) {
    return this.authService.refresh_tokens(payload);
  }
}
