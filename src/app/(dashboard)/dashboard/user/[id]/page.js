"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import Loader from "../../../../../components/common/Loader";


const UserView = ({params}) => {
    const[user, setUser] = useState(null);
    const[message, setMessage] = useState(null);
    const[loading, setLoading]=  useState(true);

    useEffect(() => {
        getUsersDetail();
    },[]);

    const getUsersDetail =  async () => {
        let url = process.env.NEXT_PUBLIC_URL+"/api/user/view";
        let response = await fetch(url, {
            method: "POST",
            body:JSON.stringify({id:params?.id})
        })
        response = await response.json();
        console.log(response);
        if(response.status == true)
        {
            setUser(response.data);
            setLoading(false);
        }
        if(response.status == false)
        {
            setUser(null);
            setMessage(response.msg);
            setLoading(false);
        }
    }
    return (
        <>
            <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <div className="px-4 py-6 md:px-6 xl:px-7.5">
                    <h4 className="text-xl font-semibold text-black dark:text-white">
                    User Detail
                    </h4>
                </div>
                <div className="max-w-full overflow-x-auto">
                    {
                        (loading == true) ? <Loader /> :
                        (user != null && message == null) ?
                        <table className="w-full table-auto">
                            <tbody>
                                <tr>
                                    <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                                        <p className="text-black dark:text-white">First Name : </p>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                                        <p className="text-black dark:text-white">{user.first_name}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                                        <p className="text-black dark:text-white">Last Name : </p>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                                        <p className="text-black dark:text-white">{user.last_name}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                                        <p className="text-black dark:text-white">Email : </p>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                                        <p className="text-black dark:text-white">{user.email}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                                        <p className="text-black dark:text-white">Gender : </p>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                                        <p className="text-black dark:text-white">{user.gender}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                                        <p className="text-black dark:text-white">Hobbies : </p>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                                        <p className="text-black dark:text-white">{user.hobbies}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                                        <p className="text-black dark:text-white">Entry Date : </p>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                                        <p className="text-black dark:text-white">{user.entry_date}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                                        <p className="text-black dark:text-white">Adrress : </p>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                                        <p className="text-black dark:text-white">{user.address}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                                        <p className="text-black dark:text-white">Country : </p>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                                        <p className="text-black dark:text-white">{user.country}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                                        <p className="text-black dark:text-white">Profile Image : </p>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                                        <Image src={user.image} width={100} height={100} alt="profile-pic"/>
                                    </td>
                                </tr>
                            </tbody>
                        </table> : <table className="w-full table-auto">
                            <tbody>
                                <tr>
                                    <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11 text-center">
                                        <p className="text-black dark:text-white">{message} </p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    }
                </div>
            </div>
        </>
    )
}

export default UserView;