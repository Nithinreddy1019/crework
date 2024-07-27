"use client"

import { useForm } from "react-hook-form"
import { AuthFormWrapper } from "./auth-form-wrapper"
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { Eye, EyeOff } from "lucide-react";
import { LoginSchema } from "@kethireddynithinreddy/workflo-common";
import { LoginService } from "@/services/authentication";
import { useRouter } from "next/navigation";

export const LoginForm = () => {

    const router = useRouter();

    const [passwordIsvisible, setPasswordIsVisible] = useState(false);
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {

        startTransition(async () => {
            const response = await LoginService({...values});
            if(response.success){
                router.push("/home")
            }
        });
    }


    return(
        <div className="h-full flex flex-col items-center justify-center">
            <AuthFormWrapper
                headerLabel="Welcome to Workflo!"
                subHeaderLabel="Manage your tasks effortlessly"
                backButtonLabel="Don't have an account? Create a"
                backButtonLinkLabel="new account."
                backButtonHref="/auth/register"
            >

                <Form {...form}>
                    <form 
                        className="space-y-8"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <div className="space-y-4">
                            <FormField 
                                control={form.control}
                                name="email"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            Email
                                        </FormLabel>
                                        <FormControl>
                                            <Input 
                                                {...field}
                                                type="email"
                                                placeholder="email@gmail.com"
                                                className="border border-black"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            <FormField 
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-y-2">
                                        <FormLabel>
                                            Password
                                        </FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <input 
                                                    {...field}
                                                    className="flex h-9 w-full rounded-md bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 border border-black"
                                                    placeholder="******"
                                                    type={passwordIsvisible ? "text" : "password"}
                                                />
                                                <div 
                                                    className="absolute top-0 pt-2 right-3 h-full"
                                                    role="button"
                                                    onClick={() => setPasswordIsVisible(prev => !prev)}
                                                >
                                                    {
                                                        passwordIsvisible ? (
                                                            <EyeOff className="h-4 w-4"/>
                                                        ) : (
                                                            <Eye className="h-4 w-4"/>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button 
                            type="submit"
                            className="w-full"
                            
                        >
                            Login
                        </Button>
                    </form>
                </Form>

            </AuthFormWrapper>
        </div>
    )
}