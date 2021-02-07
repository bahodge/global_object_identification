const encode = (id, __typename) => {
  return Buffer.from(`${id}:${__typename}`, "utf8").toString("base64");
};

const decode = (objectId) => {
  const decoded = Buffer.from(objectId, "base64").toString();
  const parts = decoded.split(":");
  return {
    id: parts[0],
    __typename: parts[1],
  };
};
module.exports = {
  encode,
  decode,
};
