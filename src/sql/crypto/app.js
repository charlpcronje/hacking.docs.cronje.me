// Require some modules
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Router = require('@koa/router');
const { encrypt, decrypt } = require('./crypto');

// Init the app
const app = new Koa();
// Init the body parser
app.use(bodyParser());
// init the router
const router = new Router();

// Encrypt some regex you can test the values that you are expecting
const cryptKey = "superSecret";
const expectObject = {
    email: "/^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/",
    password: "(?=^.{6,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).*"
};
// Normally you would include some kind of salt her and / or Encryption key
const expect = encrypt(JSON.stringify(expectObject));

const html = `
<form method="POST" action="/formSubmit">
    <input type="text" name="email"/>
    <input type="text" name="password"/>
    <input type="hidden" name="expect" value="${expect}"/>
</form>`;

// Send the above form to the browser
router.get('/', (ctx, next) => {
    return html;
});
  
// Form is submitted
router.post('/',async ctx => {
    // the parsed body will store in ctx.request.body
    // if nothing was parsed, body will be an empty object {}
    ctx.body = ctx.request.body;
    const expect = JSON.parse(decrypt(ctx.body.expect));
    if (expect.email.test(ctx.body.email) && expect.password.test(ctx.body.password)) {
        // Tested that only valid values came through, you should still escape slashes and all that, but this is a way to check that the values you are receiving is what you are expecting
    
    }
});

app
.use(router.routes())
.use(router.allowedMethods());