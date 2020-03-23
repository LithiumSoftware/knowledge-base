import fs from "fs";
import path from "path";
import Sequelize from "sequelize";

const config = require(__dirname + "/../config.json")[process.env.NODE_ENV];

const sequelize = new Sequelize(
  `postgres://${config.username}:${config.password}@postgres:5432/${config.database}`
);

const db = {};
const route = `${process.cwd()}/pages/api/models`;

fs.readdirSync(route)
  .filter(
    file =>
      file.indexOf(".") !== 0 &&
      file !== path.basename(__filename) &&
      file.slice(-3) === ".js"
  )
  .forEach(file => {
    const model = sequelize["import"](path.join(route, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) db[modelName].associate(db);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.sequelize.sync();

export default db;
