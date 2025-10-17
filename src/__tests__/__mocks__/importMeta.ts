Object.defineProperty(globalThis, 'import', {
  value: {
    meta: {
      env: {
        VITE_API_BASE_URL: 'https://case.nodelabs.dev/api',
        VITE_GOOGLE_CLIENT_ID: 'test-google-client-id',
      },
    },
  },
  writable: true,
  configurable: true,
})

export {}

