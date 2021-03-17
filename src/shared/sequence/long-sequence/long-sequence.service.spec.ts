import { Test, TestingModule } from '@nestjs/testing';
import { LongSequenceService } from './long-sequence.service';

describe('LongSequenceService', () => {
  let service: LongSequenceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LongSequenceService],
    }).compile();

    service = module.get<LongSequenceService>(LongSequenceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
