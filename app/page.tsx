import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Welcome to next js</h1>
      <Link 
        href="/tenants" 
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow"
      >
        View Tenants
      </Link>
    </div>
  );
}
