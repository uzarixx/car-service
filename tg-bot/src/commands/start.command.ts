import { Command } from './command.class';
import { Markup, Telegraf } from 'telegraf';
import { IBotContext } from '../context/context.interface';

export class StartCommand extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.start((ctx) => {
      ctx.session.userId = ctx.message.chat.id;
      ctx.session.username = ctx.message.from.first_name;
      ctx.reply('Щоб розпочати натисніть кнопку', Markup.inlineKeyboard([
        Markup.button.callback('Реєстрація', 'auth'),
      ]));
    });
    this.bot.action('auth', (ctx) => {
      ctx.scene.enter('auth1');
    });
  }
}