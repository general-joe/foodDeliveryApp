const prisma = require("../utils/prismaUtil");

const addCartegory = async (data) => {
     const cartegory = await prisma.category.create({data});
     return cartegory;
};

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
     addCartegory,
     getCartegories,
     getSingleCartegory,
     editCartegory,
     removeCartegory,
};
