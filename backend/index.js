import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import { connectDB } from "./db/connectDB.js";
import passport from 'passport';
import session from 'express-session';
import connectMongo from 'connect-mongodb-session';
import mergeType from "./typeDefs/index.js";
import mergeResolver from "./resolvers/index.js";
import { buildContext } from "graphql-passport";
import { configurePassport } from './Passport/passport.config.js';

dotenv.config({ path: '../.env' });
configurePassport();

const app = express();
const httpServer = http.createServer(app);  

// MongoDB session store
const MongoStore = connectMongo(session);
const store = new MongoStore({
    uri: process.env.MONGO_URL, // Use `uri` instead of `url`
    collection: "sessions",
});

store.on("error", (err) => console.log("Session Store Error:", err));

// Configure session middleware
app.use(
    session({
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: false,
        store: store,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
            httpOnly: true,
        },
    })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Create Apollo Server instance
const server = new ApolloServer({
    typeDefs: mergeType,
    resolvers: mergeResolver,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
    '/graphql',
    cors({
        origin: "http://localhost:3000", // Configure the origin properly
        credentials: true,
    }),
    express.json(),
    expressMiddleware(server, {
        context: async ({ req, res }) => buildContext({ req, res }), 
    }),
);

// Start the server
await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
connectDB();
console.log(`Server is running at http://localhost:4000/graphql`);
