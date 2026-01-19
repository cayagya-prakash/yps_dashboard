
"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { createData, updateData } from '@/helper/axios';
// import { setUser } from '@/store/userSlice';
import { useFormik } from 'formik';
import { Eye, EyeClosedIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'


function LoginPage() {
    const router = useRouter()
    const [loader, setLoader] = useState(false)
    const [showpsd, setpsd] = useState(false)
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ""
        },
        onSubmit: async values => {
            setLoader(true)
            try {
                const data = {
                    email: values.email,
                    password: values.password
                }
                const res = await updateData("auth/forgetpsd", data, {
                    withCredentials: true,
                    header: {
                        "Content-Type": "application/json",
                    },
                });
                if (res.status === true) {
                    // localStorage.setItem('token', res.data.token)
                    router.push(`/login`);
                }
            } catch (error) {
                console.log("error", error)
                setLoader(false)
            }
        },
    });
    return (
        <div className='container'>
            <div className='p-4'>
                <div>
                    <Input placeholder="Email" id="email" name="email" value={formik.values.email} type='email' onChange={formik.handleChange} />
                    <div className='d-flex'>
                        <Input placeholder="Add new Password" id="password" className='mt-4' name="password" value={formik.values.password} type={showpsd ? 'text' : 'password'} onChange={formik.handleChange} />
                        <span className='position-relative right-10 top-8'>
                            <div onClick={() => setpsd(!showpsd)} className="cursor-pointer">
                                {showpsd ? <Eye /> : <EyeClosedIcon />}
                            </div>
                        </span>
                    </div>
                    <div>
                        <Button className='commonbtn' variant="accent" onClick={formik.handleSubmit}>{loader ? <Spinner /> : 'Submit'}</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage