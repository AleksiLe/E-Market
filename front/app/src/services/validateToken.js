'use server';
require('dotenv').config();
const apiURL = process.env.API_URL;

export default async function validateToken(token) {
    try {
        const response = await fetch(apiURL + "user/verify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (data.success) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error during token validation:", error);
        return false;
    }
}