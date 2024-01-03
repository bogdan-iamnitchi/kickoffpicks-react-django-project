import * as z from "zod"

export const SignupValidation = z
.object({
    firstName: z.string().min(1, {
        message: "Please provide your first name."
    }),
    lastName: z.string().min(1, {
        message: "Please provide your last name."
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