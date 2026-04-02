import { Test, TestingModule } from '@nestjs/testing';
import { PrecosController } from './precos.controller';
import { PrecosService } from './precos.service';

describe('PrecosController', () => {
  let controller: PrecosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrecosController],
      providers: [PrecosService],
    }).compile();

    controller = module.get<PrecosController>(PrecosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
