import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function DeleteModal({onUpdate, userId}) {
    const router = useRouter();

    const handleDeleteUser = async () => {
        let url = process.env.NEXT_PUBLIC_URL+"/api/user/delete";
        let response = await fetch(url, {
            method: "POST",
            body:JSON.stringify({id:userId})
        })
        response = await response.json();
        if(response.status == true)
        {
            toast.success(response.msg);
            router.push('/dashboard');
        }
        if(response.status == false)
        {
            toast.error(response.msg);
            onUpdate(false);
        }

        if (response.hasOwnProperty('exception')) {
            toast.error(response.message);
            onUpdate(false);
        }
    }
    return (
        <>
            <dialog  onClick={() => onUpdate(false)} className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
                <div className="bg-white m-auto p-4 pt-10 pb-10 rounded-lg w-[96]" onClick={e => e.stopPropagation()}>
                    <div className="flex flex-col items-center">
                        <h3>Are you sure you want to delete your account ?</h3>
                        <br/>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button onClick={() => onUpdate(false)} ype="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
                                No
                            </button>
                            <button onClick={() => handleDeleteUser()} type="button" className=" mr-2 inline-flex w-full justify-center rounded-md bg-[red] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            </dialog>
        </>
    );
}

export default DeleteModal;