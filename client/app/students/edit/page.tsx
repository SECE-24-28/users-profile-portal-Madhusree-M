"use client";

import { gql } from "@apollo/client";
import { ApolloProvider, useMutation, useQuery } from "@apollo/client/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";
import { client } from "../../lib/apollo-client";

const GET_STUDENT = gql`
  query GetStudent($id: ID!) {
    student(id: $id) {
      id
      name
      email
      phone
      department
      imageUrl
    }
  }
`;

const UPDATE_STUDENT = gql`
  mutation UpdateStudent(
    $id: ID!
    $name: String
    $email: String
    $phone: String
    $department: String
    $imageUrl: String
  ) {
    updateStudent(
      id: $id
      name: $name
      email: $email
      phone: $phone
      department: $department
      imageUrl: $imageUrl
    ) {
      id
    }
  }
`;

type EditableStudent = {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  imageUrl?: string | null;
};

function EditStudentForm({ student }: { student: EditableStudent }) {
  const router = useRouter();
  const [updateStudent, { loading, error }] = useMutation(UPDATE_STUDENT);
  const [form, setForm] = useState({
    name: student.name || "",
    email: student.email || "",
    phone: student.phone || "",
    department: student.department || "",
    imageUrl: student.imageUrl || "",
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await updateStudent({
      variables: {
        id: student.id,
        ...form,
        imageUrl: form.imageUrl || null,
      },
    });

    router.push("/students");
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 rounded bg-slate-200 p-4">
      {["name", "email", "phone", "department", "imageUrl"].map((field) => (
        <label key={field} className="mb-4 block text-sm font-medium">
          {field}
          <input
            value={form[field as keyof typeof form]}
            onChange={(event) =>
              setForm({ ...form, [field]: event.target.value })
            }
            required={field !== "imageUrl"}
            className="mt-1 w-full rounded border border-slate-400 bg-white px-3 py-2"
          />
        </label>
      ))}

      {error ? <p className="mb-4 text-red-600">{error.message}</p> : null}

      <button
        type="submit"
        disabled={loading}
        className="rounded bg-slate-900 px-4 py-2 text-sm text-white"
      >
        {loading ? "Updating..." : "Update"}
      </button>
    </form>
  );
}

function useStudent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "";
  const { data, loading, error } = useQuery<{ student: EditableStudent | null }>(
    GET_STUDENT,
    {
    variables: { id },
    skip: !id,
    },
  );

  return { id, student: data?.student, loading, error };
}

function EditStudentPageContent() {
  const { id, student, loading, error } = useStudent();

  return (
    <main className="min-h-screen bg-white p-6 text-slate-900">
      <div className="mx-auto max-w-xl">
        <Link href="/students" className="text-sm text-slate-700">
          Back
        </Link>
        <h1 className="mt-4 text-2xl font-bold">Edit Student</h1>

        {!id ? <p className="mt-6 text-red-600">Missing student id.</p> : null}
        {loading ? <p className="mt-6">Loading...</p> : null}
        {error ? <p className="mt-6 text-red-600">{error.message}</p> : null}
        {id && !loading && !student ? (
          <p className="mt-6 text-red-600">Student not found.</p>
        ) : null}
        {student ? <EditStudentForm student={student} /> : null}
      </div>
    </main>
  );
}

export default function EditStudentPage() {
  return (
    <ApolloProvider client={client}>
      <Suspense fallback={<p className="p-6">Loading...</p>}>
        <EditStudentPageContent />
      </Suspense>
    </ApolloProvider>
  );
}
