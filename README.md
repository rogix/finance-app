# Finance Quotation App

Este é um projeto criado com React e Typescript, que tem como objetivo exibir cotações de moedas, ações e outros ativos financeiros. A aplicação permite que os usuários façam login, visualizem cotações em tempo real e acompanhem a evolução dos preços ao longo do tempo.

## 📦 Tecnologias Utilizadas

- React
- Typescript
- Next.js

# 📋 Task List

## 🔐 Autenticação e Usuário

- [x] Criar tela de login com campos de e-mail/usuário e senha
- [x] Implementar tela de cadastro para novos usuários
- [x] Persistir dados do usuário no LocalStorage após cadastro
- [x] Validar login com dados armazenados localmente
- [x] Implementar verificação de sessão ativa (com tempo de expiração)
- [x] Redirecionar usuário para login se a sessão estiver inativa
- [x] Implementar logout automático após expiração da sessão

## 🌐 Integração com API

- [ ] Conectar à API: `https://hgbrasil.com/status/finance/`
- [ ] Buscar dados de 10 itens (moedas, ações, etc.)
- [ ] Tratar erros de requisição e exibir mensagens adequadas

## 📊 Funcionalidades Principais

- [ ] Criar dashboard com listagem de todas as cotações
- [ ] Exibir valores de cotação com:
  - [ ] Valor em **verde** se a variação diária for positiva
  - [ ] Valor em **vermelho** se a variação diária for negativa
- [ ] Permitir seleção de um item para visualização detalhada

## 📈 Gráfico de Evolução

- [ ] Armazenar histórico de preços desde a inicialização da aplicação
- [ ] Implementar gráfico com evolução de preços para item selecionado
- [ ] Atualizar gráfico conforme novos dados forem buscados

## 🔁 Navegação e Fluxo

- [ ] Proteger rotas que requerem autenticação
- [ ] Manter usuário na aplicação se a sessão estiver válida
- [ ] Redirecionar usuário deslogado para tela de login

## 💅 Extras (opcional)

- [ ] Estilizar com framework (ex: Tailwind, Bootstrap)
- [ ] Adicionar loading/spinner durante requisições
- [ ] Criar mensagens de erro e sucesso amigáveis ao usuário
