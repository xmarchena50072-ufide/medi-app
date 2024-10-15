import { useEffect, useState } from "react";
import { useRecords } from "../context/RecordsContext";
import RecordCard from "../components/RecordCard";
import { CSVLink } from "react-csv";
import Papa from "papaparse";
import { useTranslation } from "react-i18next"; // Importar i18n
 
function RecordsPage() {
  const { t } = useTranslation(); // Utilizar i18n para traducción
  const { getRecords, records } = useRecords();
  const [searchTerm, setSearchTerm] = useState("");
  const [doctorFilter, setDoctorFilter] = useState("");
  const [recordTypeFilter, setRecordTypeFilter] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [noResults, setNoResults] = useState(false); // Estado para manejar mensaje de error
 
  useEffect(() => {
    getRecords();
  }, []);
 
  useEffect(() => {
    let updatedRecords = records.filter(record => {
      const matchesSearchTerm =
        record.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.doctor.toLowerCase().includes(searchTerm.toLowerCase());
     
      const matchesDoctorFilter =
        doctorFilter === "" || record.doctor.toLowerCase().includes(doctorFilter.toLowerCase());
     
      const matchesRecordTypeFilter =
        recordTypeFilter === "" || record.recordType.toLowerCase() === recordTypeFilter.toLowerCase();
 
      const isWithinDateRange =
        (!dateRange.start || !dateRange.end) ||
        (new Date(record.date) >= new Date(dateRange.start) && new Date(record.date) <= new Date(dateRange.end));
 
      return matchesSearchTerm && matchesDoctorFilter && matchesRecordTypeFilter && isWithinDateRange;
    });
 
    setFilteredRecords(updatedRecords);
    setNoResults(updatedRecords.length === 0); // Si no hay resultados, activar estado de error
  }, [records, searchTerm, doctorFilter, recordTypeFilter, dateRange]);
 
  const exportDataToCSV = () => {
    const csvData = filteredRecords.map(record => ({
      date: record.date,
      patient: record.patient,
      doctor: record.doctor,
      recordType: record.recordType,
      bloodPressureSystolic: record.vitalSigns.bloodPressure.systolic,
      bloodPressureDiastolic: record.vitalSigns.bloodPressure.diastolic,
      heartRate: record.vitalSigns.heartRate,
    }));
 
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'filtered_records.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
 
  if (records.length === 0) return <h1>{t('recordsPage.noRecords')}</h1>;
 
  return (
    <div className="p-6 bg-gray-dark min-h-screen flex flex-col items-center">
      <h1 className="text-3xl text-white font-bold mb-4">{t('recordsPage.title')}</h1>
 
      <div className="w-full max-w-4xl mb-4 flex flex-col sm:flex-row justify-center gap-2">
        <input
          type="text"
          placeholder={t('recordsPage.searchPlaceholder')}
          className="px-4 py-2 rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="text"
          placeholder={t('recordsPage.filterDoctorPlaceholder')}
          className="px-4 py-2 rounded-md"
          value={doctorFilter}
          onChange={(e) => setDoctorFilter(e.target.value)}
        />
        <input
          type="date"
          placeholder={t('recordsPage.startDatePlaceholder')}
          className="px-4 py-2 rounded-md"
          value={dateRange.start}
          onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
        />
        <input
          type="date"
          placeholder={t('recordsPage.endDatePlaceholder')}
          className="px-4 py-2 rounded-md"
          value={dateRange.end}
          onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
        />
        <button
          onClick={exportDataToCSV}
          className="px-4 py-2 bg-blue text-white rounded-md"
        >
          {t('recordsPage.exportButton')}
        </button>
      </div>
 
      {noResults ? (
        <p className="text-white">{t('recordsPage.noSearchResults')}</p>
      ) : (
        <div className="grid grid-cols-1 gap-2">
          {filteredRecords.map((record) => (
            <RecordCard record={record} key={record._id} />
          ))}
        </div>
      )}
    </div>
  );
}
 
export default RecordsPage;
 