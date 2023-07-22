import { useState, useEffect } from "react";
import { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IUser } from "../Form";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import Table from "../../components/Table";
import Department from "../../components/Department";

interface ServerResponse {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const Data = () => {
  const navigate = useNavigate();

  const [rows, setRows] = useState<GridRowsProp[]>([]);
  const [columns] = useState<GridColDef[]>([
    { field: "userId", headerName: "User ID", width: 150 },
    { field: "id", headerName: "ID", width: 150 },
    { field: "title", headerName: "Title", width: 150 },
    { field: "body", headerName: "Body", width: 600 },
  ]);

  const [departments] = useState([
    {
      department: "customer_service",
      sub_departments: ["support", "customer_success"],
    },
    {
      department: "design",
      sub_departments: ["graphic_design", "product_design", "web_design"],
    },
  ]);

  const { isLoading, refetch } = useQuery(
    ["fetch-data"],
    async () => {
      try {
        const res = await axios.get<ServerResponse[]>(
          "https://jsonplaceholder.typicode.com/posts"
        );
        return res.data;
      } catch (err) {
        if (axios.isAxiosError(err)) {
          throw new Error(err.message);
        }
      }
    },
    {
      enabled: false,
      onSuccess: (values: GridRowsProp[]) => {
        setRows(values);
      },
    }
  );

  useEffect(() => {
    const user: IUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user.email || user === undefined) {
      navigate("/");
    } else {
      refetch();
    }
  }, []);

  return (
    <section>
      <div className={styles.container}>
        <div className={styles.component}>
          {!isLoading && <Table rows={rows} columns={columns} />}
        </div>

        <div className={styles.component}>
          {departments.map((dept) => (
            <Department department={dept} key={dept.department} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Data;
