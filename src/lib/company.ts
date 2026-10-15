export const company = {
  name: 'Casa do Eletricista',
  whatsappNumber: '5587981607727',
  address: 'Rua Guadalajara, 133, Centro',
  locationDescription: 'A Casa do Eletricista e Energia Solar em Trindade (Pernambuco) está localizada na Rua Guadalajara, 133, Centro.',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Rua%20Guadalajara%2C%20133%2C%20Centro%2C%20Trindade%2C%20Pernambuco',
  openingHours: '',
  instagram: 'https://www.instagram.com/casadoeletricistatrindade/',
  // Posição conferida pelo Geocoding do Google Maps a partir do endereço oficial informado pela loja.
  coordinates: { lat: -7.7605916, lng: -40.2664859 },
  placeId: 'ChIJ97-Yw_-WnwcRwPxoB4brRkc',
  formattedAddress: 'R. Guadalajara, 133 - Centro, Trindade - PE, 56250-000',
};

export function whatsappUrl(message = 'Olá! Gostaria de conhecer os produtos da Casa do Eletricista.') {
  if (!/^55\d{10,11}$/.test(company.whatsappNumber)) return null;
  return `https://wa.me/${company.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function browserKey() {
  return (import.meta.env as Record<string, string | undefined>)['VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY'];
}

// Mapa compacto da localização (Maps Embed API). Retorna null quando a chave do navegador
// ainda não está configurada, para que a página mostre um aviso honesto em vez de um mapa vazio.
export function mapEmbedUrl() {
  const key = browserKey();
  if (!key || !company.placeId) return null;
  return `https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(key)}&q=place_id:${encodeURIComponent(company.placeId)}&zoom=17&maptype=roadmap`;
}
