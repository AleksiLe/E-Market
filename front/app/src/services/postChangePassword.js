'use server'
require('dotenv').config();
const apiURL = process.env.API_URL;

export default async function PostChangePassword(token, newPassword) {
    const response = await fetch(apiURL + 'user/change_password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ newPassword: newPassword })
    });

    const data = await response.json();
    return data;
}