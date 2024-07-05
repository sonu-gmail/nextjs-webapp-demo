"use client"
import { useState } from "react";
import Image from "next/image";
import Input from "../../components/form-elemnts/Input";
import Radio from "../../components/form-elemnts/Radio";
import Checkbox from "../../components/form-elemnts/Checkbox";
import Select from "../../components/form-elemnts/Select";
import TextArea from "../../components/form-elemnts/TextArea";
import ImageElement from "../../components/form-elemnts/ImageElement";
import DateElement from "../../components/form-elemnts/DateElement";
import Button from "../../components/Button";
import { useFormik } from 'formik';
import { schema } from "../Schemas/schema";
import { toast } from 'react-hot-toast';

function Home() {
	const [loader, setLoader] = useState(false);
	const formik = useFormik({
		initialValues: {
			first_name: "",
			last_name:"",
			email: "",
			password:"",
			confirm_password:"",
			gender:"",
			hobbies:[],
			entry_date:"",
			country:"",
			address:"",
			image:""
		},
	
		// Pass the Yup schema to validate the form
		validationSchema: schema,
	
		// Handle form submission
		onSubmit: async (values,{ resetForm }) => {
			setLoader(true)
			const f = new FormData();
			f.append('first_name', values.first_name);
			f.append('last_name', values.last_name);
			f.append('email', values.email);
			f.append('password', values.password);
			f.append('gender', values.gender);
			f.append('hobbies', values.hobbies);
			f.append('address', values.address);
			f.append('entry_date', values.entry_date);
			f.append('country', values.country);
			f.append('image', values.image);
			try {
				
				let response = await fetch('api/user/create', {
					method: "POST",
					body: f
				})
		
				response = await response.json()
				if(response.status == true) {
					toast.success(response.msg);
					setLoader(false)
					resetForm();
				}
	
				if(response.status == false) {
					toast.error(response.msg);
					setLoader(false)
					resetForm();
				}

				if (response.hasOwnProperty('exception')) {
					toast.error(response.message);
					setLoader(false)
					resetForm();
				}
			} catch (error) {
				console.error(error);
			}
		},
	});
	const { errors, touched, values, handleChange, handleSubmit } = formik;
	
	const handleImageUpload = (e) => {
		formik.setFieldValue('image', e.currentTarget.files[0]);
	}
    return (
		<>
			<section className="max-w-4xl p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 mt-10 mb-10">
				<h1 className="text-xl font-bold text-white capitalize text-center mb-8 dark:text-white">User Registration</h1>
				<form onSubmit={handleSubmit} encType="multipart/form-data">
					<div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
						<Input label="First Name" type="text" handleChange={handleChange} name="first_name" errors={errors?.first_name} touched={touched?.first_name} values={values?.first_name}/>
						<Input label="Last Name" type="text" handleChange={handleChange} name="last_name" errors={errors?.last_name} touched={touched?.last_name} values={values?.last_name}/>
						<Input label="Email Address" type="email" handleChange={handleChange} name="email" errors={errors?.email} touched={touched?.email} values={values?.email}/>
						<Input label="Password" type="password" name="password" handleChange={handleChange} errors={errors?.password} touched={touched?.password} values={values?.password} />
						<Input label="Password Confirmation" type="password" name="confirm_password" handleChange={handleChange} errors={errors?.confirm_password} touched={touched?.confirm_password} values={values?.confirm_password} />
						<Select name="country" handleChange={handleChange} errors={errors?.country} touched={touched?.country} values={values?.country}/>
						<div className="mb-4">
							<div className="flex items-center">
								<label className="text-white dark:text-gray-200" >Gender</label>
								<Radio type="radio" name="gender" value="male"  handleChange={handleChange} values={values?.gender}/>
								<Radio type="radio" name="gender" value="female"  handleChange={handleChange} values={values?.gender}/>
							</div>
							{errors?.gender && touched?.gender && <span className="text-red-700">{errors?.gender}</span>}
						</div>
						<div className="mb-4">
							<div className="flex items-center">
								<label className="text-white dark:text-gray-200" >Hobbies</label>
								<Checkbox type="checkbox" name="hobbies" value="Reading Books" handleChange={handleChange} values={values?.hobbies}/>
								<Checkbox type="checkbox" name="hobbies" value="Singing" handleChange={handleChange} values={values?.hobbies}/>
							</div>
							{errors?.hobbies && touched?.hobbies && <span className="text-red-700">{errors?.hobbies}</span>}
						</div>
					</div>
					<DateElement label="Date" name="entry_date" type="date"  handleChange={handleChange} errors={errors?.entry_date} touched={touched?.entry_date} values={values?.entry_date} />
					<TextArea label="Address" name="address" type="textarea" handleChange={handleChange} errors={errors?.address} touched={touched?.address} values={values?.address} />
					<ImageElement label="Image" type="file" name="image" handleChange={handleImageUpload} errors={errors?.image} touched={touched?.image} values={values?.image} />
					<div className="flex justify-end mt-6">
						{
							(loader == true) ? <Button label="loading........" type="button"/> : <Button label="Save" type="submit"/>
						}
					</div>
				</form>
			</section>
		</>
    );
}

export default Home;