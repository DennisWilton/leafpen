import { ApolloServer, PubSub } from "apollo-server";
import mongoose from "mongoose";
import { SERVER, DATABASE } from "./config.json";

export default async function startServer({ typeDefs, resolvers }) {
  try {
    const url = `mongodb://${DATABASE.USERNAME}:${DATABASE.PASSWORD}@${DATABASE.HOST}/${DATABASE.DBNAME}`;

    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const pubsub = new PubSub();

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: { pubsub },
    });

    server.listen(SERVER.PORT).then(({ url }) => {
      console.log(`Server is running at ${url}`);
    });
  } catch (e) {
    console.log("\nFalha ao iniciar o servidor...");
    console.log(`>`, e.message);
  }
}
