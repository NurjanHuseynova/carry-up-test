// import { fetchApi, postApi } from '@/services/api';
import React, { useEffect, useState } from 'react'
// import toast from "react-hot-toast";
import styles from '@/assets/css/profile/profileCarryList.module.css'
import Image from 'next/image';
import brush from "@/assets/img/brush.svg";
import trash from "@/assets/img/trash.svg";


interface Trip {
  id: number;
  createdDate: string;
  from: string;
  to: string;
  transport: string;
  deadline: string;
}

function CarryList() {
  // const [trips, setTrips] = useState<Trip[]>([]);  

  // assume data with statically
  const trips: Trip[] = [
    { id: 1, createdDate: "21.12.2024", from: "Baku", to: "Moskva", transport: "Car", deadline: "23.12.2024" },
    { id: 2, createdDate: "21.12.2024", from: "Baku", to: "Moskva", transport: "Bus", deadline: "23.12.2024" },
    { id: 3, createdDate: "21.12.2024", from: "Baku", to: "Moskva", transport: "Bus", deadline: "23.12.2024" },
    { id: 4, createdDate: "21.12.2024", from: "Baku", to: "Moskva", transport: "Ship", deadline: "23.12.2024" },
    { id: 5, createdDate: "21.12.2024", from: "Baku", to: "Moskva", transport: "Plane", deadline: "23.12.2024" },
    // Add more data as needed
  ];
  useEffect(() => {
    // fetchTrips();  
  }, []);

  // async function fetchTrips() {
  //   try {
  //     let userId = JSON.parse(localStorage.getItem('user') || "")?.id;
  //     console.log(userId);

  //     let obj = {
  //       pageSize: 0,
  //       currentPage: 0,
  //       value: {
  //         userId: userId
  //       }
  //     }

  //     const response = await postApi(`Trip/GetTripsByUserId`, obj);

  //     const responseData = response?.value;
  //     console.log(response);

  //     if (responseData) {
  //       setTrips(responseData);
  //     }
  //   } catch (error) {
  //     toast.error('Error fetching trips: ' + error)
  //   }
  // }

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr >
            <th>Created date</th>
            <th>From</th>
            <th>To</th>
            <th>Transport</th>
            <th>Deadline</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {trips.map((trip, i) => (
            <tr key={i}>
              <td>{trip.createdDate}</td>
              <td>{trip.from}</td>
              <td>{trip.to}</td>
              <td>{trip.transport}</td>
              <td>{trip.deadline}</td>
              <td>
                <button
                  title="Edit"
                >
                  <Image
                    src={brush}
                    className={""}
                    alt={'edit'}
                  />
                </button>
                <button
                  title="Delete"
                >
                  <Image
                    src={trash}
                    className={""}
                    alt={'delete'}
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CarryList
