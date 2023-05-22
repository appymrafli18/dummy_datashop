import express from 'express';
import cors from 'cors';
import Routers from './src/router/Routers.js';
import bodyParser from 'body-parser';
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT;


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use(Routers);

app.listen(port, () => console.log(`Server Running on port ${port}!`));
