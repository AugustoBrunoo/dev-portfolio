export const NAV_ITEMS = [
  { id: 'topo', label: 'início' },
  { id: 'sobre', label: 'sobre' },
  { id: 'experiencia', label: 'experiência' },
  { id: 'projetos', label: 'projetos' }
];

export const PROJECTS = [
  {
    id: 'p1',
    tags: ['vue', 'node', 'tailwind', 'rest'],
    title: 'PrimeInvest',
    kind: 'Simulador de corretora · Home Broker full stack',
    features: [
      'Cotações reativas em tempo real com transições CSS.',
      'Cálculo dinâmico de PnL e histórico de ordens (mercado e limitadas).',
      'Controle rigoroso de estado e sessão.'
    ],
    chips: ['Vue 3', 'Node.js', 'Express', 'Tailwind CSS', 'REST APIs']
  },
  {
    id: 'p2',
    tags: ['react', 'vue', 'supabase', 'tailwind', 'postgres'],
    title: 'Radar Territorial',
    kind: 'Plataforma cívica de infraestrutura urbana',
    features: [
      'Georreferenciamento de ocorrências públicas na Zona Oeste do Rio.',
      'Painel analítico com filtros por categoria.',
      'Sincronização em tempo real.'
    ],
    chips: ['React / Vue', 'Tailwind CSS', 'Supabase', 'PostgreSQL']
  }
];

export const JOBS = [
  {
    id: 'job-1',
    role: 'Pesquisador Bolsista / Desenvolvedor Web',
    period: 'Abr/2026 – presente',
    org: 'Jovens Cientistas Cariocas · SMCT-RJ',
    responsibilities: [
      'Concepção e lançamento da plataforma cívica Radar Territorial, que georreferencia e cataloga demandas públicas na Zona Oeste do Rio (Campo Grande, Inhoaíba e Cosmos).',
      'Autenticação e persistência em tempo real com Supabase/PostgreSQL, com interfaces focadas em usabilidade (UI/UX).'
    ]
  },
  {
    id: 'job-2',
    role: 'Monitor Bolsista / Desenvolvedor Front-end & Dados',
    period: 'Set/2025 – presente',
    org: 'PET Saúde Digital · UNIRIO / SMS-RJ',
    responsibilities: [
      'Desenvolvimento e refatoração de dashboards e SPAs interativas em React/Vite para auditoria e monitoramento de indicadores de saúde municipal.',
      'Otimização do tempo de renderização e arquitetura de componentes reutilizáveis para dados analíticos.'
    ]
  }
];
