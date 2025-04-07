# Cotação de Ações

Este projeto é uma aplicação web desenvolvida com Next.js (app folder) e TypeScript que permite aos usuários acompanhar cotações de ações e moedas em tempo real. Utiliza Tailwind CSS para um design moderno em dark mode e integra a API de finanças do HG Brasil para exibir dados atualizados. Além disso, conta com autenticação simples (cadastro, login, logout) e gerenciamento de sessão via localStorage.

## 📦 Tecnologias Utilizadas

- [React](https://reactjs.org/)
- [Next.js 15+](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/en-US/)
- API de Finanças: `https://hgbrasil.com/status/finance/`

## Funcionalidades

## 🔐 Autenticação e Sessão

- Tela de cadastro para novos usuários
- Tela de login com validação de credenciais armazenadas localmente
- Verificação de sessão ativa com tempo de expiração
- Redirecionamento para login caso a sessão seja inválida ou expirada

## 📊 Gráfico de evolução

- Exibição de 10 itens (moedas, ações etc.) com variação diária
- Valores coloridos: verde para variação positiva e vermelho para negativa
- Detalhamento de cada item ao selecioná-lo

## 📈 Gráfico de Evolução

- Armazenamento do histórico de preços desde a inicialização da aplicação
- Gráfico interativo de evolução de preços utilizando Recharts
- Atualização automática conforme novos dados são buscados

## 💅 Design Responsivo e Dark Mode

- UI moderna com um esquema de cores em tons de cinza e cyan
- Header customizado reutilizável que exibe o nome do usuário se logado

## Estrutura do Projeto

```plaintext
├── public/                       # Arquivos estáticos (ex.: imagens, ícones)
├── app/
│   ├── api/
│   │   ├── finance/
│   │   │   └── route.ts          # Rota da API para buscar dados financeiros
│   ├── components/
│   │   ├── Header.tsx            # Componente reutilizável de cabeçalho com informações do usuário
│   │   ├── Loader.tsx            # Componente de carregamento para exibir estados de loading
│   │   └── PriceChart.tsx        # Componente para renderizar gráficos de evolução de preços
│   ├── config/
│   │   └── constants.ts          # Tempo da sessão e outras constantes
│   ├── dashboard/
│   │   └── page.tsx              # Página de dashboard exibindo dados financeiros
│   ├── hooks/
│   │   ├── useAuth.ts            # Hook customizado para lógica de autenticação
│   │   └── useFinanceData.ts     # Hook customizado para buscar e gerenciar dados financeiros
│   ├── lib/
│   │   └── session.ts            # Funções utilitárias para gerenciamento de sessão
│   ├── login/
│   │   └── page.tsx              # Página de login para autenticação de usuários
│   ├── register/
│   │   └── page.tsx              # Página de registro para novos usuários
│   ├── types/
│   │   └── index.ts              # Tipos e interfaces do TypeScript
│   └── page.tsx                  # Ponto de entrada principal da aplicação
└── package.json                  # Dependências e scripts do projeto
```

# 📦 Instalação

1. Clone o repositório

```bash
git clone https://github.com/rogix/finance-app
cd finance-app
```

2. Instale as dependências

```bash
npm install
```

3. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

4. Acesse a aplicação no navegador

```bash
http://localhost:3000
```

5. Crie um usuário e faça login para acessar a dashboard
6. Navegue pelas cotações e visualize os gráficos de evolução
7. Desfrute da experiência de acompanhar as cotações em tempo real!
8. Para encerrar o servidor, pressione `Ctrl + C` no terminal

# Melhorias Futuras

Esta seção lista algumas melhorias que podem ser implementadas para aprimorar a aplicação:

- **Autenticação e Segurança:**

  - Migrar para uma solução de autenticação mais robusta (por exemplo, JWT com cookies HttpOnly ou NextAuth).
  - Implementar verificação de token e renovação automática de sessão no lado do servidor.
  - Melhorar o tratamento de erros de autenticação e mensagens para o usuário.

- **Gerenciamento de Estado e Performance:**

  - Utilizar uma biblioteca de gerenciamento de estado (como Redux, Zustand ou Context API) para centralizar o estado da aplicação.
  - Implementar cache e revalidação de dados (por exemplo, com SWR ou React Query) para reduzir requisições repetidas à API.
  - Realizar code-splitting e lazy loading de componentes para melhorar a performance.

- **Interface e Experiência do Usuário:**

  - Aprimorar a responsividade e a acessibilidade (uso de ARIA, melhor contraste, navegação por teclado).
  - Refinar animações e transições para uma experiência mais suave.
  - Adicionar temas customizáveis (modo claro e escuro) de forma dinâmica.

- **Persistência de Dados:**

  - Persistir o histórico de preços além da sessão atual, utilizando IndexedDB ou outra solução de armazenamento local.
  - Integrar um sistema de logging ou monitoramento de erros (como Sentry) para facilitar a identificação e correção de problemas em produção.

- **Testes e Qualidade do Código:**

  - Implementar testes unitários e de integração para componentes e hooks.
  - Adotar ferramentas de linting e formatação (como ESLint e Prettier) para manter a consistência do código.
  - Configurar testes end-to-end para simular fluxos críticos da aplicação.

- **Integração com APIs Externas:**
  - Melhorar o proxy da API para lidar com autenticação e CORS, garantindo maior estabilidade.
  - Expandir a integração para suportar múltiplos endpoints e diferentes fontes de dados.

---

## Todo

## 🔐 Autenticação e Usuário

- [x] Criar tela de login com campos de e-mail/usuário e senha
- [x] Implementar tela de cadastro para novos usuários
- [x] Persistir dados do usuário no LocalStorage após cadastro
- [x] Validar login com dados armazenados localmente
- [x] Implementar verificação de sessão ativa (com tempo de expiração)
- [x] Redirecionar usuário para login se a sessão estiver inativa
- [x] Implementar logout automático após expiração da sessão

## 🌐 Integração com API

- [x] Conectar à API: `https://hgbrasil.com/status/finance/`
- [x] Buscar dados de 10 itens (moedas, ações, etc.)
- [x] Tratar erros de requisição e exibir mensagens adequadas

## 📊 Funcionalidades Principais

- [x] Criar dashboard com listagem de todas as cotações
- [x] Exibir valores de cotação com:
  - [x] Valor em **verde** se a variação diária for positiva
  - [x] Valor em **vermelho** se a variação diária for negativa
- [x] Permitir seleção de um item para visualização detalhada

## 📈 Gráfico de Evolução

- [x] Armazenar histórico de preços desde a inicialização da aplicação
- [x] Implementar gráfico com evolução de preços para item selecionado
- [x] Atualizar gráfico conforme novos dados forem buscados

## 🔁 Navegação e Fluxo

- [x] Proteger rotas que requerem autenticação
- [x] Manter usuário na aplicação se a sessão estiver válida
- [x] Redirecionar usuário deslogado para tela de login

## 💅 Extras (opcional)

- [x] Estilizar com framework (ex: Tailwind, Bootstrap)
- [x] Adicionar loading/spinner durante requisições
- [x] Criar mensagens de erro e sucesso amigáveis ao usuário
