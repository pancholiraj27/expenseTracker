import React, { useContext, useState } from "react";
import { ThemProvider } from "./ExpenseTotal";
import "./ExpenseInput.css";
const ExpenseInput = () => {
  const [expenseNameError, setExpenseNameError] = useState(false);
  const [expenseAmountError, setExpenseAmountError] = useState(false);

  // useContextHook
  const {
    expenseName,
    expenseAmount,
    setExpenseAmount,
    setExpenseName,
    setExpenses,
    expenses,
    setInputOn,
    total,
    setTotal,
    isEditing,
    setIsEditing,
    setEditId,
    editId,
  } = useContext(ThemProvider);

  // while submit from
  const handelSubmit = async (e) => {
    e.preventDefault();

    // check if expense is editing or not
    if (isEditing) {
      let exAmount = 0;
      const editExpense = expenses.find((e) => e.id === editId);
      exAmount = editExpense.expenseAmount;
      if (expenseName === undefined) {
        setExpenseNameError(true);
        return;
      } else if (expenseAmount <= 0 || expenseAmount === undefined) {
        setExpenseAmountError(true);
        return;
      }
      const updateExpense = expenses.map((exp) =>
        exp.id === editExpense.id
          ? (exp = {
              id: exp.id,
              expenseAmount,
              expenseName,
              exAmount: exp.expenseAmount,
            })
          : {
              id: exp.id,
              expenseAmount: exp.expenseAmount,
              expenseName: exp.expenseName,
            }
      );
      await setExpenses(updateExpense);
      setInputOn(false);
      setIsEditing(false);
      setTotal(parseInt(total - parseInt(exAmount) + parseInt(expenseAmount)));
      setEditId("");
      setExpenseAmount("");
      setExpenseName("");
      setExpenseNameError(false);
      setExpenseAmountError(false);
      return;
    }

    // check if expense is new created

    if (expenseName === "") {
      setExpenseNameError(true);
      return;
    } else if (expenseAmount <= 0) {
      setExpenseAmountError(true);
      return;
    }
    await setExpenses([
      {
        expenseName: expenseName,
        expenseAmount: expenseAmount,
        id: Math.floor(Math.random() * 10000) + parseInt(expenseAmount),
      },
      ...expenses,
    ]);
    setTotal(parseInt(expenseAmount) + total);
    setInputOn(false);
    setExpenseAmount("");
    setExpenseName("");
    setIsEditing(false);
    setExpenseNameError(false);
    setExpenseAmountError(false);
  };

  return (
    <>
      <div
        className="mainExpenseInput"
        onClick={() => {
          setInputOn(false);
          setIsEditing(false);
          setExpenseAmount("");
          setExpenseName("");
        }}
      ></div>
      <div className="expenseInput" onClick={() => setInputOn(true)}>
        <form className="from" onSubmit={handelSubmit}>
          <label htmlFor="inputText">Name</label>
          <input
            type="text"
            id="inputText"
            placeholder="Milk"
            onChange={(e) => setExpenseName(e.target.value)}
            value={expenseName}
            autoFocus
            className={expenseNameError ? "highlightForm" : ""}
          />
          <span className={expenseNameError ? "expenseAmountHide" : "hide"}>
            You must have to type Expense Name
          </span>
          <label htmlFor="inputAmount">Amount</label>
          <input
            type="number"
            id="inputAmount"
            placeholder="32"
            onChange={(e) => setExpenseAmount(e.target.value)}
            value={expenseAmount}
            className={expenseAmountError ? "highlightForm" : ""}
          />
          <span className={expenseAmountError ? "expenseAmountHide" : "hide"}>
            You must have to type Expense Amount
          </span>
          <button>{!isEditing ? "Add Expense" : "Edit Expense"}</button>
        </form>
      </div>
    </>
  );
};

export default ExpenseInput;
