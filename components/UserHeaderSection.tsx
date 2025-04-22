"use server"
import { getUser } from '@/app/_data (old)/user'
import Link from 'next/link'
import React from 'react'
import UserMenu from './UserMenu'
import { Button } from './ui/button'



const UserHeaderSection = async () => {
    const userData = await getUser(); // <= data access layer  
    console.log("User data: ", userData);
    if(userData){
        return (
            <div className="flex flex-row justify-end items-center w-auto gap-4">
                <p className="text-white font-bold md:text-2sm">Hi {userData.username}!</p>
                <UserMenu/>
            </div>
        )
    }else{
        return (
          <div className="flex flex-row justify-center items-center gap-2 p-2 max-w-60 h-15 font-bold text-sm ">
                  <Link href={"/auth"} className="text-emerald-500 p-3 py-2 rounded-xl bg-emerald-950 cursor-pointer ">Sign in</Link>
          </div>
        )
     }
}

export default UserHeaderSection