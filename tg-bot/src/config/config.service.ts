import { config, DotenvParseOutput } from 'dotenv';
import { IConfigService } from './config.interface';

export class ConfigService implements IConfigService {
  private config: DotenvParseOutput;
  constructor() {
    const { error, parsed } = config();
    if (error) {
      throw new Error('Не вдалось знайти файл .env');
    }
    if (!parsed) {
      throw new Error('Пустий файл .env');
    }
    this.config = parsed;
  }
  get(key: string): string {
    const res = this.config[key];
    if (!res) {
      throw new Error('Такого ключа немає');
    }
    return res;
  }
}