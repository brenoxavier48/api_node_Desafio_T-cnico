# Desafio Innov.me #1

## 1. Desafio de negócio
Atualmente a upFlow.me presta serviços de suporte técnico aos seus clientes através de um contrato recorrente de suporte à software baseado em horas trabalhadas.
Cada cliente tem contratado uma determinada quantidade de horas mensais, onde, essas horas são "utilizadas" ao longo do mês, e caso sejam executadas mais horas do que foram contratadas, o cliente deverá pagar horas avulsas naquele mês.
Para não ter a surpresa de ter que pagar a mais que previsto em cada mês, muitos clientes pedem a upFlow.me que informem em tempo real, a quantidade de horas que já foram utilizadas vs a quantidade de horas de saldo restante em cada mês.
Sendo assim, a upFlow.me teve a ideia de criar um painel online onde cada cliente terá um acesso exclusivo e poderá acompanhar o extrato de horas de seu contrato em tempo real.
Para isso, a upFlow.me utiliza o Jira Service Desk onde os profissionais apontam as horas investidas em cada chamado aberto.

## 2. Objetivo
Precisamos de uma API que consulte o Jira Cloud da upFlow.me retornando a lista de chamados de um cliente que tenham apontamentos de hora em um determinado período.
Esta lista de chamados será exibida para o cliente através de um painel (front-end não será desenvolvido nesse desafio) onde o mesmo tenha uma visão gerencial do tempo apontado em seus chamados.

## 3. Desenvolvendo a solução

### 3.1. Pré-requisitos

1. Você deve desenvolver uma aplicação de back-end utilizando NodeJS.

2. A escolha das bibliotecas, arquitetura, etc, fica a seu critério.

3. Adicione um arquivo README no seu projeto explicando o que é preciso para rodar sua aplicação assim como os dados necessários para consultar o endpoint da mesma.


### 3.2. Resumo das tarefas

1. Criar um endpoint único na sua aplicação que receberá o código do cliente e o período a ser consultado (data inicial e final) advindo do front-end da solução

2. Utilizar as informações advindas do front-end para consultar a API do Jira Cloud da upFlow.me retornando apenas os chamados que tenham apontamento de horas

3. Retornar para o front-end um objeto JSON com a lista de chamados e um resumo da quantidade de chamados retornados assim como a somatória de todos os apontamentos de horas nos chamados, ex.:

	```js
	{
		"totalIssue": 23, // quantidade de chamados retornados
		"totalTimeSpent": 3120, // somatória de todos os apontamentos em segundos
		"items": [...] // lista de todos os chamados que atendem o filtro
	}
	```

4. Para cada chamado (propriedade 'items' acima), deve-se retornar um objeto com as seguintes informações para o front-end: Número do Chamado (`key`), Nome do tipo de chamado (`issuetype`), Descrição da Urgência (`priority`), Título do Chamado (`summary`), Solicitante - nome, email e avatar (`reporter`), Data da Abertura do Chamado (`created`), Responsável pelo chamado - nome, email e avatar (`assignee`), Status atual do chamado (`status`), Somatória do tempo apontado no chamado dentro do período (`timespent`)

## 4. Submissão
Para iniciar o desenvolvimento da sua solução, faça um _fork_ deste repositório, crie uma _branch_ com o seu nome completo e faça _commits_ como achar melhor ao longo do desenvolvimento da sua aplicação, e depois de concluída, envie-nos o _pull request_. Se você apenas clonar o repositório não vai conseguir fazer _push_ e vai ser mais complicado fazer o _pull request_.

1. Crie um _clone_ desse repositório (https://support.atlassian.com/bitbucket-cloud/docs/clone-a-repository/)

	```bash
	$ git clone https://<seu_usuario>@bitbucket.org/innovme/desafio-innov.me-1.git
	```
	
2. Crie uma _branch_ com o seu nome (https://support.atlassian.com/bitbucket-cloud/docs/branch-a-repository/)

	```bash
	$ git branch <branch_com_seu_nome>
	```
	
3. Inicie o desenvolvimento da sua aplicação (pode fazer quantos _commits_ quiser)

    ```bash
    $ git add .
    $ git commit -m "descrição da sua implementação"
    ```

4. Quando estiver pronto, envie sua _branch_ para o repositório no servidor do bitBucket

    ```bash
    $ git push origin <branch_com_seu_nome>
    ```

4. Quando achar que é hora de entregar o seu projeto para avaliação, envie-nos seu código via _pull request_ (https://bitbucket.org/product/guides/basics/four-starting-steps?tab=2#step-1-put-your-code-in-bitbucket)
    > Obs.: faça o _pull request_ acessando a página do repositório diretamente no site do bitBucket

## 5. Sobre a avaliação
Segue a lista dos itens que serão considerados na avaliação da sua solução (na ordem de importância):
* Interpretação do Problema
* Eficácia da Solução (ela resolve o problema?)
* Eficiência da Solução (ela resolve o problema da melhor maneira possível, com o menor desperdício de tempo, esforço e recursos?)
* Tempo da entrega da solução (mensurada por pull request)
* Qualidade e Segurança do Código
* Performance na execução da aplicação
* Organização do Código, separação de módulos, legibilidade e comentários
* Documentação de Deploy (README.md)
* Organização de GIT (branches, commits)

---

## Material de apoio
Toda a documentação da API do Jira Cloud pode ser encontrada em: https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/
Sugerimos utilizar o endpoint https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-search/#api-rest-api-3-search-post, mas você está livre para usar os endpoints que achar necessário para atingir o objetivo.
Caso opte por utilizar o endpoint `/rest/api/3/search` segue body de exemplo:

```json
	{
		"expand": [],
		"fields": ["worklog"],
		"jql": "project = SD AND Organizations = '<código_do_cliente>' AND worklogDate >= '2020-08-01' AND worklogDate <= '2020-08-31'",
		"maxResults": 5,
		"fieldsByKeys": true,
		"startAt": 0
	}
```

As credenciais de acesso (Token) à API do Jira Cloud assim como os códigos de clientes para consultas de teste, serão informados para os candidatos individualmente.

Se precisar de mais informações sobre _pull request_ segue material muito útil: https://www.atlassian.com/br/git/tutorials/making-a-pull-request

Se precisar de mais informações sobre _issues_ do repositório:
* [O que são Issues](https://bitbucket.org/product/guides/basics/bitbucket-interface#issues)
* [Como criar Issue](https://support.atlassian.com/bitbucket-cloud/docs/create-an-issue-in-bitbucket-cloud/)

## Em caso de dúvidas
Quaisquer dúvidas que você venha a ter, consulte as _issues_ desse repositório no portal do bitBucket para ver se alguém já não a fez e caso você não ache sua resposta, abra você mesmo uma nova _issue_.