import mongoose from 'mongoose';
import logger from '../logging/logger';

export default class DB {

  private uri: string;
  private db!: mongoose.Connection;

  constructor(uri: string) {
    this.uri = uri;
  }

  public async connect() {
    await mongoose.connect(this.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    this.db = mongoose.connection;
    this.db.on('error', (error) => {
      console.error(error);
      logger.error(error);
    });
    this.db.once('open', () => {
      logger.info('Connected to database');
      console.log('Connected to database');
    });
  }

  public connection() {
    return this.db;
  }
}
