import { NextResponse } from "next/server";

export async function POST(req, res) {
    try {
        
        const { token } = await req.json();
        console.log('====>', token);
        let apiUrl = process.env.API_URL+'/v1/users';
        let response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        })
        response = await response.json();
        return NextResponse.json(response)

    } catch (error) {
        console.error('====>',error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}