import Router from 'koa-router';
import { getPaymentStatus } from 'src/stitch-queries/payments';
const router = new Router();

router.get('/payment-status', async ctx => {
    try {
      let response = await getPaymentStatus(paymentId);
      ctx.body = response;
    } catch (e) {
      ctx.status = e.status || 500;
      ctx.body = `Could not request token. ${e.message}`;
    }
  });