const db = require("../models/index");
const getGroupWithRoles = async (user) => {
  let abi = await db.position.findOne({
    where: {
      id: user.positionId,
    },
    include: [
      {
        model: db.ability,
        attributes: ["id", "name", "url", "description"],
        through: { attributes: [] },
      },
    ],
  });
  return abi;
};
module.exports = { getGroupWithRoles };
