import { useState } from 'react';
import { MessageCircle, Instagram } from 'lucide-react';
import { Button, type ButtonProps } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { company, whatsappUrl } from '@/lib/company';

export function WhatsAppButton({ children, message, className, variant = 'default', ...props }: ButtonProps & { message?: string }) {
  const [open, setOpen] = useState(false);
  const href = whatsappUrl(message);
  if (href) return <Button variant={variant} className={className} asChild {...props}><a href={href} target="_blank" rel="noopener noreferrer"><MessageCircle aria-hidden="true" />{children}</a></Button>;
  return <><Button variant={variant} className={className} onClick={() => setOpen(true)} {...props}><MessageCircle aria-hidden="true" />{children}</Button><Dialog open={open} onOpenChange={setOpen}><DialogContent><DialogHeader><DialogTitle>Converse com a Casa do Eletricista</DialogTitle><DialogDescription>O contato pelo WhatsApp estará disponível em breve. Enquanto isso, fale com a gente pelo Instagram oficial.</DialogDescription></DialogHeader><Button asChild><a href={company.instagram} target="_blank" rel="noopener noreferrer"><Instagram />Falar pelo Instagram</a></Button></DialogContent></Dialog></>;
}