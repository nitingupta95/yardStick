import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Transaction } from '../types/transaction';

export const exportToPDF = (transactions: Transaction[]) => {
  const doc = new jsPDF();

  // Add title
  doc.setFontSize(18);
  doc.text('Transactions Report', 14, 20);

  // Add date
  const currentDate = new Date().toLocaleDateString();
  doc.setFontSize(11);
  doc.text(`Generated on: ${currentDate}`, 14, 28);

  // Table data
  const tableData = transactions.map((txn) => [
    txn.date,
    txn.description,
    txn.category ?? 'Other',
    txn.amount.toFixed(2),
  ]);

  // Table headers
  const tableHeaders = [['Date', 'Description', 'Category', 'Amount']];

  // Add table
  autoTable(doc, {
    head: tableHeaders,
    body: tableData,
    startY: 35,
  });

 
  doc.save('transactions_report.pdf');
};
