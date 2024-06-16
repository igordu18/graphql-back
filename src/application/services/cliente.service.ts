import { CreateClienteInput } from '@application/dto/create-cliente.input';
import { UpdateClienteInput } from '@application/dto/update-cliente.input';
import { PrismaService } from '@infra/data/client/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ClienteService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createClienteInput: CreateClienteInput) {
    const dataNascimento = new Date(
      createClienteInput.dataNascimento.split('/').reverse().join('-'),
    );

    const cliente = await this.prisma.cliente.create({
      data: {
        nome: createClienteInput.nome,
        email: createClienteInput.email,
        cpf: createClienteInput.cpf,
        dataNascimento,
        endereco: createClienteInput.endereco,
        clienteAtivo: createClienteInput.clienteAtivo,
        dividaAtiva: createClienteInput.dividaAtiva,
      },
    });

    return {
      cliente,
    };
  }

  async findAll(fields: string[]) {
    const selectFields = Object.fromEntries(
      fields.map((field) => [field, true]),
    );

    const clientes = await this.prisma.cliente.findMany({
      select: selectFields,
    });

    return {
      clientes,
    };
  }

  async findOne(id: string, fields: string[]) {
    const selectFields = Object.fromEntries(
      fields.map((field) => [field, true]),
    );

    const cliente = await this.prisma.cliente.findUnique({
      where: {
        id,
      },
      select: selectFields,
    });

    return {
      cliente,
    };
  }

  async update(id: string, updateClienteInput: UpdateClienteInput) {
    const cliente = await this.prisma.cliente.update({
      where: {
        id,
      },
      data: {
        nome: updateClienteInput.nome,
        email: updateClienteInput.email,
        cpf: updateClienteInput.cpf,
        dataNascimento: updateClienteInput.dataNascimento,
        endereco: updateClienteInput.endereco,
        dividaAtiva: updateClienteInput.dividaAtiva,
        valorDivida: updateClienteInput.valorDivida,
        clienteAtivo: updateClienteInput.clienteAtivo,
      },
    });

    return {
      cliente,
    };
  }

  async remove(id: string) {
    const cliente = await this.prisma.cliente.delete({
      where: {
        id,
      },
    });

    return {
      cliente,
    };
  }
}
