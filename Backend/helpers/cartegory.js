const prisma = require("../utils/prismaUtil");
const cloudinary = require("../utils/cloudinary");
const addCategory = async(req, data) =>{
     const item = req.file ? req.file.path : undefined;
     if (item) {
          const uploaded = await cloudinary.uploader.upload(item, {
              folder: 'familytree/' + data.type + '/images'
          });
          if (uploaded) {
              data.item = uploaded.secure_url;
          }
      }
      
}

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
     addCategory,
     getCartegories,
     getSingleCartegory,
     editCartegory,
     removeCartegory,
};
