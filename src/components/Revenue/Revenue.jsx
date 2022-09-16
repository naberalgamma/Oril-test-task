import "./RevenueStyle.scss";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import isBetweenPlugin from "dayjs/plugin/isBetween";

dayjs.extend(isBetweenPlugin);

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement
);
export function Revenue() {
  const url = window.location.pathname;
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState({
    datasets: [],
  });
  const [total, setTotal] = useState(0);
  const [min, setMin] = useState(0);
  const [medium, setMedium] = useState(0);
  const [max, setMax] = useState(0);

  const checkChart = (days = -7) => {
    const week = data.slice(days);
    const filtred = week
      .map((item) => item.curency)
      .filter((item) => item !== "null");
    setMin(Math.min(...filtred));
    setMax(Math.max(...filtred));
    const number = filtred.map((item) => Number(item));
    const total = number.reduce((zero, item) => zero + item, 0);
    setTotal(total.toFixed(2));
    setMedium((total / number.length).toFixed(2));
    setChartData({
      labels: week.map((item) => item.date.substring(0, 10)),
      datasets: [
        {
          label: url,
          data: week.map((item) => item.curency),
          borderColor: "blue",
          backgroundColor: "orange",
        },
      ],
    });
  };
  useEffect(() => {
    axios
      .get(`https://oril-coins-test.herokuapp.com/item${url}`)
      .then((res) => {
        setData(
          res.data.data.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
          })
        );
        checkChart(-7);
      });
  }, [url]);
  return (
    <div>
      <div className="container-chart">
        <div className="header">
          <h1 className="title">Revenue</h1>
          <Link to="/" className="style-link">
            <p className="link-to-list">Back to User list</p>
          </Link>
          <div className="btn-block">
            <p>Click the buttons to view the chart</p>
            <button className="btn-1" onClick={() => checkChart(-7)}>
              Week
            </button>
            <button className="btn-2" onClick={() => checkChart(-30)}>
              Month
            </button>
            <button className="btn-3" onClick={() => checkChart(-365)}>
              Year
            </button>
          </div>
        </div>
        <div className="chart-container">
          <Line
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                },
              },
            }}
            data={chartData}
          />
        </div>
        <div>
          <div>
            <p className="total">Total</p>
            <p className="total-sum">${total}</p>
          </div>
          <div className="min-max">
            <div>
              <p className="title-price">Min</p>
              <p className="price">${min}</p>
            </div>
            <div>
              <p className="title-price">Mediun</p>
              <p className="price">${medium}</p>
            </div>
            <div>
              <p className="title-price">Max</p>
              <p className="price">${max}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
