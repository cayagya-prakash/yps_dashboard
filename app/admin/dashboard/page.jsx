
'use client'
import { Card, CardContent } from '@/components/ui/card'
import { readData } from '@/helper/axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

function AdminPage() {
  const [data, setData] = useState([])

  const GetBlog = async (token) => {

    try {
      const res = await readData(`dashboard/dashboardcounts`, {
        headers: {
          "Content-Type": "application/json",
          'authorization': `Bearer ${token}`
        },
      });
      if (res.success === true) {
        setData(res.stats)
      }
    } catch (error) {
      console.log("errorr", error)
    }

  }

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      await GetBlog(token);  // ✔️ now state update happens asynchronously
    };

    fetchData();
  }, [])

  return (
    <>
      <h3 className='headtxt-color'>Dashboard</h3>
      <div className='row mt-4 space-y-4'>
        <div className='col-4'>
          <Card>
            <CardContent>
              <div>
                <Link href='/admin/dashboard/blogs/bloglist' className='text-lg font-bold headtxt-color'>
                  Total Blogs
                </Link>
              </div>
              <p>{data.blogs}</p>
            </CardContent>
          </Card>
        </div>
        <div className='col-4'>
          <Card>
            <CardContent>
              <div>
                <Link href='/admin/dashboard/career/joblist' className='text-lg font-bold headtxt-color'>
                  Total Jobs
                </Link>
              </div>
              <p>{data.jobs}</p>
            </CardContent>
          </Card>
        </div>
        <div className='col-4'>
          <Card>
            <CardContent>
              <div>
                <Link href='/admin/dashboard/inquery' className='text-lg font-bold headtxt-color'>
                  Total Inquery
                </Link>
              </div>
              <p>{data.inquerycol}</p>
            </CardContent>
          </Card>
        </div>
        <div className='col-4'>
          <Card>
            <CardContent>
              <div>
                <Link href='/admin/dashboard/jobapplication' className='text-lg font-bold headtxt-color'>
                  Total JobApplication
                </Link>
              </div>
              <p>{data.jobapplications}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

export default AdminPage