import React, { useState, useEffect } from "react";
import ReactTable from "./ReactTable";
import { format } from "date-fns"; // tuo date-fns-kirjasto päivämäärän muotoilua varten

export default function Customerlist() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://traineeapp.azurewebsites.net/api/customers"
      );
      const data = await response.json();
      console.log("customers:",data)
      setCustomers(data.content);
    };

    fetchData();
  }, []);

  const columns = [
    {
      Header: "Firstname",
      accessor: "firstname",
    },
    {
      Header: "Lastname",
      accessor: "lastname",
    },
    // {
    //   Header: "Date",
    //   accessor: "date",
    //   Cell: ({ value }) => format(new Date(value), "dd.MM.yyyy HH:mm"), // muotoile päivämäärä
    // },
  ];

  return (
    <div>
      <ReactTable data={customers} columns={columns} />
    </div>
  );
}
