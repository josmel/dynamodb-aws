# challenge-aws-rimac


## Installation

- Install the `@sentry/node` module as a _production dependency_ (so it gets packaged together with your source code):

  ```sh
 sls dynamodb install
  ```

- Install the [serverless-sentry-lib](https://github.com/arabold/serverless-sentry-lib) as a _production dependency_ as well:

  ```sh
  sls offline start --migrate
  ```


PRUEBAS:POST
curl -H "Content-Type: application/json" -X POST http://localhost:3000/dev/vehiculos -d '
{

     "titulo":"ded",
        "modelo":"dede",
        "fabricante":"jhhhh",
        "longitud":"eeee",
        "costo_en_creditos":"eeee",
        "velocidad_maxima_de_atmosfera":"",
        "tripulacion":"",
        "pasajeras":"",
        "capacidad_de_carga":"",
        "consumibles":"",
        "clase_de_vehiculo":"",
        "peliculas":"",
        "url":""
}'

- Despliegue en aws:

  ```
  sls deploy
  ```


-Pruebas test. 
 ```
serverless invoke test — stage test -p [path/to/test-folder]
  ```
