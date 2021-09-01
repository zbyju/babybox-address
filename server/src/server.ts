import express, { Express } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import config from '../config.json';
import mongoose from 'mongoose'
import { saveNames } from './utils/saveNames';

const app: Express = express();

/************************************************************************************
 *                              Basic Express Middlewares
 ***********************************************************************************/

app.set('json spaces', 4);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle logs in console during development
if (process.env.NODE_ENV === 'development' || config.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  app.use(cors());
}

// Handle security and origin in production
if (process.env.NODE_ENV === 'production' || config.NODE_ENV === 'production') {
  app.use(helmet());
}

/************************************************************************************
 *                               Connect to MongoDb
 ***********************************************************************************/

//Connect to MongoDB
mongoose.connect(`mongodb://${config.DATABASE.host}:${config.DATABASE.port}/${config.DATABASE.name}`,
    config.DATABASE.options, (err) => {
  if(err) {
    console.log(err)
  } else {
    console.log("Connected to MongoDB")
    // saveNames()
  }
});
mongoose.set('useCreateIndex', true);

/************************************************************************************
 *                               Register all routes
 ***********************************************************************************/

const apiBabybox = require('./routes/babyboxRoute')
const apiAddress = require('./routes/addressRoute')
const apiFirstname = require('./routes/firstnameRoute')
const apiLastname = require('./routes/lastnameRoute')

app.use('/Babybox/', apiBabybox.router);
app.use('/address/', apiAddress.router);
app.use('/firstname/', apiFirstname.router);
app.use('/lastname/', apiLastname.router);

/************************************************************************************
 *                               Express Error Handling
 ***********************************************************************************/

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  return res.status(500).json({
    errorName: err.name,
    message: err.message,
    stack: err.stack || 'no stack defined'
  });
});

export default app;
