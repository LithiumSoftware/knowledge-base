var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import gql from "graphql-tag";
export default gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  mutation CreateArticle($title: String!, $parentId: ID) {\n    createArticle(input: { title: $title, parentId: $parentId }) {\n      id\n      title\n    }\n  }\n"], ["\n  mutation CreateArticle($title: String!, $parentId: ID) {\n    createArticle(input: { title: $title, parentId: $parentId }) {\n      id\n      title\n    }\n  }\n"])));
var templateObject_1;
