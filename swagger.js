import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'API de Provincias - TP8 DAI',
        description: 'Documentación generada con Swagger para la API de provincias del TP8. Permite consultar, crear, actualizar y eliminar provincias.',
        version: '1.0.0'
    },
    host: 'localhost:3000',
    basePath: '/',
    schemes: ['http'],
    tags: [
        {
            name: 'Provincias',
            description: 'Operaciones sobre el recurso Provincia'
        }
    ],
    definitions: {
        Province: {
            id: 1,
            name: 'Buenos Aires',
            full_name: 'Provincia de Buenos Aires',
            latitude: -34.6,
            longitude: -58.4,
            display_order: 1
        },
        ProvinceInput: {
            name: 'Buenos Aires',
            full_name: 'Provincia de Buenos Aires',
            latitude: -34.6,
            longitude: -58.4,
            display_order: 1
        }
    }
};

const outputFile = './swagger-output.json';
const routes = ['./index.js'];

swaggerAutogen()(outputFile, routes, doc);