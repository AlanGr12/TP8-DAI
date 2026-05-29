import 'dotenv/config';
import fs from 'fs';

class LogHelper {

    constructor() {
        this.filePath = process.env.LOG_FILE_PATH;
        this.fileName = process.env.LOG_FILE_NAME;
        this.logToFileEnabled = process.env.LOG_TO_FILE_ENABLED === 'true';
        this.logToConsoleEnabled = process.env.LOG_TO_CONSOLE_ENABLED === 'true';
    }

    logError(errorObject) {

        const mensaje = `${new Date().toISOString()} - ${errorObject.message}\n${errorObject.stack}\n\n`;

        if (this.logToConsoleEnabled) {
            console.log(mensaje);
        }

        if (this.logToFileEnabled) {

            if (!fs.existsSync(this.filePath)) {
                fs.mkdirSync(this.filePath);
            }

            fs.appendFileSync(this.filePath + this.fileName, mensaje);
        }
    }
}

export default new LogHelper();