const { decode } = require("./utils");
const { UserObject, RobotObject, NodeObject } = require("./objects");

const User = require("./User");
const Robot = require("./Robot");

const modelsByTypename = { User, Robot };

const usersResolver = () => User.getAll();
const robotsResolver = () => Robot.getAll();

const nodeResolver = (_root, args, _context, _info) => {
  const { __typename, id } = decode(args.id);

  const Model = modelsByTypename[__typename];
  if (id && __typename && Model) {
    const node = Model.findById(id);
    return {
      ...node,
      __typename,
    };
  }
  return null;
};

const nodesResolver = (_root, args, _context, _info) => {
  const uniqueEncodedIds = Array.from(new Set(args.ids));

  return uniqueEncodedIds
    .map((encodedId) => {
      const { __typename, id } = decode(encodedId);
      const Model = modelsByTypename[__typename];

      if (id && __typename && Model) {
        const node = Model.findById(id);
        return {
          ...node,
          __typename,
        };
      }
      return null;
    })
    .filter((node) => !!node);
};

module.exports = {
  Query: {
    node: nodeResolver,
    nodes: nodesResolver,
    users: usersResolver,
    robots: robotsResolver,
  },
  User: UserObject,
  Robot: RobotObject,
  Node: NodeObject,
};
