# Backend Service

A Node.js backend service built with TypeScript using a scalable, component-based architecture.

## Project Structure

```
src/
├── api/                    # API Layer
│   ├── routes/            # Route definitions
│   ├── middlewares/       # API specific middlewares
│   ├── validators/        # Request validators
│   └── responses/         # Response handlers & DTOs
│
├── components/            # Business Components
│   ├── user/             # User related modules
│   ├── company/          # Company related modules
│   └── employee/         # Employee related modules
│   └── [other-components]/
│
├── infrastructure/        # Infrastructure Layer
│   ├── database/         # Database configurations & connections
│   ├── cache/            # Cache implementations
│   ├── messaging/        # Message brokers & event handlers
│   └── storage/          # File storage implementations
│
├── services/             # Service Layer
│   ├── email/           # Email service implementation
│   ├── socket/          # WebSocket service
│   ├── queue/           # Queue service implementations
│   ├── cache/           # Caching service
│   └── storage/         # Storage service
│
├── shared/              # Shared Resources
│   ├── interfaces/      # Common interfaces
│   ├── constants/       # Constants and enums
│   ├── types/          # Custom types and type definitions
│   ├── utils/          # Utility functions
│   ├── decorators/     # Custom decorators
│   ├── middlewares/    # Shared middlewares
│   └── validators/     # Shared validators
│
├── config/             # Configuration
│   ├── environments/   # Environment specific configs
│   ├── database/       # Database configs
│   ├── cache/         # Cache configs
│   └── messaging/     # Message broker configs
│
├── app.ts             # App class definition
└── index.ts          # Application entry point
```

## Component Structure
Each component (user, company, employee, etc.) follows this structure:
```
component/
├── controllers/      # Request handlers
├── services/        # Business logic
├── repositories/    # Data access layer
├── models/         # Data models
├── interfaces/     # Component specific interfaces
├── constants/      # Component specific constants
└── types/         # Component specific types
```

## Available Scripts

- `npm start`: Run the production build
- `npm run dev`: Run the development server
- `npm run build`: Build the TypeScript code
- `npm run watch`: Watch for changes and rebuild

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. For production build:
   ```bash
   npm run build
   npm start
   ```
