# COCUS Frontend

A modern React application that provides a user interface for viewing GitHub repository information. The frontend communicates with the COCUS backend API to fetch and display repositories, branches, and commit information for any GitHub user.

## Features

- 🔍 Search GitHub repositories by username
- 📦 Display repository information with branch details
- 🎨 Modern, responsive UI built with React
- ⚡ Fast development experience with Vite
- 🔒 Type-safe development with TypeScript
- 🧹 ESLint for code quality

## Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: CSS
- **Linting**: ESLint

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- COCUS backend server running (see backend README for setup)

## Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

## Configuration

The frontend is configured to connect to the backend API at `http://localhost:3000` by default. This can be modified in `src/App.tsx`:

```typescript
const BASE_URL = 'http://localhost:3000';
```

If your backend is running on a different port or host, update this constant accordingly.

## Usage

### Development Mode

Start the development server with hot-reload:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port Vite assigns).

### Build for Production

1. Build the application:
```bash
npm run build
```

2. Preview the production build:
```bash
npm run preview
```

The built files will be in the `dist` directory.

## How to Use

1. Make sure the backend server is running (see backend README)
2. Start the frontend development server
3. Enter a GitHub username in the input field
4. Click the submit button to fetch and display repositories
5. View repository information including:
   - Repository name
   - Owner login
   - Branch names
   - Last commit SHA for each branch

## API Integration

The frontend communicates with the backend API endpoint:

**Endpoint**: `GET /repos/:username/repositories`

**Headers**:
- `Content-Type: application/json`

**Example Request**:
```typescript
fetch('http://localhost:3000/repos/octocat/repositories', {
  headers: {
    'Content-Type': 'application/json'
  }
})
```

## Project Structure

```
frontend/
├── src/
│   ├── App.tsx              # Main application component
│   ├── App.css              # Application styles
│   ├── main.tsx             # Application entry point
│   ├── index.css            # Global styles
│   └── assets/              # Static assets
├── public/                  # Public assets
├── index.html               # HTML template
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
├── tsconfig.app.json        # TypeScript app config
├── tsconfig.node.json       # TypeScript node config
├── eslint.config.js         # ESLint configuration
└── package.json             # Project dependencies
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Development

### Code Style

The project uses ESLint for code quality. Run the linter:

```bash
npm run lint
```

### TypeScript

The project is fully typed with TypeScript. Type definitions for the API responses are defined in `src/App.tsx`:

```typescript
export interface GitHubRepo {
  repository_name: string;
  owner_login: string;
  fork: boolean;
  branches: BranchResponse[];
}

export interface BranchResponse {
  name: string;
  last_commit_sha: string;
}
```

## Troubleshooting

### Backend Connection Issues

If you encounter connection errors:

1. Verify the backend server is running on the expected port
2. Check the `BASE_URL` constant in `src/App.tsx`
3. Ensure CORS is properly configured in the backend
4. Check browser console for detailed error messages

### Build Issues

If the build fails:

1. Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
2. Clear Vite cache: `rm -rf node_modules/.vite`
3. Check TypeScript errors: `npm run build` will show compilation errors

## License

ISC

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
