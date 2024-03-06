import { Controller, Get, Post, Patch, Body, UseGuards } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator';
import { JwtPayload } from 'src/auth/types/jwtPayload.type';
import { WorkingDaysService } from './working-days.service';
import { CreateWorkingDayDto } from './dto/create-working-day.dto';
import { UpdateWorkingDayDto } from './dto/update-working-day.dto';

@Controller('workingdays')
@ApiTags('workingdays')
export class WorkingDaysController {
  constructor(private readonly workingdaysService: WorkingDaysService) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  @ApiBody({ type: CreateWorkingDayDto })
  @ApiBearerAuth()
  create(@Body() createWorkingDayDto: CreateWorkingDayDto) {
    return this.workingdaysService.create(createWorkingDayDto);
  }

  @Patch()
  @UseGuards(AccessTokenGuard)
  @ApiBody({ type: UpdateWorkingDayDto })
  @ApiBearerAuth()
  patch(@Body() updateWorkingDayDto: UpdateWorkingDayDto) {
    return this.workingdaysService.update(updateWorkingDayDto.id);
  }

  @Get()
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  findCurrentWorkingDay(@GetCurrentUser() payload: JwtPayload) {
    return this.workingdaysService.getCurrentWorkingDay(payload.sub);
  }
}
