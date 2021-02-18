import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'

describe('Client Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const clientCollection = MongoHelper.getCollection('clients')
    await clientCollection.deleteMany({})
  })

  test('should return an client success', async () => {
    await request(app)
      .post('/api/client')
      .send({
        name: 'Albert',
        email: 'albert.bit8@gmail.com'
      })
      .expect(200)
  });

  test('should return a null list of clients ', async () => {
    await request(app)
      .get('/api/client')
      .send()
      .expect(204)
  });
});