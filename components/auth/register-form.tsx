"use client"

import * as z from 'zod';

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { useState, useTransition } from 'react';
import { RegisterSchema } from "@/schemas"
import {Form ,FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from '../ui/input';
import { CardWrapper } from "@/components/auth/card-wrapper"
import { Button } from '../ui/button';
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';
import { register } from '@/actions/register';
import { redirect } from 'next/navigation'
import Link from 'next/link';



export const RegisterForm = () => {
    // setting these after form validation in our server action
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        }
    })

    const onSubmit = async (values: z.infer<typeof RegisterSchema>) =>{
        setError("");
        setSuccess("");
        
        startTransition(()=> {
            register(values)
            .then((data) => {
                setError(data.error);
                setSuccess(data.success);
            });
        })
        
        
    };

    return (
        <CardWrapper 
            headerLabel="Create an account!"
            backButtonLabel="Already have an account?"
            backButtonHref="/auth/login"
            showSocial >
            
            <Form {...form} >
                <form onSubmit= {form.handleSubmit(onSubmit)}
                className="space-y-6">
                    <div className='space-y-4'>
                    <FormField
                        disabled = {!!success}
                        control = {form.control}
                        name = "name"
                        render = {({ field }) => (
                            <FormItem> 
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                    disabled={isPending}
                                    {...field}
                                    placeholder="John Snow" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField 
                        disabled = {!!success}
                        control = {form.control}
                        name = "email"
                        render = {({ field }) => (
                            <FormItem> 
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                    disabled={isPending}
                                    {...field}
                                    placeholder="john.snow@example.com"
                                    type = "email" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField 
                        disabled = {!!success}
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
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField 
                        disabled = {!!success}
                        control = {form.control}
                        name = "confirmPassword"
                        render = {({ field }) => (
                            <FormItem> 
                                <FormLabel>Password confirmation</FormLabel>
                                <FormControl>
                                    <Input
                                    disabled={isPending}
                                    {...field}
                                    placeholder="******"
                                    type="password" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success}/>
                    <Button
                    type = "submit"
                    className='w-full'
                    disabled={isPending || !!success}>
                        Create an account
                    </Button>
                    { success && (
                    <Link href="/auth/login">
                        <Button variant="secondary" className='w-full h-15'>Go to login page</Button>
                  </Link>
                )}
                </form>
            </Form>

        </CardWrapper>
    )
}