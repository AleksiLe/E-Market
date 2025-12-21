'use server'
require('dotenv').config();
const apiURL = process.env.API_URL;


export default async function updateCart(token, productId, quantity) {
    const response = await fetch(apiURL + "cart/updateCart", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ productId: productId, quantity: quantity })
    });
    const json = await response.json();
    if (response.ok) {
        return json;
    } else {
        return { success: false, message: json.message || 'Something went wrong' };
    }
}