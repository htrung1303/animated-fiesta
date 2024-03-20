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
    jest.spyOn(service, 'getCurrentWorkingDay').mockRejectedValue(new Error('Test error'));

    const userId = 1;
    const workingDay = await service.create(userId);
    jest.spyOn(databaseService.workingDay, 'create').mockResolvedValueOnce(workingDay);

    expect(databaseService.workingDay.create).toHaveBeenCalledWith({
      data: {
        user: { connect: { id: userId } },
      },
    });
  });

  it('should update a working day', async () => {
    const userId = 1;
    const workingDay = await service.create(userId);

    jest.spyOn(service, 'getCurrentWorkingDay').mockResolvedValueOnce(workingDay);
    jest.spyOn(databaseService.workingDay, 'update').mockResolvedValueOnce(workingDay);

    await service.update(userId);
    expect(databaseService.workingDay.update).toHaveBeenCalledWith({
      where: { id: userId },
      data: { checkOutTime: expect.any(Date) },
    });
  });
});
