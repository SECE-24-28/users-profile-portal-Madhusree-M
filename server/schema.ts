export const typeDefs = `#graphql

type Student {
  id: ID!
  name: String!
  email: String!
  phone: String!
  department: String!
  imageUrl: String
}

type Query {
  students: [Student]
  student(id: ID!): Student
}

type Mutation {
  createStudent(
    name: String!
    email: String!
    phone: String!
    department: String!
    imageUrl: String
  ): Student

  updateStudent(
    id: ID!
    name: String
    email: String
    phone: String
    department: String
    imageUrl: String
  ): Student

  deleteStudent(id: ID!): String
}
`;