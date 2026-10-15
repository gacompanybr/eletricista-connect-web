import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, MapPin, Menu, X, Zap, PackageCheck, Handshake, MessageCircle, Instagram, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WhatsAppButton } from '@/components/whatsapp-button';
import { company } from '@/lib/company';
import logo from '@/assets/logo-original.png.asset.json';
import facade from '@/assets/fachada.jpg.asset.json';
import electric from '@/assets/eletricos.webp';
import lighting from '@/assets/iluminacao.webp';
import tools from '@/assets/ferramentas.webp';
import plumbing from '@/assets/hidraulica.webp';
import building from '@/assets/construcao.webp';
import finishing from '@/assets/acabamentos.webp';

const title = 'Casa do Eletricista | Materiais Elétricos e Construção em Trindade-PE';
const description = 'Conheça a Casa do Eletricista em Trindade, Pernambuco. Consulte materiais elétricos e produtos para construção e reforma diretamente pelo WhatsApp.';
export const Route = createFileRoute('/')({
 head: () => ({ meta: [{ title }, { name: 'description', content: description }, { property: 'og:title', content: title }, { property: 'og:description', content: description }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }),
 component: Index,
});
const navigation = [['Início', 'inicio'], ['Sobre nós', 'sobre'], ['Produtos', 'produtos'], ['Diferenciais', 'diferenciais'], ['Contato', 'contato']];
const categories = [
 { name: 'Materiais elétricos', image: electric, description: 'Soluções para instalações elétricas, do início ao último detalhe.' },
 { name: 'Iluminação', image: lighting, description: 'Lâmpadas e luminárias para dar uma nova luz aos seus ambientes.' },
 { name: 'Ferramentas e acessórios', image: tools, description: 'Praticidade para o trabalho e para os projetos do dia a dia.' },
 { name: 'Hidráulica', image: plumbing, description: 'Tubos, conexões e soluções para instalações hidráulicas.' },
 { name: 'Materiais para construção', image: building, description: 'Itens de apoio para as diferentes etapas da sua obra.' },
 { name: 'Acabamentos e utilidades', image: finishing, description: 'Os detalhes que fazem a diferença na sua reforma.' },
];
const advantages = [
 { icon: PackageCheck, title: 'Variedade de produtos', text: 'Diferentes categorias para encontrar soluções para instalações, reformas e construção.' },
 { icon: Zap, title: 'Experiência prática', text: 'Uma história que começou com a vivência de quem entende de elétrica.' },
 { icon: Handshake, title: 'Atendimento próximo', text: 'Conte com nossa equipe para tirar dúvidas e buscar os produtos adequados.' },
 { icon: MessageCircle, title: 'Praticidade para consultar', text: 'Consulte produtos pelo WhatsApp e se informe antes de visitar a loja.' },
];
function Brand({ footer = false }: { footer?: boolean }) {
 return <a className={`brand ${footer ? 'brand-footer' : ''}`} href="#inicio" aria-label="Casa do Eletricista — início"><img src={logo.url} alt="Logo original da Casa do Eletricista" width="54" height="54" /><span>CASA DO<span>ELETRICISTA<span className="brand-dot">.</span></span></span></a>;
}
function Index() {
 const [menuOpen, setMenuOpen] = useState(false);
 const [scrolled, setScrolled] = useState(false);
 const root = useRef<HTMLDivElement>(null);
 useEffect(() => {
  const onScroll = () => setScrolled(window.scrollY > 30);
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const observer = !reduceMotion && 'IntersectionObserver' in window
    ? new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer?.unobserve(entry.target);
      }
    }), { threshold: 0.08, rootMargin: '0px 0px -20px 0px' })
    : null;
  if (observer) {
    root.current?.setAttribute('data-reveal-enabled', 'true');
    root.current?.querySelectorAll('.reveal').forEach(element => observer.observe(element));
  }
  return () => { window.removeEventListener('scroll', onScroll); observer?.disconnect(); };
 }, []);
 return <div ref={root}>
  <a className="skip-link" href="#conteudo">Ir para o conteúdo</a>
  <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}><div className="container header-inner"><Brand /><nav aria-label="Navegação principal" className="desktop-nav">{navigation.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav><WhatsAppButton className="header-contact">Fale pelo WhatsApp<ArrowUpRight /></WhatsAppButton><Button variant="ghost" size="icon" className="mobile-menu-toggle" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button></div>{menuOpen && <nav id="mobile-nav" className="mobile-nav" aria-label="Navegação móvel">{navigation.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}<ArrowUpRight /></a>)}<WhatsAppButton>Fale pelo WhatsApp</WhatsAppButton></nav>}</header>
  <main id="conteudo">
   <section className="hero" id="inicio"><img className="hero-photo" src={facade.url} alt="Fachada da Casa do Eletricista, com letreiro da loja e detalhes em laranja" width="1600" height="595" fetchPriority="high" /><div className="hero-shade" /><div className="container hero-content reveal"><div className="hero-eyebrow"><span />DA INSTALAÇÃO AO ACABAMENTO</div><h1>Tudo para sua obra,<br />do elétrico ao<br /><span>acabamento.</span></h1><p>A Casa do Eletricista reúne materiais elétricos e soluções para construção, com qualidade e atendimento próximo para tirar seus projetos do papel.</p><div className="hero-actions"><WhatsAppButton className="large-button">Fale com nossa equipe<ArrowUpRight /></WhatsAppButton><Button variant="heroOutline" className="large-button" asChild><a href="#sobre">Conheça nossa loja<ArrowRight /></a></Button></div><div className="hero-location"><MapPin />Em Trindade — Pernambuco</div></div><a href="#produtos" className="hero-scroll" aria-label="Conheça nossos produtos"><ChevronDown /></a></section>
   <div className="trust-band"><div className="container trust-inner"><span><Zap />Experiência que vem da prática</span><span><PackageCheck />Soluções para cada etapa da obra</span><span><Handshake />Atendimento de verdade</span></div></div>
   <section id="produtos" className="section products-section"><div className="container"><div className="section-heading reveal"><div><span className="eyebrow">DO SEU PROJETO À REALIZAÇÃO</span><h2>Tudo o que você precisa<br />para sua obra<span className="accent-dot">.</span></h2></div><p>Uma variedade de soluções para instalações elétricas, reformas e construção. Encontre o que procura com a ajuda da nossa equipe.</p></div><div className="product-grid">{categories.map((category) => <article className="product-card reveal" key={category.name}><div className="product-image"><img src={category.image} alt={`Imagem ilustrativa de ${category.name.toLowerCase()}`} width="512" height="512" loading="lazy" /></div><div className="product-content"><h3>{category.name}</h3><p>{category.description}</p><WhatsAppButton variant="inquiry" className="category-inquiry" message={`Olá! Gostaria de saber quais produtos de ${category.name.toLowerCase()} estão disponíveis na Casa do Eletricista.`}>Consultar produtos<ArrowUpRight /></WhatsAppButton></div></article>)}</div><p className="product-note">Consulte nossa equipe para confirmar a disponibilidade dos produtos.</p></div></section>
   <section id="sobre" className="section about-section"><div className="container about-grid"><div className="about-visual reveal"><img src={facade.url} alt="A loja Casa do Eletricista em Trindade, Pernambuco" width="1600" height="595" loading="lazy" /><div className="about-caption"><Zap /><span>De quem entende de elétrica.<br /><strong>Para quem quer construir.</strong></span></div></div><div className="about-copy reveal"><span className="eyebrow">NOSSA ESSÊNCIA</span><h2>Uma história que começou com a experiência de quem entende de elétrica<span className="accent-dot">.</span></h2><p>A Casa do Eletricista nasceu da experiência do Sr. Erinaldo, seu fundador, que começou sua trajetória profissional como eletricista. No contato direto com seus clientes, ele percebeu uma necessidade importante: reunir, em um só lugar, produtos para diferentes etapas dos projetos e das obras.</p><p>Foi assim que uma loja especializada em materiais elétricos evoluiu para um negócio com um mix mais amplo, voltado também às necessidades de construção e reforma.</p><p>Hoje, nossa história é feita de prática, proximidade e atenção às necessidades reais de quem trabalha ou constrói.</p><blockquote>“Mais do que vender materiais, queremos ajudar você a realizar seus projetos.”</blockquote></div></div></section>
   <section id="diferenciais" className="section advantages-section"><div className="container"><div className="center-heading reveal"><span className="eyebrow">CONFIANÇA EM CADA ESCOLHA</span><h2>Sua obra merece boas escolhas<span className="accent-dot">.</span></h2><p>O cuidado que seu projeto precisa, do primeiro contato ao último detalhe.</p></div><div className="advantages-grid">{advantages.map(({ icon: Icon, title: heading, text }) => <div className="advantage reveal" key={heading}><div className="advantage-icon"><Icon strokeWidth={1.5} /></div><h3>{heading}</h3><p>{text}</p></div>)}</div></div></section>
   <section className="conversion-section"><div className="container conversion-inner reveal"><div><span className="eyebrow">VAMOS CONSTRUIR JUNTOS?</span><h2>Vai começar uma obra ou precisa<br />de materiais para sua reforma?</h2><p>Converse com a Casa do Eletricista e consulte os produtos de que você precisa.</p></div><WhatsAppButton className="large-button">Chamar no WhatsApp<ArrowUpRight /></WhatsAppButton></div></section>
   <section id="contato" className="section contact-section"><div className="container contact-grid"><div className="reveal"><span className="eyebrow">PERTO DE VOCÊ</span><h2>Estamos em Trindade,<br />Pernambuco<span className="accent-dot">.</span></h2><p>{company.locationDescription}</p><div className="contact-location"><MapPin /><div><strong>Trindade, Pernambuco</strong><span>{company.address || 'Casa do Eletricista'}</span>{company.openingHours && <span>{company.openingHours}</span>}</div></div><div className="contact-actions"><WhatsAppButton className="large-button">Falar pelo WhatsApp<ArrowUpRight /></WhatsAppButton>{company.mapsUrl && <Button variant="outline" className="large-button" asChild><a href={company.mapsUrl} target="_blank" rel="noopener noreferrer">Como chegar<ArrowUpRight /></a></Button>}</div><a className="instagram-link" href={company.instagram} target="_blank" rel="noopener noreferrer"><Instagram />@casadoeletricistatrindade<ArrowUpRight /></a></div><div className="contact-photo reveal"><img src={facade.url} alt="Entrada e estacionamento da Casa do Eletricista" width="1600" height="595" loading="lazy" /><span><MapPin />Sua próxima obra começa aqui.</span></div></div></section>
  </main>
  <footer className="site-footer"><div className="container footer-main"><div><Brand footer /><p>Materiais elétricos e soluções para construção.<br />Da nossa experiência para o seu projeto.</p></div><div className="footer-navigation"><span>EXPLORE</span>{navigation.slice(1).map(([label, id]) => <a href={`#${id}`} key={id}>{label}</a>)}</div><div className="footer-contact"><span>VAMOS CONVERSAR</span><WhatsAppButton variant="heroOutline">Fale pelo WhatsApp<ArrowUpRight /></WhatsAppButton><a href={company.instagram} target="_blank" rel="noopener noreferrer"><Instagram />Instagram<ArrowUpRight /></a><p><MapPin /><span>{company.address}<br />Trindade, Pernambuco</span></p></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Casa do Eletricista. Todos os direitos reservados.</span><span>Feita de experiência. Construída com confiança.</span></div></footer>
  <WhatsAppButton variant="whatsapp" size="icon" className="floating-whatsapp" aria-label="Falar com a Casa do Eletricista pelo WhatsApp" title="Falar pelo WhatsApp" />
 </div>;
}
