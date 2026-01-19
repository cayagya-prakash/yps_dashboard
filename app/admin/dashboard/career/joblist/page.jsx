'use client'
import { deleteData, readData } from '@/helper/axios';
import { Paper, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { DataGrid } from "@mui/x-data-grid";
import { Button } from '@/components/ui/button';
import { Edit, Edit2Icon, Edit3Icon, EditIcon, Trash2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/ui/spinner';
import { format } from 'date-fns';

function JobList() {
  const router = useRouter()
  const [loader, setLoader] = useState(false)
  const [rows, setRows] = useState([]);

  const GetBlog = async (token) => {
    setLoader(true)
    try {
      const res = await readData(`career/getAlljobs`, {
        headers: {
          "Content-Type": "application/json",
          'authorization': `Bearer ${token}`
        },
      });
      if (res.status === true) {
        setRows(res.jobs)
        setLoader(false)
      }
    } catch (error) {
      console.log("errorr", error)
      setLoader(false)
    }

  }
  const handleEdit = async (data) => {
    await router.push(`/admin/dashboard/career/${data._id}`);
  }

  const handleDelete = async (data) => {
    const token = localStorage.getItem("token");
    const res = await deleteData(`/career/deleteJob/${data._id}`, {
      headers: {
        "Content-Type": "application/json",
        'authorization': `Bearer ${token}`
      },
    });
    if(res.status === true){
      GetBlog(token)
    }
  }

  const truncate = (text, max = 25) =>
  text && text.length > max ? text.slice(0, max) + "..." : text;

const columns = [
  {
    field: "actions",
    headerName: "Actions",
    width: 120,
    sortable: false,
    renderCell: (params) => (
      <Stack direction="row" spacing={2} className="mt-3">
        <Button
          variant="contained"
          size="small"
          onClick={() => handleEdit(params.row)}
        >
          <Edit2Icon className="text-[#192839fc]" />
        </Button>

        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={() => handleDelete(params.row)}
        >
          <Trash2Icon className="text-[#192839fc]" />
        </Button>
      </Stack>
    ),
  },

  { field: "id", headerName: "ID", width: 80 },
  { field: "jobTitle", headerName: "Job Title", width: 200 },
  { field: "jobType", headerName: "Job Type", width: 130 },

  { field: "department", headerName: "Department", width: 150 },

  { field: "location", headerName: "Location", width: 150 },

  { field: "workMode", headerName: "Work Mode", width: 130 },

  {
    field: "experience",
    headerName: "Experience",
    width: 130,
  },

  {
    field: "qualification",
    headerName: "Qualification",
    width: 160,
    renderCell: (params) => truncate(params.value, 20),
  },

  {
    field: "jobDescription",
    headerName: "Job Description",
    width: 220,
    renderCell: (params) => truncate(params.value, 30),
  },

  {
    field: "keyResponsibilities",
    headerName: "Responsibilities",
    width: 220,
    renderCell: (params) => truncate(params.value, 30),
  },

  {
    field: "requiredSkills",
    headerName: "Required Skills",
    width: 200,
    renderCell: (params) => truncate(params.value, 25),
  },

  {
    field: "preferredSkills",
    headerName: "Preferred Skills",
    width: 200,
    renderCell: (params) => truncate(params.value, 25),
  },

  {
    field: "salaryRange",
    headerName: "Salary",
    width: 130,
  },

  {
    field: "openings",
    headerName: "Openings",
    width: 110,
  },

  {
    field: "deadline",
    headerName: "Deadline",
    width: 140,
  },

  {
    field: "status",
    headerName: "Status",
    width: 120,
  },
];


  const paginationModel = { page: 0, pageSize: 10 };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      await GetBlog(token);  // ✔️ now state update happens asynchronously
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
    </div>
  )
}

export default JobList