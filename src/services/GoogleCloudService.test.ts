import { describe, it, expect, vi } from 'vitest';
import {
  googleLogger,
  getGoogleMapsConfig,
  simulateCloudStorageSync,
  logSecurityAuditEvent,
  trackAnalyticsEvent,
} from '../services/GoogleCloudService';
import '@testing-library/jest-dom';

describe('GoogleCloudService', () => {
  describe('googleLogger', () => {
    it('logs INFO messages as structured JSON', () => {
      const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
      googleLogger.info('Test info message', { key: 'value' });

      expect(spy).toHaveBeenCalledOnce();
      const logEntry = JSON.parse(spy.mock.calls[0][0] as string);
      expect(logEntry.severity).toBe('INFO');
      expect(logEntry.message).toBe('Test info message');
      expect(logEntry.serviceContext.service).toBe('election-assistant-app');
      expect(logEntry.context).toMatchObject({ key: 'value' });
      spy.mockRestore();
    });

    it('logs WARNING messages correctly', () => {
      const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
      googleLogger.warn('Test warning');
      const logEntry = JSON.parse(spy.mock.calls[0][0] as string);
      expect(logEntry.severity).toBe('WARNING');
      spy.mockRestore();
    });

    it('logs ERROR messages correctly', () => {
      const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
      googleLogger.error('Test error', { error: 'some error' });
      const logEntry = JSON.parse(spy.mock.calls[0][0] as string);
      expect(logEntry.severity).toBe('ERROR');
      spy.mockRestore();
    });

    it('includes ISO timestamp in every log', () => {
      const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
      googleLogger.debug('Debug message');
      const logEntry = JSON.parse(spy.mock.calls[0][0] as string);
      expect(logEntry.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T/);
      spy.mockRestore();
    });
  });

  describe('getGoogleMapsConfig', () => {
    it('returns isAvailable: false when key is placeholder', () => {
      const config = getGoogleMapsConfig();
      // In test env, key is 'YOUR_API_KEY' or undefined, so isAvailable should be false
      expect(config.isAvailable).toBe(false);
    });

    it('returns correct baseUrl', () => {
      const config = getGoogleMapsConfig();
      expect(config.baseUrl).toBe('https://www.google.com/maps/embed/v1/search');
    });

    it('returns correct default query', () => {
      const config = getGoogleMapsConfig();
      expect(config.defaultQuery).toBe('polling station near me');
    });
  });

  describe('simulateCloudStorageSync', () => {
    it('returns a payload with the correct key and data', async () => {
      const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
      const data = { userId: '123', progress: 50 };
      const result = await simulateCloudStorageSync('civicProfile', data);

      expect(result.key).toBe('civicProfile');
      expect(result.data).toEqual(data);
      expect(result.syncedAt).toBeDefined();
      spy.mockRestore();
    });

    it('logs sync events to Google Cloud', async () => {
      const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
      await simulateCloudStorageSync('testKey', { val: 1 });

      const firstLog = JSON.parse(spy.mock.calls[0][0] as string);
      expect(firstLog.message).toContain('Initiating Google Cloud Storage sync');
      spy.mockRestore();
    });
  });

  describe('logSecurityAuditEvent', () => {
    it('returns a correctly structured audit event', () => {
      const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
      const event = logSecurityAuditEvent('LOGIN', 'user@example.com', { method: 'OAuth2' });

      expect(event.eventType).toBe('LOGIN');
      expect(event.userId).toBe('user@example.com');
      expect(event.details).toMatchObject({ method: 'OAuth2' });
      spy.mockRestore();
    });

    it('logs with CRITICAL severity', () => {
      const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
      logSecurityAuditEvent('PROFILE_RESET', 'anonymous');
      const logEntry = JSON.parse(spy.mock.calls[0][0] as string);
      expect(logEntry.severity).toBe('CRITICAL');
      spy.mockRestore();
    });
  });

  describe('trackAnalyticsEvent', () => {
    it('logs GA4 events as INFO entries', () => {
      const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
      trackAnalyticsEvent('quiz_start', { topic: 'registration' });

      const logEntry = JSON.parse(spy.mock.calls[0][0] as string);
      expect(logEntry.severity).toBe('INFO');
      expect(logEntry.message).toContain('[GA4 Analytics]');
      expect(logEntry.message).toContain('quiz_start');
      spy.mockRestore();
    });
  });
});
