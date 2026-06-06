"use client";

import { gql } from "@apollo/client";
import { ApolloProvider, useMutation } from "@apollo/client/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { client } from "../../lib/apollo-client";

const CREATE_STUDENT = gql`
  mutation CreateStudent(
    $name: String!
    $email: String!
    $phone: String!
    $department: String!
    $imageUrl: String
  ) {
    createStudent(
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

function CreateStudentForm() {
  const router = useRouter();
  const [createStudent, { loading, error }] = useMutation(CREATE_STUDENT);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    imageUrl: "",
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await createStudent({
      variables: {
        ...form,
        imageUrl: form.imageUrl || null,
      },
    });

    router.push("/students");
  }

  return (
    <main className="min-h-screen bg-white p-6 text-slate-900">
      <div className="mx-auto max-w-xl">
        <Link href="/students" className="text-sm text-slate-700">
          Back
        </Link>
        <h1 className="mt-4 text-2xl font-bold">Create Student</h1>

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
            {loading ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default function CreateStudentPage() {
  return (
    <ApolloProvider client={client}>
      <CreateStudentForm />
    </ApolloProvider>
  );
}
