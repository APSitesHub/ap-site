import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import { useState } from 'react';

export const ScheduleGrid = () => {
  // eslint-disable-next-line
  const [rowData, setRowData] = useState([
    {
      day: 'monday',
      english: '9:00, 20:00',
      deutsch: '19:00',
      polski: '19:00',
    },
  ]);
  // eslint-disable-next-line
  const [colDefs, setColDefs] = useState([
    { field: 'day' },
    { field: 'english' },
    { field: 'deutsch' },
    { field: 'polski' },
  ]);
  return (
    <>
      <AgGridReact rowData={rowData} columnDefs={colDefs} />
    </>
  );
};
