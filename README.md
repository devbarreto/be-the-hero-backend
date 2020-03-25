## Anotations

### Types of Parameters

#### Path params

This type of parameter is frequently used to identify resources of an aplication.

Example of implementation:

```
app.get("/isAlive/:id", (request, response) => {
  response.status(200).send(request.params);
});
```

Request:

```
/isAlivePath/1/23/new-york
```

Response:

```
{
  "id": "1",
  "age": "23",
  "city": "new-york"
}
```

#### Query params

Realize that on this way we don't need to "declare" the parameters on code line. It happen because when someone request this service it should declare after "?" the values of each parameter.

Example of implementation:

```
app.get("/isAlive", (request, response) => {
  response.status(200).send(request.query);
});
```

Request:

```
/isAlive?id=1&age=23&city=new-york
```

This form of request is more flexible, we can add more parameters even if the backedn will not use them.

The order of how this reques is described, in example the sequesce is (_id, age, city_) but it cal also (_age, city, id_) or (_city, id, age_) or (_city, id, age, param1, param2, param3_).

Response:

```
{
  "id": "1",
  "age": "23",
  "city": "new-york"
}
```

#### Body params

I change the resource name just because the resource names should be unique by the type of requistion(GET, PUT, UPDATE, DELETE, ...) and I already use "isAlive" in query parameter example.

Example of implementation:

```
app.get("/isAliveBody", (request, response) => {
  response.status(200).send(request.body);
});
```

Request:

```
/isAlivePath/1/23/new-york
```

Response:

```
{
  "id": 1,
  "age": 23,
  "city": "New York"
}
```

### Database configuration

When we start to configure database with Knex this command line is executed:

```
npx knex init
```

Explanation:

- **npx**: The responsable to execute external packages on our project

- **knex init**: Responsible to create a file called "knexfile.js" when all information about development and production environment will be contained.
