import request from 'supertest'
import { createServerInstance } from '../server'

describe('API Tests', () => {
  let server: any

  beforeAll(() => {
    server = createServerInstance().listen(8787)
  })

  afterAll(() => {
    if (server && typeof server.close === 'function') {
      server.close()
    }
  })

  it('should create a new character', async () => {
    const response = await request(server)
      .post('/character')
      .send({
        name: 'Test Character',
        backstory: 'Test Backstory',
        emotional_state: 'Curious'
      })

    console.log('Response for create character:', response.body)
    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Character added/updated')
  })

  it('should retrieve an existing character', async () => {
    const response = await request(server).get('/character/1')
    console.log('Response for retrieve character:', response.body)
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('name')
  })
})

