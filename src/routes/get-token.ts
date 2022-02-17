import Router from 'koa-router';
import { getClientToken } from 'src/services/token';
const router = new Router();

/**
 * Use this method to retrieve access token with token in .env
 */
router.get('/token', async ctx => {
try {
    let results = await getClientToken();

    ctx.status = 200;
    ctx.body = {
        message: 'Successfully authed with confidential client',
        token: results.access_token
    }

} catch (e) {
    ctx.status = e.status || 500;
    ctx.body = `Could not request token. ${e.message}`;
}
});

/**
 * Use this method to retrieve access token by specifying clientId in request string
 */
router.get('/token/{client_id}', async ctx => {
    try {
        const clientId = ctx.request.querystring; // test this
        let results = await getClientToken(clientId);
    
        ctx.status = 200;
        ctx.body = {
            message: 'Successfully authed with confidential client',
            token: results.access_token
        }
    
    } catch (e) {
        ctx.status = e.status || 500;
        ctx.body = `Could not request token. ${e.message}`;
    }
    });