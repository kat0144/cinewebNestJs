import { Test, TestingModule } from '@nestjs/testing';
import { ClassificacoesController } from './classificacoes.controller';
import { ClassificacoesService } from './classificacoes.service';

describe('ClassificacoesController', () => {
  let controller: ClassificacoesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClassificacoesController],
      providers: [ClassificacoesService],
    }).compile();

    controller = module.get<ClassificacoesController>(ClassificacoesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
