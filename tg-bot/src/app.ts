import { ConfigService } from './config/config.service';
import { IConfigService } from './config/config.interface';
import { Scenes, Telegraf } from 'telegraf';
import { IBotContext } from './context/context.interface';
import { Command } from './commands/command.class';
import { StartCommand } from './commands/start.command';
import LocalSession from 'telegraf-session-local';
import { auth1, auth2 } from './scenes/authScene';
import { accountMain } from './scenes/accountScene';


class Bot {
  bot: Telegraf<IBotContext>;
  commands: Command[] = [];

  constructor(private readonly configService: IConfigService) {
    this.bot = new Telegraf<IBotContext>(this.configService.get('TOKEN'));
    this.bot.use(new LocalSession({ database: 'sessions.json' }).middleware());
    this.bot.use(new Scenes.Stage<any>([auth1, auth2, accountMain], { ttl: 10 }));
  }

  init() {
    this.commands = [new StartCommand(this.bot)];
    for (const command of this.commands) {
      command.handle();
    }
    this.bot.launch();
  }

}

const bot = new Bot(new ConfigService());
bot.init();