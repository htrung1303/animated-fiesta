import { PartialType } from '@nestjs/swagger';
import { CreateWorkingDayDto } from './create-working-day.dto';

export class UpdateWorkingDayDto extends PartialType(CreateWorkingDayDto) {
  id: number;
}
