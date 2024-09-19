import React, { useEffect, useState } from "react";
import { Avatar, Button, Skeleton } from "@nextui-org/react";
import { Pencil } from "lucide-react";

const transactions = [
  {
    id: 1,
    date: "2024-08-01",
    description: "DEBT",
    amount: "$150.00",
  },
  {
    id: 2,
    date: "2024-08-05",
    description: "MPESA",
    amount: "-$50.00",
  },
  {
    id: 3,
    date: "2024-08-10",
    description: "CASH",
    amount: "$75.00",
  },
  {
    id: 2,
    date: "2024-08-05",
    description: "MPESA",
    amount: "-$50.00",
  },
  {
    id: 3,
    date: "2024-08-10",
    description: "CASH",
    amount: "$75.00",
  },
  {
    id: 2,
    date: "2024-08-05",
    description: "MPESA",
    amount: "-$50.00",
  },
  {
    id: 3,
    date: "2024-08-10",
    description: "CASH",
    amount: "$75.00",
  },
  {
    id: 2,
    date: "2024-08-05",
    description: "MPESA",
    amount: "-$50.00",
  },
  {
    id: 3,
    date: "2024-08-10",
    description: "CASH",
    amount: "$75.00",
  },
  {
    id: 2,
    date: "2024-08-05",
    description: "MPESA",
    amount: "-$50.00",
  },
  {
    id: 3,
    date: "2024-08-10",
    description: "CASH",
    amount: "$75.00",
  },
  {
    id: 2,
    date: "2024-08-05",
    description: "MPESA",
    amount: "-$50.00",
  },
  {
    id: 3,
    date: "2024-08-10",
    description: "CASH",
    amount: "$75.00",
  },
  {
    id: 2,
    date: "2024-08-05",
    description: "MPESA",
    amount: "-$50.00",
  },
  {
    id: 3,
    date: "2024-08-10",
    description: "CASH",
    amount: "$75.00",
  },
  {
    id: 2,
    date: "2024-08-05",
    description: "MPESA",
    amount: "-$50.00",
  },
  {
    id: 3,
    date: "2024-08-10",
    description: "CASH",
    amount: "$75.00",
  },
  {
    id: 2,
    date: "2024-08-05",
    description: "MPESA",
    amount: "-$50.00",
  },
  {
    id: 3,
    date: "2024-08-10",
    description: "CASH",
    amount: "$75.00",
  },
  {
    id: 2,
    date: "2024-08-05",
    description: "MPESA",
    amount: "-$50.00",
  },
  {
    id: 3,
    date: "2024-08-10",
    description: "CASH",
    amount: "$75.00",
  },
  {
    id: 2,
    date: "2024-08-05",
    description: "MPESA",
    amount: "-$50.00",
  },
  {
    id: 3,
    date: "2024-08-10",
    description: "CASH",
    amount: "$75.00",
  },
  {
    id: 2,
    date: "2024-08-05",
    description: "MPESA",
    amount: "-$50.00",
  },
  {
    id: 3,
    date: "2024-08-10",
    description: "CASH",
    amount: "$75.00",
  },
  {
    id: 2,
    date: "2024-08-05",
    description: "MPESA",
    amount: "-$50.00",
  },
  {
    id: 3,
    date: "2024-08-10",
    description: "CASH",
    amount: "$75.00",
  },
  {
    id: 2,
    date: "2024-08-05",
    description: "MPESA",
    amount: "-$50.00",
  },
  {
    id: 3,
    date: "2024-08-10",
    description: "CASH",
    amount: "$75.00",
  },
  {
    id: 2,
    date: "2024-08-05",
    description: "MPESA",
    amount: "-$50.00",
  },
  {
    id: 3,
    date: "2024-08-10",
    description: "CASH",
    amount: "$75.00",
  },
  {
    id: 2,
    date: "2024-08-05",
    description: "MPESA",
    amount: "-$50.00",
  },
  {
    id: 3,
    date: "2024-08-10",
    description: "CASH",
    amount: "$75.00",
  },
  {
    id: 2,
    date: "2024-08-05",
    description: "MPESA",
    amount: "-$50.00",
  },
  {
    id: 3,
    date: "2024-08-10",
    description: "CASH",
    amount: "$75.00",
  },
  {
    id: 2,
    date: "2024-08-05",
    description: "MPESA",
    amount: "-$50.00",
  },
  {
    id: 3,
    date: "2024-08-10",
    description: "CASH",
    amount: "$75.00",
  },
  {
    id: 2,
    date: "2024-08-05",
    description: "MPESA",
    amount: "-$50.00",
  },
  {
    id: 3,
    date: "2024-08-10",
    description: "CASH",
    amount: "$75.00",
  },
  {
    id: 2,
    date: "2024-08-05",
    description: "MPESA",
    amount: "-$50.00",
  },
  {
    id: 3,
    date: "2024-08-10",
    description: "CASH",
    amount: "$75.00",
  },
  {
    id: 2,
    date: "2024-08-05",
    description: "MPESA",
    amount: "-$50.00",
  },
  {
    id: 3,
    date: "2024-08-10",
    description: "CASH",
    amount: "$75.00",
  },
  {
    id: 2,
    date: "2024-08-05",
    description: "MPESA",
    amount: "-$50.00",
  },
  {
    id: 3,
    date: "2024-08-10",
    description: "CASH",
    amount: "$75.00",
  },
  {
    id: 2,
    date: "2024-08-05",
    description: "MPESA",
    amount: "-$50.00",
  },
  {
    id: 3,
    date: "2024-08-10",
    description: "CASH",
    amount: "$75.00",
  },
  {
    id: 2,
    date: "2024-08-05",
    description: "MPESA",
    amount: "-$50.00",
  },
  {
    id: 3,
    date: "2024-08-10",
    description: "CASH",
    amount: "$75.00",
  },
  {
    id: 2,
    date: "2024-08-05",
    description: "MPESA",
    amount: "-$50.00",
  },
  {
    id: 3,
    date: "2024-08-10",
    description: "CASH",
    amount: "$75.00",
  },
  {
    id: 2,
    date: "2024-08-05",
    description: "MPESA",
    amount: "-$50.00",
  },
  {
    id: 3,
    date: "2024-08-10",
    description: "CASH",
    amount: "$75.00",
  },
  {
    id: 2,
    date: "2024-08-05",
    description: "MPESA",
    amount: "-$50.00",
  },
  {
    id: 3,
    date: "2024-08-10",
    description: "CASH",
    amount: "$75.00",
  },
  {
    id: 2,
    date: "2024-08-05",
    description: "MPESA",
    amount: "-$50.00",
  },
  {
    id: 3,
    date: "2024-08-10",
    description: "CASH",
    amount: "$75.00",
  },
  {
    id: 2,
    date: "2024-08-05",
    description: "MPESA",
    amount: "-$50.00",
  },
  {
    id: 3,
    date: "2024-08-10",
    description: "CASH",
    amount: "$75.00",
  },
  {
    id: 2,
    date: "2024-08-05",
    description: "MPESA",
    amount: "-$50.00",
  },
  {
    id: 3,
    date: "2024-08-10",
    description: "CASH",
    amount: "$75.00",
  },
  {
    id: 2,
    date: "2024-08-05",
    description: "MPESA",
    amount: "-$50.00",
  },
  {
    id: 3,
    date: "2024-08-10",
    description: "CASH",
    amount: "$75.00",
  },
  {
    id: 2,
    date: "2024-08-05",
    description: "MPESA",
    amount: "-$50.00",
  },
  {
    id: 3,
    date: "2024-08-10",
    description: "CASH",
    amount: "$75.00",
  },
  {
    id: 2,
    date: "2024-08-05",
    description: "MPESA",
    amount: "-$50.00",
  },
  {
    id: 3,
    date: "2024-08-10",
    description: "CASH",
    amount: "$75.00",
  },
  {
    id: 2,
    date: "2024-08-05",
    description: "MPESA",
    amount: "-$50.00",
  },
  {
    id: 3,
    date: "2024-08-10",
    description: "CASH",
    amount: "$75.00",
  },
  {
    id: 2,
    date: "2024-08-05",
    description: "MPESA",
    amount: "-$50.00",
  },
  {
    id: 3,
    date: "2024-08-10",
    description: "CASH",
    amount: "$75.00",
  },
  {
    id: 2,
    date: "2024-08-05",
    description: "MPESA",
    amount: "-$50.00",
  },
  {
    id: 3,
    date: "2024-08-10",
    description: "CASH",
    amount: "$75.00",
  },
  {
    id: 2,
    date: "2024-08-05",
    description: "MPESA",
    amount: "-$50.00",
  },
  {
    id: 3,
    date: "2024-08-10",
    description: "CASH",
    amount: "$75.00",
  },
  {
    id: 2,
    date: "2024-08-05",
    description: "MPESA",
    amount: "-$50.00",
  },
  {
    id: 3,
    date: "2024-08-10",
    description: "CASH",
    amount: "$75.00",
  },
  {
    id: 2,
    date: "2024-08-05",
    description: "MPESA",
    amount: "-$50.00",
  },
  {
    id: 3,
    date: "2024-08-10",
    description: "CASH",
    amount: "$75.00",
  },
  {
    id: 2,
    date: "2024-08-05",
    description: "MPESA",
    amount: "-$50.00",
  },
  {
    id: 3,
    date: "2024-08-10",
    description: "CASH",
    amount: "$75.00",
  },
  // Add more transactions as needed
];

const Sidebar = () => {
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [userInfo, setUserInfo] = useState({
    avatar: "", // You can use a URL or base64 image string here
    name: "John Doe",
    username: "johndoe",
    email: "john.doe@example.com",
  });

  useEffect(() => {
    // Simulate an API call
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate a 2-second loading time
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  return (
    <div className=" h-full w-full flex flex-col">
      <div className="flex flex-col items-center space-y-4 py-6 px-4">
        {loading ? (
          <>
            <Skeleton className="flex rounded-full w-28 h-28" />
            <Skeleton className="h-4 w-24 rounded-lg" />
            <Skeleton className="h-4 w-20 rounded-lg" />
            <Skeleton className="h-4 w-48 rounded-lg" />
          </>
        ) : (
          <>
            <Avatar
              alt="Avatar"
              className="rounded-full w-28 h-28 bg-slate-600"
              src={userInfo.avatar}
            />
            <input
              className={`h-7 w-32 rounded-lg px-4 text-center outline-none focus:outline-none ${editMode ? "bg-slate-800" : "bg-transparent"}`}
              name="name"
              readOnly={!editMode}
              type="text"
              value={userInfo.name}
              onChange={handleInputChange}
            />
            <input
              className={`h-5 w-28 rounded-lg px-4 text-center text-sm text-gray-500 outline-none focus:outline-none ${editMode ? "bg-slate-800" : "bg-transparent"}`}
              name="username"
              readOnly={!editMode}
              type="text"
              value={userInfo.username}
              onChange={handleInputChange}
            />
            <input
              className={`h-7 w-48 rounded-lg text-center outline-none focus:outline-none ${editMode ? "bg-slate-800" : "bg-transparent"}`}
              name="email"
              readOnly={!editMode}
              type="email"
              value={userInfo.email}
              onChange={handleInputChange}
            />
          </>
        )}
        <Button
          color={"primary"}
          className={"font-bold"}
          size="sm"
          variant={editMode ? "solid" : "light"}
          onClick={toggleEditMode}
        >
          <Pencil size={14} /> Edit
        </Button>
      </div>
      <div className="flex flex-col space-y-2 h-full w-full px-2.5 overflow-auto">
        <table className="min-w-full text-white text-sm text-center overflow-y-scroll">
          <thead className={"text-center"}>
            <tr className={"sticky top-0"}>
              <th className="text-left py-2 text-xs px-2 bg-gray-700 rounded-l-lg">
                Date
              </th>
              <th className="text-left py-2 px-2 bg-gray-700">
                Payment method
              </th>
              <th className="text-left py-2 px-2 bg-gray-700 rounded-r-lg">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              // Skeletons for loading state
              Array.from({ length: 20 }).map((_, index) => (
                <tr key={index} className="text-center">
                  <td className="py-2 px-2">
                    <Skeleton className="h-4 w-full rounded-lg" />
                  </td>
                  <td className="py-2 px-2">
                    <Skeleton className="h-4 w-full rounded-lg" />
                  </td>
                  <td className="py-2 px-2">
                    <Skeleton className="h-4 w-full rounded-lg" />
                  </td>
                </tr>
              ))
            ) : transactions.length > 0 ? (
              transactions.map((transaction) => (
                <tr key={transaction.id} className="text-center">
                  <td className="py-2 px-2">{transaction.date}</td>
                  <td className="py-2 px-2">{transaction.description}</td>
                  <td className="py-2 px-2">{transaction.amount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="py-2 px-2 text-center colspan-3">
                  No transactions available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sidebar;
