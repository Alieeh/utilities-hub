"use client"

import * as z from 'zod';

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { useEffect, useState, useTransition } from 'react';
import { LoginSchema } from "@/schemas"
import {Form ,FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { CardWrapper } from "@/components/auth/card-wrapper"
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';
import { login } from '@/actions/login';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { resendCode } from '@/actions/resend-code';
import { start } from 'repl';

export const LoginForm = () => {
    // getting passed (error) additioned url by providers 
    const searchParams = useSearchParams();
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
    ? "Email already in use with different provider": "";

    // setting these feedbacks after form validation in our server action
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const [isPending, startTransition] = useTransition();

    const [showTwoFactor, setShowTwoFactor] = useState(false);

    const [cooldown, setCooldown] = useState(0);

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = (values: z.infer<typeof LoginSchema>) =>{
        setError("");
        setSuccess("");
        console.log(form.getValues("code"));
        if(showTwoFactor && form.getValues("code") === "" ){
            setError("Please enter the code!");
            return;
        }

        startTransition(()=> {
            login(values)
            .then((data) => {
                if (data?.error){
                    setError(data?.error);
                }
                if (data?.success){
                    setSuccess(data?.success);
                }
                if (data?.twoFactor){
                    setShowTwoFactor(true);
                    form.setValue("code", "");
                }
            }).catch((error) => {
                console.log("Login error in login-form: ", error)
                setError("Something went wrong!")
            })
        })
    };

    useEffect(() => {
        let timer: NodeJS.Timeout;
    
        if (cooldown > 0) {
          timer = setInterval(() => {
            setCooldown((prev) => prev - 1);
          }, 1000);
        }
    
        return () => clearInterval(timer);
      }, [cooldown]);




    const handleResendCode = async () => {
        setCooldown(60); 
        startTransition(() => {
        resendCode(form.getValues("email"))
        .then(data => {
            setSuccess(data?.success);
            setError(data?.error);
        })
        .catch((error) => {
            console.log("Resend code error: ", error)
            setError("Something went wrong!")
        })
    })
      };

    return (
        <CardWrapper 
            headerLabel="Welcome Back!"
            backButtonLabel="Don't have an account?"
            backButtonHref="/auth/register"
            showSocial >
            
            <Form {...form}>
                <form onSubmit= {form.handleSubmit(onSubmit)}
                className="space-y-6">
                    <div className='space-y-4'>
                    { showTwoFactor && (
                        <FormField 
                        control = {form.control}
                        name = "code"
                        render = {({ field }) => (
                            <FormItem> 
                                <FormLabel>Two factor code:</FormLabel>
                                <FormControl>
                                    <Input
                                    {...field}
                                    disabled={isPending}
                                    placeholder="123456" 
                                    // value= ""
                                    />
                                </FormControl>
                                <Button
                                size = "sm"
                                variant= "link"
                                asChild
                                className="font-normal w-fit cursor-pointer"
                                
                                disabled={cooldown > 0}
                                >
                                    <span onClick={cooldown > 0 ? undefined : handleResendCode}
                                        className= {`${
                                            cooldown > 0 
                                              ? 'text-muted-foreground cursor-default opacity-50' 
                                              : 'cursor-pointer'
                                          }`} >
                                        {cooldown > 0
                                            ? `Resend code in ${cooldown}s`
                                            : 'Resend code?'
                                        }
                                    </span>
                                </Button>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                    )}
                    { !showTwoFactor && (
                    <>
                        <FormField 
                        control = {form.control}
                        name = "email"
                        render = {({ field }) => (
                            <FormItem> 
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                    disabled={isPending}
                                    {...field}
                                    placeholder="john.snow@example.com" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField 
                        control = {form.control}
                        name = "password"
                        render = {({ field }) => (
                            <FormItem> 
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                    disabled={isPending}
                                    {...field}
                                    placeholder="******"
                                    type="password" />
                                </FormControl>
                                <Button
                                size = "sm"
                                variant= "link"
                                asChild
                                className="px-0 font-normal w-fit"
                                >
                                    <Link href="/auth/reset"> 
                                    Forgot password?
                                    </Link>
                                </Button>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                    </>
                    )}
                    </div>
                    <FormError message={error || urlError } />
                    <FormSuccess message={success}/>
                    <Button
                    type = "submit"
                    disabled={isPending}
                    className='w-full'
                    >
                        {showTwoFactor ? "Confirm" : "Login"}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}