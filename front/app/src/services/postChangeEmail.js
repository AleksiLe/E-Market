'use server'
require('dotenv').config();
const apiURL = process.env.API_URL;

export default async function PostChangePassword(token, newEmail) {
    const response = await fetch(apiURL + 'user/change_email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ newEmail: newEmail})
    });

    const data = await response.json();
    return data;
}