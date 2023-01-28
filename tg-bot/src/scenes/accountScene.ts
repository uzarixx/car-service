import { Markup, Scenes } from 'telegraf';
import { ISceneContext } from '../context/context.interface';

export const accountMain = new Scenes.BaseScene<ISceneContext>('accountMain');
accountMain.enter(ctx => ctx.reply('Особистий кабінет, оберіть пункт', Markup.inlineKeyboard([
  Markup.button.callback('Вимкнути повідомлення', 'notifications'),
])));
