import { Module } from '@nestjs/common';
import { ClienteService } from '../../application/services/cliente.service';
import { ClienteResolver } from '../../presenters/resolvers/cliente.resolver';

@Module({
  providers: [ClienteResolver, ClienteService],
})
export class ClienteModule {}
