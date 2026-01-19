'use client'
import { deleteData, readData } from '@/helper/axios';
import { Paper, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { DataGrid } from "@mui/x-data-grid";
import { Button } from '@/components/ui/button';
import { Edit, Edit2Icon, Edit3Icon, EditIcon, Trash2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/ui/spinner';

function BlogList() {
  const router = useRouter()
  const [loader, setLoader] = useState(false)
  const [rows, setRows] = useState([]);

  const GetBlog = async (token) => {
    setLoader(true)
    try {
      const res = await readData(`/blog/getAllBlogs`, {
        headers: {
          "Content-Type": "application/json",
          'authorization': `Bearer ${token}`
        },
      });
      if (res.message === 'Get Blogs Scussfully!!!') {
        setRows(res.blogs)
        setLoader(false)
      }
    } catch (error) {
      console.log("errorr", error)
      setLoader(false)
    }

  }
  const handleEdit = async (data) => {
    await router.push(`/admin/dashboard/blogs/${data._id}`);
  }

  const handleDelete = async (data) => {
    const token = localStorage.getItem("token");
    const res = await deleteData(`/blog/deleteBlog/${data._id}`, {
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
  { field: "posttype", headerName: "Post Type", width: 120 },
  { field: "title", headerName: "Title", width: 200, renderCell: (params) => truncate(params.row.title, 10),},
  { field: "summry", headerName: "Summary", width: 220 ,  renderCell: (params) => truncate(params.row.summry, 20),},
  {
    field: "publishdate",
    headerName: "Publish Date",
    width: 150,
   
  },
  { field: "status", headerName: "Status", width: 120 },
  { field: "category", headerName: "Category", width: 150 },
  {
    field: "featuredImage",
    headerName: "Featured Image",
    width: 160,
    renderCell: (params) =>
      params.row.featuredImage ? "Uploaded" : "—",
  },
  {
    field: "videoLink",
    headerName: "Video Link",
    width: 180,
    renderCell: (params) =>
      params.row.videoLink ? params.row.videoLink : "—",
  },
  {
    field: "thumbnail",
    headerName: "Thumbnail",
    width: 140,
    renderCell: (params) =>
      params.row.thumbnail ? "Uploaded" : "—",
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

export default BlogList