import Input from "../form-elemnts/Input";
import Button from "../Button";
import Link from "next/link";

export default function UserAuthForm() {
    
    return (
      <>
        <form className="w-full space-y-2">
            <Input label="Email" type="email" name="email" />
            <div className="flex items-center justify-between">
                <Button className="ml-auto w-full" type="submit" label="Login With Email" />
                <Link href='/user'>
                    <Button className="ml-auto w-full" type="button" label="Create User" />
                </Link>
            </div>
        </form>
      </>
    );
}