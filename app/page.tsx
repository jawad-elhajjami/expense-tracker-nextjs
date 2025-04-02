import Guest from "@/components/Guest";
import { currentUser } from "@clerk/nextjs/server";
import AddTransaction from "@/components/AddTransaction";
import Balance from "@/components/Balance";
import IncomeExpense from "@/components/IncomeExpense";
import TransactionList from "@/components/TransactionList";
import { Suspense } from "react"

const HomePage = async ({ searchParams }: {
  searchParams?: Record<string, string | string[] | undefined>
}) => {
  
  const page = Number(searchParams?.page ?? 1);
  const user = await currentUser();
  
  if(!user){
    return <Guest />
  }
  return (
        <main>
          <h2 className="text-3xl">Welcome {user.firstName} ! </h2>

            <Suspense fallback={<p>Loading balance ...</p>}>
              <Balance />
            </Suspense>
            <IncomeExpense />

            <AddTransaction />

            <TransactionList page={page} limit={3} />

        </main>
  );
}
export default HomePage;