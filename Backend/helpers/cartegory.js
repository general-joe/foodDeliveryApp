const prisma = require("../utils/prismaUtil");

const addCartegory = async (data) => {
  const data = req.body;

  const cartegory = await prisma.cartegory.create({
    data,
  });
  return cartegory;
};

const getCartegories = async () => {
  const cartegories = await prisma.cartegory.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return cartegories;
};
const getSingleCartegory = async (id) => {
  const cartegory = await prisma.cartegory.findUnique({
    where: {
      id,
    },
  });
  return cartegory;
};

const editCartegory = async (id, data) => {
  const cartegory = await prisma.cartegory.update({
    where: {
      id,
    },
    data,
  });
  return cartegory;
};
const removeCartegory = async (id) => {
  const cartegory = await prisma.cartegory.delete({
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
