### POST /api/products

-Método Product.create que recibe el body con los datos a insertar.


### PUT /api/products/PRODUCTID
-Prodcut.findByIdAndUpdate(PRODUCTID, OBJ con MODIFICACIONES)

### DELETE /pai/products/PRODUCTID

-Antes de cada prueba:
    - Inserto un Documento nuevo
    - Lanzo la petición del Delete sobre el documento recién insertado.

-Despues de todas las pruebas, borramos aquellos que tengan departamento test

- Primera prueba: status 200 y header JSON
- Segunda prueba: recuperar el producto por ID (Product.findById) y mirar si no es NULO.
  

### RUTA

-Borramos a partir de Product.findByIdAndDelete


### GET api/products/dpto/DEPARTAMENTO

- En función del departamento recibido dentro de la URL recuperamos todos aquellos productos de dicho departamento (find)

### GET api/products/pr/PRECIO

-Recupera todos los productos cuyo precio sea mayor que el precio recibido en la URL (find)

{ price: { $gt: 10 } }

### GET http://localhost:3000/api/products/list (asc / desc)

-Recuperamos el nombre y el precio, ordenado por precio ascendente o descente dependiendo de lo que recuperamos en la URL.


### GET http://localhost:3000/api/products/dpto/stats

### ### GET api/products/pr/max/PRECIO

- Recuperamos nombre y precio de aquellos productos que estén disponibles y además su precio sea mayor que el precio recuperado a través de la URL
- Ordenamos por precio de manera ascendente.

$match - FILTRO { $match: { ... }}
$project 
$sort

### GET /api/products/available

- Recuperar la suma de todos los productos disponibles y no disponibles.
- Contar cuántos hay de cada clase.
- Contar el stock de cada clase.
- Ordenar por stock de manera ascendente.
  
- Para resolver esto, hacemos un método en el modelo (available)
   -Modelo sin parámetros 
   -Ejecuta el aggregate con la especificaciones anteriores ($group, $sort)
  

### SHEMA
## POST /api / users / register

-Recibe todos los datos del usuario a través del Body.
-Inserta dichos datos dentro de la BD (create)


### 
# GET /api/users/profile


## GET /api/products/dpto/same

## GET /api/products/taxes

-Me recupere el nombre y el precio con IVA con todos los productos
    -Recuperar todos los productos
    -Recorriendo estos productos obtengo el nombre y el precio con I.V.A



## GET /api/products/add/PRODUCTID

-Al usuario logado le agregamos el producto cuyo ID extraemos de la URL.
    -Recuperamos el id del producto
    -Al array de productos del usuario logado le agregamos el producto anterior.
    -Respondemos con lo que sea.


## GET /api/products/cart

-Recuperar los productos del usuario logado.
