## Desafio de negócio
Atualmente a upFlow.me presta serviços de suporte técnico aos seus clientes através de um contrato recorrente de suporte à software baseado em horas trabalhadas. Sendo assim,surgiu a ideia de criar um painel online onde cada cliente terá um acesso exclusivo e poderá acompanhar o extrato de horas de seu contrato em tempo real. Para isso, a upFlow.me utiliza o Jira Service Desk onde os profissionais apontam as horas investidas em cada chamado aberto.

## Objetivo
Precisamos de uma API que consulte o Jira Cloud da upFlow.me retornando a lista de chamados de um cliente que tenham apontamentos de hora em um determinado período. Esta lista de chamados será exibida para o cliente através de um painel (front-end não será desenvolvido nesse desafio) onde o mesmo tenha uma visão gerencial do tempo apontado em seus chamados.

## Resumo das tarefas
Criar um endpoint único na sua aplicação que receberá o código do cliente e o período a ser consultado (data inicial e final) advindo do front-end da solução

Utilizar as informações advindas do front-end para consultar a API do Jira Cloud da upFlow.me retornando apenas os chamados que tenham apontamento de horas

Retornar para o front-end um objeto JSON com a lista de chamados e um resumo da quantidade de chamados retornados assim como a somatória de todos os apontamentos de horas nos chamados, ex.:

```js

    {
        "totalIssue": 23, // quantidade de chamados retornados
        "totalTimeSpent": 3120, // somatória de todos os apontamentos em segundos
        "items": [...] // lista de todos os chamados que atendem o filtro
    }
    
```

Para cada chamado (propriedade 'items' acima), deve-se retornar um objeto com as seguintes informações para o front-end: Número do Chamado (key), Nome do tipo de chamado (issuetype), Descrição da Urgência (priority), Título do Chamado (summary), Solicitante - nome, email e avatar (reporter), Data da Abertura do Chamado (created), Responsável pelo chamado - nome, email e avatar (assignee), Status atual do chamado (status), Somatória do tempo apontado no chamado dentro do período (timespent)

## Deploy local

### 1.1. Requisitos necessários:
 -NodeJs;

### 1.2. Passo a passo:

1. Instalar as dependências executando o comando:
```bash

	$ npm install

```
2. Criar arquivo .env na raiz do diretório

3. Preencher o arquivo .env com as informações a seguir, substituindo apenas o TOKEN_JIRA por um token válido:

```env

 PORT=8080
 URL_JIRA_API='https://upflow.atlassian.net'
 TOKEN_JIRA=''

```

4. Iniciar a aplicação executando o comando:
```bash

	$ npm start

```

## 2. Utilizando a API
A API possui um endpoint, para utilizá-lo, é necessário realizar uma requisição HTTP com as seguintes informações:

 - URL: http://localhost:8080/issues/search
 - Método: POST
 - Body da requisição: 


```js

	{
		"initialDate": "2020-02-15", //Data inicial de busca respeitando o formato YYYY-MM-DD
		"finalDate": "2020-05-21", //Data final de busca respeitando o formato YYYY-MM-DD
		"organizationCod": "Shibata" //Código válido da organização
	}

```


É recomendado utilizar algum software que realize requisições HTTP, por exemplo Postman, mas segue abaixo um exemplo de requisição pelo console do navegador:


```js

  await fetch('http://localhost:8080/issues/search', {
    method: 'POST',
    headers: {
    'Content-Type':'application/json'
    },
    body: JSON.stringify({
        initialDate: '2020-02-12',
        finalDate: '2020-09-12',
        organizationCod: 'ACPL'
    })
  }).then(resp => resp.json())

```
 
 
 Lembrando que as datas precisam estar no formato YYYY-MM-DD, e o organizationCod precisa ser um código de organização válido dentre os seguintes: 
  - BRZ Empreendimentos
  - Eleva Educação
  - ACPL
  - Shibata
