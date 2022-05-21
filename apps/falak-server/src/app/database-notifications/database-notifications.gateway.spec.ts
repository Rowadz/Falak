import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseNotificationsGateway } from './database-notifications.gateway';
import { DatabaseNotificationsService } from './database-notifications.service';

describe('DatabaseNotificationsGateway', () => {
  let gateway: DatabaseNotificationsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseNotificationsGateway, DatabaseNotificationsService],
    }).compile();

    gateway = module.get<DatabaseNotificationsGateway>(DatabaseNotificationsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
