
import postRegister from "@/services/postRegister";
import { RegisterFormSchema, LoginFormSchema } from "../lib/definitions";
import * as z from 'zod'
import { createSession } from '@/app/lib/session'
import postLogin from "@/services/postLogin";

export async function register(state, formData) {
    // Validate form fields
    const validatedFields = RegisterFormSchema.safeParse({
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
    })

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            success: false,
            error: z.flattenError(validatedFields.error).fieldErrors
        }
    }

    const response = await postRegister(validatedFields.data.email, validatedFields.data.password, validatedFields.data.username)
    if (!response.success) {
        return {success: false, error: { message: response.message }}
    } else {
        return {success: true, message: response.message}
    }
}

export async function login(state, formData) {
    const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    })
    if (!validatedFields.success) {
        return {
            success: false,
            error: z.flattenError(validatedFields.error).fieldErrors
        }
    }
    const response = await postLogin(validatedFields.data.email, validatedFields.data.password)
    if (!response.success) {
        return {success: false, error: { message: response.message }}
    } else {
        await createSession(response.token)
        return {success: true, message: "Login successful."}
    }
}