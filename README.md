# F.O.C.O — Landing page

Página inicial pública do Projeto F.O.C.O (Filtrar, Organizar, Concentrar, Observar), feita em **React + Vite + TypeScript**. Começou como a atividade "Site React Vite com IA" e foi revisada com base na monografia do PFC (RF31 — página inicial pública).

## Rodar no seu computador

```bash
npm install
npm run dev      # abre em http://localhost:5173
npm run build    # gera a versão de produção em /dist
```

## Páginas

| Rota | Página | O que tem |
|---|---|---|
| `/` | Início | Hero com TrueFocus, carrossel de destaques, "por que usar", pilha de Focos interativa, pilares no scroll, seção do timer e "Vale trocar?" |
| `/metodo` | Método | Os 4 pilares, metacognição, demonstração da confirmação reflexiva e o design não punitivo |
| `/funcionalidades` | Funcionalidades | Bento grid com brilho que segue o mouse |
| `/sobre` | Sobre nós | Equipe, arquitetura, stack e roadmap |
| `/comecar` | Comece agora | Passos do cadastro e botões Criar conta / Entrar / Termo |

## Telas de acesso

| Rota | Tela | Regras aplicadas na tela |
|---|---|---|
| `/entrar` | Entrar (RF02) | Mostrar/ocultar senha e mensagem de erro genérica |
| `/criar-conta` | Criar conta (RF01) | Confirmação de e-mail, política de senha (RNF02) com indicador de força e aceite do Termo após rolar até o fim (RF04) |
| `/recuperar-senha` | Recuperar senha (RF06) | 3 etapas: e-mail → código + nova senha (reenvio após 60 s) → confirmação |
| `/nao-consigo-acessar` | Não consigo acessar minha conta (RF29) | Pedido sem login, confirmação dos dados da conta e contador de 1.000 caracteres |
| `/termo` | Termo de Uso e Política de Privacidade | Texto completo do Apêndice A, só para leitura |

As telas de acesso **validam os dados mas não fazem login nem cadastro de verdade**: são a prévia visual. Na integração com o sistema, os formulários passam a chamar o Supabase do projeto.

## Estrutura

```
src/
├── data/content.ts        ← TODO o texto do site, links (appLinks) e paleta de cores
├── data/termo.ts          ← texto do Termo de Uso
├── lib/senha.ts           ← regras da política de senha (RNF02)
├── components/
│   ├── fx/                ← efeitos: TrueFocus, BlurText, ScrollRevealText, CountUp, Reveal
│   ├── home/              ← seções da página inicial
│   ├── layout/            ← Header, Footer, PageHeader
│   ├── auth/              ← layout, campos e modal do Termo das telas de acesso
│   └── ui/                ← mocks do app (Visuals), Modal, VideoFrame
├── pages/                 ← as páginas
└── styles/global.css      ← variáveis de cor, botões e utilitários
```

## Cores

| Uso | Cor |
|---|---|
| Azul (principal) | `#4D8DFF` |
| Roxo | `#A77BFF` |
| Ciano | `#22C7D9` |
| Verde | `#3ECF8E` |
| Rosa | `#FF6FB1` |
| Dourado (só a Estrela Dourada) | `#F5B83D` |
| Fundo / superfície | `#000000` / `#1D1D1F` |
| Texto / texto secundário | `#F5F5F7` / `#86868B` |

## Referências usadas

- **Página do iPhone 18 Pro (Apple):** estrutura das seções da Home.
- **React Bits:** inspiração para TrueFocus, BlurText, Scroll Reveal, Count Up e Magic Bento (reescritos aqui com a biblioteca `motion`).
- **Transitions.dev:** tokens de movimento (`--ease-out`, `--dur-fast`), transição do menu mobile, modal e badges.
- **Taste Skill:** direção editorial: tipografia grande, fundo escuro e pouco ruído.

## Acessibilidade

Com "reduzir movimento" ativado no sistema operacional, o carrossel, o timer e o efeito do FOCO param (RNF11 e RN31.2).

## Vídeos

A seção do timer e o botão "Assistir ao vídeo" procuram estes arquivos:

- `public/videos/timer.mp4` — gravação curta do timer (sem som, em loop)
- `public/videos/foco-demo.mp4` — vídeo de demonstração completo

Enquanto eles não existem, aparece um timer animado no lugar.

## Deploy na Vercel

O `vercel.json` redireciona todas as rotas para o `index.html`, para que `/entrar`, `/metodo` e as outras páginas funcionem ao recarregar. Cada commit na branch principal publica uma nova versão automaticamente.
