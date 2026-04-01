import { Test, TestingModule } from '@nestjs/testing';
import { ClassificacoesService } from './classificacoes.service';

describe('ClassificacoesService', () => {
  let service: ClassificacoesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClassificacoesService],
    }).compile();

    service = module.get<ClassificacoesService>(ClassificacoesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
