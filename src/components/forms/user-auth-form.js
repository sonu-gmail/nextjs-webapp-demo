"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Input from "../form-elemnts/Input";
import Button from "../Button";
import Link from "next/link";
import { useFormik } from 'formik';
import { loginschema } from "../../app/Schemas/loginschema";
import { toast } from 'react-hot-toast';
import { useRouter } from "next/navigation";

export default function UserAuthForm() {
	const [loader, setLoader] = useState(false);
	const router = useRouter()
	const formik = useFormik({
		initialValues: {
			email: "",
			password:""
		},
	
		// Pass the Yup schema to validate the form
		validationSchema: loginschema,
	
		// Handle form submission
		onSubmit: async (values) => {
			setLoader(true)
			const res = await signIn('credentials', {
				email: values.email,
				password: values.password,
				redirect:false
			});
			if(!res.ok) {
				toast.error('Invalid Credentials.');
				setLoader(false)
			}

			if(res.ok) {
				toast.success('User logged in successfully!');
				setLoader(false)
				router.push('/dashboard');
			}
		},
	});
	const { errors, touched, values, handleChange, handleSubmit } = formik;
	return (
		<>
			<form className="w-full space-y-2" onSubmit={handleSubmit} method="POST">
				<Input label="Email" type="email" name="email" handleChange={handleChange} errors={errors?.email} touched={touched?.email} values={values?.email}/>
				<Input label="Password" type="password" name="password" handleChange={handleChange} errors={errors?.password} touched={touched?.password} values={values?.password}/>
				<div className="flex items-center justify-between">
					{
						(loader == true) ? <Button className="ml-auto w-full" type="button" label="login....." /> : <Button className="ml-auto w-full" type="submit" label="Login" />
					}
					<Link href='/user'>
						<Button className="ml-auto w-full" type="button" label="Create User" />
					</Link>
				</div>
			</form>
		</>
	);
}