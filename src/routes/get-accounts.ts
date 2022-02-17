import Router from 'koa-router';
const router = new Router();

router.get('/account', async ctx => {
  try {
      ctx.body = await localAuth.getAccounts();
  } catch (e) {
      ctx.status = e.status || 500;
      ctx.body = `Could not make account request. ${e.message}`;
  }
})