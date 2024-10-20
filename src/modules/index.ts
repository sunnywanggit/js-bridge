/**
 * 模块功能罗列语法糖映射，消除业务层魔法字符串
 */
import { Call, Sugar } from '../types/private';
import router from './router';
import share from './share';
import image from './image';
import ui from './ui';
import config from './config';
import stat from './stat';
import task from './task';
import scan from './scan';
import user from './user';

export default function createSugar(call: Call): Sugar {
  const sugar: Sugar = {
    router,
    share,
    image,
    ui,
    config,
    stat,
    task,
    scan,
    user,
  };

  // 遍历模块，自动注入功能名
  const recursion = (parent: Sugar, key: string, name: string) => {
    const value: Sugar | Function = parent[key];
    const newName = `${name ? `${name}.` : ''}${key}`;
    if (typeof value === 'function') {
      // eslint-disable-next-line no-param-reassign
      parent[key] = value.bind({
        functionName: newName,
        call,
      });
      return;
    }
    Object.keys(value).forEach((child: string) => {
      recursion(value, child, newName);
    });
  };
  Object.keys(sugar).forEach((key) => {
    recursion(sugar, key, '');
  });

  return sugar;
}
