import {ConfigService} from './config/config.service';
import {IConfigService} from './config/config.interface';
import {Scenes, Telegraf} from 'telegraf';
import {IBotContext, ISceneContext} from './context/context.interface';
import {Command} from './commands/command.class';
import {StartCommand} from './commands/start.command';
import LocalSession from 'telegraf-session-local';

const {enter} = Scenes.Stage
const greeterScene = new Scenes.BaseScene<ISceneContext>("greeter");
greeterScene.enter(ctx => ctx.reply("Hi"));
greeterScene.leave(ctx => ctx.reply("Bye"));
greeterScene.hears("hi", enter<ISceneContext>("greeter"));
greeterScene.on("message", ctx => ctx.replyWithMarkdownV2("Send `hi`"));

class Bot {
    bot: Telegraf<IBotContext>;
    commands: Command[] = [];

    constructor(private readonly configService: IConfigService) {

        this.bot = new Telegraf<IBotContext>(this.configService.get('TOKEN'));
        this.bot.use(new LocalSession({database: 'sessions.json'}).middleware());
        this.bot.use(new Scenes.Stage<any>([greeterScene], {ttl: 10}))
    }

    init() {
        this.commands = [new StartCommand(this.bot)];
        for (const command of this.commands) {
            command.handle();
        }
        this.bot.command('test', ctx => ctx.scene.enter('greeter'))
        this.bot.launch();
    }

}

const bot = new Bot(new ConfigService());
bot.init();