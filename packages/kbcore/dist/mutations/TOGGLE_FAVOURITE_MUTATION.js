var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import gql from "graphql-tag";
export default gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  mutation ToggleFavourite($articleId: ID!) {\n    toggleFavourite(articleId: $articleId)\n  }\n"], ["\n  mutation ToggleFavourite($articleId: ID!) {\n    toggleFavourite(articleId: $articleId)\n  }\n"])));
var templateObject_1;
