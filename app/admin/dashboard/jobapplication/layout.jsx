import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

function JoblApplicationayout({children}) {
  return (
    <div><div className='container'>
            <Card className='w-4xl m-auto mt-5' >
                <CardHeader>
                    <CardTitle className={` text-lg`}>
                       JobList
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div>{children}</div>
                </CardContent>
            </Card>
        </div></div>
  )
}

export default JoblApplicationayout