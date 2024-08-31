import { NextApiRequest, NextApiResponse } from "next";

export async function GET(request: Request) {

    return new Response('Hello, Next.js!');
}