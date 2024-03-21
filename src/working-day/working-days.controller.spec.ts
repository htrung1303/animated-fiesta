import { Test, TestingModule } from '@nestjs/testing';
import { WorkingDaysController } from './working-days.controller';
import { WorkingDaysService } from './working-days.service';

describe('WorkingDaysController', () => {
  let controller: WorkingDaysController;
  let service: WorkingDaysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkingDaysController],
      providers: [
        {
          provide: WorkingDaysService,
          useValue: {
            create: jest.fn(),
            update: jest.fn(),
            getCurrentWorkingDay: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<WorkingDaysController>(WorkingDaysController);
    service = module.get<WorkingDaysService>(WorkingDaysService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should check in a user', () => {
    const payload = { sub: 1, email: 'abc@example.com' };
    controller.checkin(payload);
    expect(service.create).toHaveBeenCalledWith(payload.sub);
  });

  it('should check out a user', () => {
    const payload = { sub: 1, email: 'abc@example.com' };
    controller.checkout(payload);
    expect(service.update).toHaveBeenCalledWith(payload.sub);
  });

  it('should find the current working day for a user', () => {
    const payload = { sub: 1, email: 'abc@example.com' };
    controller.findCurrentWorkingDay(payload);
    expect(service.getCurrentWorkingDay).toHaveBeenCalledWith(payload.sub);
  });
});
