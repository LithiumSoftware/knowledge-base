var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import gql from "graphql-tag";
export default gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  mutation UpdateArticle($id: ID, $title: String, $body: String) {\n    updateArticle(input: { id: $id, title: $title, body: $body }) {\n      updatedAt\n    }\n  }\n"], ["\n  mutation UpdateArticle($id: ID, $title: String, $body: String) {\n    updateArticle(input: { id: $id, title: $title, body: $body }) {\n      updatedAt\n    }\n  }\n"])));
var templateObject_1;
