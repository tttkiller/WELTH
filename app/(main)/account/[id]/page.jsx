""; // Ensure this is at the top if using Suspense in Next.js App Router

import { getAccountWithTransactions } from "@/actions/accounts";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import { TransactionTable } from "../components/transaction-table"; // Ensure correct import
import { BarLoader } from "react-spinners";
import { AccountChart } from "../components/account-chart";

const AccountsPage = async ({ params }) => {
  const { id } = await params; // ✅ No need to await params

  let accountData;
  try {
    accountData = await getAccountWithTransactions(id);
  } catch (error) {
    console.error("Error fetching account data:", error);
    notFound();
  }

  if (!accountData) {
    notFound();
  }

  const { transactions, ...account } = accountData;

  return (
    <div className="space-y-8 px-5">
      <div className="flex gap-4 items-end justify-between">
        <div>
          <h1 className="text-5xl sm:text-6xl font-bold gradient-title capitalize">
            {account.name}
          </h1>
          <p className="text-muted-foreground">
            {account.type.charAt(0) + account.type.slice(1).toLowerCase()}{" "}
            Account
          </p>
        </div>

        <div className="text-right pb-2">
          <div className="text-xl sm:text-2xl font-bold">
            ${parseFloat(account.balance).toFixed(2)}
          </div>
          <p className="text-sm text-muted-foreground">
            {account._count.transactions} Transactions
          </p>
        </div>
      </div>

      <Suspense
        fallback={
          <BarLoader className="mt-4" width={"100%"} color="#9333ea" />
        }>
        <AccountChart transactions={transactions} />
      </Suspense>

      <Suspense
        fallback={
          <BarLoader className="mt-4" width={"100%"} color="#9333ea" />
        }>
        <TransactionTable transactions={transactions} />
      </Suspense>
    </div>
  );
};

export default AccountsPage;
