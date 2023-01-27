import { Context, Scenes } from 'telegraf';

export interface SessionData {
  courseLike: boolean;
}

export interface IBotContext extends Context {
  session: SessionData;
  scene: Scenes.SceneContextScene<ISceneContext>;
}

export interface ISceneContext extends Context {
  myContextProp: string;
  scene: Scenes.SceneContextScene<ISceneContext>;
}