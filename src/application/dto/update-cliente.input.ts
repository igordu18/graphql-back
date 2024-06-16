import { CreateClienteInput } from './create-cliente.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateClienteInput extends PartialType(CreateClienteInput) {
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
}
