import { Resolver, Query, Mutation, Args, Info } from '@nestjs/graphql';
import { PropostaService } from '../../application/services/proposta.service';
import { Proposta } from '../../domain/entities/proposta.entity';
import { CreatePropostaInput } from '../../application/dto/create-proposta.input';
import { UpdatePropostaInput } from '../../application/dto/update-proposta.input';
import { GraphQLResolveInfo } from 'graphql';

@Resolver(() => Proposta)
export class PropostaResolver {
  constructor(private readonly propostaService: PropostaService) {}

  @Mutation(() => Proposta)
  async createProposta(
    @Args('createPropostaInput') createPropostaInput: CreatePropostaInput,
  ) {
    const { proposta } = await this.propostaService.create(createPropostaInput);

    return proposta;
  }

  @Query(() => [Proposta], { name: 'propostas' })
  async findAll(@Info() info: GraphQLResolveInfo) {
    const fields = this.getSelectedFields(info);
    const { propostas } = await this.propostaService.findAll(fields);

    return propostas;
  }

  @Query(() => Proposta, { name: 'proposta' })
  async findOne(
    @Args('id', { type: () => String }) id: string,
    @Info() info: GraphQLResolveInfo,
  ) {
    const fields = this.getSelectedFields(info);
    const { proposta } = await this.propostaService.findOne(id, fields);

    return proposta;
  }

  @Mutation(() => Proposta)
  async updateProposta(
    @Args('updatePropostaInput') updatePropostaInput: UpdatePropostaInput,
  ) {
    const { proposta } = await this.propostaService.update(
      updatePropostaInput.id,
      updatePropostaInput,
    );

    return proposta;
  }

  @Mutation(() => Proposta)
  async removeProposta(@Args('id', { type: () => String }) id: string) {
    const { proposta } = await this.propostaService.remove(id);

    return proposta;
  }

  private getSelectedFields(info: GraphQLResolveInfo): string[] {
    const fields: string[] = [];
    if (info && info.fieldNodes && info.fieldNodes[0].selectionSet) {
      const selections = info.fieldNodes[0].selectionSet.selections;
      for (const selection of selections) {
        if (selection.kind === 'Field') {
          if (selection.name.value === '__typename') {
            continue;
          }
          fields.push(selection.name.value);
        }
      }
    }
    return fields;
  }
}
