# COCUS

A RESTful API service that retrieves GitHub repository information for a given user, including branch details and commit information. The API filters out forked repositories and provides a clean interface for frontend consumption.

## Features

- 🔍 Fetch all non-fork repositories for a GitHub user
- 🌿 Retrieve branch information with last commit SHA for each repository
- 🔒 Secure API with Helmet and CORS protection
- 📚 Swagger/OpenAPI documentation
- ✅ Health check endpoint
- 🧪 Jest test suite
- 🚀 TypeScript for type safety

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **HTTP Client**: Axios
- **Security**: Helmet, CORS
- **Documentation**: Swagger UI Express
- **Testing**: Jest, ts-jest
- **Development**: ts-node-dev

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- GitHub account (optional, for testing with your own repositories)
- GitHub Personal Access Token (optional, for higher rate limits)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd COCUS
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
touch .env
```

4. Configure environment variables (see Configuration section below)

## Configuration

Create a `.env` file in the root directory with the following variables:

```env
PORT=3000
NODE_ENV=development
GITHUB_AUTH_TOKEN=your_github_token_here
```

### Environment Variables

- `PORT` (optional): Server port number. Defaults to `3000`
- `NODE_ENV` (optional): Environment mode. Defaults to `development`
- `GITHUB_AUTH_TOKEN` (optional): GitHub Personal Access Token for higher API rate limits. Get one at [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)

## Usage

### Development Mode

Start the development server with hot-reload:

```bash
npm run dev
```

The server will start on `http://localhost:3000` (or your configured PORT).

### Production Mode

1. Build the TypeScript code:
```bash
npm run build
```

2. Start the server:
```bash
node dist/server.js
```

## API Endpoints

### Get User Repositories

Retrieve all non-fork repositories for a GitHub user.

**Endpoint**: `GET /repos/:username/repositories`

**Headers**:
- `Content-Type: application/json` (required)

**Parameters**:
- `username` (path parameter): GitHub username

**Response** (200 OK):
```json
[
  {
    "repository_name": "my-repo",
    "owner_login": "username",
    "branches": [
      {
        "name": "main",
        "last_commit_sha": "a1b2c3d4e5f6..."
      },
      {
        "name": "develop",
        "last_commit_sha": "b2c3d4e5f6a1..."
      }
    ]
  }
]
```

**Error Responses**:
- `400`: Username is required
- `406`: Not acceptable header (Content-Type must be application/json)
- `500`: Internal server error

**Example**:
```bash
curl -X GET http://localhost:3000/repos/octocat/repositories \
  -H "Content-Type: application/json"
```

### Health Check

Check if the API is running.

**Endpoint**: `GET /health`

**Response** (200 OK):
```json
{
  "status": "OK"
}
```

**Example**:
```bash
curl http://localhost:3000/health
```

## API Documentation

Swagger documentation is available when the server is running. Access it at:

```
http://localhost:3000/api-docs
```

(Note: Swagger UI route may need to be configured in your server setup)

## Testing

Run the test suite:

```bash
npm test
```

## Project Structure

```
COCUS/
├── src/
│   ├── app.ts                 # Route definitions
│   ├── server.ts              # Express server setup
│   ├── controllers/
│   │   └── repoContrller.ts   # Repository controller
│   ├── services/
│   │   └── repoService.ts     # Repository service logic
│   └── types/
│       └── index.ts           # TypeScript type definitions
├── tests/
│   └── reposController.spec.ts # Test files
├── swagger.yml                # OpenAPI specification
├── tsconfig.json              # TypeScript configuration
├── jest.config.js             # Jest configuration
└── package.json               # Project dependencies
```

## How It Works

1. The API receives a request with a GitHub username
2. It fetches all repositories for that user from the GitHub API
3. Filters out forked repositories (`fork: false`)
4. For each repository, fetches branch information including last commit SHA
5. Returns a formatted response with repository name, owner, and branch details

## Rate Limiting

GitHub API has rate limits:
- **Unauthenticated**: 60 requests per hour
- **Authenticated**: 5,000 requests per hour

To increase your rate limit, set the `GITHUB_AUTH_TOKEN` environment variable with a GitHub Personal Access Token.

## License

ISC

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

