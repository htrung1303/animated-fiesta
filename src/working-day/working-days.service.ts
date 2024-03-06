import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateWorkingDayDto } from './dto/create-working-day.dto';
import { UpdateWorkingDayDto } from './dto/update-working-day.dto';

@Injectable()
export class WorkingDaysService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createWorkingDayDto: CreateWorkingDayDto) {
    const existingRecord = this.getCurrentWorkingDay(createWorkingDayDto.userId);

    if (existingRecord) {
      return existingRecord;
    }

    const data = {
      checkInTime: new Date(),
      checkOutTime: null,
      user: {
        connect: {
          id: createWorkingDayDto.userId,
        },
      },
    }
    return this.databaseService.workingDay.create({ data });
  }

  update(id: number) {
    return this.databaseService.workingDay.update({
      where: {
        id: id,
      },
      data: {
        checkOutTime: new Date(),
      },
    });
  }

  getCurrentWorkingDay(userId: number) {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const nextDate = new Date(currentDate);
    nextDate.setDate(nextDate.getDate() + 1);

    return this.databaseService.workingDay.findFirst({
      where: {
        userId: userId,
        checkOutTime: null,
        checkInTime: {
          gte: currentDate,
          lt: nextDate,
        },
      },
    });
  }
}
