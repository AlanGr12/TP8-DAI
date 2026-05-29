import ProvinceRepository from '../repositories/province-repository.js';
import ValidacionesHelper from '../helpers/validaciones-helper.js';

export default class ProvinceService {

    repository = new ProvinceRepository();

    getAllAsync = async () => {
        return await this.repository.getAllAsync();
    }

    getByIdAsync = async (id) => {
        return await this.repository.getByIdAsync(id);
    }

    createAsync = async (province) => {

        const error = ValidacionesHelper.validarProvincia(province);

        if (error !== "") {
            return error;
        }

        return await this.repository.createAsync(province);
    }

    updateAsync = async (province) => {

        const error = ValidacionesHelper.validarProvincia(province);

        if (error !== "") {
            return error;
        }

        return await this.repository.updateAsync(province);
    }

    deleteByIdAsync = async (id) => {
        return await this.repository.deleteByIdAsync(id);
    }
}