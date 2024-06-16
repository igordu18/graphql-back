import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';

import { DataModule } from './data.module';
import { CartaoModule } from './cartao.module';
import { ClienteModule } from './cliente.module';
import { PropostaModule } from './proposta.module';

@Module({
  imports: [
    DataModule,
    CartaoModule,
    ClienteModule,
    PropostaModule,
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    // }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
  ],
  controllers: [],
  providers: [CartaoModule, ClienteModule, PropostaModule],
})
export class AppModule {}
