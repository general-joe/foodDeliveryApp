const prisma = require("../utils/prismaUtil");

const getCartegories = async () => {
     const cartegories = await prisma.category.findMany({
          orderBy: {
               createdAt: "desc",
          },
     });
     return cartegories;
};
const getSingleCartegory = async (id) => {
     const cartegory = await prisma.category.findUnique({
          where: {
               id,
          },
     });
     return cartegory;
};

const editCartegory = async (id, data) => {
     const cartegory = await prisma.category.update({
          where: {
               id
          },
          data,
     });
     return cartegory;
};
const removeCartegory = async (id) => {
     const cartegory = await prisma.category.delete({
          where: {
               id,
          },
     });
     return cartegory;
};
module.exports = {
     getCartegories,
     getSingleCartegory,
     editCartegory,
     removeCartegory,
};
