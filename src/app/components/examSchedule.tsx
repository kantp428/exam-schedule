'use client';

import { useEffect, useState } from 'react';

export default function ExamSchedule() {
  const [data, setData] = useState<any[]>([]);  // Array of exam data
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSchedule = async () => {
      setLoading(true); // Set loading state to true before fetching data
      try {
        const res = await fetch('/api/sheet');
        const json = await res.json();

        // Log the actual response to inspect its structure
        console.log('API Response:', json);

        if (Array.isArray(json)) {  // Check if response is an array of exam objects
          setData(json);  // Set the response data to the state
        } else if (json.error) {
          setError(json.error);  // Tell error of json
        } else {
          setError('Unexpected response structure');
        }
      } catch (err: any) {
        setError('Failed to load exam schedule');  // Handle fetch error
      } finally {
        setLoading(false);  // Set loading to false after fetch
      }
    };

    fetchSchedule();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Exam Schedule</h1>

      {error && <p className="text-red-500">{error}</p>} 

      {loading ? (
        <p>Loading exam schedule...</p>
      ) : data.length > 0 ? (
        <table className="border border-gray-300">
          <thead>
            <tr>
              <th className="border px-3 py-2">Date</th>
              <th className="border px-3 py-2">Time</th>
              <th className="border px-3 py-2">Subject</th>
              <th className="border px-3 py-2">Room</th>
              <th className="border px-3 py-2">Notes</th>
              <th className="border px-3 py-2">Student Notes</th>
            </tr>
          </thead>
          <tbody>
            {data.map((exam, rowIndex) => (
              <tr key={rowIndex}>
                <td className="border px-3 py-2">{exam.Date}</td>
                <td className="border px-3 py-2">{exam.Time}</td>
                <td className="border px-3 py-2">{exam.Subject}</td>
                <td className="border px-3 py-2">{exam.Room}</td>
                <td className="border px-3 py-2">{exam.Notes}</td>
                <td className="border px-3 py-2">{exam.StudentNotes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}
