"use client";
import React, { useState, useEffect } from "react";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import Loader from "../../../components/common/Loader";
import { SessionProvider } from 'next-auth/react';

const DashboardLayout = ({children}) => {
    
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, []);
    return (
        <>
            <SessionProvider>
                <div className="dark:bg-boxdark-2 dark:text-bodydark">
                    {loading ? <Loader /> :
                        <div className="flex h-screen overflow-hidden">
                            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
                            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
                                <main>
                                    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                                        {children}
                                    </div>
                                </main>
                            </div>
                        </div>
                    }
                </div>
            </SessionProvider>
        </>
    );
}

export default DashboardLayout;