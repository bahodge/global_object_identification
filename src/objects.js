const { encode } = require("./utils");
const User = require("./User");
const Robot = require("./Robot");

const NodeObject = { __resolveType: (obj) => obj.__typename };

const UserObject = {
  id: (obj) => encode(obj.id, "User"),
  robots: (obj, args) => {
    const allRobots = obj.robots
      .map((id) => Robot.findById(id))
      .filter((robot) => !!robot);
    let cursor;

    let filteredRobots = allRobots;
    if (args.first) {
      filteredRobots = allRobots.slice(0, args.first);
    }

    if (args.limit) {
      filteredRobots = filteredRobots.slice(0, args.limit);
    }

    const edges = filteredRobots.map((robot) => ({ node: robot }));

    const cursorId = edges[edges.length - 1]?.node?.id;
    cursor = cursorId ? encode(cursorId, "Robot") : null;

    return {
      cursor,
      edges,
    };
  },
};

const RobotObject = {
  id: (obj) => encode(obj.id, "Robot"),
  maintainers: (obj) =>
    obj.maintainers.map((id) => User.findById(id)).filter((robot) => !!robot),
};

module.exports = { NodeObject, UserObject, RobotObject };
