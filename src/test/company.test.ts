import { afterEach, describe, expect, it, vi } from 'vitest';
import { company, mapEmbedUrl, whatsappUrl } from '@/lib/company';

const originalNumber = company.whatsappNumber;
afterEach(() => { company.whatsappNumber = originalNumber; vi.unstubAllEnvs(); });
describe('Business WhatsApp configuration', () => {
  it('never creates a link without a confirmed number', () => {
    company.whatsappNumber = '';
    expect(whatsappUrl()).toBeNull();
  });
  it('rejects formatted and non-Brazilian numbers', () => {
    for (const number of ['+55 (87) 12345-6789', '123', '441234567890']) {
      company.whatsappNumber = number;
      expect(whatsappUrl()).toBeNull();
    }
  });
  it('encodes the inquiry text using the configured number', () => {
    company.whatsappNumber = '5587123456789';
    const message = 'Olá! Quero consultar iluminação & acessórios.';
    const link = whatsappUrl(message);
    expect(link).toBe(`https://wa.me/${company.whatsappNumber}?text=${encodeURIComponent(message)}`);
  });
});
describe('Location map', () => {
  it('builds the embed link for the confirmed address when the browser key exists', () => {
    vi.stubEnv('VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY', 'test-browser-key');
    const url = mapEmbedUrl();
    expect(url).toContain('google.com/maps/embed/v1/place');
    expect(url).toContain(`place_id:${company.placeId}`);
    expect(url).toContain('key=test-browser-key');
  });
  it('shows the honest placeholder instead of a broken map without the key', () => {
    vi.stubEnv('VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY', '');
    expect(mapEmbedUrl()).toBeNull();
  });
});
