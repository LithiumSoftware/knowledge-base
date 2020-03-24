var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from "react";
import Head from "next/head";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import fetch from "isomorphic-unfetch";
import Cookies from "js-cookie";
import { getDataFromTree } from "@apollo/react-ssr";
var globalApolloClient = null;
/**
 * Creates and provides the apolloContext
 * to a next.js PageTree. Use it by wrapping
 * your PageComponent via HOC pattern.
 * @param {Function|Class} PageComponent
 * @param {Object} [config]
 * @param {Boolean} [config.ssr=true]
 */
export function withApollo(PageComponent, _a) {
    var _this = this;
    var _b = (_a === void 0 ? {} : _a).ssr, ssr = _b === void 0 ? true : _b;
    var WithApollo = function (_a) {
        var apolloClient = _a.apolloClient, apolloState = _a.apolloState, pageProps = __rest(_a, ["apolloClient", "apolloState"]);
        var client = apolloClient || initApolloClient(apolloState);
        return (<ApolloProvider client={client}>
        <PageComponent {...pageProps}/>
      </ApolloProvider>);
    };
    // Set the correct displayName in development
    if (process.env.NODE_ENV !== "production") {
        var displayName = PageComponent.displayName || PageComponent.name || "Component";
        if (displayName === "App") {
            console.warn("This withApollo HOC only works with PageComponents.");
        }
        WithApollo.displayName = "withApollo(" + displayName + ")";
    }
    if (ssr || PageComponent.getInitialProps) {
        WithApollo.getInitialProps = function (ctx) { return __awaiter(_this, void 0, void 0, function () {
            var AppTree, apolloClient, pageProps, error_1, apolloState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        AppTree = ctx.AppTree;
                        apolloClient = (ctx.apolloClient = initApolloClient());
                        pageProps = {};
                        if (!PageComponent.getInitialProps) return [3 /*break*/, 2];
                        return [4 /*yield*/, PageComponent.getInitialProps(ctx)];
                    case 1:
                        pageProps = _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!(typeof window === "undefined")) return [3 /*break*/, 7];
                        // When redirecting, the response is finished.
                        // No point in continuing to render
                        if (ctx.res && ctx.res.finished) {
                            return [2 /*return*/, pageProps];
                        }
                        if (!ssr) return [3 /*break*/, 7];
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        // Run all GraphQL queries
                        return [4 /*yield*/, getDataFromTree(<AppTree pageProps={__assign(__assign({}, pageProps), { apolloClient: apolloClient })}/>)];
                    case 4:
                        // Run all GraphQL queries
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _a.sent();
                        // Prevent Apollo Client GraphQL errors from crashing SSR.
                        // Handle them in components via the data.error prop:
                        // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
                        console.error("Error while running `getDataFromTree`", error_1);
                        return [3 /*break*/, 6];
                    case 6:
                        // getDataFromTree does not call componentWillUnmount
                        // head side effect therefore need to be cleared manually
                        Head.rewind();
                        _a.label = 7;
                    case 7:
                        apolloState = apolloClient.cache.extract();
                        return [2 /*return*/, __assign(__assign({}, pageProps), { apolloState: apolloState })];
                }
            });
        }); };
    }
    return WithApollo;
}
/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param  {Object} initialState
 */
function initApolloClient(initialState) {
    // Make sure to create a new client for every server-side request so that data
    // isn't shared between connections (which would be bad)
    if (typeof window === "undefined") {
        return createApolloClient(initialState);
    }
    // Reuse client on the client-side
    if (!globalApolloClient) {
        globalApolloClient = createApolloClient(initialState);
    }
    return globalApolloClient;
}
/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 */
function createApolloClient(initialState) {
    if (initialState === void 0) { initialState = {}; }
    var token = Cookies.get("token");
    // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
    return new ApolloClient({
        ssrMode: typeof window === "undefined",
        link: new HttpLink({
            uri: "http://localhost:3000/api/graphql",
            credentials: "same-origin",
            headers: {
                "malicious-token": "" + token,
            },
            fetch: fetch,
        }),
        cache: new InMemoryCache().restore(initialState),
    });
}
