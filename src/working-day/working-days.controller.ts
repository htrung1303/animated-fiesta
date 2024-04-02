import { Controller, Get, Post, Patch, UseGuards } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator';
import { JwtPayload } from 'src/auth/types/jwtPayload.type';
import { WorkingDaysService } from './working-days.service';

@Controller('workingdays')
@ApiTags('workingdays')
export class WorkingDaysController {
  constructor(private readonly workingdaysService: WorkingDaysService) {}

  @Post('checkin')
  @UseGuards(AccessTokenGuard)
  @ApiCreatedResponse()
  @ApiBearerAuth()
  checkin(@GetCurrentUser() payload: JwtPayload) {
    return this.workingdaysService.create(payload.sub);
  }

  @Patch('checkout')
  @UseGuards(AccessTokenGuard)
  @ApiOkResponse()
  @ApiBearerAuth()
  checkout(@GetCurrentUser() payload: JwtPayload) {
    return this.workingdaysService.update(payload.sub);
  }

  @Get()
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  findCurrentWorkingDay(@GetCurrentUser() payload: JwtPayload) {
    return this.workingdaysService.getCurrentWorkingDay(payload.sub);
  }
}
