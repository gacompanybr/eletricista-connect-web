export const company = {
  name: 'Casa do Eletricista',
  whatsappNumber: '', // Official number: 55 + area code + number, digits only.
  address: '',
  mapsUrl: '',
  openingHours: '',
  instagram: 'https://www.instagram.com/casadoeletricistatrindade/',
};
export function whatsappUrl(message = 'Olá! Gostaria de conhecer os produtos da Casa do Eletricista.') {
  if (!/^55\d{10,11}$/.test(company.whatsappNumber)) return null;
  return `https://wa.me/${company.whatsappNumber}?text=${encodeURIComponent(message)}`;
}