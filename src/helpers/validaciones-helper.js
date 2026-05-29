class ValidacionesHelper {

    static validarProvincia(province) {

        if (!province.name || province.name.trim() === "") {
            return "El nombre es obligatorio";
        }

        if (province.name.length < 3) {
            return "El nombre debe tener mínimo 3 caracteres";
        }

        if (!province.full_name || province.full_name.trim() === "") {
            return "El full_name es obligatorio";
        }

        return "";
    }
}

export default ValidacionesHelper;