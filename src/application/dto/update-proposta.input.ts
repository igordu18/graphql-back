import { CreatePropostaInput } from './create-proposta.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePropostaInput extends PartialType(CreatePropostaInput) {
  @Field(() => String)
  id: string;

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

  @Field(() => Number)
  valorPago: number;
}
