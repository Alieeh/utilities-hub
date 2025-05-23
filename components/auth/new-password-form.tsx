"use client"

import * as z from 'zod';

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';

import {NewPasswordSchema} from "@/schemas"
import {Form ,FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { CardWrapper } from "@/components/auth/card-wrapper"
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';
import { newPassword } from '@/actions/new-password';




export const NewPasswordForm = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: ""
        }
    })

    const onSubmit = (values: z.infer<typeof NewPasswordSchema>) =>{
        setError("");
        setSuccess("");

        startTransition(()=> {
            newPassword(values, token)
            .then((data) => {
                setError(data?.error);
                setSuccess(data?.success);
            });
        })
        
    };

    return (
        <CardWrapper 
            headerLabel="Enter a new password"
            backButtonLabel="Back to login"
            backButtonHref="/auth/login"
            >
            
            <Form {...form}>
                <form onSubmit= {form.handleSubmit(onSubmit)}
                className="space-y-6">
                    <div className='space-y-4'>
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
                                    type = "password" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField 
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
                                    type = "password" />
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
                    disabled={isPending}>
                        Reset password
                    </Button>
                </form>
            </Form>

        </CardWrapper>
    )
}