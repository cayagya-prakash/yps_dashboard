
import React from 'react'

import Image from 'next/image'
import logo from '../../public/assets/ca_logo.png'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Playfair_Display } from 'next/font/google';
import { playfair } from '../layout';


function LoginPageLayout({ children }) {
    return (
        <div className='container'>
            <Card className='w-md m-auto mt-5' >
                <CardHeader>
                    <CardTitle>
                        <div className='d-flex align-items-center justify-center'>
                            <Image src={logo} alt='logo' className='w-16' />  <div className="hidden sm:block">
                                <p className={`${playfair.className} font-heading text-[#003366]  font-bold text-lg mb-0  leading-tight`}>
                                    Yagya Prakash Sharda & Co.
                                </p>
                                <p className="text-xs mb-0 text-muted-foreground">
                                    Chartered Accountants
                                </p>
                            </div>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                <p className={`${playfair.className} font-heading text-[#003366]  font-bold text-xl mb-0  leading-tight text-center`}>Login</p>
                    <div>{children}</div>
                </CardContent>
            </Card>
        </div>
    )
}

export default LoginPageLayout