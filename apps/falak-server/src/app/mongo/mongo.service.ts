import { Injectable } from '@nestjs/common';
import { Collection, MongoClient, Document } from 'mongodb';

@Injectable()
export class MongoService {
  private collection: Collection<Document>;

  async createConnection(): Promise<Collection<Document>> {
    if (this.collection) {
      console.log('We already have a connection');
      return this.collection;
    }
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);
    const dbName = 'db_realtime_events';
    await client.connect();
    console.log('🚀🚀 Connected successfully to MongoDB');
    const db = client.db(dbName);
    const collection = db.collection('events');
    this.collection = collection;
    return collection;
  }
}
