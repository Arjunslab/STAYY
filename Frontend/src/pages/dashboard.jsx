import React, { useState, useEffect } from 'react';



export default function Dashboard() {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    
    
    if (!user || !token) {
        return (
            <div className="flex flex-row items-center justify-center h-screen bg-red-100">
                <h1 className="text-4xl font-bold text-red-600">Please log in to access the dashboard.</h1>
            </div>
        );
    }
    return (
        <div className="flex flex-row items-center justify-center h-screen bg-green-100">

            <h1 className="text-4xl font-bold text-green-600">Dashboard Page</h1>   
        </div>
    );
}
