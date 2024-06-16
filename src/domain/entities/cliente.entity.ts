import { ObjectType, Field } from '@nestjs/graphql';
import { Proposta } from './proposta.entity';

@ObjectType()
export class Cliente {
  @Field(() => String)
  id: string;

  @Field(() => String)
  nome: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  cpf: string;

  @Field(() => String)
  dataNascimento: string;

  @Field(() => String)
  endereco: string;

  @Field(() => Boolean)
  dividaAtiva: boolean;

  @Field(() => Number)
  valorDivida: number;

  @Field(() => Boolean)
  clienteAtivo: boolean;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => [Proposta])
  propostas: Proposta[];
}
