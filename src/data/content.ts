// Todo o texto do site fica aqui. Para mudar uma frase, você mexe só neste
// arquivo — os componentes apenas leem estes dados.
// Os textos seguem as regras de negócio da monografia (RF09 a RF23 e RF31).

export const navLinks = [
  { to: '/', label: 'Início' },
  { to: '/metodo', label: 'Método' },
  { to: '/funcionalidades', label: 'Funcionalidades' },
  { to: '/sobre', label: 'Sobre nós' },
  { to: '/comecar', label: 'Comece agora' },
]

/**
 * Rotas de acesso (RF31: botões "Entrar" e "Criar conta" e o Termo).
 * Entrar, Criar conta e Termo são páginas desta landing; quando ela for
 * para dentro do F.O.C.O, os formulários passam a usar o Supabase do projeto.
 */
export const appLinks = {
  entrar: '/entrar',
  criarConta: '/criar-conta',
  termo: '/termo',
  recuperarSenha: '/recuperar-senha',
  suporte: '/nao-consigo-acessar',
  // Área do Aluno no sistema (botão "Entrar na plataforma")
  plataforma: 'https://seufoco.com.br',
}

/** Cores da plataforma (RN12.1). O dourado é exclusivo da Estrela (RN12.3). */
export const palette = {
  azul: '#4d8dff', // padrão (RN12.4)
  roxo: '#a77bff',
  verde: '#3ecf8e',
  ciano: '#22c7d9',
  rosa: '#ff6fb1',
  dourado: '#f5b83d', // só a Estrela Dourada
  neutro: '#8a8a90', // Focos da 4ª posição em diante (RN10.4)
}

export type Pillar = {
  letter: string
  word: string
  color: string
  eyebrow: string
  title: string
  text: string
  stats: { value: string; label: string }[]
  details: { title: string; lines: string[] }[]
}

export const pillars: Pillar[] = [
  {
    letter: 'F',
    word: 'Filtrar',
    color: palette.azul,
    eyebrow: 'Pilar 1 · Filtrar',
    title: 'Menos coisas. Mais clareza.',
    text: 'Quem tem muitos interesses costuma tentar estudar tudo ao mesmo tempo e não chega a finalizar nada. O primeiro passo do F.O.C.O é filtrar: escolher o nome, o tempo e os motivos para finalizar o seu objetivo.',
    stats: [
      { value: '6', label: 'metas de tempo, de 1 semana a 1 ano' },
      { value: '200', label: 'caracteres para anotar os seus motivos' },
    ],
    details: [
      { title: 'Nome e meta de horas', lines: ['Dê ao objetivo um nome de até 40 caracteres.', 'Escolha a meta: de 168 h (1 semana) a 8.760 h (1 ano).'] },
      { title: 'Seus motivos', lines: ['Anote nas observações por que esse Foco importa.', 'O progresso mostra quanto falta para finalizar.'] },
    ],
  },
  {
    letter: 'O',
    word: 'Organizar',
    color: palette.roxo,
    eyebrow: 'Pilar 2 · Organizar',
    title: 'Cada Foco no seu lugar.',
    text: 'Seus objetivos viram Focos, com meta de horas e progresso. Você define a ordem da pilha, escolhe a cor de cada um e decide qual merece a Estrela Dourada.',
    stats: [
      { value: '1', label: 'Estrela Dourada por vez' },
      { value: '10 h', label: 'de estudo para um Foco poder receber a Estrela' },
    ],
    details: [
      { title: 'Pilha de prioridades', lines: ['A ordem é decisão sua, não da data de criação.', 'Mude a posição de qualquer Foco pelo menu do card.'] },
      { title: 'Estrela Dourada', lines: ['Marca a prioridade máxima e fixa o Foco no topo.', 'Só para Focos do Top 3 com 10 h ou mais de estudo.'] },
    ],
  },
  {
    letter: 'C',
    word: 'Concentrar',
    color: palette.ciano,
    eyebrow: 'Pilar 3 · Concentrar',
    title: 'Uma coisa de cada vez.',
    text: 'Você escolhe o Foco e o tempo da sessão. Durante o timer, o app fica bloqueado e não existe botão de "concluir antes": a sensação de dever cumprido vem de terminar o que você mesmo se propôs.',
    stats: [
      { value: '5–180', label: 'minutos por sessão, você escolhe' },
      { value: '0', label: 'botões para concluir antes do fim' },
    ],
    details: [
      { title: 'Timer de foco', lines: ['Atalhos de 25, 50 e 90 minutos.', 'Pause e retome; o tempo pausado não conta.'] },
      { title: 'Janela flutuante', lines: ['O timer fica por cima dos outros programas.', 'Leia, assista à aula ou anote sem perder o tempo de vista.'] },
    ],
  },
  {
    letter: 'O',
    word: 'Observar',
    color: palette.verde,
    eyebrow: 'Pilar 4 · Observar',
    title: 'Veja o seu progresso de verdade.',
    text: 'Metacognição é pensar sobre como você aprende. Ao fim de cada sessão você registra o que aprendeu, e a área Observar mostra para onde foi o seu tempo, com gráficos e o mapa de constância.',
    stats: [
      { value: '12', label: 'semanas no mapa de constância' },
      { value: '6', label: 'semanas de evolução no gráfico' },
    ],
    details: [
      { title: 'Estatísticas', lines: ['Tempo total, média por sessão e tempo por Foco.', 'Filtre tudo por um Foco específico.'] },
      { title: 'O que você aprendeu', lines: ['Um registro curto ao fim de cada sessão.', 'Privado: só você vê.'] },
    ],
  },
]

export type Highlight = {
  id: string
  title: string
  text: string
  visual: 'focos' | 'top3' | 'estrela' | 'timer' | 'lab' | 'observar'
  tint: string
}

export const highlights: Highlight[] = [
  { id: 'focos', title: 'Focos', text: 'Cada objetivo de estudo vira um Foco, com meta de horas e progresso calculado a partir das suas sessões.', visual: 'focos', tint: '#1f3366' },
  { id: 'top3', title: 'Top 3', text: 'Só as três primeiras posições da pilha ganham destaque. Prioridade de verdade é pouca coisa por vez.', visual: 'top3', tint: '#3b2a63' },
  { id: 'estrela', title: 'Estrela Dourada', text: 'A prioridade máxima. Só um Foco do Top 3 com pelo menos 10 h de estudo pode recebê-la, deixando o Foco priorizado e fixado na 1ª posição.', visual: 'estrela', tint: '#5a4214' },
  { id: 'timer', title: 'Concentrar', text: 'Sessões de 5 a 180 minutos, com o app bloqueado e uma janela flutuante que fica por cima de tudo.', visual: 'timer', tint: '#0e3a44' },
  { id: 'lab', title: 'Laboratório de Sonhos', text: 'Focos deixados de lado não viram fracasso: ficam arquivados com todas as horas, prontos para serem resgatados.', visual: 'lab', tint: '#2b2f3a' },
  { id: 'observar', title: 'Observar', text: 'Gráficos, mapa de constância e os seus registros de aprendizado para enxergar o próprio progresso.', visual: 'observar', tint: '#14463a' },
]

// Comparação "Vale trocar?" — sem números inventados: compara o que cada
// método oferece de fato.
export const compareOptions = [
  { id: 'caderno', label: 'Caderno' },
  { id: 'agenda', label: 'Agenda de papel' },
  { id: 'lista', label: 'Lista no celular' },
  { id: 'planilha', label: 'Planilha' },
] as const

export type CompareId = (typeof compareOptions)[number]['id']

export const compareFeatures: {
  id: string
  big?: { value: number; prefix?: string; suffix?: string }
  title: string
  caption: string
  has: Record<CompareId, boolean>
}[] = [
  { id: 'top3', big: { value: 3 }, title: 'Focos em destaque no Top 3', caption: 'Prioridade limitada de propósito', has: { caderno: false, agenda: false, lista: false, planilha: false } },
  { id: 'estrela', big: { value: 10, suffix: ' h' }, title: 'de estudo para liberar a Estrela', caption: 'Prioridade só depois de constância', has: { caderno: false, agenda: false, lista: false, planilha: false } },
  { id: 'timer', title: 'Timer sem "concluir antes"', caption: 'Com janela flutuante sobre os outros programas', has: { caderno: false, agenda: false, lista: false, planilha: false } },
  { id: 'observar', title: 'Gráficos e mapa de constância', caption: 'Tempo por Foco, por semana e por dia', has: { caderno: false, agenda: false, lista: false, planilha: true } },
  { id: 'lab', title: 'Laboratório de Sonhos', caption: 'Arquivar sem perder as horas estudadas', has: { caderno: false, agenda: false, lista: false, planilha: false } },
  { id: 'aprendi', title: 'Registro "O que você aprendeu"', caption: 'Uma reflexão ao fim de cada sessão', has: { caderno: true, agenda: true, lista: true, planilha: true } },
]

export const tcc = {
  autor: 'Guilherme Ramires Lana',
  curso: 'Sistemas de Informação',
  universidade: 'Universidade de Mogi das Cruzes (UMC)',
  orientador: 'Prof. Leandro Miranda de Almeida',
  coorientador: 'Prof. Alessandro Aparecido da Silva Horas',
  ano: '2026',
  github: 'https://github.com/GuiRamires',
}
