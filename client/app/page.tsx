import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white p-6 text-slate-900">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-2xl font-bold">Student Portal</h1>
        <Link
          href="/students"
          className="mt-6 inline-block rounded bg-slate-900 px-4 py-2 text-sm text-white"
        >
          View Students
        </Link>
      </div>
    </main>
  );
}
