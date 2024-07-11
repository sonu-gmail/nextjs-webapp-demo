import { NextResponse } from "next/server";
import { getServerAuthSession } from "../../../server/auth";

export async function POST(req, res) {
    try {
        const authSession = await getServerAuthSession();
        if(authSession?.accessToken) {

            let apiUrl = process.env.API_URL+'/v1/users';
            let response = await fetch(apiUrl, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    Authorization: `Bearer ${authSession?.accessToken}`,
                }
            })
            response = await response.json();
            return NextResponse.json(response)

        }

    } catch (error) {
        console.error('====>',error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}