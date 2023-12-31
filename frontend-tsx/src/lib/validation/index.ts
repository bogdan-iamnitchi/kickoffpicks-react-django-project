import * as z from "zod"

export const SignupValidation = z
.object({
    firstName: z.string().min(6, {
        message: "First Name must contain at least 6 character(s)"
    }),
    lastName: z.string().min(6, {
        message: "Last Name must contain at least 6 character(s)"
    }),
    email: z.string().email({
        message: "Provided email is not valid."
    }),
    password: z.string().min(8, {
        message: 'Password must be at least 8 characters.' 
    }),
    confirmPassword: z.string().min(8, {
        message: 'Password must be at least 8 characters.' 
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export const SigninValidation = z
.object({
    email: z.string().email({
        message: "Provided email is not valid."
    }),
    password: z.string().min(8, {
        message: 'Password must be at least 8 characters.' 
    }),
});

export const ResetPasswordValidation = z
.object({
    email: z.string().email({
        message: "Provided email is not valid."
    }),
});

export const ResetConfirmValidation = z
.object({
    password: z.string().min(8, {
        message: 'Password must be at least 8 characters.' 
    }),
    confirmPassword: z.string().min(8, {
        message: 'Password must be at least 8 characters.' 
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export const ChatSignInValidation = z
.object({
    password: z.string().min(8, {
        message: 'Password must be at least 8 characters.' 
    }),
});