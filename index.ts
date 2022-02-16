import Koa from 'koa';
import router from './src/router.js';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import forceSSL from 'koa-force-ssl';
import bodyParser from 'koa-bodyparser-graphql';
import cors from '@koa/cors';


export function hello(world: string = 'world'): string {
  return `Hello ${world}! `;
}

dotenv.config()
const app = new Koa();
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

app
    .use(cors({ credentials: true }))

app.on('error', (err: any) => {
  console.error('server error', err)
});

app.use(async (_ctx: any, next: () => any) => {
  await next();
});

// app.keys = ['access_token', 'refresh_token'];
//app.use(grant(getPublicConfig));
app.use(router.routes())
app.use(forceSSL());

// SSL options
var options = {
  key: fs.readFileSync('privatekey.key'),
  cert: fs.readFileSync('certificate.crt')
};

// start the server
http.createServer(app.callback()).listen(5000);
https.createServer(options, app.callback()).listen(3000);
https.createServer(options, app.callback()).listen(9000);
