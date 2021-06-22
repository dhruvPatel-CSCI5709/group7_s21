import React, { useEffect, useRef, useState } from "react";
import { Button } from "antd";
import ReactToPrint from "react-to-print";
import { PrinterOutlined, SmileOutlined } from "@ant-design/icons";
import styles from "./Reports.module.css";
import c from "classnames/bind";
import CreateChart from "../../reusables/CreateChart/CreateChart";
import Dropdown from "../../reusables/Dropdown/Dropdown";
import Notification from "../../reusables/Notifications/Notifications";
import { chartData, colors, MONTHS, notificationTypes } from "../../constants";
import {
  dayTimelineReportMenu,
  monthMenu,
  reportTypeMenu,
  timelineReportMenu,
  chartTypeRadio,
} from "./configurations";
import { daysData, monthlyData } from "./data";
import RadioGroup from "../../reusables/RadioGroup/RadioGroup";
import AnimatedNumber from "animated-number-react";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";

const cx = c.bind(styles);

const Reports = () => {
  const [reportType, setReportType] = useState(null);
  const reportComponent = useRef();
  const [month, setMonth] = useState(monthlyData.length);
  const [timeline, setTimeline] = useState(timelineReportMenu.constants.MONTHS);
  const [dayTimeline, setDayTimeline] = useState(5);
  const [chartType, setChartType] = useState(chartTypeRadio.constants.BAR);
  const [highestValue, setHighestValue] = useState(null);

  const [dataSets, setDataSets] = useState(null);

  useEffect(() => {
    if (reportType === reportTypeMenu.constants.CATEGORY) {
      setChartType(chartTypeRadio.constants.BAR);
      const data = monthlyData[month - 1];
      generateCategoryGraph(data);
    }
    if (reportType === reportTypeMenu.constants.TIMELINE) {
      if (timeline === timelineReportMenu.constants.MONTHS) {
        generateExpenseReportByMonths();
      }
      if (timeline === timelineReportMenu.constants.DAYS) {
        const data = daysData.slice(0, dayTimeline);
        generateExpenseReportByDays(data);
      }
    }
  }, [reportType, month, timeline, dayTimeline]);

  const generateCategoryGraph = (data) => {
    if (!data) {
      Notification(
        notificationTypes.ERROR,
        "Data for this month is not available"
      );
      setMonth(monthlyData.length);
      return;
    }
    const datasets = data.expenses.map((category, index) => {
      return {
        label: category.label,
        data: [category.expense],
        backgroundColor: [colors.backgroundColors[index]],
        borderColor: [colors.borderColors[index]],
        borderWidth: 1,
      };
    });
    let label = "";
    let max = 0;
    data.expenses.map((category, index) => {
      if (category.expense > max) {
        max = category.expense;
        label = category.label;
      }
    });
    setHighestValue({ label, max });
    setDataSets({
      labels: ["Expense Report"],
      datasets: datasets,
    });
  };

  const generateExpenseReportByMonths = () => {
    const datasets = [
      {
        label: "Expense Report By Months",
        data: monthlyData.map((month, index) =>
          month.expenses.reduce((sum, item) => sum + item.expense, 0)
        ),
        backgroundColor: [...Array(monthlyData.length)].map(
          (_, index) => colors.backgroundColors[index]
        ),
        borderColor: [...Array(monthlyData.length)].map(
          (_, index) => colors.borderColors[index]
        ),
        borderWidth: 1,
      },
    ];
    let label = "";
    let max = 0;
    monthlyData.map((month, index) => {
      const total = month.expenses.reduce((sum, item) => sum + item.expense, 0);
      if (total >= max) {
        label = MONTHS[index];
        max = total;
      }
    });
    setHighestValue({ label, max });
    setDataSets({
      labels: [...Array(monthlyData.length)].map((_, index) => MONTHS[index]),
      datasets: datasets,
    });
  };

  const generateExpenseReportByDays = (data) => {
    data = data.reverse();
    const datasets = [
      {
        label: "Expense Report By Days",
        data: data.map(
          (day) => day.expenses.reduce((sum, e) => sum + e.expense, 0),
          0
        ),
        backgroundColor: [...Array(dayTimeline)].map(
          (_, index) => colors.backgroundColors[index]
        ),
        borderColor: [...Array(dayTimeline)].map(
          (_, index) => colors.borderColors[index]
        ),
        borderWidth: 1,
      },
    ];
    let label = "";
    let max = 0;
    data.map((day) => {
      const total = day.expenses.reduce((sum, e) => sum + e.expense, 0);
      if (total >= max) {
        label = day.date;
        max = total;
      }
    });
    setHighestValue({ label, max });
    setDataSets({
      labels: data.map((day) => day.date),
      datasets: datasets,
    });
  };

  return (
    <div>
      <Header title="Statistical Reports" />
      <Sidebar />
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
