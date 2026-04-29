import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!user || !token) {
            navigate('/login');
        }
    }, [user, token, navigate]);

    return (
        <div className="flex flex-row items-center justify-center h-screen bg-green-100">
            <h1 className="text-4xl font-bold text-green-600">
                Dashboard Page
            </h1>
        </div>
    );
}