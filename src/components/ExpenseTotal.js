import React, { useState, useEffect, createContext } from "react";
import ExpenseInput from "./ExpenseInput";
import ExpenseList from "./ExpenseList";
import "./ExpenseTotal.css";
export const ThemProvider = createContext();

const ExpenseTotal = ({
  inputOn,
  setInputOn,
  setShowExpense,
  setShowColors,
}) => {
  const [total, setTotal] = useState(0);
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState();

  useEffect(() => {
    const retriveData = JSON.parse(localStorage.getItem("expensesData"));
    if (retriveData) {
      setExpenses(retriveData);
    }
    const retriveTotal = JSON.parse(localStorage.getItem("totalExpenseAmount"));
    if (retriveTotal) setTotal(parseInt(retriveTotal));
  }, []);

  useEffect(() => {
    if (expenses?.length) {
      localStorage.setItem("expensesData", JSON.stringify(expenses));
    }
    if (expenses.length > 0) {
      console.log(expenses.length);
      setShowExpense(false);
    } else {
      setShowExpense(true);
    }
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem("totalExpenseAmount", total);
  }, [total]);

  return (
    <ThemProvider.Provider
      value={{
        total,
        setTotal,
        expenseName,
        setExpenseName,
        expenseAmount,
        setExpenseAmount,
        expenses,
        setExpenses,
        isEditing,
        setIsEditing,
        editId,
        setEditId,
        setInputOn,
      }}
    >
      <>
        <div className="expenseTotal">
          <h1>Total - &#8377;{total}</h1>
        </div>
        <ExpenseList />
        {inputOn ? <ExpenseInput setShowColors={setShowColors} /> : null}
      </>
    </ThemProvider.Provider>
  );
};

export default ExpenseTotal;
