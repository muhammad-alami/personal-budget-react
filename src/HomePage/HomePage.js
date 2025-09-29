import React, { useEffect, useRef } from 'react';
import axios from 'axios';

function HomePage() {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    // making sure that Chart.js is loaded
    if (!window.Chart) {
      console.error('Chart.js CDN not loaded');
      return;
    }

    const http = window.axios || axios;

    // this is where we call my api and get the data from there
    http.get('http://localhost:4000/budget') 
      .then((res) => {
        const items = res.data?.myBudget || [];
        const labels = items.map(i => i.title);
        const data   = items.map(i => i.budget);

        const ctx = chartRef.current.getContext('2d');

        //this line here will hopefully and stop duplicate charts
        if (chartInstanceRef.current) chartInstanceRef.current.destroy();
        // creating a new chart here
        chartInstanceRef.current = new window.Chart(ctx, {
          type: 'pie',
          data: {
            labels,
            datasets: [{
              data,
              backgroundColor: [
                '#ffdd56','#ff6384','#36a2eb','#fd6b19',
                '#4dc9f6','#f67019','#f53794','#537bc4'
              ]
            }]
          }
        });
        // only if the D3 library is loaded, we can render the D3 donut chart
        if (window.d3) renderD3Donut(items);
      })
      .catch((err) => console.error('GET /budget failed', err));

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };

    function renderD3Donut(budgetItemsFromServer) {
      const donutData = budgetItemsFromServer.map(b => ({ label: b.title, value: b.budget }));
      const d3 = window.d3;

      const svg = d3.select('#d3chart');
      const w = +svg.attr('width');
      const h = +svg.attr('height');
      const r = Math.min(w, h) / 2;

      svg.selectAll('*').remove();

      const g = svg.append('g').attr('transform', `translate(${w/2},${h/2})`);
      const colors = ['#4dc9f6','#f67019','#f53794','#537bc4','#acc236','#166a8f','#00a950','#58595b','#8549ba'];

      const pie = d3.layout.pie().sort(null).value(d => d.value);
      const arc = d3.svg.arc().outerRadius(r * 0.8).innerRadius(r * 0.5);
      const outerArc = d3.svg.arc().innerRadius(r * 0.9).outerRadius(r * 0.9);
      const midAngle = d => d.startAngle + (d.endAngle - d.startAngle) / 2;

      g.selectAll('path').data(pie(donutData))
        .enter().append('path').attr('d', arc)
        .attr('fill', (d,i) => colors[i % colors.length]);

      g.selectAll('text').data(pie(donutData))
        .enter().append('text').attr('dy','.35em').text(d => d.data.label)
        .attr('transform', d => {
          const pos = outerArc.centroid(d);
          pos[0] = r * (midAngle(d) < Math.PI ? 1 : -1);
          return `translate(${pos})`;
        })
        .style('text-anchor', d => (midAngle(d) < Math.PI ? 'start' : 'end'))
        .style('font-size','12px');

      g.selectAll('polyline').data(pie(donutData))
        .enter().append('polyline')
        .attr('points', d => {
          const pos = outerArc.centroid(d);
          pos[0] = r * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
          return [arc.centroid(d), outerArc.centroid(d), pos];
        })
        .style('fill','none').style('stroke','black').style('stroke-width','1px');
    }
  }, []);
  // here is the old project page layout with the two charts at the bottom
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
            Also, they to live happier lives... since they expend without guilt or fear...
            because they know it is all good and accounted for.
          </p>
        </div>

        <div className="text-box">
          <h1>Free</h1>
          <p>
            This app is free!!! And you are the only one holding your data!
          </p>
        </div>

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
            Also, they to live happier lives... since they expend without guilt or fear...
            because they know it is all good and accounted for.
          </p>
        </div>

        <div className="text-box">
          <h1>Chart</h1>
          <canvas id="myChart" width="400" height="400" ref={chartRef} />
          <h1>D3 Bar Chart</h1>
          <svg id="d3chart" width="560" height="300"></svg>
        </div>

      </div>
    </main>
  );
}

export default HomePage;
