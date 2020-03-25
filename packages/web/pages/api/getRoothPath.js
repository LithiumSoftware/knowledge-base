export const moment = require("moment");

export const getRootPath = async (article, isSlug = true) => {
  const path = [];

  var parent = article.parentId ? article : null;

  while (parent) {
    const newParent = await parent.getParent();
    if (newParent?.dataValues) {
      const newNode = isSlug
        ? `${newParent.dataValues.title}-${newParent.dataValues.id}`
        : `${newParent.dataValues.id}`;
      path.push(newNode);
      parent = newParent;
    } else {
      parent = null;
    }
  }

  return path.reverse();
};
