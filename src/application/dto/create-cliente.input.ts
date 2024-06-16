import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateClienteInput {
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
  clienteAtivo: boolean;

  @Field(() => Boolean)
  dividaAtiva: boolean;
}
