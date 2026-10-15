import { fireEvent, render, screen, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { LocationMap } from '@/components/location-map';

afterEach(() => { cleanup(); vi.unstubAllEnvs(); });

describe('Location map visibility', () => {
  it('always displays the confirmed address before requesting a map', () => {
    vi.stubEnv('VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY', 'test-browser-key');
    const { container } = render(<LocationMap />);
    expect(screen.getByText('Rua Guadalajara, 133, Centro')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Ativar mapa interativo da localização' })).toBeTruthy();
    expect(container.querySelector('iframe')).toBeNull();
    expect(container.firstElementChild?.classList.contains('reveal')).toBe(false);
  });

  it('offers a working external link when the embed cannot be shown', () => {
    vi.stubEnv('VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY', '');
    const { container } = render(<LocationMap />);
    fireEvent.click(screen.getByRole('button', { name: 'Ativar mapa interativo da localização' }));
    expect(screen.getByText('O mapa não está disponível nesta visualização.')).toBeTruthy();
    const link = screen.getByRole('link', { name: 'Abrir no Google Maps' });
    expect(link.getAttribute('href')).toContain('Guadalajara');
    expect(container.querySelector('iframe')).toBeNull();
  });
});