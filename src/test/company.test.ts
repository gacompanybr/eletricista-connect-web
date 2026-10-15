import { afterEach, describe, expect, it } from 'vitest';
import { company, whatsappUrl } from '@/lib/company';

const originalNumber = company.whatsappNumber;
afterEach(() => { company.whatsappNumber = originalNumber; });
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