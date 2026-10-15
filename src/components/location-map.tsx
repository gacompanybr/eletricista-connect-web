import { useEffect, useState } from 'react';
import { MapPin, Maximize2, ArrowUpRight, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { company, mapEmbedUrl } from '@/lib/company';

export function LocationMap() {
  const [interactive, setInteractive] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'unavailable'>('idle');
  const src = mapEmbedUrl();

  useEffect(() => {
    if (status !== 'loading') return;
    const timer = window.setTimeout(() => setStatus('unavailable'), 12000);
    return () => window.clearTimeout(timer);
  }, [status]);

  function activateMap() {
    const hostname = window.location.hostname;
    if (!src || hostname === 'localhost' || hostname === '127.0.0.1' || hostname.includes('-devserver-')) {
      setStatus('unavailable');
      return;
    }
    setInteractive(true);
    setStatus('loading');
  }

  return (
    <div className="contact-map">
      <div className="contact-map-frame">
        {src && interactive && status !== 'unavailable' && (
            <iframe
              title={`Mapa da localização da ${company.name} em Trindade, Pernambuco`}
              src={src}
              width="600"
              height="300"
              referrerPolicy="strict-origin-when-cross-origin"
              onLoad={() => setStatus('ready')}
              onError={() => setStatus('unavailable')}
              tabIndex={status === 'ready' ? 0 : -1}
              allowFullScreen
            />
        )}
        {status !== 'ready' && (
          <div className="map-placeholder" aria-live="polite">
            <MapPin />
            <strong>{company.address}</strong>
            <span>Trindade, Pernambuco</span>
            {status === 'idle' && <Button variant="outline" onClick={activateMap} aria-label="Ativar mapa interativo da localização"><Maximize2 />Explorar mapa</Button>}
            {status === 'loading' && <span className="map-loading"><LoaderCircle />Carregando mapa…</span>}
            {status === 'unavailable' && <><span>O mapa não está disponível nesta visualização.</span><Button variant="outline" asChild><a href={company.mapsUrl} target="_blank" rel="noopener noreferrer">Abrir no Google Maps<ArrowUpRight /></a></Button></>}
          </div>
        )}
      </div>
      <a className="contact-map-bar" href={company.mapsUrl} target="_blank" rel="noopener noreferrer"><MapPin /><span>{company.address} · Trindade — PE</span><ArrowUpRight /></a>
    </div>
  );
}
