import { useEffect, useState } from "react";
import { useRecords } from "../context/RecordsContext";
import dayjs from "dayjs";
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useTranslation } from 'react-i18next';

const COLORS = ['#24648f', '#88C5E0', '#2EBF6E', '#FFBB28', '#FF8042'];

function RecordsReportPage() {
  const { t } = useTranslation();
  const { getRecords, records } = useRecords();
  const [bloodPressureData, setBloodPressureData] = useState([]);
  const [heartRateData, setHeartRateData] = useState([]);
  const [recordTypeData, setRecordTypeData] = useState([]);
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
      const rtData = records.reduce((acc, record) => {
        const type = record.recordType ? record.recordType.toLowerCase() : 'unknown';
        acc[type] = (acc[type] || 0) + 1;
        return acc;
      }, {});

      setBloodPressureData(bpData);
      setHeartRateData(hrData);
      setRecordTypeData(Object.entries(rtData).map(([name, value]) => ({ name, value })));
    }
  }, [records]);

  return (
    <div className="p-6 bg-gray-dark min-h-screen flex flex-col items-center">
      <h1 className="text-3xl text-white font-bold mb-4">{t('recordsReportPage.reportTitle')}</h1>
      
      <div className="w-full max-w-4xl mb-4 flex justify-center">
        {["bar", "line", "scatter", "pie"].map(type => (
          <button
            key={type}
            onClick={() => setGraphType(type)}
            className={`px-4 py-2 mr-2 rounded-md transition ${
              graphType === type ? "bg-blue text-white" : "bg-gray text-white"
            }`}
          >
            {t(`recordsReportPage.${type}Graph`)}
          </button>
        ))}
      </div>

      <div className="w-full max-w-4xl">
        <h2 className="text-xl text-white font-bold mb-2">{t('recordsReportPage.bloodPressureTitle')}</h2>
        {graphType === "bar" ? (
          <div className="bg-gray p-6 rounded-md text-white">
            <div className="flex justify-between">
              {bloodPressureData.map((data, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className="bg-blue h-8 mb-1"
                    style={{ height: `${data.systolic * 2}px`, width: "20px" }}
                    title={`${t('recordsReportPage.systolic')}: ${data.systolic}`}
                  ></div>
                  <div
                    className="bg-blue-light h-8"
                    style={{ height: `${data.diastolic * 2}px`, width: "20px" }}
                    title={`${t('recordsReportPage.diastolic')}: ${data.diastolic}`}
                  ></div>
                  <span className="text-xs mt-2">{data.date}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <span>{t('recordsReportPage.systolic')}</span>
              <span>{t('recordsReportPage.diastolic')}</span>
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
                  title={`${t('recordsReportPage.systolic')}: ${data.systolic}`}
                />
                <circle
                  cx={(index + 1) * 30}
                  cy={100 - data.diastolic}
                  r="5"
                  fill="#88C5E0"
                  title={`${t('recordsReportPage.diastolic')}: ${data.diastolic}`}
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
            <text x="10" y="10" fill="#FFFFFF">{t('recordsReportPage.bloodPressure')}</text>
            <text x="10" y="50" fill="#FFFFFF" transform="rotate(-90 10,50)">{t('recordsReportPage.value')}</text>
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
                  title={`${t('recordsReportPage.systolic')}: ${data.systolic}`}
                />
                <circle
                  cx={(index + 1) * 30}
                  cy={100 - data.diastolic}
                  r="5"
                  fill="#88C5E0"
                  title={`${t('recordsReportPage.diastolic')}: ${data.diastolic}`}
                />
              </g>
            ))}
            <text x="10" y="10" fill="#FFFFFF">{t('recordsReportPage.bloodPressure')}</text>
            <text x="10" y="50" fill="#FFFFFF" transform="rotate(-90 10,50)">{t('recordsReportPage.value')}</text>
          </svg>
        ) : (
          <div className="w-full h-60 bg-gray p-6 rounded-md text-white flex items-center justify-center">
            <PieChart width={400} height={400}>
              <Pie
                data={recordTypeData}
                cx={200}
                cy={200}
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {recordTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        )}

        <h2 className="text-xl text-white font-bold mt-8 mb-2">{t('recordsReportPage.heartRateTitle')}</h2>
        {graphType === "bar" ? (
          <div className="bg-gray p-6 rounded-md text-white">
            <div className="flex justify-between">
              {heartRateData.map((data, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className="bg-green h-8"
                    style={{ height: `${data.heartRate * 2}px`, width: "20px" }}
                    title={`${t('recordsReportPage.heartRate')}: ${data.heartRate}`}
                  ></div>
                  <span className="text-xs mt-2">{data.date}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <span>{t('recordsReportPage.heartRate')}</span>
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
                  title={`${t('recordsReportPage.heartRate')}: ${data.heartRate}`}
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
            <text x="10" y="10" fill="#FFFFFF">{t('recordsReportPage.heartRate')}</text>
            <text x="10" y="50" fill="#FFFFFF" transform="rotate(-90 10,50)">{t('recordsReportPage.bpm')}</text>
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
                  title={`${t('recordsReportPage.heartRate')}: ${data.heartRate}`}
                />
              </g>
            ))}
            <text x="10" y="10" fill="#FFFFFF">{t('recordsReportPage.heartRate')}</text>
            <text x="10" y="50" fill="#FFFFFF" transform="rotate(-90 10,50)">{t('recordsReportPage.bpm')}</text>
          </svg>
        ) : (
          <div className="w-full h-60 bg-gray p-6 rounded-md text-white flex items-center justify-center">
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
