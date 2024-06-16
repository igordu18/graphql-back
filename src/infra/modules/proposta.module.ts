import { Module } from '@nestjs/common';
import { PropostaService } from '../../application/services/proposta.service';
import { PropostaResolver } from '../../presenters/resolvers/proposta.resolver';

@Module({
  providers: [PropostaResolver, PropostaService],
})
export class PropostaModule {}
