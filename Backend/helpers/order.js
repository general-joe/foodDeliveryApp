const prisma = require("../utils/prismaUtil");

const saveOrder = async (data) => {
     const order = await prisma.order.create({
          data,
     });
     return order;
};
