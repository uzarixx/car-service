import { Markup, Scenes } from 'telegraf';
import { ISceneContext } from '../context/context.interface';


export const isNotAuth = new Scenes.BaseScene<ISceneContext>('isNotAuth');

isNotAuth.enter(async (ctx) => {
    await ctx.reply(`Щоб зайти в особистий кабінет спочатку вам потрібно авторізуватись`, Markup.keyboard([
      Markup.button.callback('Авторізуватись', 'start'),
    ]).oneTime().resize());
});


isNotAuth.hears('Авторізуватись', (ctx) => {
  return ctx.scene.enter('auth1')
})