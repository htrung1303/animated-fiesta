import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class WorkingDaysService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(userId: number) {
    try {
      const currentWorkingDay = await this.getCurrentWorkingDay(userId);
      return currentWorkingDay;
    } catch {
      return this.databaseService.workingDay.create({
        data: {
          user: { connect: { id: userId } },
        },
      });
    }
  }

  async update(userId: number) {
    try {
      const currentWorkingDay = await this.getCurrentWorkingDay(userId);
      return this.databaseService.workingDay.update({
        where: { id: currentWorkingDay.id },
        data: { checkOutTime: new Date() },
      });
    } catch {
      return this.databaseService.workingDay.create({
        data: {
          user: { connect: { id: userId } },
          checkOutTime: new Date(),
        },
      });
    }
  }

  getCurrentWorkingDay(userId: number) {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const nextDate = new Date(currentDate);
    nextDate.setDate(nextDate.getDate() + 1);

    return this.databaseService.workingDay.findFirstOrThrow({
      where: {
        userId: userId,
        checkInTime: {
          gte: currentDate,
          lt: nextDate,
        },
      },
    });
  }
}
