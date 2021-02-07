const db = require("./db.json");

module.exports = class Robot {
  constructor(args) {
    this.id = args.id;
    this.name = args.name;
    this.maintainers = args.maintainers;
  }

  static findById = (id) => db.robots.find((u) => u.id === id);

  static getAll = () => db.robots;
};
