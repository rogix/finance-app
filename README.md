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
/
├── app/
│   ├── components/
│   │   └── Header.tsx
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   └── useFinanceData.ts
│   ├── lib/
│   │   └── session.ts
│   ├── types/
│   │   └── index.ts
│   ├── dashboard/
│   │   └── page.tsx
│   ├── login/
│   │   └── page.tsx
│   ├── register/
│   │   └── page.tsx
│   └── page.tsx         // Landing page
├── public/
└── package.json
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
- [ ] Adicionar loading/spinner durante requisições
- [x] Criar mensagens de erro e sucesso amigáveis ao usuário
