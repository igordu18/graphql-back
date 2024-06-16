import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePropostaInput {
  @Field(() => String)
  status: string;

  @Field(() => String)
  idCliente: string;

  @Field(() => String)
  motivo: string;

  @Field(() => Number)
  valorEmDebito: number;

  @Field(() => Number)
  multa: number;

  @Field(() => Number)
  desconto: number;
}
