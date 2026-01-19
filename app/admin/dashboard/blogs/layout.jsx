
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

function BlogLayout({ children }) {
    return (
        <div className='container'>

            <div>{children}</div>

        </div>
    )
}

export default BlogLayout