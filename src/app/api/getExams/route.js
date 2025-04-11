// /pages/api/getExams.ts
import { google } from 'googleapis';
import path from 'path';

export default async function handler(req, res) {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: path.join(process.cwd(), 'config/google-sheets-key.json'), // <- correct path!
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const client = await auth.getClient();

    const sheets = google.sheets({ version: 'v4', auth: client });

    const spreadsheetId = '1DEGK6FiBadLJmxTbDscuafg7dUOZZsGk1angllkXKwc'; // <- copy from your sheet URL
    const range = 'Sheet1!A2:F';

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values;

    if (!rows || rows.length === 0) {
      return res.status(404).json({ message: 'No data found' });
    }

    const exams = rows.map((row) => ({
      Date: row[0],
      Time: row[1],
      Subject: row[2],
      Room: row[3],
      Notes: row[4],
      StudentNotes: row[5],
    }));

    res.status(200).json(exams);
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ error: 'Failed to fetch data from Google Sheets' });
  }
}
