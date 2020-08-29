import startServer from "./www";
import typeDefs from "./src/graphql/typeDefs";
import resolvers from "./src/graphql/resolvers";

startServer({ typeDefs, resolvers });
