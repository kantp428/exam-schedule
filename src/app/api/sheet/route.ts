import { google } from 'googleapis';
import path from 'path';
import { NextResponse } from 'next/server';

type Exam = {
  Date: string;
  Time: string;
  Subject: string;
  Room: string;
  Notes: string;
  StudentNotes: string;
};

export async function GET() {
  try {
    // Initialize Google API client with service account credentials
    const auth = new google.auth.GoogleAuth({
      keyFile: path.join(process.cwd(), 'service-account.json'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const client = (await auth.getClient()) as any;

    const sheets = google.sheets({ version: 'v4', auth: client });

    const spreadsheetId = '1DEGK6FiBadLJmxTbDscuafg7dUOZZsGk1angllkXKwc';
    const range = 'Sheet1!A2:F';  // Fetch all rows from A2 to the end in columns A-F

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values || [];

    // If there are no rows, return an empty array
    if (rows.length === 0) {
      return NextResponse.json({ error: 'No data found' }, { status: 404 });
    }

    // Map the rows to a structured array of exams
    const exams: Exam[] = rows.map((row) => ({
      Date: row[0],
      Time: row[1],
      Subject: row[2],
      Room: row[3],
      Notes: row[4],
      StudentNotes: row[5],
    }));

    return NextResponse.json(exams);
  } catch (error: any) {
    console.error('Fetch error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
