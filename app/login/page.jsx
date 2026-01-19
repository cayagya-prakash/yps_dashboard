
"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { createData } from '@/helper/axios';
// import { setUser } from '@/store/userSlice';
import { useFormik } from 'formik';
import { Eye, EyeClosedIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import React, { useState } from 'react'
import { toast } from 'sonner';


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
                const res = await createData("", "auth/login", data, {
                    withCredentials: true,
                    header: {
                        "Content-Type": "application/json",
                    },
                });
                if (res.data.success === true || res.status === 200) {
                    localStorage.setItem('token', res.data.token)
                    router.push(`/admin/dashboard`);
                }else if(res.status === 400){
                    toast(res.data.message)
                    setLoader(false)
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

                        <Input placeholder="Password" id="password" className='mt-4' name="password" value={formik.values.password} type={showpsd ? 'text' : 'password'} onChange={formik.handleChange} />
                        <span className='position-relative right-10 top-8'>
                            <div onClick={() => setpsd(!showpsd)} className="cursor-pointer">
                                {showpsd ? <Eye /> : <EyeClosedIcon />}
                            </div>
                        </span>
                    </div>
                    <Link href="/forgotpassword" className='flex justify-end text-end text-muted-foreground pt-2 cursor-pointer font-semibold'>Forgot Password?</Link>

                    <div>
                        <Button className='commonbtn' variant="accent" onClick={formik.handleSubmit}>{loader ? <Spinner /> : 'Login'}</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage