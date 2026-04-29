import { useState , useEffect } from "react";
import axios from "axios";







function Account() {


        // const [PHONEH , setPHONEH] = useState("Not Provided");
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
    const token = localStorage.getItem("token");
    const [accountData, setAccountData] = useState(null);

    useEffect(() => {
        if (token) {
            
            axios.get("http://localhost:5000/account", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                setAccountData(response.data);
            })
            .catch(error => {
                console.error("Error fetching account data:", error);
            });
        }
    }, [token]);

    // if (accountData && accountData.phone === null) {
    //     setPHONEH("Not Provided<link href=/add_phone>wanna add?</link>");
    // } else if (accountData && accountData.phone !== null) {
    //     setPHONEH(accountData.phone);
    // }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-green-100">
            <h1 className="text-4xl font-bold mb-4">Account Details</h1>
            {accountData ? (
                <div className="bg-white p-6 rounded-lg shadow-md w-96">
                        <img src={accountData.picture} alt="Profile" className="w-24 align-center justify-center h-24 rounded-full mb-4" />    
                    <p className="text-lg"><strong>Name:</strong> {accountData.name}</p>
                    <p className="text-lg"><strong>Email:</strong> {accountData.email}</p>
                    <p className="text-lg"><strong>Phone:</strong> {accountData.phone}</p>
                </div>
            ) : (
                <p className="text-lg text-gray-500">Loading account details...</p>
            )}
        </div>
    );
}        

export default Account;