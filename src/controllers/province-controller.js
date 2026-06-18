import express from 'express';
import { StatusCodes } from 'http-status-codes';
import ProvinceService from '../services/province-service.js';

const router = express.Router();
const service = new ProvinceService();

router.get('/', async (req, res) => {

    const provincias = await service.getAllAsync();

    res.status(StatusCodes.OK).json(provincias);
});

router.get('/:id', async (req, res) => {

    const id = req.params.id;

    const provincia = await service.getByIdAsync(id);

    if (provincia == null) {
        return res.status(StatusCodes.NOT_FOUND).send('Provincia no encontrada');
    }

    res.status(StatusCodes.OK).json(provincia);
});

router.post('/', async (req, res) => {

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

    const id = req.params.id;

    const resultado = await service.deleteByIdAsync(id);

    if (!resultado) {
        return res.status(StatusCodes.NOT_FOUND).send('Provincia no encontrada');
    }

    res.status(StatusCodes.OK).send('Provincia eliminada');
});

export default router; 