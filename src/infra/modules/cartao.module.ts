import { Module } from '@nestjs/common';
import { CartaoService } from '../../application/services/cartao.service';
import { CartaoResolver } from '../../presenters/resolvers/cartao.resolver';

@Module({
  providers: [CartaoResolver, CartaoService],
})
export class CartaoModule {}
