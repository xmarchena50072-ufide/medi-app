import { useEffect, useState } from "react";
import { useRecords } from "../context/RecordsContext";
import RecordCard from "../components/RecordCard";

function RecordsPage() {
  const { getRecords, records } = useRecords();
  const [searchTerm, setSearchTerm] = useState("");
  const [doctorFilter, setDoctorFilter] = useState("");
  const [recordTypeFilter, setRecordTypeFilter] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [filteredRecords, setFilteredRecords] = useState([]);

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
  }, [records, searchTerm, doctorFilter, recordTypeFilter, dateRange]);

  if (records.length === 0) return <h1>No records</h1>;

  return (
    <div className="p-6 bg-gray-dark min-h-screen flex flex-col items-center">
      <h1 className="text-3xl text-white font-bold mb-4">Historia Clinica</h1>

      <div className="w-full max-w-4xl mb-4 flex flex-col sm:flex-row justify-center gap-2">
        <input
          type="text"
          placeholder="Search by patient or doctor..."
          className="px-4 py-2 rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by doctor..."
          className="px-4 py-2 rounded-md"
          value={doctorFilter}
          onChange={(e) => setDoctorFilter(e.target.value)}
        />
        <select
          className="px-4 py-2 rounded-md"
          value={recordTypeFilter}
          onChange={(e) => setRecordTypeFilter(e.target.value)}
        >
          <option value="">Filter by record type</option>
          <option value="checkup">Checkup</option>
          <option value="treatment">Treatment</option>
          <option value="test">Test</option>
        </select>
        <input
          type="date"
          placeholder="Start date"
          className="px-4 py-2 rounded-md"
          value={dateRange.start}
          onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
        />
        <input
          type="date"
          placeholder="End date"
          className="px-4 py-2 rounded-md"
          value={dateRange.end}
          onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 gap-2">
        {filteredRecords.map((record) => (
          <RecordCard record={record} key={record._id} />
        ))}
      </div>
    </div>
  );
}

export default RecordsPage;
