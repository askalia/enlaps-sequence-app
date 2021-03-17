import { Test, TestingModule } from '@nestjs/testing';
import { ShortSequenceService } from './short-sequence.service';

describe('ShortSequenceService', () => {
  let service: ShortSequenceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShortSequenceService],
    }).compile();

    service = module.get<ShortSequenceService>(ShortSequenceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
