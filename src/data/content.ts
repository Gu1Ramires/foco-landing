// Todo o texto do site fica aqui. Para mudar uma frase, você mexe só neste
// arquivo — os componentes apenas leem estes dados.

export const navLinks = [
  { to: '/', label: 'Início' },
  { to: '/metodo', label: 'Método' },
  { to: '/funcionalidades', label: 'Funcionalidades' },
  { to: '/sobre', label: 'Sobre' },
  { to: '/beta', label: 'Beta' },
]

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
    color: '#7aa2ff',
    eyebrow: 'Pilar 1 · Filtrar',
    title: 'Menos coisas. Mais clareza.',
    text: 'Quem tem muitos interesses costuma tentar estudar tudo ao mesmo tempo. O primeiro passo do F.O.C.O é filtrar: separar o que importa agora do que pode esperar, sem culpa.',
    stats: [
      { value: '3', label: 'prioridades no Top 3' },
      { value: '∞', label: 'ideias guardadas no Laboratório de Sonhos' },
    ],
    details: [
      { title: 'Top 3', lines: ['Só três Focos ficam em destaque.', 'O resto continua salvo, sem pesar.'] },
      { title: 'Laboratório de Sonhos', lines: ['Ideias para depois, sem prazo.', 'Nada é descartado.'] },
    ],
  },
  {
    letter: 'O',
    word: 'Organizar',
    color: '#b48cff',
    eyebrow: 'Pilar 2 · Organizar',
    title: 'Cada Foco no seu lugar.',
    text: 'Seus estudos viram Focos: cards com objetivo, prioridade e status. Você enxerga tudo num painel só e decide o próximo passo em segundos.',
    stats: [
      { value: '1', label: 'painel para todos os seus Focos' },
      { value: '1', label: 'Estrela Dourada por vez' },
    ],
    details: [
      { title: 'Focos', lines: ['Cards com objetivo e status.', 'Criados, editados e arquivados em um clique.'] },
      { title: 'Estrela Dourada', lines: ['Marca o Foco principal do momento.', 'Só um card pode ter a estrela.'] },
    ],
  },
  {
    letter: 'C',
    word: 'Concentrar',
    color: '#f5b83d',
    eyebrow: 'Pilar 3 · Concentrar',
    title: 'Uma coisa de cada vez.',
    text: 'O Timer do F.O.C.O transforma intenção em sessão de estudo. Cada sessão fica registrada no Foco certo, e a trava da Estrela Dourada evita trocar de prioridade no impulso.',
    stats: [
      { value: '10h', label: 'de trava da Estrela Dourada' },
      { value: '100%', label: 'das sessões registradas no Foco' },
    ],
    details: [
      { title: 'Timer de foco', lines: ['Sessões ligadas a um Foco.', 'Pausar e retomar sem perder o histórico.'] },
      { title: 'Trava de 10 horas', lines: ['A Estrela Dourada fica 10h no mesmo Foco.', 'Compromisso sem punição.'] },
    ],
  },
  {
    letter: 'O',
    word: 'Observar',
    color: '#5fd4a4',
    eyebrow: 'Pilar 4 · Observar',
    title: 'Veja o seu progresso de verdade.',
    text: 'Metacognição é pensar sobre como você aprende. O Dashboard mostra para onde foi o seu tempo, com números grandes e gráficos, para você ajustar o caminho com dados, e não com culpa.',
    stats: [
      { value: '0', label: 'punições por dias parados' },
      { value: '4', label: 'pilares conectados no Dashboard' },
    ],
    details: [
      { title: 'Dashboard', lines: ['Big numbers e gráficos de sessões.', 'Tempo por Foco e por semana.'] },
      { title: 'Design não punitivo', lines: ['Sem sequências que “quebram”.', 'Recomeçar faz parte do processo.'] },
    ],
  },
]

export type Highlight = {
  id: string
  title: string
  text: string
  visual: 'focos' | 'top3' | 'estrela' | 'timer' | 'lab' | 'dashboard'
  tint: string
}

export const highlights: Highlight[] = [
  { id: 'focos', title: 'Focos', text: 'Transforme cada coisa que você quer estudar em um card com objetivo, prioridade e status.', visual: 'focos', tint: '#2a3a6b' },
  { id: 'top3', title: 'Top 3', text: 'Só três Focos ficam em destaque. Prioridade de verdade é pouca coisa por vez.', visual: 'top3', tint: '#3b2a63' },
  { id: 'estrela', title: 'Estrela Dourada', text: 'Escolha o Foco principal do momento. Ele fica travado por 10 horas para você não trocar no impulso.', visual: 'estrela', tint: '#5a4214' },
  { id: 'timer', title: 'Timer', text: 'Sessões de estudo cronometradas e registradas no Foco certo, sem planilha nem anotação.', visual: 'timer', tint: '#5a2a1a' },
  { id: 'lab', title: 'Laboratório de Sonhos', text: 'Um lugar para as ideias que não cabem agora. Nada se perde, nada pesa.', visual: 'lab', tint: '#1d4a3e' },
  { id: 'dashboard', title: 'Dashboard', text: 'Big numbers e gráficos para você observar o próprio progresso e ajustar o caminho.', visual: 'dashboard', tint: '#1f3f55' },
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
  { id: 'top3', big: { value: 3 }, title: 'prioridades no Top 3', caption: 'Prioridade limitada de propósito', has: { caderno: false, agenda: false, lista: false, planilha: false } },
  { id: 'trava', big: { value: 10, suffix: 'h' }, title: 'de trava da Estrela Dourada', caption: 'Compromisso com um Foco por vez', has: { caderno: false, agenda: false, lista: false, planilha: false } },
  { id: 'timer', title: 'Timer ligado ao Foco', caption: 'Cada sessão é registrada sozinha', has: { caderno: false, agenda: false, lista: false, planilha: false } },
  { id: 'dash', title: 'Dashboard com gráficos', caption: 'Seu tempo por Foco e por semana', has: { caderno: false, agenda: false, lista: false, planilha: true } },
  { id: 'lab', title: 'Laboratório de Sonhos', caption: 'Ideias guardadas para depois', has: { caderno: true, agenda: true, lista: true, planilha: true } },
  { id: 'punicao', big: { value: 0 }, title: 'punições por dias parados', caption: 'Recomeçar faz parte', has: { caderno: true, agenda: true, lista: true, planilha: true } },
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
