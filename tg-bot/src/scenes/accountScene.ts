import { Markup, Scenes } from 'telegraf';
import { ISceneContext } from '../context/context.interface';
import axios from 'axios';

export const accountMain = new Scenes.BaseScene<ISceneContext>('accountMain');
accountMain.enter(async (ctx) => {
  try {
    await ctx.message?.from.id && await axios.get(`${process.env.API_URL}/get-user/${ctx.message?.from.id}`);
    ctx.reply(`Привіт ${ctx.from?.first_name}. Це особистий кабінет, обери дію!`, Markup.keyboard([
      Markup.button.callback('Налаштування повідомлень', 'cabinet'),
    ]).oneTime().resize());
  } catch (e) {
    ctx.scene.enter('isNotAuth');
  }
});

accountMain.hears('Налаштування повідомлень', async (ctx) => {
  try {
    const { data } = await axios.get(`${process.env.API_URL}/get-user/${ctx.message?.from.id}`);
    ctx.reply(`Зараз повідомлення ${data.notifications ? 'вмикнуті 🔔' : 'вимкнуті 🔕'}`, Markup.inlineKeyboard([
      Markup.button.callback(`${data.notifications ? 'Вимкнути 🔕' : 'Вмикнути 🔔'}`, 'notificationActive'),
      Markup.button.callback(`Повернутись назад`, 'backToAccount'),
    ]));
  } catch (e) {
    ctx.scene.enter('isNotAuth');
  }

});

accountMain.action('notificationActive', async (ctx) => {
  try {
    await axios.post(`${process.env.API_URL}/notification-status`, {
      userId: ctx.update.callback_query.from.id,
    });
    ctx.scene.enter('accountMain');
  } catch (e) {
    ctx.scene.enter('isNotAuth');
  }
});

accountMain.action('backToAccount', (ctx) => {
  ctx.scene.enter('accountMain');
});
