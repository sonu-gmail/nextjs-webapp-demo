"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Loader from "../../../../../../components/common/Loader";
import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';
import { updateuserschema } from "../../../../../Schemas/updateuserschema";

const EditUser = ({params}) => {
    const[user, setUser] = useState('');
    const[message, setMessage] = useState(null);
    const[error, setError] = useState(null);
    const[loading, setLoading] =  useState(true);
    const[loader, setLoader] =  useState(false);
    const[isImageUpload, setIsImageUpload] = useState(false);
    const router = useRouter();

    const formik = useFormik({
		initialValues: {
            id: (user?.id ?? ''),
			first_name: (user?.first_name ?? ''),
			last_name: (user?.last_name ?? ''),
			email: (user?.email ?? ''),
			gender: (user?.gender ?? ''),
			hobbies:(user?.hobbies?.split(",") ?? []),
			entry_date: (user?.entry_date ?? ''),
			country:user?.country,
			address:(user?.address ?? ''),
            image:""
		},
        enableReinitialize:true,
		// Pass the Yup schema to validate the form
		validationSchema: updateuserschema,
	
		// Handle form submission
		onSubmit: async (values) => {
            console.log(values);
			setLoader(true)
			const f = new FormData();
            f.append('id', values.id);
			f.append('first_name', values.first_name);
			f.append('last_name', values.last_name);
			f.append('email', values.email);
			f.append('gender', values.gender);
			f.append('hobbies', values.hobbies);
			f.append('address', values.address);
			f.append('entry_date', values.entry_date);
			f.append('country', values.country);
            if(isImageUpload) {
                f.append('image', values.image);
            }
			try {
                let url = process.env.NEXT_PUBLIC_URL+"/api/user/update";
				let response = await fetch(url, {
					method: "POST",
					body: f
				})
                if(!response.ok) {
                    if(response.status == 404) {
                        setLoader(false)
                        toast.error(response.url+' '+response.status+'( '+response.statusText+' )');
                    }
                    console.log(response);
                }
                if(response.ok) {

                    response = await response.json()
                    if(response.status == true) {
                        toast.success(response.msg);
                        setLoader(false)
                        router.push('/dashboard/users');
                    }
        
                    if(response.status == false) {
                        toast.error(response.msg);
                        setLoader(false)
                    }
    
                    if (response.hasOwnProperty('exception')) {
                        toast.error(response.message);
                        setLoader(false)
                    }
                }
			} catch (error) {
                console.log('ok');
				console.error(error);
			}
		},
	});

	const { errors, touched, values, handleChange, handleSubmit } = formik;

    useEffect(() => {
        getUsersDetail().then((res) => {
            setUser(res.data);
            setLoading(false);
        }).catch((error) => {
            setError(error);
        });
    },[]);

    const getUsersDetail =  async () => {
        let url = process.env.NEXT_PUBLIC_URL+"/api/user/view";
        let response = await fetch(url, {
            method: "POST",
            body:JSON.stringify({id:params?.id})
        })

        if(!response.ok) {
            setLoading(false);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        if(response.ok) {

            response = await response.json();

            if(response.status == false)
            {
                setLoading(false);
                setUser(null);
                setMessage(response.msg);
                throw new Error(`HTTP error! status: ${response.msg}`);
            }

            return response
        }
    }

    const handleImageUpload = (e) => {
		formik.setFieldValue('image', e.currentTarget.files[0]);
        setIsImageUpload(true);
	}

    if(error) {

        return (
            <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <div className="px-4 py-6 md:px-6 xl:px-7.5">
                    <h4 className="text-xl font-semibold text-black dark:text-white">
                    User Edit
                    </h4>
                </div>
                <div className="px-4 py-6 md:px-6 xl:px-7.5 max-w-full overflow-x-auto">{error.message}</div>
            </div>
        )

    }

    return (
        <>
            <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <div className="px-4 py-6 md:px-6 xl:px-7.5">
                    <h4 className="text-xl font-semibold text-black dark:text-white">
                    User Edit
                    </h4>
                </div>
                <div className="max-w-full overflow-x-auto">
                    {
                        (loading == true) ? <Loader /> :
                        (user != null && message == null) ?
                        <div className="w-full p-6 mx-auto bg-white-50 rounded-md dark:bg-gray-800 mt-1 mb-1">
                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                <input type="hidden" name="id" value={values?.id} />
                                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                                    <div>
                                        <label className="text-black dark:text-gray-200">First Name</label>
                                        <input type="text" name="first_name" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" onChange={handleChange} value={values.first_name} />
                                        {errors?.first_name && touched?.first_name && <span className="text-[red]">{errors?.first_name}</span>}
                                    </div>
                                    <div>
                                        <label className="text-black dark:text-gray-200">Last Name</label>
                                        <input type="text" name="last_name" value={values?.last_name} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" onChange={handleChange}/>
                                        {errors?.last_name && touched?.last_name && <span className="text-[red]">{errors?.last_name}</span>}
                                    </div>
                                    <div>
                                        <label className="text-black dark:text-gray-200">Email</label>
                                        <input type="email" name="email" value={values?.email} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" onChange={handleChange}/>
                                        {errors?.email && touched?.email && <span className="text-[red]">{errors?.email}</span>}
                                    </div>
                                    <div>
                                        <label className="text-black dark:text-gray-200">Entry Date</label>
                                        <input type="date" name="entry_date" value={values?.entry_date} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" onChange={handleChange}/>
                                        {errors?.entry_date && touched?.entry_date && <span className="text-[red]">{errors?.entry_date}</span>}
                                    </div>
                                    <div>
                                        <div className="flex items-center">
                                            <label className="text-black dark:text-gray-200" >Gender</label>
                                            <div className="m-4">
                                                <input type="radio" name="gender" value="male" checked={values?.gender === "male"}  onChange={handleChange} /> Male
                                            </div>
                                            <div className="m-4">
                                                <input type="radio" name="gender" value="female" checked={values?.gender === "female"} onChange={handleChange} /> Female
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center">
                                            <label className="text-black dark:text-gray-200" >Hobbies</label>
                                            <div className="m-4">
                                                <input type="checkbox" name="hobbies" value="Reading Books" checked={values?.hobbies.includes('Reading Books')} onChange={handleChange} /> Reading Books
                                            </div>
                                            <div className="m-4">
                                                <input type="checkbox" name="hobbies" value="Singing" checked={values?.hobbies.includes('Singing')}  onChange={handleChange}/> Singing
                                            </div>
                                        </div>
                                        {errors?.hobbies && touched?.hobbies && <span className="text-[red]">{errors?.hobbies}</span>}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-black dark:text-gray-200">Address</label>
                                    <textarea id="textarea" type="text" name="address" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" onChange={handleChange} defaultValue={values?.address}></textarea>
                                    {errors?.address && touched?.address && <span className="text-[red]">{errors?.address}</span>}
                                </div>
                                <div>
                                    <label className="text-black dark:text-gray-200">Select Country</label>
                                    <select value={values?.country} name={'country'} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" onChange={handleChange}>
                                        <option value="">Please Select Country</option>
                                        <option value="India">India</option>
                                        <option value="USA">USA</option>
                                        <option value="Australia">Australia</option>
                                        <option value="United Kingdom">United Kingdom</option>
                                    </select>
                                    {errors?.country && touched?.country && <span className="text-[red]">{errors?.country}</span>}
                                </div>
                                <div className="mb-4 mt-4">
                                    <label className="block text-sm font-medium text-blck"> Profile Pic (optional)</label>
                                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                        <div className="space-y-1 text-center">
                                        <svg className="mx-auto h-12 w-12 text-white" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <div className="flex text-sm text-gray-600">
                                            <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                            <span className="">Upload a file</span>
                                            <input id="file-upload" name={'image'} type={'file'} className="sr-only" onChange={(e) => handleImageUpload(e)}/>
                                            </label>
                                            <p className="pl-1 text-white">or drag and drop</p>
                                        </div>
                                        <p className="text-xs text-white">
                                            PNG, JPG, GIF up to 10MB
                                        </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="image error">

                                {errors?.image && <span className="text-[red]">{errors?.image}</span>}
                                </div>
                                <div className="flex justify-end mt-6">
                                    <button type={'submit'} className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-gray-600">{(loader) ? 'Updating....' : 'Update User Details'}</button>
                                </div>
                            </form>
                        </div> : <table className="w-full table-auto">
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

export default EditUser;