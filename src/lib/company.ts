export const company = {
  name: 'Casa do Eletricista',
  whatsappNumber: '5587981607727',
  address: 'Rua Guadalajara, 133, Centro',
  locationDescription: 'A Casa do Eletricista e Energia Solar em Trindade (Pernambuco) está localizada na Rua Guadalajara, 133, Centro.',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Rua%20Guadalajara%2C%20133%2C%20Centro%2C%20Trindade%2C%20Pernambuco',
  openingHours: '',
  instagram: 'https://www.instagram.com/casadoeletricistatrindade/',
};
export function whatsappUrl(message = 'Olá! Gostaria de conhecer os produtos da Casa do Eletricista.') {
  if (!/^55\d{10,11}$/.test(company.whatsappNumber)) return null;
  return `https://wa.me/${company.whatsappNumber}?text=${encodeURIComponent(message)}`;
}