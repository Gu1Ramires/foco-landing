# F.O.C.O — Landing page

Landing page do Projeto F.O.C.O (Filtrar, Organizar, Concentrar, Observar), feita em **React + Vite + TypeScript** para a atividade "Site React Vite com IA".

## Rodar no seu computador

```bash
npm install
npm run dev      # abre em http://localhost:5173
npm run build    # gera a versão de produção em /dist
```

## Páginas (5)

| Rota | Página | O que tem |
|---|---|---|
| `/` | Início | Hero com TrueFocus, carrossel de destaques, "por que usar", seletor de tema, pilares no scroll, seção de vídeo e "Vale trocar?" |
| `/metodo` | Método | Os 4 pilares, metacognição e o design não punitivo |
| `/funcionalidades` | Funcionalidades | Bento grid com brilho que segue o mouse |
| `/sobre` | Sobre | TCC, orientação, arquitetura, stack e roadmap |
| `/beta` | Beta | Formulário com validação e aceite da LGPD |

## Estrutura

```
src/
├── data/content.ts        ← TODO o texto do site (mude aqui)
├── components/
│   ├── fx/                ← efeitos: TrueFocus, BlurText, ScrollRevealText, CountUp, Reveal
│   ├── home/              ← seções da página inicial (uma por anexo de referência)
│   ├── layout/            ← Header (barra global + pílula flutuante), Footer, PageHeader
│   └── ui/                ← mocks do app (Visuals), Modal, VideoFrame
├── pages/                 ← as 5 páginas
└── styles/global.css      ← variáveis de cor, botões e utilitários
```

## Referências usadas

- **Página do iPhone 18 Pro (Apple):** estrutura das seções da Home.
- **React Bits:** inspiração para TrueFocus, BlurText, Scroll Reveal, Count Up e Magic Bento (reescritos aqui com a biblioteca `motion`).
- **Transitions.dev:** tokens de movimento (`--ease-out`, `--dur-fast`), transição do menu mobile, modal e badges.
- **Taste Skill:** direção editorial: tipografia grande, fundo escuro e pouco ruído.

## Vídeos

A seção do Timer e o botão "Assistir ao vídeo" procuram estes arquivos:

- `public/videos/timer.mp4` — gravação curta do Timer (sem som, em loop)
- `public/videos/foco-demo.mp4` — vídeo de demonstração completo

Enquanto eles não existem, aparece um timer animado no lugar.

## Deploy na Vercel

1. Suba o projeto para um repositório no GitHub.
2. Na Vercel: **Add New → Project** → importe o repositório (Framework: Vite).
3. O `vercel.json` já redireciona todas as rotas para o `index.html`, para `/metodo` e as outras páginas funcionarem ao recarregar.
