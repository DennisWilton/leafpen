import Liquidacao from "../../../models/Liquidacao";
import Empenho from "../../../models/Empenho";

export default {
  Liquidacao: {
    empenho: (liq) => Empenho.findById(liq.empenho),
  },
  Query: {
    liquidacoes: () => Liquidacao.find({}),
    liquidacao: (_, { id }) => Liquidacao.findById(id),
  },
  Mutation: {
    liquidacaoCreate: async (_, { data }, { pubsub }) => {
      const liquidacao = await Liquidacao.create(data);

      pubsub.publish("LIQUIDACAO_CREATED", {
        liquidacaoCreated: liquidacao,
      });

      return liquidacao;
    },
    liquidacaoUpdate: (_, { id, data }) =>
      Liquidacao.findOneAndUpdate(id, data),
    liquidacaoDelete: async (_, { id }) =>
      !!(await Liquidacao.findOneAndDelete(id)),
  },
  Subscription: {
    liquidacaoCreated: {
      subscribe: (obj, args, { pubsub }) => {
        return pubsub.asyncIterator("LIQUIDACAO_CREATED");
      },
    },
  },
};
