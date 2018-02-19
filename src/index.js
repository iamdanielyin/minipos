/**
 * 入口文件
 */
const path = require('path');
const ibird = require('ibird');
const mongooseAddon = require('ibird-mongoose');
const redisAddon = require('ibird-redis');

const app = ibird.newApp({
  prefix: '/api',
  cross: {
    credentials: true
  },
  weixin: {
    tokenKey: 'dexdev_tools_access_token',
    ticketKey: 'dexdev_tools_ticket',
    appid: 'wxa8ee312a1ad60f61',
    secret: 'e798f5f17e6b20dfbde33ed28a150412'
  },
  redis: 'redis://:F7B73743E7AEDD58E58900F4782550BF@www.wosoft.me:6412',
  mongo: 'mongodb://wosoft:wosoft2016@www.wosoft.me:20102/minipos?authSource=admin',
  middlewareDir: path.join(__dirname, 'middleware'),
  routesDir: path.join(__dirname, 'routes')
});

app.import(redisAddon);
app.import(mongooseAddon, {
  mongo: app.c().mongo,
  metadataPath: '/metadata',
  dir: path.join(__dirname, 'models')
});

app.play();