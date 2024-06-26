import { useEffect, useState } from "react";
import { useRecords } from "../context/RecordsContext";
import dayjs from "dayjs";

function RecordsReportPage() {
  const { getRecords, records } = useRecords();
  const [bloodPressureData, setBloodPressureData] = useState([]);
  const [heartRateData, setHeartRateData] = useState([]);
  const [graphType, setGraphType] = useState("bar");

  useEffect(() => {
    getRecords();
  }, []);

  useEffect(() => {
    if (records.length > 0) {
      const bpData = records.map(record => ({
        date: dayjs(record.date).format("YYYY-MM-DD"),
        systolic: record.vitalSigns.bloodPressure.systolic,
        diastolic: record.vitalSigns.bloodPressure.diastolic,
      }));
      const hrData = records.map(record => ({
        date: dayjs(record.date).format("YYYY-MM-DD"),
        heartRate: record.vitalSigns.heartRate,
      }));
      setBloodPressureData(bpData);
      setHeartRateData(hrData);
    }
  }, [records]);

  return (
    <div className="p-6 bg-gray-dark min-h-screen flex flex-col items-center">
      <h1 className="text-3xl text-white font-bold mb-4">Records Report</h1>
      
      <div className="w-full max-w-4xl mb-4 flex justify-center">
        {["bar", "line", "scatter", "pie"].map(type => (
          <button
            key={type}
            onClick={() => setGraphType(type)}
            className={`px-4 py-2 mr-2 rounded-md transition ${
              graphType === type ? "bg-blue text-white" : "bg-gray text-white"
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)} Graph
          </button>
        ))}
      </div>

      <div className="w-full max-w-4xl">
        <h2 className="text-xl text-white font-bold mb-2">Blood Pressure Over Time</h2>
        {graphType === "bar" ? (
          <div className="bg-gray p-6 rounded-md text-white">
            <div className="flex justify-between">
              {bloodPressureData.map((data, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className="bg-blue h-8 mb-1"
                    style={{ height: `${data.systolic * 2}px`, width: "20px" }}
                    title={`Systolic: ${data.systolic}`}
                  ></div>
                  <div
                    className="bg-blue-light h-8"
                    style={{ height: `${data.diastolic * 2}px`, width: "20px" }}
                    title={`Diastolic: ${data.diastolic}`}
                  ></div>
                  <span className="text-xs mt-2">{data.date}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <span>Systolic</span>
              <span>Diastolic</span>
            </div>
          </div>
        ) : graphType === "line" ? (
          <svg className="w-full h-60 bg-gray p-6 rounded-md text-white">
            {bloodPressureData.map((data, index) => (
              <g key={index}>
                <circle
                  cx={(index + 1) * 30}
                  cy={100 - data.systolic}
                  r="5"
                  fill="#24648f"
                  title={`Systolic: ${data.systolic}`}
                />
                <circle
                  cx={(index + 1) * 30}
                  cy={100 - data.diastolic}
                  r="5"
                  fill="#88C5E0"
                  title={`Diastolic: ${data.diastolic}`}
                />
                {index < bloodPressureData.length - 1 && (
                  <>
                    <line
                      x1={(index + 1) * 30}
                      y1={100 - data.systolic}
                      x2={(index + 2) * 30}
                      y2={100 - bloodPressureData[index + 1].systolic}
                      stroke="#24648f"
                      strokeWidth="2"
                    />
                    <line
                      x1={(index + 1) * 30}
                      y1={100 - data.diastolic}
                      x2={(index + 2) * 30}
                      y2={100 - bloodPressureData[index + 1].diastolic}
                      stroke="#88C5E0"
                      strokeWidth="2"
                    />
                  </>
                )}
              </g>
            ))}
            <text x="10" y="10" fill="#FFFFFF">Blood Pressure</text>
            <text x="10" y="50" fill="#FFFFFF" transform="rotate(-90 10,50)">Value</text>
          </svg>
        ) : graphType === "scatter" ? (
          <svg className="w-full h-60 bg-gray p-6 rounded-md text-white">
            {bloodPressureData.map((data, index) => (
              <g key={index}>
                <circle
                  cx={(index + 1) * 30}
                  cy={100 - data.systolic}
                  r="5"
                  fill="#24648f"
                  title={`Systolic: ${data.systolic}`}
                />
                <circle
                  cx={(index + 1) * 30}
                  cy={100 - data.diastolic}
                  r="5"
                  fill="#88C5E0"
                  title={`Diastolic: ${data.diastolic}`}
                />
              </g>
            ))}
            <text x="10" y="10" fill="#FFFFFF">Blood Pressure</text>
            <text x="10" y="50" fill="#FFFFFF" transform="rotate(-90 10,50)">Value</text>
          </svg>
        ) : (
          <div className="w-full h-60 bg-gray p-6 rounded-md text-white flex items-center justify-center">
            {/* Simple Pie Chart */}
            <svg viewBox="0 0 32 32" width="200" height="200">
              {bloodPressureData.map((data, index) => {
                const total = data.systolic + data.diastolic;
                const systolicPercentage = (data.systolic / total) * 100;
                const diastolicPercentage = (data.diastolic / total) * 100;
                return (
                  <g key={index}>
                    <circle r="16" cx="16" cy="16" fill="#24648f" strokeDasharray={`${systolicPercentage} ${100 - systolicPercentage}`} strokeWidth="32" transform="rotate(-90) translate(-32)" />
                    <circle r="16" cx="16" cy="16" fill="#88C5E0" strokeDasharray={`${diastolicPercentage} ${100 - diastolicPercentage}`} strokeWidth="32" transform={`rotate(${systolicPercentage - 90}) translate(-32)`} />
                  </g>
                );
              })}
            </svg>
          </div>
        )}

        <h2 className="text-xl text-white font-bold mt-8 mb-2">Heart Rate Over Time</h2>
        {graphType === "bar" ? (
          <div className="bg-gray p-6 rounded-md text-white">
            <div className="flex justify-between">
              {heartRateData.map((data, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className="bg-green h-8"
                    style={{ height: `${data.heartRate * 2}px`, width: "20px" }}
                    title={`Heart Rate: ${data.heartRate}`}
                  ></div>
                  <span className="text-xs mt-2">{data.date}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <span>Heart Rate</span>
            </div>
          </div>
        ) : graphType === "line" ? (
          <svg className="w-full h-60 bg-gray p-6 rounded-md text-white">
            {heartRateData.map((data, index) => (
              <g key={index}>
                <circle
                  cx={(index + 1) * 30}
                  cy={100 - data.heartRate}
                  r="5"
                  fill="#2EBF6E"
                  title={`Heart Rate: ${data.heartRate}`}
                />
                {index < heartRateData.length - 1 && (
                  <line
                    x1={(index + 1) * 30}
                    y1={100 - data.heartRate}
                    x2={(index + 2) * 30}
                    y2={100 - heartRateData[index + 1].heartRate}
                    stroke="#2EBF6E"
                    strokeWidth="2"
                  />
                )}
              </g>
            ))}
            <text x="10" y="10" fill="#FFFFFF">Heart Rate</text>
            <text x="10" y="50" fill="#FFFFFF" transform="rotate(-90 10,50)">BPM</text>
          </svg>
        ) : graphType === "scatter" ? (
          <svg className="w-full h-60 bg-gray p-6 rounded-md text-white">
            {heartRateData.map((data, index) => (
              <g key={index}>
                <circle
                  cx={(index + 1) * 30}
                  cy={100 - data.heartRate}
                  r="5"
                  fill="#2EBF6E"
                  title={`Heart Rate: ${data.heartRate}`}
                />
              </g>
            ))}
            <text x="10" y="10" fill="#FFFFFF">Heart Rate</text>
            <text x="10" y="50" fill="#FFFFFF" transform="rotate(-90 10,50)">BPM</text>
          </svg>
        ) : (
          <div className="w-full h-60 bg-gray p-6 rounded-md text-white flex items-center justify-center">
            {/* Simple Pie Chart */}
            <svg viewBox="0 0 32 32" width="200" height="200">
              {heartRateData.map((data, index) => {
                const total = data.heartRate;
                const heartRatePercentage = (data.heartRate / total) * 100;
                return (
                  <g key={index}>
                    <circle r="16" cx="16" cy="16" fill="#2EBF6E" strokeDasharray={`${heartRatePercentage} ${100 - heartRatePercentage}`} strokeWidth="32" transform="rotate(-90) translate(-32)" />
                  </g>
                );
              })}
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecordsReportPage;
