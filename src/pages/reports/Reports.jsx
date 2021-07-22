/**
 * Author: Nikunj Shamjibhai Dhola
 * Description: Report Page: Expense Report By Category, Expense Report By Month, Expense Report by Day, and Print to PDF
 */
import React, { useEffect, useRef, useState } from "react";
import { Button } from "antd";
import ReactToPrint from "react-to-print";
import { PrinterOutlined, SmileOutlined } from "@ant-design/icons";
import styles from "./Reports.module.css";
import c from "classnames/bind";
import CreateChart from "../../components/CreateChart/CreateChart";
import Dropdown from "../../components/Dropdown/Dropdown";
import Notification from "../../components/Notifications/Notifications";
import { chartData, colors, MONTHS, notificationTypes } from "../../constants";
import {
  dayTimelineReportMenu,
  monthMenu,
  reportTypeMenu,
  timelineReportMenu,
  chartTypeRadio,
} from "./configurations";
import { monthlyData } from "./data";
import RadioGroup from "../../components/RadioGroup/RadioGroup";
import AnimatedNumber from "animated-number-react";
import axios, { Routes } from "../../services/axios";
import moment from "moment";

const cx = c.bind(styles);

const Reports = () => {
  const [reportType, setReportType] = useState(
    reportTypeMenu.constants.CATEGORY
  );
  const reportComponent = useRef();
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [timeline, setTimeline] = useState(timelineReportMenu.constants.MONTHS);
  const [dayTimeline, setDayTimeline] = useState(5);
  const [chartType, setChartType] = useState(chartTypeRadio.constants.BAR);
  const [highestValue, setHighestValue] = useState(null);

  const [dataSets, setDataSets] = useState(null);

  /**
   * Description: Manages Graph option changes for all type of graphs
   */
  useEffect(() => {
    if (reportType === reportTypeMenu.constants.CATEGORY) {
      setChartType(chartTypeRadio.constants.BAR);
      const data = monthlyData[month - 1];
      fetchCategorywiseReport(month);
    }
    if (reportType === reportTypeMenu.constants.TIMELINE) {
      if (timeline === timelineReportMenu.constants.MONTHS) {
        fetchLastFiveMonthData();
      }
      if (timeline === timelineReportMenu.constants.DAYS) {
        fetchLastTenDaysData();
      }
    }
  }, [reportType, month, timeline, dayTimeline]);

  /**
   * Description: Fetches Categories wise expense report from the database
   * @param {*} monthIndex
   */
  const fetchCategorywiseReport = async (monthIndex) => {
    const userId = localStorage.getItem("userId")
      ? localStorage.getItem("userId")
      : "";
    try {
      const { url, method } = Routes.api.getDataByMonth(userId);
      const { data } = await axios[method](url, {
        month: monthIndex,
        year: new Date().getFullYear(),
      });
      generateCategoryGraph(data.data);
    } catch (err) {
      Notification(notificationTypes.ERROR, err.toString());
    }
  };

  /**
   * Description: Fetches Expense data of last five month from the database
   */
  const fetchLastFiveMonthData = async () => {
    const userId = localStorage.getItem("userId")
      ? localStorage.getItem("userId")
      : "";
    try {
      const { url, method } = Routes.api.getLastFiveMonthData(userId);
      const { data } = await axios[method](url);
      generateExpenseReportByMonths(data.data);
    } catch (err) {
      Notification(notificationTypes.ERROR, err.toString());
    }
  };

  /**
   * Description: Fetches Expense data of last ten days from the database
   */
  const fetchLastTenDaysData = async () => {
    const userId = localStorage.getItem("userId")
      ? localStorage.getItem("userId")
      : "";
    try {
      const { url, method } = Routes.api.getLastTenDaysData(userId);
      const { data } = await axios[method](url);
      generateExpenseReportByDays(data.data);
    } catch (err) {
      Notification(notificationTypes.ERROR, err.toString());
    }
  };

  /**
   * Description: Process the Expense data and generates the Category Graph
   * @param {*} data
   * @returns
   */
  const generateCategoryGraph = (data) => {
    const categoryList = Object.keys(data);
    if (categoryList.length === 0) {
      Notification(
        notificationTypes.ERROR,
        "Data for this month is not available"
      );
      return;
    }
    const datasets = categoryList.map((categoryName, index) => {
      return {
        label: categoryName,
        data: [data[categoryName]],
        backgroundColor: [colors.backgroundColors[index]],
        borderColor: [colors.borderColors[index]],
        borderWidth: 1,
      };
    });
    let label = "";
    let max = 0;
    categoryList.map((categoryName, index) => {
      if (data[categoryName] > max) {
        max = data[categoryName];
        label = categoryName;
      }
    });
    setHighestValue({ label, max });
    setDataSets({
      labels: ["Expense Report: "],
      datasets: datasets,
    });
  };

  /**
   * Processes the Expense Data and generates the graph
   * @param {*} data
   * @returns
   */
  const generateExpenseReportByMonths = (data) => {
    const monthIndexList = Object.keys(data).sort(
      (a, b) => parseInt(a) - parseInt(b)
    );
    if (monthIndexList.length === 0) {
      Notification(
        notificationTypes.ERROR,
        "no data available for user, Please add expense and visit here again!"
      );
      return;
    }
    const datasets = [
      {
        label: "Expense Report By Months",
        data: monthIndexList.map((monthIndex, index) => data[monthIndex]),
        backgroundColor: [...Array(monthIndexList.length)].map(
          (_, index) => colors.backgroundColors[index]
        ),
        borderColor: [...Array(monthIndexList.length)].map(
          (_, index) => colors.borderColors[index]
        ),
        borderWidth: 1,
      },
    ];
    let label = "";
    let max = 0;
    monthIndexList.map((monthIndex, index) => {
      if (data[monthIndex] >= max) {
        label = MONTHS[parseInt(monthIndex) - 1];
        max = data[monthIndex];
      }
    });
    setHighestValue({ label, max });
    setDataSets({
      labels: monthIndexList.map(
        (monthIndex) => MONTHS[parseInt(monthIndex) - 1]
      ),
      datasets: datasets,
    });
  };

  /**
   * Description: Processes the expense data and generates graph for days
   * @param {*} data
   */
  const generateExpenseReportByDays = (data) => {
    const dayTimeStampList = Object.keys(data)
      .sort((a, b) => parseInt(a) - parseInt(b))
      .slice(-dayTimeline);
    const datasets = [
      {
        label: "Expense Report By Days",
        data: dayTimeStampList.map((timeStamp) => data[timeStamp]),
        backgroundColor: dayTimeStampList.map(
          (_, index) => colors.backgroundColors[index]
        ),
        borderColor: dayTimeStampList.map(
          (_, index) => colors.borderColors[index]
        ),
        borderWidth: 1,
      },
    ];
    let label = "";
    let max = 0;
    dayTimeStampList.map((timeStamp) => {
      if (data[timeStamp] >= max) {
        label = moment(parseInt(timeStamp)).format("DD MMM YY");
        max = data[timeStamp];
      }
    });
    setHighestValue({ label, max });
    setDataSets({
      labels: dayTimeStampList.map((timestamp) =>
        moment(parseInt(timestamp)).format("DD MMM YY").toString()
      ),
      datasets: datasets,
    });
  };

  return (
    <div>
      <div className={cx("main-container")}>
        {/* <h1 className={cx("heading")}>Statistical Reports</h1> */}
        <div className={cx("print-button")}>
          <ReactToPrint
            trigger={() => (
              <Button disabled={!reportType} icon={<PrinterOutlined />}>
                Print To PDF
              </Button>
            )}
            content={() => reportComponent.current}
          ></ReactToPrint>
        </div>
        <div className={cx("dropdowns")}>
          <div>
            <Dropdown
              value={reportType}
              options={reportTypeMenu.options}
              placeholder={reportTypeMenu.placeholder}
              onChange={(value) => setReportType(value)}
            />
          </div>
          {reportType === reportTypeMenu.constants.CATEGORY && (
            <div>
              <Dropdown
                value={month}
                onChange={(value) => setMonth(value)}
                placeholder={monthlyData.placeholder}
                options={monthMenu.options}
              />
            </div>
          )}
          {reportType === reportTypeMenu.constants.TIMELINE && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "flex-end",
              }}
            >
              <Dropdown
                value={timeline}
                onChange={(value) => setTimeline(value)}
                placeholder={timelineReportMenu.placeholder}
                options={timelineReportMenu.options}
              />
              {timeline === timelineReportMenu.constants.DAYS && (
                <Dropdown
                  value={dayTimeline}
                  onChange={(value) => setDayTimeline(value)}
                  placeholder={dayTimelineReportMenu.placeholder}
                  options={dayTimelineReportMenu.options}
                />
              )}
            </div>
          )}
        </div>
        {reportType && dataSets ? (
          <div ref={reportComponent}>
            {highestValue && (
              <div className={cx("highest-value")}>
                <span>{highestValue.label}: </span>
                <AnimatedNumber
                  className={cx("currency")}
                  value={highestValue.max}
                  duration={1000}
                  formatValue={(value) => "$" + Number(value).toFixed(2)}
                />
              </div>
            )}
            <CreateChart
              type={chartType}
              options={chartData.options}
              data={dataSets}
            />
            {reportType === reportTypeMenu.constants.TIMELINE && (
              <RadioGroup
                className={cx("chart-type")}
                options={chartTypeRadio.options}
                value={chartType}
                onChange={(e) => setChartType(e.target.value)}
              />
            )}
          </div>
        ) : (
          <h2 style={{ color: "#2a95bf" }}>
            Select Report Type <SmileOutlined />
          </h2>
        )}
      </div>
    </div>
  );
};

export default Reports;
