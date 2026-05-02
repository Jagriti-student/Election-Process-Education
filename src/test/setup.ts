import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock Vite environment variables for tests
vi.stubGlobal('import.meta', {
  env: {
    VITE_GEMINI_API_KEY: 'test-api-key',
    VITE_GOOGLE_MAPS_API_KEY: 'test-maps-key',
  },
});
