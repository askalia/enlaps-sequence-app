import { Test, TestingModule } from '@nestjs/testing';
import { LongSequenceController } from './long-sequence.controller';

describe('LongSequences Controller', () => {
  let controller: LongSequenceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LongSequenceController],
    }).compile();

    controller = module.get<LongSequenceController>(LongSequenceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
