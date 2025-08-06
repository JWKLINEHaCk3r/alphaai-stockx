# AlphaAI StockX - AI-Powered Trading Platform

A comprehensive Next.js 15 application with TypeScript, Tailwind CSS, and AI trading features including:

## Features

- 🏠 **Homepage** with dashboard overview
- 🤖 **AI Trading** page with recommendations and automated trading controls
- 📊 **Portfolio Management** page with detailed holdings and analytics
- 📈 **Analytics Dashboard** with performance metrics and insights
- 🧭 **Responsive Navigation** for seamless user experience
- 🎨 **Complete UI Component Library** with Radix UI
- 📱 **Trading Cards** and data visualization components

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + CSS Variables
- **Components:** Radix UI + Custom Components
- **Icons:** Lucide React
- **Build:** Turbopack (development)

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm/yarn/pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd alphaai-stockx
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

### Netlify Deployment

The application is configured for Netlify deployment with:

- **Build Command:** `npm run build`
- **Publish Directory:** `.next`
- **Node Version:** 18
- **Plugin:** `@netlify/plugin-nextjs`

Configuration is in `netlify.toml`:

```toml
[build]
  publish = ".next"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"
  NPM_FLAGS = "--legacy-peer-deps"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Railway Deployment

The application is configured for Railway deployment with:

- **Start Command:** `npm start`
- **Health Check:** `/`
- **Port:** 3000 (configured via environment)

Configuration is in `railway.toml`:

```toml
[build]
nixPacks = true

[deploy]
startCommand = "npm start"
healthcheckPath = "/"

[variables]
NODE_ENV = "production"
PORT = "${{ PORT }}"
NPM_CONFIG_LEGACY_PEER_DEPS = "true"
```

### Deployment Steps

1. **Netlify:**
   - Connect your GitHub repository to Netlify
   - Netlify will automatically detect the configuration
   - Deploy with the `@netlify/plugin-nextjs` plugin

2. **Railway:**
   - Connect your GitHub repository to Railway
   - Railway will automatically detect Next.js and use the configuration
   - Environment variables are automatically set

3. **Environment Variables:**
   - Set up any required environment variables in your deployment platform
   - Reference `.env.example` for available configurations

## Project Structure

```
alphaai-stockx/
├── app/                          # Next.js App Router
│   ├── ai-trading/              # AI Trading page
│   ├── analytics/               # Analytics Dashboard page
│   ├── portfolio/               # Portfolio Management page
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Homepage
│   └── globals.css              # Global styles
├── components/                   # Reusable components
│   ├── navigation/              # Navigation components
│   ├── trading/                 # Trading-specific components
│   └── ui/                      # Base UI components (Radix UI)
├── lib/                         # Utility functions
├── netlify.toml                 # Netlify deployment configuration
├── railway.toml                 # Railway deployment configuration
├── next.config.js               # Next.js configuration
├── tailwind.config.js           # Tailwind CSS configuration
└── tsconfig.json                # TypeScript configuration
```

## Performance

- **Static Generation:** All pages are statically generated for optimal performance
- **Code Splitting:** Automatic code splitting with Next.js
- **Optimized Assets:** Automatic image and asset optimization
- **Bundle Size:** Optimized with tree shaking and dead code elimination

## Security Features

- Content Security Policy headers
- XSS Protection
- Frame Options protection
- HTTPS redirect (in production)
- Environment variable protection

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License.
