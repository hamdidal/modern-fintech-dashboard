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
cp .env
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

## 🎯 Path Aliases

The project uses TypeScript path aliases for cleaner and more readable import statements. This allows you to use short, meaningful imports instead of long relative paths.

### Defined Aliases

| Alias | Path | Usage |
|-------|------|-------|
| `@api` | `src/api` | API client and services |
| `@components` | `src/components` | React components |
| `@pages` | `src/pages` | Page components |
| `@store` | `src/store` | Zustand stores |
| `@utils` | `src/utils` | Utility functions |
| `@hooks` | `src/hooks` | Custom React hooks |
| `@assets` | `src/assets` | Images and static files |
| `@types` | `src/types` | TypeScript type definitions |
| `@constants` | `src/constants` | Application constants |
| `@services` | `src/services` | Business logic services |
| `@config` | `src/config` | Configuration files |
| `@layouts` | `src/layouts` | Layout components |
| `@routes` | `src/routes` | Route configuration |
| `@i18n` | `src/i18n` | i18next language files |
| `@styles` | `src/styles` | SCSS module files |

### Example Usage

```typescript
import { useAuth } from '@hooks/useAuth'
import { API_ENDPOINTS } from '@constants'
```

### Configuration

Path aliases are configured for both Vite and Jest:
- **Vite**: `vite.config.ts` → `resolve.alias`
- **Jest**: `jest.config.ts` → `moduleNameMapper`
- **TypeScript**: `tsconfig.json` → `paths`

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

## 💱 Currency System (currency.js)

The project includes a powerful currency system powered by **currency.js** library, offering real-time exchange rate conversion and formatting features.

### Features

#### 1. **Real-Time Exchange Rates**
```typescript
const { exchangeRates, isLoading } = useCurrency()
```


#### 2. **Currency Conversion**
```typescript
const { convert, convertAndFormat } = useCurrency()

const amount = convert(100, 'USD')

const formatted = convertAndFormat(100, 'USD')
```


#### 3. **Symbol Mapping**
```typescript
'$' → 'USD'
'₺' → 'TRY'
'USD' → 'USD'
'TRY' → 'TRY'
```

#### 4. **Formatting Only**
```typescript
const { formatOnly } = useCurrency()

formatOnly(1500, 'TRY') 
formatOnly(1500, 'USD')
```

### Usage Examples

#### Using in Components
```typescript
import { useCurrency } from '@hooks/useCurrency'

function PriceDisplay({ amount, currency }) {
  const { convertAndFormat } = useCurrency()
  
  return (
    <div>
      {convertAndFormat(amount, currency)}
    </div>
  )
}
```

#### Store Integration
```typescript
import { useCurrencyStore } from '@store/currency.store'

const { currency, setCurrency } = useCurrencyStore()

setCurrency('TRY')
```

#### React Query Caching
```typescript
queryKey: [QUERY_KEYS.EXCHANGE_RATES],
staleTime: 1000 * 60 * 60,
gcTime: 1000 * 60 * 60 * 24,
```

### API Endpoint
```typescript
GET /api/exchange/rates

Response: {
  data: {
    USDTRY: 34.5,
    TRYUSD: 0.029
  }
}
```

### Benefits
- ✅ **Automatic Conversion**: All amounts converted based on user preference
- ✅ **Consistent Formatting**: Currency format is consistent everywhere
- ✅ **Performance**: Caching with React Query
- ✅ **Type Safety**: Full type safety with TypeScript
- ✅ **Persistent**: Stored in localStorage with Zustand persist

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

- Swagger spec is available under `swagger/swagger.json`.
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

## 🏗️ Architecture Decisions

This section explains the reasoning behind the technology choices used in this project.

### 1. **State Management: Zustand**
**Why Zustand?**
- ✅ **Simplicity**: Much less boilerplate than Redux
- ✅ **TypeScript Support**: First-class TypeScript support
- ✅ **Persist Middleware**: localStorage integration out-of-the-box
- ✅ **Bundle Size**: ~10x smaller than Redux (1KB vs 10KB)
- ✅ **DevTools**: Compatible with Redux DevTools

```typescript
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: undefined,
      user: undefined,
      setAuth: ({ token, user }) => set({ token, user }),
      clear: () => set({ token: undefined, user: undefined }),
    }),
    { name: STORAGE_KEYS.AUTH_TOKEN }
  )
)
```

### 2. **Data Fetching: TanStack Query (React Query)**
**Why React Query?**
- ✅ **Cache Management**: Automatic cache invalidation and refresh
- ✅ **Background Refetching**: Updates stale data in the background
- ✅ **Optimistic Updates**: Optimizes UI for fast response
- ✅ **Request Deduplication**: Merges duplicate requests
- ✅ **Loading/Error States**: Built-in state management

```typescript
const queryConfig = {
  staleTime: 5 * 60 * 1000,
  gcTime: 10 * 60 * 1000,
  refetchOnWindowFocus: false,
  retry: 1,
}
```

### 3. **Styling: SCSS Modules**
**Why SCSS Modules?**
- ✅ **Scoped Styles**: No CSS class collision
- ✅ **Variables & Mixins**: Full power of SCSS
- ✅ **Type Safety**: TypeScript integration (`scss.d.ts`)
- ✅ **Performance**: Faster than CSS-in-JS
- ✅ **Bundle Size**: No runtime overhead

```typescript
import styles from './auth.module.scss'

<div className={styles.container}>
  <h1 className={styles.title}>Welcome</h1>
</div>
```

### 4. **Form Management: React Hook Form + Zod**
**Why React Hook Form?**
- ✅ **Performance**: Uncontrolled components, minimal re-renders
- ✅ **Bundle Size**: 3x smaller than Formik
- ✅ **TypeScript**: Full type inference
- ✅ **Validation**: Schema-based validation with Zod

**Why Zod?**
- ✅ **Type Inference**: Automatic TypeScript types from schema
- ✅ **Runtime Validation**: Type-safe runtime checks
- ✅ **Composable**: Reusable schemas

```typescript
const signUpSchema = z.object({
  fullName: z.string().min(2).max(100),
  email: z.string().email().min(5).max(100),
  password: z.string()
    .min(8)
    .regex(PASSWORD_REGEX.UPPERCASE)
    .regex(PASSWORD_REGEX.LOWERCASE)
    .regex(PASSWORD_REGEX.NUMBER),
})
```

### 5. **Testing: Jest + Testing Library**
**Why Jest?**
- ✅ **Industry Standard**: Most widely used test framework
- ✅ **SWC Transform**: Fast TypeScript compilation
- ✅ **Snapshot Testing**: Component regression testing
- ✅ **Coverage Reports**: Built-in coverage tools

**Why React Testing Library?**
- ✅ **User-Centric**: Test from user perspective
- ✅ **Best Practices**: Tests behavior instead of implementation details
- ✅ **Accessibility**: Test with aria-* attributes

### 6. **Build Tool: Vite**
**Why Vite?**
- ✅ **Speed**: ~10x faster HMR than CRA
- ✅ **Modern**: Uses native ESM
- ✅ **Plugin Ecosystem**: Rich plugin support
- ✅ **Production Build**: Optimized bundle with Rollup

### 7. **HTTP Client: Axios**
**Why Axios?**
- ✅ **Interceptors**: Request/Response interceptor support
- ✅ **TypeScript**: Generic type support
- ✅ **Browser Support**: Works even in older browsers
- ✅ **Cancellation**: Built-in request cancellation

```typescript
const onRequest = (config: InternalAxiosRequestConfig) => {
  const token = tokenService.getToken()
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}
```

### 8. **Routing: React Router v6**
**Why React Router v6?**
- ✅ **Data APIs**: Loader and action patterns
- ✅ **Nested Routes**: Layout composition
- ✅ **Code Splitting**: Route-based splitting with lazy loading
- ✅ **Type Safety**: RouteObject type support

### 9. **i18n: react-i18next**
**Why react-i18next?**
- ✅ **Industry Standard**: Most popular i18n solution
- ✅ **Hook-Based**: Modern React patterns
- ✅ **Lazy Loading**: Language files can be lazy loaded
- ✅ **Pluralization**: Plural form support

### 10. **Path Aliases**
**Why Path Aliases?**
- ✅ **Readability**: `@utils` instead of `../../../utils`
- ✅ **Refactoring**: Import paths don't break when moving files
- ✅ **Consistency**: Same import style throughout project

### Trade-offs and Decisions

| Decision | Alternative | Why This? |
|----------|-------------|-----------|
| Zustand | Redux/Recoil | Simplicity and bundle size |
| React Query | SWR/Apollo | Feature richness and ecosystem |
| SCSS Modules | Tailwind/CSS-in-JS | Type safety and zero runtime |
| Jest | Vitest | Ecosystem maturity (Vitest is also a good alternative) |
| Axios | Fetch API | Interceptor support and error handling |
| React Hook Form | Formik | Performance and bundle size |
| Zod | Yup | Type inference and composability |

## 🧩 Component Documentation

Detailed documentation of the main components used in the project.

### Core Components

#### 1. **MetricCard**
Card component for displaying financial metrics.

```typescript
interface MetricCardProps {
  type: 'balance' | 'expense' | 'savings'
  label: string
  value: number
  currency: string
  change?: ChangeMetric
  isSelected?: boolean
  onClick?: () => void
}
```

**Features:**
- ✅ **Memoized**: Optimized with `React.memo`
- ✅ **Currency Conversion**: Automatic currency conversion
- ✅ **Icon Variants**: Dynamic icon based on type
- ✅ **Accessible**: `role="button"`, `tabIndex`, `aria-live` attributes

**Usage:**
```typescript
<MetricCard
  type="balance"
  label={t('app.totalBalance')}
  value={1500}
  currency="USD"
  isSelected={true}
/>
```

#### 2. **MoneyChart**
Income/expense chart component using Recharts.

```typescript
interface MoneyChartProps {
  data: WorkingCapital["data"]
  currency: string
  timePeriod: string
  onTimePeriodChange: (period: string) => void
}
```

**Features:**
- ✅ **ComposedChart**: Bar + Area chart combination
- ✅ **Interactive**: Hover effects and custom tooltip
- ✅ **Responsive**: Adaptive sizing with ResponsiveContainer
- ✅ **Gradient Background**: Gradient bar display on hover
- ✅ **Time Period Filter**: 7 days / 30 days / 1 year selection

**Usage:**
```typescript
<MoneyChart
  data={workingCapitalData}
  currency="USD"
  timePeriod="7days"
  onTimePeriodChange={setPeriod}
/>
```

#### 3. **WalletCard**
Card component for displaying credit card information.

```typescript
interface WalletCardProps {
  wallet: Wallet
}

interface Wallet {
  cards: Array<{
    bank: string
    cardNumber: string
    expiryMonth: string
    expiryYear: string
    network: 'Visa' | 'Mastercard'
  }>
}
```

**Features:**
- ✅ **Card Masking**: First card full, others masked
- ✅ **SVG Icons**: CardChip and WifiSymbol components
- ✅ **Brand Icons**: Visa/Mastercard logos
- ✅ **Overlay Effect**: Blur overlay for second card

**Usage:**
```typescript
<WalletCard wallet={walletData} />
```

#### 4. **RecentTransaction**
Table component for listing recent transactions.

```typescript
interface RecentTransactionProps {
  recentTransactions: RecentTransactions
}
```

**Features:**
- ✅ **Modal View**: Modal showing all transactions
- ✅ **Responsive Table**: Mobile-friendly table
- ✅ **Currency Conversion**: Automatic currency conversion
- ✅ **Date Formatting**: Date formatting utility usage
- ✅ **Transaction Icons**: Custom icon for each transaction

**Usage:**
```typescript
<RecentTransaction recentTransactions={transactionsData} />
```

#### 5. **Sidebar**
Navigation sidebar component.

```typescript
interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  isTablet: boolean
}
```

**Features:**
- ✅ **Responsive**: Drawer mode for mobile/tablet
- ✅ **Active State**: Active menu with router location
- ✅ **Disabled Items**: Future pages are disabled
- ✅ **Logout**: Integration with auth store

**Usage:**
```typescript
<Sidebar
  isOpen={isSidebarOpen}
  onClose={() => setIsSidebarOpen(false)}
  isTablet={isTablet}
/>
```

#### 6. **Header**
Dashboard header component.

**Features:**
- ✅ **Search**: Search input (placeholder)
- ✅ **Notifications**: Notification icon
- ✅ **Currency Switcher**: TRY ↔ USD switching
- ✅ **Profile Menu**: User profile dropdown
- ✅ **Mobile Menu**: Hamburger menu (tablet/mobile)

#### 7. **AuthForm**
Sign in/sign up form component.

**Features:**
- ✅ **React Hook Form**: Form state management
- ✅ **Zod Validation**: Schema-based validation
- ✅ **Google OAuth**: Google sign-in button
- ✅ **Loading States**: Loading display during submit
- ✅ **Error Handling**: Form and API errors

#### 8. **FormField**
Reusable form input component.

```typescript
interface FormFieldProps {
  name: string
  label: string
  type?: 'text' | 'email' | 'password'
  register: UseFormRegister<any>
  error?: FieldError
  placeholder?: string
}
```

**Usage:**
```typescript
<FormField
  name="email"
  label="Email"
  type="email"
  register={register}
  error={errors.email}
  placeholder="your@email.com"
/>
```

### Layout Components

#### **DashboardLayout**
Main layout wrapper for dashboard.

```typescript
interface DashboardLayoutProps {
  children: React.ReactNode
}
```

**Features:**
- ✅ **Sidebar Integration**: Sidebar + main content layout
- ✅ **Header Integration**: Header component
- ✅ **Responsive**: Mobile/tablet/desktop layout

### Utility Components

#### **Spinner**
Loading spinner component.

```typescript
<Spinner />
```

#### **Skeleton**
Skeleton loading component.

```typescript
<Skeleton count={3} height={60} />
```

#### **ErrorBoundary**
React error boundary component.

**Features:**
- ✅ **Error Catching**: Catches errors in component tree
- ✅ **Fallback UI**: User-friendly error screen
- ✅ **Error Logging**: Detailed error log to console

### SVG Components

Custom SVG icons defined as components:

- **CardChip**: Credit card chip icon
- **WalletMinus**: Expense icon
- **WalletPlus**: Income icon
- **WifiSymbol**: Contactless payment icon

```typescript
<CardChip index={0} />
<WalletMinus color="#C8EE44" />
<WalletPlus color="#363A3F" />
<WifiSymbol index={1} />
```

### Component Best Practices

Component best practices implemented in the project:

1. **Memoization**: `React.memo`, `useMemo`, `useCallback` for performance
2. **Type Safety**: Strict TypeScript interface for every component
3. **Accessibility**: ARIA attributes and keyboard navigation
4. **Responsive**: Mobile-first approach
5. **Reusability**: Reusable components with generic props
6. **Error Handling**: Safe component tree with ErrorBoundary
7. **Loading States**: UX improvement with Skeleton and Spinner
8. **Code Splitting**: Performance optimization with lazy loading

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
