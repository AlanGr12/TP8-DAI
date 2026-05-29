import { Client } from 'pg';
import DBConfig from '../configs/db-config.js';
import LogHelper from '../helpers/log-helper.js';

export default class ProvinceRepository {

    getAllAsync = async () => {

        let returnArray = [];

        const client = new Client(DBConfig);

        try {

            await client.connect();

            const sql = 'SELECT * FROM provinces';

            const result = await client.query(sql);

            returnArray = result.rows;

        } catch (error) {

            LogHelper.logError(error);

        } finally {

            await client.end();
        }

        return returnArray;
    }

    getByIdAsync = async (id) => {

        let returnEntity = null;

        const client = new Client(DBConfig);

        try {

            await client.connect();

            const sql = 'SELECT * FROM provinces WHERE id = $1';

            const values = [id];

            const result = await client.query(sql, values);

            if (result.rows.length > 0) {

                returnEntity = result.rows[0];
            }

        } catch (error) {

            LogHelper.logError(error);

        } finally {

            await client.end();
        }

        return returnEntity;
    }

    createAsync = async (province) => {

        const client = new Client(DBConfig);

        try {

            await client.connect();

            const sql = `
            INSERT INTO provinces
            (name, full_name, latitude, longitude, display_order)
            VALUES ($1, $2, $3, $4, $5)
            `;

            const values = [
                province.name,
                province.full_name,
                province.latitude,
                province.longitude,
                province.display_order
            ];

            await client.query(sql, values);

            return true;

        } catch (error) {

            LogHelper.logError(error);

            return false;

        } finally {

            await client.end();
        }
    }

    updateAsync = async (province) => {

        const client = new Client(DBConfig);

        try {

            await client.connect();

            const sql = `
            UPDATE provinces
            SET
            name = $1,
            full_name = $2,
            latitude = $3,
            longitude = $4,
            display_order = $5
            WHERE id = $6
            `;

            const values = [
                province.name,
                province.full_name,
                province.latitude,
                province.longitude,
                province.display_order,
                province.id
            ];

            const result = await client.query(sql, values);

            return result.rowCount > 0;

        } catch (error) {

            LogHelper.logError(error);

            return false;

        } finally {

            await client.end();
        }
    }

    deleteByIdAsync = async (id) => {

        const client = new Client(DBConfig);

        try {

            await client.connect();

            const sql = 'DELETE FROM provinces WHERE id = $1';

            const values = [id];

            const result = await client.query(sql, values);

            return result.rowCount > 0;

        } catch (error) {

            LogHelper.logError(error);

            return false;

        } finally {

            await client.end();
        }
    }
}