import Link from "next/link";
export default function NotFound() {
  return (
    <main>
      <div className="flex h-screen flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="mt-2 text-gray-500">Page not found</p>
        <Link href="/" className="mt-4 rounded bg-black px-4 py-2 text-white">Go Home</Link>
      </div>
    </main>
  );
}
