'use server';
require('dotenv').config();
const apiURL = process.env.API_URL;

export default async function postRegister(email, password, username) {
  const response = await fetch(apiURL + "user/register", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        email,
        password,
        username
    }),
  });

  const data = await response.json();
  return data;
}