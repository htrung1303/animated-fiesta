import { Test, TestingModule } from '@nestjs/testing';
import { WorkingDaysService } from './working-days.service';
import { DatabaseService } from 'src/database/database.service';

describe('WorkingDaysService', () => {
  let service: WorkingDaysService;
  let databaseService: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkingDaysService,
        {
          provide: DatabaseService,
          useValue: {
            workingDay: {
              create: jest.fn(),
              update: jest.fn(),
              findFirstOrThrow: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<WorkingDaysService>(WorkingDaysService);
    databaseService = module.get<DatabaseService>(DatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create working day if could not find it', async () => {
    jest
      .spyOn(service, 'getCurrentWorkingDay')
      .mockRejectedValue(new Error('Test error'));

    const userId = 1;
    const workingDay = await service.create(userId);
    jest
      .spyOn(databaseService.workingDay, 'create')
      .mockResolvedValueOnce(workingDay);

    expect(databaseService.workingDay.create).toHaveBeenCalledWith({
      data: {
        user: { connect: { id: userId } },
      },
    });
  });

  it('should return the current working day if it could be found', async () => {
    const userId = 1;
    const workingDay = {
      id: 1,
      userId: userId,
      checkInTime: new Date(),
      checkOutTime: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest
      .spyOn(service, 'getCurrentWorkingDay')
      .mockResolvedValueOnce(workingDay);

    const result = await service.create(userId);

    expect(result).toEqual(workingDay);
  });

  it('should update the current working day', async () => {
    const userId = 1;
    const workingDay = {
      id: 1,
      userId: userId,
      checkInTime: new Date(),
      checkOutTime: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest
      .spyOn(service, 'getCurrentWorkingDay')
      .mockResolvedValueOnce(workingDay);
    await service.update(1);

    expect(databaseService.workingDay.update).toHaveBeenCalledWith({
      where: { id: workingDay.id },
      data: { checkOutTime: expect.any(Date) },
    });
  });

  it('should create a new working day if updating fails', async () => {
    service.getCurrentWorkingDay = jest.fn().mockRejectedValue(new Error());

    await service.update(1);

    expect(service.getCurrentWorkingDay).toHaveBeenCalledWith(1);
    expect(databaseService.workingDay.create).toHaveBeenCalledWith({
      data: {
        user: { connect: { id: 1 } },
        checkOutTime: expect.any(Date),
      },
    });
  });

  it('should get the current working day for a user', async () => {
    const userId = 1;
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const nextDate = new Date(currentDate);
    nextDate.setDate(nextDate.getDate() + 1);

    await service.getCurrentWorkingDay(userId);

    expect(databaseService.workingDay.findFirstOrThrow).toHaveBeenCalledWith({
      where: {
        userId: userId,
        checkInTime: {
          gte: currentDate,
          lt: nextDate,
        },
      },
    });
  });
});
