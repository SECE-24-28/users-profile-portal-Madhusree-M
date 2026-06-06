"use client";

import { gql } from "@apollo/client";
import { ApolloProvider, useMutation, useQuery } from "@apollo/client/react";
import Link from "next/link";
import { client } from "../lib/apollo-client";
import StudentCard, { type Student } from "../components/StudentCard";

const GET_STUDENTS = gql`
  query GetStudents {
    students {
      id
      name
      email
      phone
      department
      imageUrl
    }
  }
`;

const DELETE_STUDENT = gql`
  mutation DeleteStudent($id: ID!) {
    deleteStudent(id: $id)
  }
`;

function StudentsList() {
  const { data, loading, error, refetch } = useQuery<{ students: Student[] }>(
    GET_STUDENTS,
  );
  const [deleteStudent] = useMutation(DELETE_STUDENT);

  async function handleDelete(id: string) {
    await deleteStudent({ variables: { id } });
    await refetch();
  }

  return (
    <main className="min-h-screen bg-white p-6 text-slate-900">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Students</h1>
          <Link
            href="/students/create"
            className="rounded bg-slate-900 px-4 py-2 text-sm text-white"
          >
            Create Student
          </Link>
        </div>

        {loading ? <p>Loading...</p> : null}
        {error ? <p className="text-red-600">{error.message}</p> : null}

        <div className="grid gap-4 sm:grid-cols-2">
          {data?.students?.map((student: Student) => (
            <StudentCard
              key={student.id}
              student={student}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

export default function StudentsPage() {
  return (
    <ApolloProvider client={client}>
      <StudentsList />
    </ApolloProvider>
  );
}
