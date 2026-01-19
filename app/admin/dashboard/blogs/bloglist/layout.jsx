import { robotoSlab } from '@/app/layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

function BlogList({ children }) {
    return (
        <div className='container'>
            <Card className='w-4xl m-auto mt-5' >
                <CardHeader>
                    <CardTitle className={` text-lg`}>
                       BlogList
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div>{children}</div>
                </CardContent>
            </Card>
        </div>
    )
}

export default BlogList