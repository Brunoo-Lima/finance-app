# MasterCash - Gerenciador de finanças

Projeto financeiro para gerenciar finanças, ter controle sobre receitas, despesas e investimentos, oferecendo visão clara sobre a saúde financeira através de gráficos intuitivos e relatórios detalhados. Utilizei Nextjs e algumas variações de tecnologias, que aproveitei para aplicar enquanto aprendia.
Optei por salvar os dados no localstorage, pois, assim utilizo sem me preocupar com backend e sem a necessidade de fazer deploy do backend, fiz o projeto mais para uso pessoal, mas aproveitei para estudo também.

## Funcionalidades

- **Dashboard Geral**: Resumo visual do saldo total, entradas e saídas do mês, com transações, gastos, categorias.
- **Transações**: Listagem de transações com opção de ser investimento, receita ou despesa.
- **Metas**: Listagem de metas, onde podemos gerenciar metas a atingir.
- **Exportar transação**: Na tela de transações, temos o botão de exportar, no qual vai ser exportado para um excel as transações.
- **Conta**: Podemos ver detalhe da conta, exclusão da conta e exclusão de dados.

## Recursos

- **Eslint e Prettier** - Para manter um código limpo e consistente, seguindo as melhores práticas no desenvolvimento.
- **Husky e Lintstaged** - Para automatizar verificações de qualidade de código no momento do commit, evitando que código problemático entre no repositório.
- **Nuqs** - Controle de estado da aplicação via URL (query params).
- **LocalStorage** - Usado para salvar os dados e persistência dos mesmos.
- **Recharts** - Biblioteca de gráficos.
- **Jest & Testing Library** - Utilizados para garantir o funcionamento correto dos componentes e funcionalidades da aplicação.

## Tecnologias

- Nextjs
- TypeScript
- Sass (Scss modules)
- React Hook Form & Zod
