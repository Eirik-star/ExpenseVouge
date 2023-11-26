import { addDoc, collection, deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore"
import { db } from "../config/firebase-config"
import { useGetUserInfo } from "./useGetUserInfo"

export const useTransactionOperations = () => {
    const transactionCollectionRef = collection(db, "transactions")
    const { userID } = useGetUserInfo()
    const currentDate = new Date();
    
    //Date
    function getCurrentDate() {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        const formattedDate = new Intl.DateTimeFormat('en-IN', options).format(currentDate);
        return formattedDate;
    }

    //Time
    function getCurrentTime() {
        let hours = currentDate.getHours().toString().padStart(2, '0');
        const minutes = currentDate.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
      
        const currentTime = `${hours}:${minutes}${ampm}`;
        return currentTime;
      }


    // Adding
    const addTransaction = async ({
        description,
        transactionAmount,
        transactionType,
        category,
        }) => {
        await addDoc(transactionCollectionRef, {
            userID,
            description,
            transactionAmount,
            transactionType,
            category,
            date: getCurrentDate(),
            time: getCurrentTime(),
            createdAt: serverTimestamp(),
        });
    };

    // Deleting!
    const deleteTransaction = (id) => {
        const transactionDocRef = doc(db, 'transactions', String(id))
        deleteDoc(transactionDocRef)
        .then(() => { console.log("Entire Document has been deleted successfully.") }) 
        .catch(error => { console.log(error); })
    };


      

    return { addTransaction, deleteTransaction }
}