import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hono server is running!')
})

// Adding/updating character route with detailed logging
app.post('/character', async (c) => {
  try {
    console.log('Received request to add/update character')
    const { name, backstory, emotional_state } = await c.req.json()
    
    // Logging incoming request data
    console.log(`Character data received: name=${name}, backstory=${backstory}, emotional_state=${emotional_state}`)

    if (!name || !backstory || !emotional_state) {
      throw new Error("Missing required character fields")
    }

    const query = `INSERT INTO characters (name, backstory, emotional_state) VALUES (?, ?, ?)`
    console.log('Preparing to execute query:', query)

    await c.env.DB.prepare(query).bind(name, backstory, emotional_state).run()
    console.log('Character added/updated successfully')

    return c.json({ message: 'Character added/updated' }, 200)
  } catch (error) {
    console.error('Error adding/updating character:', error)
    return c.json({ error: 'Failed to add/update character' }, 500)
  }
})

// Retrieving character route with detailed logging
app.get('/character/:id', async (c) => {
  try {
    console.log('Received request to retrieve character')
    const id = c.req.param('id')
    console.log(`Character ID received: ${id}`)

    if (!id) {
      throw new Error("Missing character ID")
    }

    const query = `SELECT * FROM characters WHERE id = ?`
    console.log('Preparing to execute query:', query)

    const result = await c.env.DB.prepare(query).bind(id).first()
    if (result) {
      console.log('Character found:', result)
      return c.json(result)
    } else {
      console.warn('Character not found')
      return c.json({ error: 'Character not found' }, 404)
    }
  } catch (error) {
    console.error('Error retrieving character:', error)
    return c.json({ error: 'Failed to retrieve character' }, 500)
  }
})

export default app

