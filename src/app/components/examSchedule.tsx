'use client';

import { useEffect, useState } from 'react';

// Declare the interface for Exam data
interface Exam {
  Date: string;
  Time: string;
  Subject: string;
  Room: string;
  Notes: string;
  StudentNotes: string;
}

const ExamSchedule = () => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const res = await fetch('/api/getExams');
        const data:Exam[] = await res.json();

        console.log('Fetched data:', data); // Log the fetched data

        // Check if the data is an array
        if (Array.isArray(data)) {
          setExams(data);
        } else {
          throw new Error('Data is not in the expected format.');
        }
      } catch (error) {
        console.error(error);
        setError('Failed to fetch data.');
      }
    };

    fetchExams();
  }, []);

  return (
    <div>
      <h1>Exam Schedule</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error if there's any */}
      <ul>
        {Array.isArray(exams) && exams.length > 0 ? (
          exams.map((exam, index) => (
            <li key={index}>
              <strong>{exam.Subject}</strong> on {exam.Date} at {exam.Time} in Room {exam.Room}.
              <br />
              Notes: {exam.Notes} <br />
              Student Notes: {exam.StudentNotes}
            </li>
          ))
        ) : (
          <p>No exams scheduled.</p>
        )}
      </ul>
    </div>
  );
};

export default ExamSchedule;
