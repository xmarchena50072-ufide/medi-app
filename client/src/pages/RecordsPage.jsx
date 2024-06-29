import { useEffect } from "react";
import { useRecords } from "../context/RecordsContext";
import RecordCard from "../components/RecordCard";

function RecordsPage() {
  const { getRecords, records } = useRecords();

  useEffect(() => {
    getRecords();
  }, []);

  if (records.length === 0) return (<h1>No records</h1>);
  
  return (
    <div className="grid grid-cols-1 gap-2">
      {records.map((record) => (
        <RecordCard record={record} key={record._id} />
      ))}
    </div>
  );
}

export default RecordsPage;
