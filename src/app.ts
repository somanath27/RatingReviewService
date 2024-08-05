process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';
import express from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import config from 'config';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import rateLimit from 'express-rate-limit';

import { Routes } from '../src/interfaces/index';
import { logger } from './utils/logger';

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 25,
  skipSuccessfulRequests: true
});

class App {
  public app: express.Application;
  public port: string | number;
  public env: string;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.env = process.env.NODE_ENV;

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.connectDB();
  }

  public listen() {
    return this.app.listen(this.port, () => {
      logger.info(
        `🚀 App listening in ${this.env} mode on the port ${this.port}`
      );
    });
  }

  private connectDB() {
    const mongoUri = process.env.MONGO_DB_URI;
    mongoose
      .connect(mongoUri)
      .then(() => logger.info('Connected to DB successfully!'))
      .catch(err => logger.error('Error connecting to DB', err));
  }

  private initializeMiddlewares() {
    this.app.use(
      cors({
        origin: config.get('cors.origin'),
        credentials: config.get('cors.credentials')
      })
    );
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    if (process.env.NODE_ENV === 'production')
      this.app.use('api/v1/auth', authLimiter);
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/api/v1', route.router);
    });
  }
}

export default App;
