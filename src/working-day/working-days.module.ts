import { Module } from '@nestjs/common';
import { WorkingDaysService } from './working-days.service';
import { WorkingDaysController } from './working-days.controller';

@Module({
  controllers: [WorkingDaysController],
  providers: [WorkingDaysService],
})
export class WorkingDaysModule {}
