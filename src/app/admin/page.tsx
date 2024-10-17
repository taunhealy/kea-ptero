import { getServerSession } from "next-auth/next";
import { authOptions } from "@/server/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto py-8">
        <div className="flex-col gap-2 p-4">
          <h1 className="text-3xl font-bold text-black">Admin Dashboard</h1>
          <Link href="/admin/journeys">
            <div className="text-black">View All Journeys</div>
          </Link>
          <Link href="/admin/journeys/create-journey">
            <div className="text-black">Create New Journey</div>
          </Link>
          <Link href="/admin/high-scores">
            <div className="text-black">High Scores</div>
          </Link>
          <Link href="/admin/analytics">
            <div className="text-black">Analytics</div>
          </Link>
        </div>
        {children}
      </main>
    </div>
  );
}
