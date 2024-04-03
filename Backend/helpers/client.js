const prisma = require("../utils/prismaUtil");

const signUp = async (data) => {
     const data = req.body;

     const client = await prisma.client.create({
          data,
     });
     return client;
};

const getClients = async () => {
     const clients = await prisma.client.findMany({});
     return clients;
};

const getClientById = async () => {
     const data = req.body;
     const id = req.params.id;
     const client = await prisma.client.update({
          where: { id },
     });
     return client;
};

const editClient = async () => {
     const data = req.body;
     const id = req.params.id;
     const client = await prisma.client.update({
          where: { id },
          data,
     });
     return client;
};

const removeClient = async () => {
     const id = req.params.id;
     const client = await prisma.client.delete({
          where: { id },
     });
     return client;
};

module.exports = {
     signUp,
     getClients,
     getClientById,
     editClient,
     removeClient,
};
