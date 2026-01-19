import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
import { AppSidebar } from './appsidebar'
function AdminDashboard({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 ">
        {/* IMPORTANT */}
        <SidebarTrigger />
        <div className='container'>
          {children}
        </div>
      </main>
    </SidebarProvider>
  )
}

export default AdminDashboard