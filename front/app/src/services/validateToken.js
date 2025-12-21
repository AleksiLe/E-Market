'use server';
require('dotenv').config();
const apiURL = process.env.API_URL;

export default async function validateToken(token) {
    const response = await fetch(apiURL + "user/verify", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    if (!response.ok) {
        return false;
    }

    const data = await response.json();
    return data.success ?? false;
}