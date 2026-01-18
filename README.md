# Portfolio Website

Personal portfolio website for Justin Archibald - showcasing projects, experience, and technical capabilities.

## Overview

This is a full-stack web application built with React and Express, featuring a dynamic portfolio with project showcases, resume/CV, design pattern guides, and a wedding photo gallery powered by Cloudflare R2 storage.

## Tech Stack

### Frontend
- **React 18** - UI library
- **React Router** - Client-side routing
- **React Bootstrap** - UI components and styling
- **Vite** - Build tool and dev server

### Backend
- **Express** - Web server
- **Cloudflare R2** - Object storage for photos (S3-compatible)
- **AWS SDK** - S3 client for R2 integration

### Development & Testing
- **Vitest** - Unit testing framework
- **Testing Library** - React component testing
- **ESLint** - Code linting

## Features

- **Home Page** - Professional bio and introduction
- **Resume/CV** - Detailed experience and education
- **Projects** - Portfolio of technical projects
- **React Pages** - Interactive React demonstrations
- **Design Patterns Guide** - Software design patterns reference
- **Wedding Photos** - Photo gallery with infinite scroll, powered by R2 storage
- **Responsive Design** - Mobile-friendly Bootstrap layout

## Getting Started

### Prerequisites

- Node.js >= 20.19.0
- npm 10.x

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root directory with the following variables (required for wedding photos feature):

```env
R2_ACCOUNT_ID=your_cloudflare_account_id
R2_ACCESS_KEY_ID=your_r2_access_key
R2_SECRET_ACCESS_KEY=your_r2_secret_key
R2_BUCKET_NAME=your_bucket_name
R2_PUBLIC_URL=your_public_url (optional)
PORT=3000 (optional, defaults to 3000)
```

## Available Scripts

### Development

```bash
# Start Vite dev server
npm run dev
```

Runs the app in development mode with hot module replacement.

### Production

```bash
# Build for production
npm run build

# Start production server
npm start
```

The build command creates an optimized production build in the `build` folder. The start command runs the Express server to serve the built app.

### Testing

```bash
# Run tests in watch mode
npm test

# Run tests once (CI mode)
npm run test:ci
```

### Linting

```bash
# Check for lint errors
npm run lint

# Auto-fix lint errors
npm run lint:fix
```

### Preview

```bash
# Preview production build locally
npm run preview
```

## Project Structure

```
portfolio/
├── src/
│   ├── components/     # Reusable React components
│   ├── pages/          # Page components
│   ├── styles/         # CSS files
│   ├── images/         # Image assets
│   ├── data/           # JSON data files
│   ├── test/           # Test files
│   └── App.js          # Main app component
├── public/             # Static assets
├── server.js           # Express server
├── package.json
└── vite.config.mjs     # Vite configuration
```

## API Endpoints

### GET `/api/photos`

Fetches paginated photos from Cloudflare R2 storage.

**Query Parameters:**
- `page` (number, default: 1) - Page number for pagination

**Response:**
```json
{
  "photos": ["signed_url_1", "signed_url_2", ...],
  "hasMore": true,
  "total": 100,
  "page": 1,
  "pageSize": 20
}
```

## Deployment

This application is configured for Heroku deployment:

```bash
# The heroku-postbuild script automatically runs after deployment
npm run heroku-postbuild
```

The `heroku-postbuild` script runs `npm run build` to create the production bundle.

## Node Version Requirements

- Minimum Node.js version: 20.19.0
- npm version: 10.x

These are enforced in `package.json` via the `engines` field.

## License

ISC

## Author

Justin Archibald
- LinkedIn: [linkedin.com/in/justin-archibald-319279101](https://www.linkedin.com/in/justin-archibald-319279101)
