# Story Manager

Welcome to **Story Manager**: a serverless API application built with Cloudflare Workers, leveraging the Hono framework and backed by Cloudflare's D1 database. The Story Manager is designed to help writers, storytellers, and developers organize and manage story elements, such as characters, scenes, and continuity checks, ensuring a consistent and immersive narrative.

## Features

- **Add, Retrieve, and Update Characters**: Manage characters, including their backstories, emotional states, and details.
- **Create and Retrieve Scenes**: Seamlessly manage scenes and link them to characters for better storytelling continuity.
- **Continuity Checks**: Maintain logical consistency between story elements by associating characters with specific scenes.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Project Locally](#running-the-project-locally)
- [Testing](#testing)
- [Deployment](#deployment)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/story-manager.git
   cd story-manager
   ```

2. **Install Dependencies**

   Install Node.js dependencies using npm:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**

   Create an `.env` file in the root directory to set required environment variables. You can copy the `.env.example` file for a template.

   ```plaintext
   D1_DATABASE_ID=your-database-id
   COMPATIBILITY_DATE=YYYY-MM-DD
   ```

4. **Configure Wrangler**

   Copy the `wrangler.example.toml` to `wrangler.toml` and fill in the necessary Cloudflare configurations:

   ```bash
   cp wrangler.example.toml wrangler.toml
   ```

   Update `wrangler.toml` with your specific settings:

   ```toml
   name = "story-manager"
   main = "src/index.ts"
   compatibility_date = "${COMPATIBILITY_DATE}"

   [[d1_databases]]
   binding = "DB"
   database_name = "story_db"
   database_id = "${D1_DATABASE_ID}"
   ```

## Running the Project Locally

To run Story Manager locally for development purposes:

1. **Start Wrangler Dev Server**

   Make sure environment variables are set up correctly, then start the local development server using Wrangler:

   ```bash
   npx wrangler dev
   ```

   The server will be available at `http://localhost:8787`. You can test the endpoints using tools like Postman or `curl`.

2. **Test API Endpoints Locally**

   Example request to create a new character:

   ```bash
   curl -X POST http://localhost:8787/character \
        -H "Content-Type: application/json" \
        -d '{"name": "Tyler", "backstory": "Complex backstory", "emotional_state": "Curious"}'
   ```

## Testing

Automated tests are available to ensure the functionality of the Story Manager API.

1. **Install Testing Dependencies**

   Ensure that Jest and other test dependencies are installed:

   ```bash
   npm install --save-dev jest ts-jest supertest dotenv
   ```

2. **Run Tests**

   To run all tests, execute:

   ```bash
   npm test
   ```

   The tests will verify that the core functionality, including adding characters and retrieving them, works as expected.

## Deployment

To deploy the Story Manager application to Cloudflare Workers:

1. **Ensure Compatibility Date is Set**

   Make sure that the `COMPATIBILITY_DATE` is set in your environment or `wrangler.toml`.

2. **Publish with Wrangler**

   Deploy the application using the following command:

   ```bash
   npx wrangler publish
   ```

   This will make your Worker live and available at a unique Cloudflare-provided URL.

## API Endpoints

- **POST /character**: Add a new character
  
  - **Body Parameters**:
    - `name`: Character name (string, required)
    - `backstory`: Character backstory (string, optional)
    - `emotional_state`: Current emotional state (string, optional)

- **GET /character/:id**: Retrieve a character by ID

  - **Path Parameter**:
    - `id`: The ID of the character to retrieve

- **POST /scene**: Add a new scene
  
  - **Body Parameters**:
    - `description`: Description of the scene (string, required)
    - `continuity_notes`: Notes about continuity (string, optional)
    - `associated_characters`: Characters linked to the scene (string, optional)

## Project Structure

```
story-manager/
├── src/
│   ├── index.ts            # Main entry point for Hono routes
│   ├── server.ts           # Server instance setup for testing
│   └── __tests__/          # Unit tests for API
│       └── api.test.ts
├── db/
│   └── schema.sql          # D1 database schema
├── wrangler.toml           # Cloudflare Wrangler configuration
├── package.json            # Project dependencies and scripts
├── jest.config.js          # Jest configuration for testing
└── README.md               # Project documentation
```

## Contributing

Contributions are welcome! If you want to add new features, fix bugs, or improve documentation:

1. **Fork the repository**
2. **Create a new branch** (`git checkout -b feature/my-feature`)
3. **Commit your changes** (`git commit -m 'Add some feature'`)
4. **Push to the branch** (`git push origin feature/my-feature`)
5. **Open a pull request**

Please ensure all tests pass before submitting a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.

---

If you have any questions or run into issues, feel free to open an issue on GitHub or contribute to the discussion.

