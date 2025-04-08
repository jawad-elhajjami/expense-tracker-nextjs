import Guest from "@/components/Guest";
import { currentUser } from "@clerk/nextjs/server";
import AddTransaction from "@/components/AddTransaction";
import Balance from "@/components/Balance";
import IncomeExpense from "@/components/IncomeExpense";
import TransactionList from "@/components/TransactionList";
import AnalyticsDashboard from "@/components/AnalyticsDashboard";
import { Suspense } from "react";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedParams = await searchParams;
  const page = Number(resolvedParams.page ?? 1);
  const user = await currentUser();

  if (!user) {
    return <Guest />;
  }

  return (
    <main className="min-h-screen bg-gray-50 ">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Welcome {user.firstName}!</h2>
          <p className="text-gray-600 mt-2">Track and manage your expenses efficiently</p>
        </div>

        <div className="">
          <div>
            <Suspense fallback={<p>Loading balance...</p>}>
              <Balance />
            </Suspense>
          </div>
          {/* <div>
            <IncomeExpense />
          </div> */}
        </div>

        <div className="mb-8">
          <AnalyticsDashboard />
        </div>

        <div className="grid grid-cols-1 gap-y-6">
          <div className="w-full">
            <AddTransaction />
          </div>
          <div className="lg:col-span-2">
            <TransactionList page={page} limit={3} />
          </div>
        </div>
      </div>
    </main>
  );
}
