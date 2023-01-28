import { Markup, Scenes } from 'telegraf';
import {ISceneContext} from "../context/context.interface";

export const auth1 = new Scenes.BaseScene<ISceneContext>("auth1");
export const auth2 = new Scenes.BaseScene<ISceneContext>("auth2")
auth1.enter(ctx => ctx.reply("Введіть вашу пошту"));
auth1.on("message", async ctx => {
    await ctx.reply('На вашу пошту надіслано повідомлення')
    return ctx.scene.enter("auth2")
});
auth2.enter(ctx => ctx.reply("Введіть код який вам був надіслан"));
auth2.on('text', (ctx) => {
    if (ctx.message.text === '1337') {
        ctx.reply('Ваш код дійсний, натисніть щоб продовжити', Markup.inlineKeyboard([
            Markup.button.callback('Продовжити', 'account'),
        ]));
    } else {
        ctx.reply(`Ваш код не дійсний`)
        ctx.scene.enter('auth1')
    }
})
auth2.action('account', (ctx) => {
    ctx.scene.enter('accountMain')
    return ctx.scene.leave()
})
