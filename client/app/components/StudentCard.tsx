"use client";

import Link from "next/link";
import Image from "next/image";

export type Student = {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  imageUrl?: string | null;
};

type StudentCardProps = {
  student: Student;
  onDelete: (id: string) => void;
};

export default function StudentCard({ student, onDelete }: StudentCardProps) {
  return (
    <div className="rounded bg-slate-200 p-4">
      {student.imageUrl ? (
        <Image
          src={student.imageUrl}
          alt={student.name}
          width={96}
          height={96}
          unoptimized
          className="mb-3 h-24 w-24 rounded object-cover"
        />
      ) : null}

      <h2 className="text-lg font-semibold text-slate-900">{student.name}</h2>
      <p className="text-sm text-slate-700">{student.email}</p>
      <p className="text-sm text-slate-700">{student.phone}</p>
      <p className="text-sm text-slate-700">{student.department}</p>

      <div className="mt-4 flex gap-2">
        <Link
          href={`/students/edit?id=${student.id}`}
          className="rounded bg-slate-900 px-3 py-1 text-sm text-white"
        >
          Edit
        </Link>
        <button
          type="button"
          onClick={() => onDelete(student.id)}
          className="rounded bg-red-600 px-3 py-1 text-sm text-white"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
