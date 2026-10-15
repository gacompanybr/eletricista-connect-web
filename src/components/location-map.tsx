import { useState } from 'react';
import { MapPin, Maximize2 } from 'lucide-react';
import { company, mapEmbedUrl } from '@/lib/company';

export function LocationMap() {
  const [interactive, setInteractive] = useState(false);
  const src = mapEmbedUrl();

  return (
    <div className="contact-map reveal">
      <div className="contact-map-frame">
        {src ? (
          <>
            <iframe
              title={`Mapa da localização da ${company.name} em Trindade, Pernambuco`}
              src={src}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              tabIndex={interactive ? 0 : -1}
              allowFullScreen
            />
            {!interactive && (
              <button type="button" className="map-activate" onClick={() => setInteractive(true)} aria-label="Ativar mapa interativo da localização">
                <span><Maximize2 />Explorar mapa</span>
              </button>
            )}
          </>
        ) : (
          <div className="map-placeholder">
            <MapPin />
            <span>{company.address}<br />Trindade, Pernambuco</span>
          </div>
        )}
      </div>
      <div className="contact-map-bar"><MapPin /><span>{company.address} · Trindade — PE</span></div>
    </div>
  );
}
