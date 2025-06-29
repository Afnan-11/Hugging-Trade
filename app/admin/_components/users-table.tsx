"use client";
import React, {useMemo, useState} from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Input} from "@/components/ui/input";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import UserSourceChart from "@/app/admin/_components/user-source-chart";

interface User {
  id: number;
  email: string;
  first_name: string | null;
  last_name: string | null;
  created_time: string;
  is_admin: boolean;
  source: string | null;
  user_id: string;
  subscription: any;
}

const fetchUsers = async (): Promise<User[]> => {
  const response = await axios.get("/api/users");
  return response.data;
};

export default function UsersTable() {
  const [filter, setFilter] = useState("");

  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const filteredAndSortedUsers = useMemo(() => {
    return users
      ?.filter((user) =>
        [user.email, user.first_name, user.last_name, user.user_id]
          .join(" ")
          .toLowerCase()
          .includes(filter.toLowerCase()),
      )
      .sort((a, b) => {
        if (a.is_admin === b.is_admin) return 0;
        return a.is_admin ? -1 : 1;
      });
  }, [users, filter]);

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p>Error: {(error as Error).message}</p>;

  console.log(users);

  return (
    <>
      {users && <UserSourceChart users={users} />}

      <div className="space-y-4">
        <Input
          placeholder="Filter users..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-sm"
        />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Subscription</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Broker Account</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedUsers?.map((user) => (
              <TableRow
                key={user?.user_id}
                className={
                  user.is_admin
                    ? "bg-blue-50 hover:bg-blue-100 dark:bg-blue-800/30 dark:hover:bg-blue-700/40"
                    : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                }
              >
                <TableCell>{user?.user_id}</TableCell>
                <TableCell className={user.is_admin ? "font-semibold text-blue-600 dark:text-blue-400" : ""}>
                  {user.is_admin ? "Admin" : "User"}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.first_name || "-"}</TableCell>
                <TableCell>{user.last_name || "-"}</TableCell>
                <TableCell>{user.subscription?.status || "-"}</TableCell>
                <TableCell>{user.source || "-"}</TableCell>
                <TableCell
                  className={
                    (user as any).metaapi_account_id
                      ? "font-medium text-green-600 dark:text-green-400"
                      : "font-medium text-red-600 dark:text-red-400"
                  }
                >
                  {(user as any).metaapi_account_id ? "Yes" : "No"}
                </TableCell>
                <TableCell>{new Date(user.created_time).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
