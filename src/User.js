const db = require("./db.json");

module.exports = class User {
  constructor(args) {
    this.id = args.id;
    this.name = args.name;
    this.robots = args.robots;
  }

  static findById = (id) => db.users.find((u) => u.id === id);

  static getAll = () => db.users;
};
