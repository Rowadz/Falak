import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseNotificationsService } from './database-notifications.service';

describe('DatabaseNotificationsService', () => {
  let service: DatabaseNotificationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseNotificationsService],
    }).compile();

    service = module.get<DatabaseNotificationsService>(DatabaseNotificationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
