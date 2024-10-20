import { Sugar } from './types/private';
import bridge from './plugins/bridge';
import './plugins/listener';
import createSugar from './modules';

export const { call } = bridge;

const sugar: Sugar = createSugar(call);

export const {
  router,
  share,
  image,
  ui,
  config,
  stat,
  task,
  scan,
} = sugar;

export default {
  call,
  ...sugar,
};
