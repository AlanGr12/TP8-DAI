import { Client } from 'pg';
import DBConfig from '../configs/db-config.js';
import LogHelper from '../helpers/log-helper.js';

export default class ProvinceRepository {

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