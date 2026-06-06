import {prisma} from "./prisma.js";

export const resolvers = {
  Query: {
    students: async () => {
      return await prisma.student.findMany();
    },

    student: async (_, { id }) => {
      return await prisma.student.findUnique({
        where: {
          id: Number(id),
        },
      });
    },
  },

  Mutation: {
    createStudent: async (_, args) => {
      return await prisma.student.create({
        data: args,
      });
    },

    updateStudent: async (_, args) => {
      const { id, ...data } = args;

      return await prisma.student.update({
        where: {
          id: Number(id),
        },
        data,
      });
    },

    deleteStudent: async (_, { id }) => {
      await prisma.student.delete({
        where: {
          id: Number(id),
        },
      });

      return "Student deleted successfully";
    },
  },
};