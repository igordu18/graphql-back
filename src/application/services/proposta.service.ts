import { Injectable } from '@nestjs/common';
import { CreatePropostaInput } from '../dto/create-proposta.input';
import { UpdatePropostaInput } from '../dto/update-proposta.input';
import { PrismaService } from '@infra/data/client/prisma.service';

@Injectable()
export class PropostaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPropostaInput: CreatePropostaInput) {
    const proposta = await this.prisma.proposta.create({
      data: {
        status: createPropostaInput.status,
        idCliente: createPropostaInput.idCliente,
        motivo: createPropostaInput.motivo,
        valorEmDebito: createPropostaInput.valorEmDebito,
        multa: createPropostaInput.multa,
        desconto: createPropostaInput.desconto,
      },
    });

    return {
      proposta,
    };
  }

  async findAll(fields: string[]) {
    const selectFields = Object.fromEntries(
      fields.map((field) => [field, true]),
    );

    const propostas = await this.prisma.proposta.findMany({
      select: selectFields,
    });

    return {
      propostas,
    };
  }

  async findOne(id: string, fields: string[]) {
    const selectFields = Object.fromEntries(
      fields.map((field) => [field, true]),
    );

    const proposta = await this.prisma.proposta.findUnique({
      where: {
        id,
      },
      select: selectFields,
    });

    return {
      proposta,
    };
  }

  async update(id: string, updatePropostaInput: UpdatePropostaInput) {
    const proposta = await this.prisma.proposta.update({
      where: {
        id,
      },
      data: {
        status: updatePropostaInput.status,
        idCliente: updatePropostaInput.idCliente,
        motivo: updatePropostaInput.motivo,
        valorEmDebito: updatePropostaInput.valorEmDebito,
        multa: updatePropostaInput.multa,
        desconto: updatePropostaInput.desconto,
      },
    });

    return {
      proposta,
    };
  }

  async remove(id: string) {
    const proposta = await this.prisma.proposta.delete({
      where: {
        id,
      },
    });

    return {
      proposta,
    };
  }
}
