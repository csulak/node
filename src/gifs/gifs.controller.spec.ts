import { Test, TestingModule } from '@nestjs/testing';
import { GifsController } from './gifs.controller';

describe('GifsController', () => {
  let controller: GifsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GifsController],
    }).compile();

    controller = module.get<GifsController>(GifsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
