import { NextResponse } from "next/server";

export async function POST(req, res) {
    try {
        const Formdata = await req.formData()
        let apiUrl = process.env.API_URL+'/create/user';
        let response = await fetch(apiUrl, {
            method: "POST",
            body: Formdata,
            headers: {
                'Accept': 'application/json'
            }
        })
        response = await response.json();
        return NextResponse.json(response)
    } catch (error) {
        console.error('====>',error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}