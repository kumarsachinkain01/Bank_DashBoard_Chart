// src/App.js

import React, { useState, useEffect } from "react";
import PieChart from "./PieChart";
import "./App.css";

const App = () => {
  const [homeValue, setHomeValue] = useState(3000);
  const [downPayment, setDownPayment] = useState(600);
  const [loanAmount, setLoanAmount] = useState(2400);
  const [interestRate, setInterestRate] = useState(5);
  const [loanTerm, setLoanTerm] = useState(5);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterestGenerated, setTotalInterestGenerated] = useState(0);

  useEffect(() => {
    const totalLoanMonths = loanTerm * 12;
    const interestPerMonth = interestRate / 100 / 12;
    const monthlyPaymentCalc = (loanAmount * interestPerMonth * (1 + interestPerMonth) ** totalLoanMonths) / ((1 + interestPerMonth) ** totalLoanMonths - 1);
    const totalInterest = monthlyPaymentCalc * totalLoanMonths - loanAmount;
    setMonthlyPayment(monthlyPaymentCalc);
    setTotalInterestGenerated(totalInterest);
  }, [homeValue, downPayment, loanAmount, interestRate, loanTerm]);

  const data = {
    labels: ["Principal", "Interest"],
    datasets: [
      {
        data: [loanAmount, totalInterestGenerated],
        backgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>BANK OF REACT</h1>
      </header>
      <div className="container">
        <div className="controls">
          <label>Home Value</label>
          <input
            type="range"
            min="1000"
            max="10000"
            value={homeValue}
            onChange={(e) => setHomeValue(Number(e.target.value))}
          />
          <span>${homeValue}</span>

          <label>Down Payment</label>
          <input
            type="range"
            min="0"
            max={homeValue}
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
          />
          <span>${downPayment}</span>

          <label>Loan Amount</label>
          <input
            type="range"
            min="0"
            max={homeValue - downPayment}
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
          />
          <span>${loanAmount}</span>

          <label>Interest Rate</label>
          <input
            type="range"
            min="2"
            max="18"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
          />
          <span>{interestRate}%</span>

          <label>Tenure</label>
          <select value={loanTerm} onChange={(e) => setLoanTerm(Number(e.target.value))}>
            <option value={5}>5 years</option>
            <option value={10}>10 years</option>
            <option value={15}>15 years</option>
          </select>
        </div>
        <div className="chart">
          <h2>Monthly Payment: ${monthlyPayment.toFixed(2)}</h2>
          <PieChart data={data} />
        </div>
      </div>
    </div>
  );
};

export default App;
