import React, { useContext } from "react";
import "./ExpenseList.css";
import { ImBin } from "react-icons/im";
import { AiOutlineEdit } from "react-icons/ai";
import { ThemProvider } from "./ExpenseTotal";
const ExpenseList = () => {
  // useContext hook
  const {
    setExpenseAmount,
    setExpenseName,
    setExpenses,
    expenses,
    setInputOn,
    total,
    setTotal,
    setIsEditing,
    setEditId,
  } = useContext(ThemProvider);

  // check weather the expense is deleting
  const handleDelete = async (id, amount) => {
    if (window.confirm("Are you sure you want to delete the expense..?")) {
      const deleteExp = expenses.filter((ex, ind) => ex.id !== id);
      if (deleteExp.length <= 0) {
        setExpenses([]);
        setTotal(0);
        localStorage.removeItem("totalExpenseAmount");
        localStorage.removeItem("expensesData");
      } else {
        await setExpenses([...deleteExp]);
      }
      setTotal(total - amount);
    }
  };

  // if the expense is editing
  const handleEdit = (id) => {
    setInputOn(true);
    setIsEditing(true);
    setEditId(id);
    const editExpense = expenses.find((e) => e.id === id);
    // console.log(
    //   "%c expenseList",
    //   "color: blue",
    //   { ...editExpense },
    //   expenses,
    //   editExpense.expenseAmount
    // );
    setExpenseAmount(editExpense.expenseAmount);
    setExpenseName(editExpense.expenseName);
  };

  return (
    <>
      <div className="expenseList">
        <ul>
          {expenses.length > 0 ? (
            expenses.map((item) => {
              return (
                <li key={item.id}>
                  <div className="detail">
                    <p>{item.expenseName}</p>
                    <span>&#8377;{item.expenseAmount}</span>
                  </div>
                  <div className="buttons">
                    <button
                      className="btnDelEdt"
                      onClick={() => handleEdit(item.id)}
                    >
                      <AiOutlineEdit />
                    </button>
                    <button
                      className="btnDelEdt"
                      onClick={() => handleDelete(item.id, item.expenseAmount)}
                    >
                      <ImBin />
                    </button>
                  </div>
                </li>
              );
            })
          ) : (
            <div className="noExpense">
              <h1>No Expense</h1>
            </div>
          )}
        </ul>
      </div>
    </>
  );
};

export default ExpenseList;
