'use server'
require('dotenv').config();
const apiURL = process.env.API_URL;

export default async function postLogin(email, password) {
  const response = await fetch(apiURL + "user/login", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          email,
          password,
      }),
  });

  const data = await response.json();
  return data;
}