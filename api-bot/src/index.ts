import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import {createServer} from 'http';
import cors from 'cors'
import routes from './routes'
import cookieParser from 'cookie-parser';

const app = express();

app.use(cookieParser());
app.use(
    cors({
        origin: [process.env.FRONTEND_URL],
        credentials: true,
    }),
);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', routes);

const httpServer = createServer(app);

const PORT = process.env.PORT || process.env.API_PORT;

httpServer.listen({port: PORT}, () => {
    console.log(`httpServer ready at http://localhost:${PORT}`);
});
