const AWS = require("aws-sdk");
const uuid = require("node-uuid");
const { VEHICULOS_TABLE, IS_OFFLINE } = process.env;

const dynamoDb =
    IS_OFFLINE === "true"
        ? new AWS.DynamoDB.DocumentClient({
            region: "localhost",
            endpoint: "http://localhost:8000"
        })
        : new AWS.DynamoDB.DocumentClient();


exports.create = (req, res) => {

    const date = new Date();

    const { titulo,
        modelo,
        fabricante,
        longitud,
        costo_en_creditos,
        velocidad_maxima_de_atmosfera,
        tripulacion,
        pasajeras,
        capacidad_de_carga,
        consumibles,
        clase_de_vehiculo,
        peliculas,
        url } = req.body;

    const creado = date.toISOString();
    const actualizado = date.toISOString();
    const vehiculoId = uuid.v4();

    const params = {
        TableName: VEHICULOS_TABLE,
        Item: {
            vehiculoId,
            titulo,
            modelo,
            fabricante,
            longitud,
            costo_en_creditos,
            velocidad_maxima_de_atmosfera,
            tripulacion,
            pasajeras,
            capacidad_de_carga,
            consumibles,
            clase_de_vehiculo,
            peliculas,
            url,
            creado, actualizado
        }
    };

    dynamoDb.put(params, error => {
        if (error) {
            console.log("Error creando Vehiculo: ", error);
            res.status(400).json({ error: "No se pudo crear Vehiculo" });
        }
        res.json(params.Item);
    });
};

exports.findAll = (req, res) => {
    const params = {
        TableName: VEHICULOS_TABLE
    };

    dynamoDb.scan(params, (error, result) => {
        if (error) {
            res.status(400).json({ error: "Error al recuperar Vehiculos" });
        }

        const { Items: vehiculos } = result;
        res.json({ vehiculos });
    });
};

exports.findOne = (req, res) => {
    const { vehiculoId } = req.params;

    const params = {
        TableName: VEHICULOS_TABLE,
        Key: {
            vehiculoId
        }
    };


    dynamoDb.get(params, (error, result) => {
        if (error) {
            res.status(400).json({ error: "Error al recuperar Vehiculo" });
        }

        if (result.Item) {
            res.json(result.Item);

        } else {
            res.status(404).json({ error: `Vehiculo con id: ${vehiculoId} no encontrado` });
        }

    });
};

exports.update = (req, res) => {
    const date = new Date();
    const { vehiculoId,
        titulo,
        modelo,
        fabricante,
        longitud,
        costo_en_creditos,
        velocidad_maxima_de_atmosfera,
        tripulacion,
        pasajeras,
        capacidad_de_carga,
        consumibles,
        clase_de_vehiculo,
        peliculas,
        url
    } = req.body;

    actualizado = date.toISOString();

    var params = {
        TableName: VEHICULOS_TABLE,
        Key: { vehiculoId },
        UpdateExpression: "set #a = :titulo, #b = :modelo, #c = :fabricante,#d = :longitud,\
        #e= :costo_en_creditos,#f = :velocidad_maxima_de_atmosfera,#g = :tripulacion,#h = :pasajeras,#i = :actualizado",
        ExpressionAttributeNames: {
            "#a": "titulo",
            "#b": "modelo",
            "#c": "fabricante",
            "#d": "longitud",
            "#e": "costo_en_creditos",
            "#f": "velocidad_maxima_de_atmosfera",
            "#g": "tripulacion",
            "#h": "pasajeras",
            "#i": "actualizado"
        },
        ExpressionAttributeValues: {
            "titulo": titulo,
            "modelo": modelo,
            "fabricante": fabricante,
            "longitud": longitud,
            "costo_en_creditos": costo_en_creditos,
            "velocidad_maxima_de_atmosfera": velocidad_maxima_de_atmosfera,
            "tripulacion": tripulacion,
            "pasajeras": pasajeras,
            "actualizado": actualizado
        }
    };

    dynamoDb.update(params, error => {
        if (error) {
            console.log(`Error al eliminar Vehiculo con id ${vehiculoId}: `, error);
            res.status(400).json({ error: "No se pudo actualizar Vehiculo" });
        }

        res.json({
            vehiculoId,
            titulo,
            modelo,
            fabricante,
            longitud,
            costo_en_creditos,
            velocidad_maxima_de_atmosfera,
            tripulacion,
            pasajeras,
            capacidad_de_carga,
            consumibles,
            clase_de_vehiculo,
            peliculas,
            url
        });
    });
};

exports.delete = (req, res) => {
    const { vehiculoId } = req.params;

    const params = {
        TableName: VEHICULOS_TABLE,
        Key: {
            vehiculoId
        }
    };

    dynamoDb.delete(params, error => {
        if (error) {
            console.log(`Error al eliminar Vehiculo con id ${vehiculoId}`, error);
            res.status(400).json({ error: "No se pudo eliminar Vehiculo" });
        }

        res.json({ success: true });
    });
};