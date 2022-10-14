import { useEffect, useState } from "react";
import "./App.css";
import ExpenseTotal from "./components/ExpenseTotal";
import { BsArrowDownRight } from "react-icons/bs";
import ColorChanger from "./components/ColorChanger";

function App() {
  const [inputOn, setInputOn] = useState(false);
  const [showExpense, setShowExpense] = useState(true);

  // for toggle change color
  const [showColors, setShowColors] = useState(false);
  const [bgColors, setBgColors] = useState();

  // if localStorage not set this will set
  useEffect(() => {
    if (!localStorage.getItem("expensesData")) {
      localStorage.setItem("expensesData", "[]");
      localStorage.setItem("themeColor", "black");
      localStorage.setItem("totalExpenseAmount", 0);
      console.log("not there");
    }
    document.title = "Expense Tracker";
    document.lo = "Expense Tracker";
  }, []);

  return (
    <>
      <div
        className={`mainContainer ${bgColors}`}
        onClick={() => setShowColors(false)}
      >
        <div className="innerContainer">
          <h1 className="heading">Expense Tracker</h1>
          <ExpenseTotal
            inputOn={inputOn}
            setInputOn={setInputOn}
            setShowExpense={setShowExpense}
            setShowColors={setShowColors}
            setBgColors={setBgColors}
            bgColors={bgColors}
          />
        </div>
      </div>
      {/* arrow indicates when no expenses there */}
      {showExpense ? (
        <p className={`addArrow ${bgColors}`}>
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
            setShowColors(false);
          }}
          className={`addExpense ${bgColors}`}
        >
          +
        </span>
      ) : null}

      {!inputOn ? (
        <>
          <ColorChanger
            showColors={showColors}
            setShowColors={setShowColors}
            bgColors={bgColors}
            setBgColors={setBgColors}
          />
        </>
      ) : null}
    </>
  );
}

export default App;
