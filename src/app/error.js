'use client'
import { useEffect } from "react"

export default function Error({error, reset}) {
    
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('====>',error)
    }, [error])

    return (
        <>
            <div className="flex flex-col justify-center items-center h-screen">
                <p>Something went wrong!</p>
                <br/>
                <button className="bg-blue-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded" onClick={() => reset()}>Try again</button>
            </div>
        </>
    );
}