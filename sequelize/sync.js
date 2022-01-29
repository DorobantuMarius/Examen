import { Sequelize } from "sequelize";
import { sequelizeConfigProps } from "../config.js";
import { sequelizeOperationsAPI } from "./operations-api.js";

const sequelizeConnection = new Sequelize(
  "Cinema",
  "root",
  "",
  sequelizeConfigProps
);

export const CrewMembers = sequelizeConnection.define("CrewMembers", {
  CrewMemberId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  Name: {
    type: Sequelize.STRING,
  },
  Role: {
    type: Sequelize.STRING,
  },
});


export const Movies = sequelizeConnection.define("Movies", {
  MovieId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  Title: {
    type: Sequelize.STRING,
  },
  Date: {
    type: Sequelize.STRING,
  },
});


Movies.hasMany(CrewMembers, {
  foreignKey: "MovieId",
  onDelete: "CASCADE",
  onUpdate: "RESTRICT",
  foreignKeyConstraint: true,
});

sequelizeOperationsAPI.init(sequelizeConnection);

export { sequelizeConnection };