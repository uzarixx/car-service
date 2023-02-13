import { Markup, Scenes } from 'telegraf';
import { ISceneContext } from '../context/context.interface';
import axios from 'axios';


export const onLogoutUser = new Scenes.BaseScene<ISceneContext>('onLogoutUser');

onLogoutUser.enter(async (ctx) => {
  ctx.reply(`Ви дійсно хочете вийти з акаунту?`, Markup.keyboard([
    Markup.button.callback('Так', 'yes'),
    Markup.button.callback('Ні', 'no'),
  ]).oneTime().resize());
});


onLogoutUser.hears('Так', async (ctx) => {
  try {
    await axios.post(`${process.env.API_URL}/delete-user`, {
        userId: ctx.message?.from.id,
    });
    ctx.scene.enter('auth1');
  } catch (e) {
    ctx.scene.enter('accountMain');
  }
});

onLogoutUser.hears('Ні', (ctx) => {
  return ctx.scene.enter('accountMain');
});