import {Command} from './command.class';
import {Markup, Telegraf} from 'telegraf';
import {IBotContext} from '../context/context.interface';

export class AccountCommand extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.command('account', (ctx) => {
      ctx.scene.enter('accountMain')
    });
  }
}