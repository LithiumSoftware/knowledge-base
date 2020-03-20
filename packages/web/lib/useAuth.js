import Router from "next/router";
import cookie from "js-cookie";
import nextCookies from "next-cookies";

export const auth = ctx => {
  const { signedIn } = nextCookies(ctx);

  if (!signedIn) {
    redirect({ ctx, uri: "/" });
  }

  return signedIn;
};

export const redirect = ({ ctx, uri }) => {
  if (ctx?.req) {
    ctx.res.writeHead(302, { Location: uri });
    ctx.res.end();
    return;
  } else {
    Router.push(uri);
  }
};

export const logout = () => {
  cookie.remove("signedIn");
  Router.push("/");
};
