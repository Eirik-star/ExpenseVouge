import { query, where, collection, getDocs } from "firebase/firestore"
import { db } from "../config/firebase-config"
import { useState, useMemo } from "react";
import { format } from "date-fns"
import { useGetTransactions } from "./useGetTransactions";


const getDatesInRange = () => {
  const dateArray = []
  let currentDate = new Date(new Date().setDate(new Date().getDate() - 6))
  let endDate = new Date()

  while (currentDate <= endDate) {
    dateArray.push(new Date(currentDate))
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return dateArray
}

export const datesInRange = getDatesInRange()

export const useGetDayTotals = () => {
  const [expenseTotals, setExpenseTotals] = useState([])
  const { transactionTotals } = useGetTransactions()
  const { balance } = transactionTotals

  const getExpenseTotals = async () => {
    try {
      const transactionCollectionRef = collection(db, 'transactions');

      const promises = datesInRange.map(async (cat) => {
        const func = query(transactionCollectionRef, where('date', '==', format(cat, 'dd/M/Y')), where('transactionType', '==', 'expense'))
        let val = 0

        const snapshot = await getDocs(func)

        snapshot.forEach((doc) => {
          const docVal = doc.data().transactionAmount;
          val += docVal;
        })

        return val
      })

      const totals = await Promise.all(promises);
      setExpenseTotals(totals)
      console.log(expenseTotals)
    } catch (e) {
      console.error(e)
    }
  }

  useMemo(() => {
    getExpenseTotals()
  }, [balance])


  return { expenseTotals, datesInRange, getExpenseTotals }
}