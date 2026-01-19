"use client";

import { Briefcase, BriefcaseBusiness, Calendar, ChevronDown, ChevronRight, CloudCog, Contact, FileOutput, Home, Inbox, LayoutDashboardIcon, List, ListCheck, ListCheckIcon, LogOutIcon, NotepadTextDashed, Package, Plus, PlusCircleIcon, PlusIcon, PlusSquareIcon, Quote, Receipt, ReceiptText, Search, Settings, User2, Users } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import logo from '../../../public/assets/ca_logo.png'
import Image from "next/image"
import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Playfair_Display } from "next/font/google";


// Menu items.
const items = [
    {
        title: "Dashboard",
        url: `/admin/dashboard`,
        icon: LayoutDashboardIcon,
    },
    {
        title: "Blogs",
        url: "#",
        icon: NotepadTextDashed,
        submenu: [
            {
                title: 'Add Blogs',
                url: `/admin/dashboard/blogs`,
                icon: PlusSquareIcon,
            },
            {
                title: 'Blog List',
                url: `/admin/dashboard/blogs/bloglist`,
                icon: ListCheckIcon,
            },
        ]
    },
    {
        title: "Jobs",
        url: "#",
        icon: Briefcase,
        submenu: [
            {
                title: 'Add Jobs',
                url: `/admin/dashboard/career`,
                icon: PlusSquareIcon,
            },
            {
                title: 'Job List',
                url: `/admin/dashboard/career/joblist`,
                icon: ListCheckIcon,
            },
        ]
    },

    {
        title: "Job Applications",
        url: "/admin/dashboard/jobapplication",
        icon: BriefcaseBusiness,
    },
    {
        title: "Inquery",
        url: "/admin/dashboard/inquery",
        icon: ReceiptText,
    },
    {
        title: "LogOut",
        action: 'logout',
        icon: LogOutIcon,

    },

]
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
export function AppSidebar() {
    const [openMenu, setOpenMenu] = useState({}); // track all submenu states
    const [showlogoutModal, setShowLogoutModal] = useState(false)
    const toggleMenu = (title) => {
        setOpenMenu((prev) => ({
            ...prev,
            [title]: !prev[title],
        }));
    };
    const { state } = useSidebar();
    const handleLogout = () => {
        setShowLogoutModal(true);
    };
    const confirmLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login"
    };

    return (
        <>
            <Sidebar collapsible="icon" variant="sidebar">
                <SidebarHeader>
                    {state === "expanded" ? (
                        <>
                            <div className="d-flex align-items-center">
                                <Image src={logo} alt="logo" className=" w-16 me-3 h-10 bg-slate-50 p-1 rounded-sm flex items-center justify-center " />
                                <span className={`text-xl text-white font-semibold `}>Yagya Prakash Sharda & Co.</span>
                            </div>
                        </>
                    ) : (
                        <Image src={logo} alt="logo" className="w-10  bg-slate-50 p-1 rounded-sm flex items-center justify-center" />
                    )}
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {items.map((item) => (
                                    <SidebarMenuItem key={item.title}>

                                        <SidebarMenuButton asChild onClick={(e) => {
                                            if (item.action === "logout") {
                                                e.preventDefault();
                                                handleLogout()
                                                return;
                                            }

                                            if (item.submenu) {
                                                e.preventDefault();
                                                toggleMenu(item.title);
                                            }
                                        }} className="group">

                                            <a href={item.url || '#'} style={{ textDecoration: 'none' }} className="sidebarmenutext">

                                                <item.icon className="icon" />
                                                <span className=" sidebartext group-data-[collapsible=icon]:hidden" >
                                                    {item.title}
                                                </span>
                                                {/* Arrow for submenu */}
                                                {item.submenu && (
                                                    <span className="ml-auto">
                                                        {openMenu[item.title] ? (
                                                            <ChevronDown size={18} />
                                                        ) : (
                                                            <ChevronRight size={18} />
                                                        )}
                                                    </span>
                                                )}
                                            </a>

                                        </SidebarMenuButton>

                                        {item.submenu && openMenu[item.title] && (
                                            <div className=" mt-2">
                                                {item.submenu.map((sub) => (
                                                    <SidebarMenuButton
                                                        key={sub.title}
                                                        asChild
                                                        className="group flex items-center gap-2 text-gray-300 hover:text-white sidebarmenutext"
                                                    >
                                                        <a href={sub.url} style={{ textDecoration: "none" }}>
                                                            <sub.icon className="icon" />
                                                            <span className="sidebartext group-data-[collapsible=icon]:hidden">
                                                                {sub.title}
                                                            </span>
                                                        </a>
                                                    </SidebarMenuButton>
                                                ))}
                                            </div>
                                        )}

                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>

                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>

            </Sidebar>
            {showlogoutModal && (
                <>

                    <Dialog open={showlogoutModal} onOpenChange={setShowLogoutModal}>
                        <DialogContent className=' p-4 w-full  m-auto  overflow-auto'>
                            <DialogTitle className='text-center fs-5'>Are you sure you want to logout?</DialogTitle>
                            <DialogFooter>
                                <div className="flex justify-end align-items-center gap-3">
                                    <Button
                                        onClick={() => setShowLogoutModal(false)}
                                        style={{ width: '50%' }}
                                        className="px-4 commonbtn mt-0 py-2 border rounded-2xl"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={confirmLogout}
                                        style={{ width: '50%' }}
                                        className="commonbtn  px-4 py-2 mt-0 "
                                    >
                                        Logout
                                    </Button></div>
                            </DialogFooter>
                        </DialogContent></Dialog>
                </>
            )}
        </>
    )

}