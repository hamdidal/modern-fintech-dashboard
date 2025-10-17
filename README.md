# Modern Fintech Dashboard

A modern fintech dashboard application built with React + TypeScript + Vite.


## 🚀 Features

- ✅ **Authentication:** Email/Password and Google OAuth integration
- 📊 **Dashboard:** Financial overview, charts and metrics
- 💳 **Wallet Management:** Card information and balance tracking
- 📈 **Charts:** Working capital and income/expense analysis
- 🌍 **Multi-language:** Turkish and English language support
- 🎨 **Modern UI:** TailwindCSS-like responsive design
- 🔐 **Secure:** JWT-based authentication

## 📋 Installation

### 1. Install Dependencies

```bash
yarn install
```

### 2. Setup Environment Variables

Create a `.env` file in the project root directory:

```bash
cp .env.example .env
```

Fill the `.env` file with the following variables:

```env
# Backend API base URL
VITE_API_BASE_URL=your-api-url

# Google OAuth Client ID (required for Google sign-in)
VITE_GOOGLE_CLIENT_ID=your-google-oauth-client-id
```


### 3. Start Development Server

```bash
yarn dev
```

The application will start running at http://localhost:5173

### 4. Available Scripts

```bash
yarn dev          # Start dev server
yarn build        # Type-check and build for production
yarn preview      # Preview the production build
yarn lint         # Run ESLint
yarn test         # Run unit tests
yarn test:watch  # Run tests in watch mode
yarn test:coverage # Generate coverage report
```

## 🧪 Testing

The project uses **Jest** for unit testing with high code coverage:

```bash
# Run tests
yarn test

# Run tests in watch mode
yarn test:watch

# Generate coverage report
yarn test:coverage
```

### Test Coverage

- **122 passing tests** across utils, services, hooks, and constants
- Coverage includes:
  - ✅ Utility functions (format, error handling)
  - ✅ Services (storage, token management)
  - ✅ Hooks (useDebounce)
  - ✅ API Constants validation

## 🛠️ Technology Stack

- **Frontend Framework:** React 18
- **Language:** TypeScript (Strict Mode)
- **Testing:** Jest + @swc/jest + React Testing Library
- **Build Tool:** Vite
- **State Management:** Zustand
- **Data Fetching:** TanStack Query (React Query)
- **Routing:** React Router v6
- **Styling:** SCSS Modules
- **i18n:** react-i18next
- **OAuth:** @react-oauth/google
- **Notifications:** react-toastify
- **Charts:** Recharts
- **HTTP Client:** Axios
- **Testing:** Vitest + Testing Library
- **Form Validation:** Zod + React Hook Form

## ⚙️ Environment Variables

| Name | Required | Default | Description |
|------|----------|---------|-------------|
| `VITE_API_BASE_URL` | Yes | `your-api-url` | Backend API base URL |
| `VITE_GOOGLE_CLIENT_ID` | Yes (for Google OAuth) | — | Google OAuth Web Client ID |

## 📁 Project Structure

```
src/
├── api/              # API client and services
│   └── interceptors/ # Request/Response interceptors
├── assets/           # Images and static files
├── components/       # Reusable components
├── config/           # Configuration files
├── constants/        # Application constants
├── hooks/            # Custom React hooks
├── i18n/             # Language files (TR/EN)
├── layouts/          # Layout components
├── pages/            # Page components
├── routes/           # Route configuration
├── services/         # Business logic services
├── store/            # Zustand stores
├── styles/           # Global and module-based styles
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
└── __tests__/        # Test files
```

## 🔑 Google OAuth Integration

Google sign-in feature is ready on the frontend side. It will work automatically when the backend endpoint is ready.

### Quick Setup

1. Create a Web OAuth Client ID in Google Cloud Console (`APIs & Services` → `Credentials`).
2. Authorized JavaScript origins: add `http://localhost:5173` for development.
3. Copy the Web Client ID and set it in your `.env` file:

```env
VITE_GOOGLE_CLIENT_ID=your-google-oauth-client-id
```

4. Ensure your backend allows the dev origin (CORS) and implements the auth endpoints expected by the app.

Notes:
- `App.tsx` wraps the app with `GoogleOAuthProvider` and reads `import.meta.env.VITE_GOOGLE_CLIENT_ID`.
- Missing `VITE_GOOGLE_CLIENT_ID` will show a console warning.

## 📦 Build

To create a production build:

```bash
yarn build
```

Build files will be created in the `dist/` folder.

## 🧪 Testing

Run tests:

```bash
yarn test          # Run tests in watch mode
yarn test:ui       # Run tests with UI
yarn test:coverage # Generate coverage report
```

## 🔍 Linting

```bash
yarn lint
```

## 📦 Preview

To test the production build:

```bash
yarn preview
```

## 📘 API & Swagger

- Swagger/OpenAPI spec is available under `swagger/swagger.json`.
- Update the API base URL via `VITE_API_BASE_URL` to point to your backend.

## 🧩 Troubleshooting

- Google OAuth not working: ensure `VITE_GOOGLE_CLIENT_ID` is set and matches your OAuth credentials, and your origin is allowed in Google Cloud Console.
- CORS issues: confirm backend CORS allows your dev origin (`http://localhost:5173`).
- 404 on refresh in nested routes: ensure you run via `vite` dev server or configure your host to fallback to `index.html`.
- Styles not applied: verify `global.scss` is imported in `src/App.tsx` and `sass` is installed.

## 🤝 Contribution

1. Fork the repo and create a feature branch.
2. Commit with conventional messages.
3. Open a PR with a clear description and screenshots where relevant.

## 📄 License

This project is licensed under the MIT License. See `LICENSE` for details.


## 🎯 Recent Improvements

### ✨ Best Practices Implemented
- **Type Safety**: Full TypeScript with strict mode
- **Performance**: React.memo, useMemo, useCallback, lazy loading
- **Testing**: Vitest infrastructure with sample tests
- **Architecture**: Clean folder structure with separation of concerns
- **Error Handling**: Centralized error management
- **Code Quality**: Custom hooks, constants, services layer

### 📊 Key Features
- **Custom Hooks**: useAuth, useFinance, useDebounce, useLocalStorage, useAsync
- **Services Layer**: Token, Storage, and Analytics services
- **Type Definitions**: Centralized types in `src/types/`
- **Constants**: All magic strings replaced with constants
- **Interceptors**: Separate auth and error interceptors
- **Route Guards**: ProtectedRoute and PublicRoute components

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [

      tseslint.configs.recommendedTypeChecked,
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,

    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      reactX.configs['recommended-typescript'],
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
```
