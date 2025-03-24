import { ConsoleLogger, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { promises as fsPromises } from 'fs';
import * as path from 'path';

@Injectable()
export class MyLoggerService extends ConsoleLogger {
  async logToFile(entry) {
    const fromatedEntry = `${Intl.DateTimeFormat('en-IN', {
      dateStyle: 'short',
      timeStyle: 'short',
      timeZone: 'Asia/Calcutta',
    }).format(new Date())}\t${entry}\n`;

    try {
      if (!fs.existsSync(path.join(__dirname, '..', '..', 'logs'))) {
        console.log(23);
        await fsPromises.mkdir(path.join(__dirname, '..', '..', 'logs'));
      }
      await fsPromises.appendFile(
        path.join(__dirname, '..', '..', 'logs', 'myLogFile.log'),
        fromatedEntry,
      );
    } catch (error) {
      if (error instanceof Error) console.error(error);
    }
  }

  log(message: any, context?: string) {
    const entry = `${message}\t${context}`;
    void this.logToFile(entry);
    super.log(message, context);
  }

  error(message: any, stackOrContext?: string) {
    const entry = `${message}\t${stackOrContext}`;
    void this.logToFile(entry);
    super.error(message, stackOrContext);
  }
}
