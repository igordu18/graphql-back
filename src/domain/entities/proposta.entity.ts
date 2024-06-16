import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Proposta {
  @Field(() => String)
  id: string;

  @Field(() => String)
  status: string;

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

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => String)
  idCliente: string;
}
