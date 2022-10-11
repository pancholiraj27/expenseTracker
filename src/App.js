import { useEffect, useState } from "react";
import "./App.css";
import ExpenseTotal from "./components/ExpenseTotal";
import { BsArrowDownRight } from "react-icons/bs";

const TITLE = "Expense Tracker";

function App() {
  const [inputOn, setInputOn] = useState(false);
  const [showExpense, setShowExpense] = useState(true);

  // if localStorage not set this will set
  useEffect(() => {
    if (!localStorage.getItem("expensesData")) {
      localStorage.setItem("expensesData", "[]");
      localStorage.setItem("totalExpenseAmount", 0);
      console.log("not there");
    }
    document.title = "Expense Tracker";
  });

  return (
    <>
      <div className="mainContainer">
        <div className="innerContainer">
          <h1 className="heading">Expense Tracker</h1>
          <ExpenseTotal
            inputOn={inputOn}
            setInputOn={setInputOn}
            setShowExpense={setShowExpense}
          />
        </div>
      </div>

      {/* arrow indicates when no expenses there */}
      {showExpense ? (
        <p className="addArrow">
          Add Expense
          <span className="arrowIcon">
            <BsArrowDownRight />
          </span>
        </p>
      ) : null}

      {/* add button toggles when creating  */}
      {!inputOn ? (
        <span
          onClick={() => {
            setInputOn(true);
            setShowExpense(false);
          }}
          className="addExpense"
        >
          +
        </span>
      ) : null}
    </>
  );
}

export default App;
