import Router from "next/router";
import cookie from "js-cookie";
import nextCookies from "next-cookies";
export var auth = function (ctx) {
    var signedIn = nextCookies(ctx).signedIn;
    if (!signedIn) {
        redirect({ ctx: ctx, uri: "/" });
    }
    return signedIn;
};
export var redirect = function (_a) {
    var ctx = _a.ctx, uri = _a.uri;
    if (ctx === null || ctx === void 0 ? void 0 : ctx.req) {
        ctx.res.writeHead(302, { Location: uri });
        ctx.res.end();
        return;
    }
    else {
        Router.push(uri);
    }
};
export var logout = function () {
    cookie.remove("signedIn");
    Router.push("/");
};
