import 'reflect-metadata';
import { buildSchema } from "type-graphql";
import { mongoose } from '@typegoose/typegoose';
import { ApolloServer } from 'apollo-server-express';
import { MessageResolver } from './resolvers/MessageResolver';
import { MediaFileResolver } from './resolvers/MediaFileResolver';
import { graphqlUploadExpress } from 'graphql-upload';
import { Router } from './router';
import express from 'express';

(async () => {
    await mongoose.connect('mongodb://db:27017/', { useNewUrlParser: true, useUnifiedTopology: true, dbName: "test" });

    const schema = await buildSchema({
        resolvers: [MessageResolver, MediaFileResolver]
    });

    const apolloServer = new ApolloServer({
        schema,
        playground: true,
        uploads: false
    });

    const app = express();
    app.use(graphqlUploadExpress());
    app.use(Router);

    apolloServer.applyMiddleware({ app });

    app.listen({ port: 3002 }, () => {
        console.log(`🚀 Server ready at http://localhost:3002${apolloServer.graphqlPath}`);
    });
})();