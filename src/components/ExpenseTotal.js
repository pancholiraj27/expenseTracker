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
  setBgColors,
  bgColors,
}) => {
  const [total, setTotal] = useState(0);
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState();

  useEffect(() => {
    // for expenses Data
    const retriveData = JSON.parse(localStorage.getItem("expensesData"));
    if (retriveData) setExpenses(retriveData);

    // for total
    const retriveTotal = JSON.parse(localStorage.getItem("totalExpenseAmount"));
    if (retriveTotal) setTotal(parseInt(retriveTotal));

    // for theme
    const retriveTheme = localStorage.getItem("themeColor");
    if (retriveTheme) setBgColors(retriveTheme);

    
  }, [setBgColors]);

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
  }, [expenses, setShowExpense]);

  useEffect(() => {
    localStorage.setItem("totalExpenseAmount", total);
  }, [total]);

  useEffect(() => {
    if (bgColors !== undefined) {
      localStorage.setItem("themeColor", bgColors);
    }
  }, [bgColors]);

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
