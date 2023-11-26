import { useEffect, useState } from "react"
import { onSnapshot, orderBy, query, where, collection } from "firebase/firestore"
import { useGetUserInfo } from '../hooks/useGetUserInfo'
import { db } from "../config/firebase-config"

export const useGetTransactions = () => {
    const [ transactions, setTransactions] = useState([])
    const [ transactionTotals, setTransactionTotals ] = useState({
        balance: 0.0,
        income: 0.0,
        expense: 0.0,
    })
    const { userID } = useGetUserInfo()
    const transactionCollectionRef = collection(db, "transactions")
    const getTransactions = async () => {
        let unsubscribe
        try{
            const queryTransactions = query(
                transactionCollectionRef,
                where("userID", "==", userID),
                orderBy("createdAt", "desc")
              );

            unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
                let docs = []
                let totalIncome = 0
                let totalExpenses = 0
                snapshot.forEach((doc) => {
                    const data = doc.data()
                    const id = doc.id

                    docs.push({...data, id})

                    if(data.transactionType === "expense"){
                        totalExpenses += Number(data.transactionAmount)
                    } else {
                        totalIncome += Number(data.transactionAmount)
                    }
                })
                let balance = totalIncome - totalExpenses
                setTransactions(docs)
                setTransactionTotals(
                    {
                    balance,
                    income: totalIncome,
                    expense: totalExpenses,
                }
                )
            })
        }
        catch(err){
            console.error(err)
        }
        return () => unsubscribe();
    }

    useEffect(() => {
        getTransactions();
      }, []);

    return { transactions, transactionTotals }
}