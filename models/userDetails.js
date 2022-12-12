const { DATE } = require('sequelize')
const Sequelize = require('sequelize')
const sequelize = require('../db')
const cronJobs = sequelize.define(
  'CronJob',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: true
    },
    UserName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    EmailId: {
      type: Sequelize.STRING,
      allowNull: false
    },
    ExpiryDate: {
      type: Sequelize.DATEONLY,
      defaultValue: Date.now(),
      allowNull: false
    },
    ValidityState: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
)
module.exports = cronJobs
