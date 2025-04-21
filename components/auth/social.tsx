"use client";

import { FcGoogle } from "react-icons/fc";
import { BsApple } from "react-icons/bs";

import { Button } from "@/components/ui/button";

export const Social = () => {
    return (
        <div className="flex items-center w-full gap-x-1 gap-y-2" >
            <Button
            size = "lg"
            className="w-1/2"
            variant = "outline"
            onClick={() => alert("Google")}>
                <FcGoogle className="h-5 w-5"/>
            </Button>
            <Button
            size = "lg"
            className="w-1/2"
            variant = "outline"
            onClick={() => alert("Google")}>
                <BsApple className="h-5 w-5"/>
            </Button>
        </div>
    )
}