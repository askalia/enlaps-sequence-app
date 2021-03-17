import { Test, TestingModule } from '@nestjs/testing';
import { ShortSequenceController } from './short-sequence.controller';

describe('ShortSequences Controller', () => {
  let controller: ShortSequenceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShortSequenceController],
    }).compile();

    controller = module.get<ShortSequenceController>(ShortSequenceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
