"use client"

import { Header } from "@/components/auth/header";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Social } from "@/components/auth/social";
import {BackButton} from "@/components/auth/back-button";

interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
};

export const CardWrapper = ({children, 
    headerLabel, 
    backButtonLabel, 
    backButtonHref, showSocial}: CardWrapperProps) => {
    return(
        <Card className="w-[400px] shadow-md">
            <CardHeader>
                <Header lable={headerLabel}/>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            {showSocial && (
                <CardFooter className="flex flex-col gap-y-4">
                    <Social/>
                </CardFooter>
            )}
            <CardFooter className="flex flex-col gap-y-4">
                    <BackButton lable={backButtonLabel} href={backButtonHref}/>
                </CardFooter>

        </Card>
    )
}