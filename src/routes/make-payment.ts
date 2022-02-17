import Router from "koa-router";
import { getFirstAccountId } from "src/stitch-queries/data";
import { requestPayment, requestUserConstrainedPayment } from "src/stitch-queries/payments";
const router = new Router();

/**
 * Regular payment endpoint
 * Query params: amount in ZAR
 */
router.get("/payment", async (ctx) => {
  try {
    let response = await requestPayment(ctx.query.amount);
    console.log("REPONSE ", response);
    if (
      response.data &&
      response.data.userPaymentInitiationRequestCreate &&
      response.data.userPaymentInitiationRequestCreate
        .paymentInitiationRequest &&
      response.data.userPaymentInitiationRequestCreate.paymentInitiationRequest
        .url
    ) {
      const url = `${response.data.userPaymentInitiationRequestCreate.paymentInitiationRequest.url}?redirect_uri=${process.env.CONFIDENTIAL_REDIRECT_URI}`;
      paymentId =
        response.data.userPaymentInitiationRequestCreate
          .paymentInitiationRequest.id;
      ctx.redirect(url);
    } else {
      ctx.throw(`Payment failed: ${JSON.stringify(response.errors)}`);
    }
  } catch (e) {
    ctx.status = e.status || 500;
    ctx.body = `Could not make payment. ${e}`;
  }
});

/**
 * User-constrained Endpoint can only be used for confidential clients
 * Query params: amount in ZAR
 */
router.get("/user-payment", async (ctx) => {
  try {
    let accountId = await getFirstAccountId();
    console.log("Account id", accountId);
    if (accountId) {
      let response = await requestUserConstrainedPayment(
        ctx.query.amount,
        accountId
      );
      console.log("REPONSE ", response);
      if (
        response.data &&
        response.data.userPaymentInitiationRequestCreate &&
        response.data.userPaymentInitiationRequestCreate
          .paymentInitiationRequest &&
        response.data.userPaymentInitiationRequestCreate
          .paymentInitiationRequest.url
      ) {
        const url = `${response.data.userPaymentInitiationRequestCreate.paymentInitiationRequest.url}?redirect_uri=${process.env.CONFIDENTIAL_REDIRECT_URI}`;
        paymentId =
          response.data.userPaymentInitiationRequestCreate
            .paymentInitiationRequest.id;
        ctx.redirect(url);
      } else {
        ctx.throw(`Payment failed: `, response);
      }
    }
  } catch (e) {
    ctx.status = e.status || 500;
    ctx.body = `Could not request token. ${e.message}`;
  }
});
