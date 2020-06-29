# challenge-aws-rimac


## Installation

- Instalacion de dynamodb local :

  ```sh
  sls dynamodb install
  ```

- Ejecucion local:

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

  ```sh
  sls deploy
  ```


- Pruebas test. 
 ```sh
  serverless invoke test — stage test -p [path/to/test-folder]
  ```
