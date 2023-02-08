import { Markup, Scenes } from 'telegraf';
import { ISceneContext } from '../context/context.interface';
import axios from 'axios';

export const accountMain = new Scenes.BaseScene<ISceneContext>('accountMain');
accountMain.enter(async (ctx) => {
  await ctx.reply(`Привіт ${ctx.from?.first_name}. Це особистий кабінет, обери дію!`, Markup.keyboard([
    Markup.button.callback('Налаштування повідомлень', 'cabinet'),
  ]).oneTime().resize());
});

accountMain.hears('Налаштування повідомлень', async (ctx) => {
  const { data } = await axios.get(`${process.env.API_URL}/get-user/${ctx.message?.from.id}`);
  ctx.reply(`Зараз повідомлення ${data.notifications ? 'вмикнуті 🔔' : 'вимкнуті 🔕'}`, Markup.inlineKeyboard([
    Markup.button.callback(`${data.notifications ? 'Вимкнути 🔕' : 'Вмикнути 🔔'}`, 'notificationActive'),
  ]));
});

accountMain.action('notificationActive', async (ctx) => {
  await axios.post(`${process.env.API_URL}/notification-status`, {
    userId: ctx.update.callback_query.from.id,
  });
  ctx.scene.enter('accountMain');
});
