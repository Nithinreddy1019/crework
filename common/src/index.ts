import * as z from "zod";

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    username: z.string().min(1, {
        message: "username is required"
    }),
    password: z.string().min(6, {
        message: "Minimum 6 character required"
    })
});


export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(6, {
        message: "Minimum 6 character required"
    })
});


export type LoginType = z.infer<typeof LoginSchema>;
export type RegisterType = z.infer<typeof RegisterSchema>;