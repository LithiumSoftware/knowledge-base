var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import gql from "graphql-tag";
export default gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query Articles {\n    articles {\n      id\n      title\n      parent {\n        id\n      }\n    }\n  }\n"], ["\n  query Articles {\n    articles {\n      id\n      title\n      parent {\n        id\n      }\n    }\n  }\n"])));
var templateObject_1;
