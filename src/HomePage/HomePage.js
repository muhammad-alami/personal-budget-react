// src/HomePage/HomePage.js
import React, { useEffect, useRef } from 'react';

function HomePage() {
  // canvas for Chart.js
  const chartRef = useRef(null);

  useEffect(() => {
    // both libraries are loaded by public/index.html
    if (!window.axios || !window.Chart) return;

    window.axios.get('/budget.json')
      .then((res) => {
        const items = res.data?.myBudget || [];
        const labels = items.map(i => i.title);
        const data   = items.map(i => i.budget);

        const ctx = chartRef.current.getContext('2d');

        // create the pie chart
        new window.Chart(ctx, {
          type: 'pie',
          data: {
            labels,
            datasets: [{
              data,
              backgroundColor: [
                '#ffdd56', '#ff6384', '#36a2eb', '#fd6b19',
                '#4dc9f6', '#f67019', '#f53794', '#537bc4'
              ]
            }]
          }
        });
      })
      .catch(console.error);
  }, []);

  return (
    <main className="container center">
      <div className="page-area">

        <div className="text-box">
          <h1>Stay on track</h1>
          <p>
            Do you know where you are spending your money? If you really stop to track it down,
            you would get surprised! Proper budget management depends on real data... and this
            app will help you with that!
          </p>
        </div>

        <div className="text-box">
          <h1>Alerts</h1>
          <p>
            What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
          </p>
        </div>

        <div className="text-box">
          <h1>Results</h1>
          <p>
            People who stick to a financial plan, budgeting every expense, get out of debt faster!
            Also, they live happier lives because they spend without guilt or fear...
            because they know it is all good and accounted for.
          </p>
        </div>

        <div className="text-box">
          <h1>Chart</h1>
          <canvas id="myChart" width="400" height="400" ref={chartRef} />
          {/* If you also want the D3 donut later, keep your <svg id="d3chart" .../> and render it in another useEffect */}
        </div>

      </div>
    </main>
  );
}

export default HomePage;
