import { Test, TestingModule } from '@nestjs/testing';
import { PrecosService } from './precos.service';

describe('PrecosService', () => {
  let service: PrecosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrecosService],
    }).compile();

    service = module.get<PrecosService>(PrecosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
