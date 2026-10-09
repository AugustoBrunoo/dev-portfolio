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

export const TOTAL_PROJETOS = 40;

export const ALL_PROJECTS = [
  { slug: 'radar-territorial', title: 'Radar Territorial', feat: true,
    desc: 'Plataforma cívica de infraestrutura urbana: georreferencia ocorrências públicas na Zona Oeste do Rio e sincroniza tudo em tempo real.',
    tags: [['React', 'f'], ['Tailwind CSS', 'f'], ['Supabase', 'd'], ['PostgreSQL', 'd']], repo: '', demo: '' },
  { slug: 'primeinvest', title: 'PrimeInvest', feat: false,
    desc: 'Simulador de corretora (home broker full stack) com cotações reativas em tempo real, cálculo dinâmico de PnL, histórico de ordens de mercado e limitadas e controle rigoroso de estado e sessão.',
    tags: [['Vue 3', 'f'], ['Node.js', 'b'], ['Express', 'b'], ['Tailwind CSS', 'f'], ['REST API', 'b']], repo: '', demo: '' },
  { slug: 'studiohub', title: 'StudioHub', feat: false,
    desc: 'Ecossistema inteligente de agendamento e gestão para barbearias via WhatsApp e dashboard. Possui motor de mediação de conflitos autônomo para trocas de horários. Arquitetura baseada em React, Spring Boot, n8n e Docker.',
    tags: [['React', 'f'], ['Tailwind CSS', 'f'], ['Java', 'b'], ['Spring Boot', 'b'], ['PostgreSQL', 'd'], ['Docker', 'd'], ['n8n', 'b']], repo: '', demo: '' },
  { slug: 'sistema-cadastro', title: 'Sistema de Cadastro', feat: false,
    desc: 'O projeto simula o sistema de uma loja de chocolates, desde o cadastro de clientes até a realização de vendas com descontos personalizados. Cada funcionalidade foi cuidadosamente implementada como parte de um processo de revisão e aprimoramento das habilidades em programação com a linguagem C.',
    tags: [['C', 'b']], repo: '', demo: '' },
  { slug: 'monitor-gestante-carioca', title: 'Dashboard Monitor Gestante Carioca', feat: false,
    desc: 'Aplicação web reativa desenvolvida no âmbito do PET-Saúde Digital para modernizar e substituir relatórios legados do Power BI. Centraliza indicadores de saúde materno-infantil da cidade do Rio de Janeiro em painéis dinâmicos e fluidos, garantindo carregamento rápido e navegação ágil para apoiar a tomada de decisão na saúde pública.',
    tags: [['React', 'f'], ['Data Visualization', 'f'], ['UI/UX', 'f'], ['JavaScript', 'f']], repo: '', demo: '' },
  { slug: 'doc-bi-aps', title: 'Plataforma de Documentação BI-APS', feat: false,
    desc: 'Portal de governança e documentação técnica desenvolvido para a Atenção Primária à Saúde da Prefeitura do Rio de Janeiro. Unifica a catalogação de pipelines de dados, modelagens relacionais em SQL e scripts analíticos em R em uma interface web interativa e de fácil navegação, simplificando manutenções e o onboarding técnico.',
    tags: [['React', 'f'], ['SQL', 'd'], ['R', 'd'], ['Engenharia de Dados', 'd'], ['Governança', 'd']], repo: '', demo: '' },
  { slug: 'easy-wallet', title: 'Easy Wallet', feat: false,
    desc: 'Plataforma de gestão financeira que preenche o abismo entre planilhas manuais caóticas e sistemas ERP engessados. Oferece controle intuitivo de fluxo de caixa, relatórios visuais e projeções preditivas por meio de uma interface moderna e orientada à usabilidade para empresas em crescimento.',
    tags: [['React', 'f'], ['Tailwind CSS', 'f'], ['Analytics', 'd'], ['UI/UX', 'f']], repo: '', demo: '' }
];

export const FILTERS = ['Todos', 'React', 'Vue 3', 'Node.js', 'Java', 'Spring Boot', 'C', 'Supabase'];
