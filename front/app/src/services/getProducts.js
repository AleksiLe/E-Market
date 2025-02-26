'use server'
require('dotenv').config();
const apiURL = process.env.API_URL;

export default async function getProducts() {
    const response = await fetch(apiURL + "products");
    const json = await response.json();
    if (response.ok) {
        return json;
    } else {
        throw new Error(json.message || 'Something went wrong');
    }
}