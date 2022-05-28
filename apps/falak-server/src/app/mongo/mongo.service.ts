import { Injectable } from '@nestjs/common';
import { Collection, MongoClient, Document } from 'mongodb';

@Injectable()
export class MongoService {
  private _collection: Collection<Document>;

  get collection() {
    return this._collection;
  }

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
    // TODO:: define a schema for this plz
    const collection = db.collection('events');
    this._collection = collection;
    return collection;
  }
}
