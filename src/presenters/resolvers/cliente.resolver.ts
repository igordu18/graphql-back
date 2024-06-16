import { Resolver, Query, Mutation, Args, Info } from '@nestjs/graphql';
import { ClienteService } from '../../application/services/cliente.service';
import { Cliente } from '../../domain/entities/cliente.entity';
import { CreateClienteInput } from '../../application/dto/create-cliente.input';
import { UpdateClienteInput } from '../../application/dto/update-cliente.input';
import { GraphQLResolveInfo } from 'graphql';

@Resolver(() => Cliente)
export class ClienteResolver {
  constructor(private readonly clienteService: ClienteService) {}

  @Mutation(() => Cliente)
  async createCliente(
    @Args('createClienteInput') createClienteInput: CreateClienteInput,
  ) {
    const { cliente } = await this.clienteService.create(createClienteInput);

    return cliente;
  }

  @Query(() => [Cliente], { name: 'clientes' })
  async findAll(@Info() info: GraphQLResolveInfo) {
    const fields = this.getSelectedFields(info);
    const { clientes } = await this.clienteService.findAll(fields);

    return clientes;
  }

  @Query(() => Cliente, { name: 'cliente' })
  async findOne(
    @Args('id', { type: () => String }) id: string,
    @Info() info: GraphQLResolveInfo,
  ) {
    const fields = this.getSelectedFields(info);
    const { cliente } = await this.clienteService.findOne(id, fields);

    return cliente;
  }

  @Mutation(() => Cliente)
  async updateCliente(
    @Args('updateClienteInput') updateClienteInput: UpdateClienteInput,
  ) {
    const { cliente } = await this.clienteService.update(
      updateClienteInput.id,
      updateClienteInput,
    );

    return cliente;
  }

  @Mutation(() => Cliente)
  async removeCliente(@Args('id', { type: () => String }) id: string) {
    const { cliente } = await this.clienteService.remove(id);

    return cliente;
  }

  private getSelectedFields(info: GraphQLResolveInfo): string[] {
    const fields: string[] = [];
    if (info && info.fieldNodes && info.fieldNodes[0].selectionSet) {
      const selections = info.fieldNodes[0].selectionSet.selections;
      for (const selection of selections) {
        if (selection.kind === 'Field') {
          fields.push(selection.name.value);
        }
      }
    }
    console.log(fields);
    return fields;
  }
}
