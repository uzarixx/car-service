import dotenv from 'dotenv';
import { models } from './models/models';
import sequelize from './db/connect';
import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import routes from './routes/routes';
import cookieParser from 'cookie-parser';
import socket from './socket';
dotenv.config();
const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

const httpServer = createServer(app);
socket(httpServer)


const PORT = process.env.PORT || process.env.API_PORT;
httpServer.listen({ port: PORT }, async () => {
  models;
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });
  console.log(`httpServer ready at http://localhost:${PORT}`);
});
