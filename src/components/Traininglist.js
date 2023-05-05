import React, { useState, useEffect } from "react";
import { reactTable } from "react-table";

export default function Traininglist() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("http://traineeapp.azurewebsites.net/api/trainings")
      .then((response) => response.json())
      .then((data) => {
        const formattedTrainings = data.content.trainings.map((training) => {
          return {
            id: training.id,
            date: new Date(training.date),
            duration: training.duration,
            activity: training.activity,
            customer:
              training.customer.firstname + " " + training.customer.lastname,
          };
        });
        setTrainings(formattedTrainings);
      });
  };

  const columns = [
    {
      Header: "Date",
      accessor: "date",
    },
    {
      Header: "Duration",
      accessor: "duration",
    },
    {
      Header: "Activity",
      accessor: "activity",
    },
    {
      Header: "Customer",
      accessor: "customer",
    },
  ];

  return <reactTable data={trainings} columns={columns} />;
}
