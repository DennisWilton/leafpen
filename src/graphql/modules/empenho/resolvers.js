import Empenho from "../../../models/Empenho";
import Liquidacao from "../../../models/Liquidacao";

export default {
  Empenho: {
    liquidacoes: (emp) => Liquidacao.find({ empenho: emp._id }),
  },
  Query: {
    empenhos: () => Empenho.find({}),
    empenho: (_, { id }) => Empenho.findById(id),
  },
  Mutation: {
    empenhoCreate: async (_, { data }, { pubsub }) => {
      const empenho = await Empenho.create(data);

      pubsub.publish("EMPENHO_CREATED", {
        empenhoCreated: empenho,
      });

      return empenho;
    },
    empenhoUpdate: (_, { id, data }) => Empenho.findOneAndUpdate(id, data),
    empenhoDelete: async (_, { id }) => !!(await Empenho.findOneAndDelete(id)),
  },
  Subscription: {
    empenhoCreated: {
      subscribe: (obj, args, { pubsub }) => {
        return pubsub.asyncIterator("EMPENHO_CREATED");
      },
    },
  },
};
