# Test - Magalu

## Este é um testa para a magalu :)

#### Instalando

Após entrar na pasta do projeto execute o comando abaixo

`npm i && npm run start`

#### Usando

Existem 6 Rotas Rest nesta api

GET http://localhost:5050/api/login - Para pegar o token de acesso a outras routas

Saida esperada
```js 
"STRING_DO_TOKEN"
```

Todas as rotas daqui em diante precisam do token gerado pela rota de login passando via header nas requests em um campo nomeado token

POST http://localhost:5050/api/client - Para cadastrar clientes
Exemplo do obj para o post 
```js 
{
    "name": "AlbertL",
    "email": "albert.bit8@gmail.com"
}
```

Saida esperada
```js 
{
    "name": "AlbertL",
    "email": "albert.bit8@gmail.com",
    "favoriteProducts": [],
    "id": "602eaf6f606f3c8439e48d10"
}
```


GET http://localhost:5050/api/client/:id - Para listar clientes o paramentro id é opcional 


Saida esperada
```js 
[
    {
        "name": "Albert Bitencourt",
        "email": "albert.bit8@gmail.com",
        "favoriteProducts": [],
        "id": "602de0663f3bad75fb4da9b3"
    }
]
```

PUT http://localhost:5050/api/client - Pra Editar algum cliente
Exemplo do obj para o put 
```js 
{
    "id": "602de0663f3bad75fb4da9b3",
    "name": "Albert Bitencourt",
    "email": "albert.bit8@gmail.com"
}
```
Saida esperada
```js 
{
    "name": "Albert Bitencourt",
    "email": "albert.bit8@gmail.com",
    "favoriteProducts": [],
    "id": "602de0663f3bad75fb4da9b3"
}
```


DELETE http://localhost:5050/api/client/:id - Para deletar cliente
Saida esperada é um boolean

POST http://localhost:5050/api/addfavorite

Exemplo do obj para o post 
```js 
{  
    "clientId": "602eaf6f606f3c8439e48d10",
    "productId": "1bf0f365-fbdd-4e21-9786-da459d78dd1f"
}
```

Saida esperada
```js 
{
    "name": "AlbertL",
    "email": "albert.bit8@gmail.com",
    "favoriteProducts": [
        {
            "price": 1149,
            "image": "http://challenge-api.luizalabs.com/images/958ec015-cfcf-258d-c6df-1721de0ab6ea.jpg",
            "brand": "bébé confort",
            "id": "958ec015-cfcf-258d-c6df-1721de0ab6ea",
            "title": "Moisés Dorel Windoo 1529"
        },
        {
            "price": 1699,
            "image": "http://challenge-api.luizalabs.com/images/1bf0f365-fbdd-4e21-9786-da459d78dd1f.jpg",
            "brand": "bébé confort",
            "id": "1bf0f365-fbdd-4e21-9786-da459d78dd1f",
            "title": "Cadeira para Auto Iseos Bébé Confort Earth Brown"
        }
    ],
    "id": "602eaf6f606f3c8439e48d10"
}
```