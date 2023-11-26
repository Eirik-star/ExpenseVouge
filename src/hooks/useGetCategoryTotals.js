import { query, where, collection, getDocs } from "firebase/firestore"
import { db } from "../config/firebase-config"
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useGetTransactions } from "./useGetTransactions";


export const useGetCategoryTotals = () => {
    const categories = [
        'Groceries',
        'Utilities',
        'Entertainment',
        'Education',
        'Health',
        'Food',
        'Bills',
        'Subscriptions',
        'Transport',
        'Misc',
      ]
  const [categoryTotals, setCategoryTotals] = useState([])
  const { transactionTotals } = useGetTransactions()
  const { balance } = transactionTotals

  const getCategoryTotals = async () => {
    try {
      const transactionCollectionRef = collection(db, 'transactions');

      const promises = categories.map(async (cat) => {
        const func = query(transactionCollectionRef, where('category', '==', cat))
        let val = 0

        const snapshot = await getDocs(func)

        snapshot.forEach((doc) => {
          const docVal = doc.data().transactionAmount;
          val += docVal;
        })

        return val
      })

      const totals = await Promise.all(promises);
      setCategoryTotals(totals)
    } catch (e) {
      console.error(e)
    }
  }

  useMemo(() => {
    getCategoryTotals();
  }, [balance])

  return { categories, categoryTotals }
}
