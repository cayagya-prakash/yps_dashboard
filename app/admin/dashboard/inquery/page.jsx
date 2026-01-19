'use client'
import { deleteData, readData } from '@/helper/axios';
import { Paper, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { DataGrid } from "@mui/x-data-grid";
import { Button } from '@/components/ui/button';
import { Edit, Edit2Icon, Edit3Icon, EditIcon, Eye, EyeClosed, Trash2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/ui/spinner';
import { format } from 'date-fns';
import ApplicationMoadal from '../jobapplication/viewModal';
import InqueryModal from './inqModal';


function InqueryList() {
  const router = useRouter()
  const [loader, setLoader] = useState(false)
  const [rows, setRows] = useState([]);
  const [openView, setOpenView] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const GetBlog = async (token) => {
    setLoader(true)
    try {
      const res = await readData(`inquery/getAllinquery`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === true) {
        setRows(res.inqs)
        setLoader(false)
      }
    } catch (error) {
      console.log("errorr", error)
      setLoader(false)
    }

  }

  const handleView = (row) => {
    setSelectedApplication(row);
    setOpenView(true);
  };

  const handleCloseView = () => {
    setOpenView(false);
    setSelectedApplication(null);
  };

  const truncate = (text, max = 25) =>
    text && text.length > max ? text.slice(0, max) + "..." : text;

const columns = [
  {
    field: "actions",
    headerName: "Actions",
    width: 120,
    sortable: false,
    renderCell: (params) => (
      <Stack direction="row" className="mt-1">
        <Button
          variant="contained"
          onClick={() => handleView(params.row)}
        >
          <Eye size={30} className="cursor-pointer" />
        </Button>
      </Stack>
    ),
  },

  {
    field: "name",
    headerName: "Name",
    width: 180,
  },

  {
    field: "email",
    headerName: "Email",
    width: 220,
  },

  {
    field: "phone",
    headerName: "Phone",
    width: 160,
  },

  {
    field: "subject",
    headerName: "Subject",
    width: 200,
  },

  {
    field: "message",
    headerName: "Message",
    width: 200,
    renderCell: (params) => truncate(params.row.message, 20)
  },
];

  const paginationModel = { page: 0, pageSize: 10 };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      await GetBlog();  // ✔️ now state update happens asynchronously
    };

    fetchData();
  }, [])

  return (

    <div>
      {loader ? <div className="d-flex justify-content-center gap-6">
        <Spinner className="size-8" />
      </div> :
        <Paper sx={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10, 20]}
            sx={{ border: 0 }}
            loading={loader === true}
          />
        </Paper>
      }
      <InqueryModal handleCloseView={handleCloseView} openView={openView} setOpenView={setOpenView} selectedApplication={selectedApplication}/>
    </div>
  )
}

export default InqueryList