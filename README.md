# Desafio Innov.me 


## 1. Deploy local

### 1.1. Requisitos necessários:
 -NodeJs;

### 1.2. Passo a passo:

1. Instalar as dependências executando o comando:
```bash

	$ npm install

```
2. Criar arquivo .env na raiz do diretório

3. Preencher o arquivo .env com as informações a seguir, substituindo apenas o TOKEN_JIRA por um token válido:

 PORT=8080
 URL_JIRA_API='https://upflow.atlassian.net'
 TOKEN_JIRA='bWF0FTVzQHVwZmxvdy4ISGp5MmZsZ1pKNkNwNGhicTc70lRGNTlKWTM='

 O token acima serve apenas de exemplo.

4. Iniciar a aplicação executando o comando:
```bash

	$ npm start

```

## 2. Utilizando a API
A API possui um endpoint, para utilizá-lo, é necessário realizar uma requisição HTTP com as seguintes informações:

 - URL: http://localhost:8080/issues/search
 - Método: POST
 - Body da requisição: 


```json

	{
		"initialDate": "2020-02-15", // Data inicial de busca respeitando o formato YYYY-MM-DD
    "finalDate": "2020-05-21", // Data final de busca respeitando o formato YYYY-MM-DD
    "organizationCod": "Shibata" // Código válido da organização
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