import { Markup, Scenes } from 'telegraf';
import { ISceneContext } from '../context/context.interface';
import axios from 'axios';

export const auth1 = new Scenes.BaseScene<ISceneContext>('auth1');
export const auth2 = new Scenes.BaseScene<ISceneContext>('auth2');
auth1.enter(ctx => ctx.reply('Введіть пошту з якою ви реєструвались на сайті'));
auth1.on('message', async (ctx) => {
  if (ctx.message && 'text' in ctx.message)
    try {
      await axios.post(`${process.env.API_URL}/create-user`, {
        userId: ctx.message.from.id,
        email: ctx.message.text,
      });
      await ctx.reply('На вашу пошту надіслано повідомлення');
      return ctx.scene.enter('auth2');
    } catch (e: any) {
      if (e.response.data === 'Ви вже зареєстровані') return await ctx.scene.enter('accountMain');
      return await ctx.scene.enter('auth1');
    }
});
auth2.enter(ctx => ctx.reply('Введіть код який вам був надіслан'));
auth2.on('message', async (ctx) => {
  if (ctx.message && 'text' in ctx.message)
    try {
      const { data } = await axios.post(`${process.env.API_URL}/activate-user`, {
        userId: ctx.message.from.id,
        token: ctx.message.text,
      });
      if (ctx.message.text === data)
        ctx.reply('Ваш код дійсний, натисніть щоб продовжити', Markup.inlineKeyboard([
          Markup.button.callback('Продовжити', 'account'),
        ]));
      else
        ctx.reply(`Ваш код не дійсний`);
      ctx.scene.enter('auth1');

    } catch (e: any) {
      ctx.reply('Помилка');
      ctx.scene.enter('auth1');
    }
});
auth2.action('account', (ctx) => {
  ctx.scene.enter('accountMain');
  return ctx.scene.leave();
});
