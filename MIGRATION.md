# MIGRATION.md — Diagnóstico de migração (Casa do Eletricista)

Gerado em 2026-10-28. Este documento descreve o que o projeto usa hoje e o que precisa ser substituído ou configurado ao migrar para outro servidor. Nenhum dado sensível está incluído (exceto o que está listado na seção "Valores" no final).

## 1. Tipo de projeto e stack

- **Tipo:** Landing page institucional estática/SSR (um único índice de rolagem, navegação por âncoras). **Não há banco de dados, autenticação nem conteúdo dinâmico.**
- **Framework:** TanStack Start v1 (React 19 + TanStack Router) com build Vite 8 e Nitro.
- **Linguagem:** TypeScript 5.8.
- **Estilo:** Tailwind CSS v4 (via `@tailwindcss/vite`), tokens semânticos em `src/styles.css`.
- **Node:** v22.23.4 no ambiente atual (qualquer Node 22 recente deve funcionar).
- **Gerenciador de pacotes:** Bun 1.4.4 (lockfile `bun.lock` presente; não há package-lock/yarn.lock/pnpm-lock).
- **Runtime alvo do build:** Worker de borda (Cloudflare Workers) — o Nitro está configurado com target `cloudflare` pelo plugin `@lovable.dev/vite-tanstack-config`. Em outro servidor, avalie trocar o target para Node/serverless ou hospedar o build atual em um runtime compatível com Workers.

## 2. Comandos

```bash
bun install          # instalar dependências
bun run dev          # servidor de desenvolvimento (Vite dev)
bun run build        # build de produção (Vite + Nitro)
bun run preview      # pré-visualizar o build
bun run test         # testes (Vitest + Testing Library)
bun run lint         # ESLint
bun run format       # Prettier
```

Testes existentes: `src/test/company.test.ts`, `src/test/app-routing.test.tsx`, `src/test/location-map.test.tsx` (setup em `src/test/setup.ts`, config em `vitest.config.ts`).

## 3. Banco de dados

**Sem banco.** O projeto não usa Lovable Cloud nem Supabase: não há diretório `supabase/`, migrações, cliente `@supabase/*` nas dependências nem chamadas de banco no código. Todo o conteúdo é estático (definido em `src/routes/index.tsx` e `src/lib/company.ts`).

## 4. Auth

**Nenhuma.** Não há login, sessão, usuários nem proteção de rotas. Contagem de usuários: não se aplica.

## 5. Storage

**Nenhum bucket.** Todas as imagens são arquivos locais em `src/assets/` e `public/` (logo, fachadas e fotos de categorias), empacotadas no build. Sem armazenamento externo de arquivos.

## 6. Edge Functions

**Nenhuma.** Não há rotas de API (`src/routes/api/*`), server functions (`createServerFn`) nem funções de borda do Supabase. O único código "server-side" é o wrapper de SSR em `src/server.ts` (tratamento de erros do render no servidor) e o middleware em `src/start.ts` (error + CSRF, ambos do próprio TanStack Start).

## 7. Secrets (apenas nomes)

Gerenciados pela plataforma Lovable; nenhum é lido diretamente pelo código do app:

- `GOOGLE_MAPS_API_KEY` — conector Google Maps (servidor/gateway)
- `GOOGLE_MAPS_BROWSER_KEY` — conector Google Maps (chave de navegador)
- `GOOGLE_MAPS_TRACKING_ID` — conector Google Maps (ID de tracking)
- `LOVABLE_API_KEY` — plataforma Lovable (gerenciada; não usada pelo código do app)
- `LOVABLE_CRON_SECRET` — plataforma Lovable (gerenciada; não usada pelo código do app)

**Observação:** `LOVABLE_API_KEY` e `LOVABLE_CRON_SECRET` existem na plataforma, mas não há chamadas ao gateway de IA nem crons no código — podem ser descartados na migração. A chave usada pelo app (Maps Embed) entra via variável `VITE_*`, listada abaixo.

## 8. Integrações externas

- **Google Maps (Maps Embed API):** mapa da seção de contato, via conector Google Maps da Lovable. Usa `place_id` confirmado e a chave de navegador injetada como `VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY` (arquivo `.env`). A chave do conector só autoriza os domínios da Lovable — fora da plataforma, é preciso usar uma chave própria com os domínios do novo servidor liberados.
- **WhatsApp:** links `wa.me` para o número oficial, centralizados em `src/lib/company.ts` (`whatsappNumber: 5587981607727`). Não é API — apenas links.
- **Instagram:** link externo para o perfil oficial. Não é API.
- **Pagamentos / e-mail / IA:** nenhuma integração. O app **não usa** o gateway de IA da Lovable.

## 9. Variáveis de ambiente (apenas nomes)

Definidas no arquivo `.env` e injetadas pela plataforma Lovable:

- `VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY` — usada em `src/lib/company.ts` para montar a URL do Maps Embed
- `VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_TRACKING_ID` — injetada pelo conector Google Maps; **não é lida pelo código do app**

Nenhuma outra variável (`process.env.*`) é usada no código.

## 10. Tipo de backend e Project ID

- **Backend:** nenhum (nem Lovable Cloud, nem Supabase conectado). Site puramente front-end.
- **Project ID Lovable:** `b126ccf7-07bb-4cda-bce6-cf7cf2a6ddc8`
- **URLs atuais:** preview `https://id-preview--b126ccf7-07bb-4cda-bce6-cf7cf2a6ddc8.lovable.app` · publicado `https://eletricista-connect-web.lovable.app` · domínio próprio `https://casadoeletricista.online` (e `www.`). O domínio próprio é gerenciado pelo painel da Lovable — em outro servidor, aponte o DNS manualmente.

## 11. Dependências da plataforma Lovable (o que quebra fora dela)

1. **`@lovable.dev/vite-tanstack-config`** (devDependency, `vite.config.ts`) — plugin privado do Lovable que monta a config completa do Vite (plugins TanStack/React/Tailwind, alias `@`, target Cloudflare do Nitro, injeção de env). Fora da Lovable, instale-o de um registry acessível ou **substitua o `vite.config.ts` por uma config equivalente manual** (tanstackStart + viteReact + tailwindcss + tsconfigPaths + nitro com target Node/Workers).
2. **Ponteiros de asset `.asset.json`** (`src/assets/*.asset.json`) — o logo e as duas fotos de fachada não são arquivos de imagem; são ponteiros para o serviço de assets da Lovable, resolvidos pelo plugin acima (`import logo from '...asset.json'` → `.url`). Em outro servidor, **baixe as imagens reais** para `src/assets/` e troque os imports (ex.: `import logo from '@/assets/logo.png'`).
3. **Chave do Maps Embed** — `VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY` é emitida pelo conector e restringida aos domínios da Lovable (o embed não carrega fora deles). No novo servidor, crie uma chave Google Maps própria com a URL do novo domínio habilitada e troque o valor do `.env`.
4. **`src/lib/lovable-error-reporting.ts`** — envia erros de runtime ao telemetria/observabilidade da Lovable. Fora da plataforma, o endpoint não existe; remova a chamada ou troque por Sentry/Logtail/etc.
5. **Preview/domínio/publish** — publicação, badge e gestão do domínio `casadoeletricista.online` são feitos pelo painel da Lovable. Migram manualmente.
6. **Segredos gerenciados pelo conector** (seção 7) — são criados automaticamente pela integração Google Maps da Lovable; não existem fora dela.

## 12. Valores

Únicos valores de variáveis visíveis (são variáveis `VITE_*` públicas, empacotadas no bundle do navegador de qualquer forma — nenhum valor de segredo do servidor está acessível a mim):

- `VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY` = `AIzaSyBmvJph4LmrbtW7skeczzpBIyb9WWzFKo4`
- `VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_TRACKING_ID` = `18704cfe384a60a60f0cc8482eb4a6a0`

Os cinco segredos da seção 7 têm valores criptografados e não acessíveis ("valor não acessível").
