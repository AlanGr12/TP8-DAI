import express from 'express';
import { StatusCodes } from 'http-status-codes';
import ProvinceService from '../services/province-service.js';

const router = express.Router();
const service = new ProvinceService();

router.get('/', async (req, res) => {
    /*
        #swagger.tags = ['Provincias']
        #swagger.summary = 'Obtiene todas las provincias'
        #swagger.description = 'Devuelve el listado completo de provincias almacenadas en la base de datos.'
        #swagger.responses[200] = {
            description: 'Listado de provincias obtenido correctamente',
            schema: [{ $ref: '#/definitions/Province' }]
        }
    */

    const provincias = await service.getAllAsync();

    res.status(StatusCodes.OK).json(provincias);
});

router.get('/:id', async (req, res) => {
    /*
        #swagger.tags = ['Provincias']
        #swagger.summary = 'Obtiene una provincia por id'
        #swagger.description = 'Devuelve los datos de una provincia puntual a partir de su id.'
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'Id de la provincia',
            required: true,
            type: 'integer'
        }
        #swagger.responses[200] = {
            description: 'Provincia encontrada',
            schema: { $ref: '#/definitions/Province' }
        }
        #swagger.responses[404] = {
            description: 'No existe una provincia con ese id'
        }
    */

    const id = req.params.id;

    const provincia = await service.getByIdAsync(id);

    if (provincia == null) {
        return res.status(StatusCodes.NOT_FOUND).send('Provincia no encontrada');
    }

    res.status(StatusCodes.OK).json(provincia);
});

router.post('/', async (req, res) => {
    /*
        #swagger.tags = ['Provincias']
        #swagger.summary = 'Crea una nueva provincia'
        #swagger.description = 'Da de alta una provincia nueva. El id se genera automáticamente en la base de datos.'
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Datos de la provincia a crear',
            required: true,
            schema: { $ref: '#/definitions/ProvinceInput' }
        }
        #swagger.responses[201] = {
            description: 'Provincia creada correctamente'
        }
        #swagger.responses[400] = {
            description: 'Datos inválidos (por ejemplo, falta el nombre o el full_name)'
        }
        #swagger.responses[500] = {
            description: 'Error interno al intentar crear la provincia'
        }
    */

    const province = req.body;

    const resultado = await service.createAsync(province);

    if (typeof resultado === 'string') {
        return res.status(StatusCodes.BAD_REQUEST).send(resultado);
    }

    if (resultado === true) {
        return res.status(StatusCodes.CREATED).send('Provincia creada');
    }

    if (resultado === false) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Error al crear la provincia');
    }
});

router.put('/', async (req, res) => {
    /*
        #swagger.tags = ['Provincias']
        #swagger.summary = 'Actualiza una provincia existente'
        #swagger.description = 'Modifica los datos de una provincia ya existente. El id debe venir incluido en el body.'
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Datos de la provincia a actualizar, incluyendo su id',
            required: true,
            schema: { $ref: '#/definitions/Province' }
        }
        #swagger.responses[201] = {
            description: 'Provincia actualizada correctamente'
        }
        #swagger.responses[400] = {
            description: 'Datos inválidos'
        }
        #swagger.responses[404] = {
            description: 'No existe una provincia con ese id'
        }
        #swagger.responses[500] = {
            description: 'Error interno al intentar actualizar la provincia'
        }
    */

    const province = req.body;

    const existe = await service.getByIdAsync(province.id);

    if (existe == null) {
        return res.status(StatusCodes.NOT_FOUND).send('Provincia no encontrada');
    }

    const resultado = await service.updateAsync(province);

    if (typeof resultado === 'string') {
        return res.status(StatusCodes.BAD_REQUEST).send(resultado);
    }

    if (resultado === true) {
        return res.status(StatusCodes.CREATED).send('Provincia actualizada');
    }

    if (resultado === false) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Error al actualizar la provincia');
    }
});

router.delete('/:id', async (req, res) => {
    /*
        #swagger.tags = ['Provincias']
        #swagger.summary = 'Elimina una provincia'
        #swagger.description = 'Elimina la provincia cuyo id coincide con el parámetro recibido.'
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'Id de la provincia a eliminar',
            required: true,
            type: 'integer'
        }
        #swagger.responses[200] = {
            description: 'Provincia eliminada correctamente'
        }
        #swagger.responses[404] = {
            description: 'No existe una provincia con ese id'
        }
    */

    const id = req.params.id;

    const resultado = await service.deleteByIdAsync(id);

    if (!resultado) {
        return res.status(StatusCodes.NOT_FOUND).send('Provincia no encontrada');
    }

    res.status(StatusCodes.OK).send('Provincia eliminada');
});

export default router;