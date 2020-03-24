var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import gql from "graphql-tag";
export default gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query Article($id: ID!) {\n    article(id: $id) {\n      id\n      title\n      body\n      rootPath\n      author {\n        id\n        username\n      }\n      updatedAt\n    }\n  }\n"], ["\n  query Article($id: ID!) {\n    article(id: $id) {\n      id\n      title\n      body\n      rootPath\n      author {\n        id\n        username\n      }\n      updatedAt\n    }\n  }\n"])));
var templateObject_1;
