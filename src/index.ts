import 'reflect-metadata';
import { AuthChecker, buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/UserResolver";
import { getModelForClass, mongoose } from '@typegoose/typegoose';
import { decodeJwt } from './helpers';
import { User } from './entities/User';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

export const passwordAuthChecker: AuthChecker = async ({ context }: any, roles) => {
    try {
        const token = context.req.cookies.appSession;

        if (token) {
            const data = decodeJwt(token);
            const model = getModelForClass(User);
            const user = await model.findById(data.userId);
            context.user = user;

            /**
             * Here, we can reset the token each request to maintain the user connected
            const newToken = generateJwt({ userId: context.user.id });
            context.res.cookie('appSession', newToken, { maxAge: 60 * 24, httpOnly: true });
             */

            return true;
        } else {
            return false;
        }
    } catch {
        return false;
    }
};

(async () => {
    await mongoose.connect('mongodb://localhost:27017/', { useNewUrlParser: true, useUnifiedTopology: true, dbName: "test" });

    const schema = await buildSchema({
        resolvers: [UserResolver],
        authChecker: passwordAuthChecker,
    });

    const server = new ApolloServer({
        schema,
        playground: true,
        
        context: ({ req, res }) => ({ req, res })
    });

    const app = express();
    app.use(cors());
    app.use(cookieParser());

    server.applyMiddleware({ app, cors: false });

    app.listen({ port: 3002 }, () =>
        console.log(`🚀 Server ready at http://localhost:3002${server.graphqlPath}`)
    );
})();