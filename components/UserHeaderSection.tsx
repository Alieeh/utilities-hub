"use server"
import { getUser } from '@/app/_data/user'
import Link from 'next/link'
import React from 'react'
import UserMenu from './UserMenu'



const UserHeaderSection = async () => {
    const userData = await getUser();
    console.log("User data: ", userData);
    if(userData){
        return (
            <div className="flex flex-row justify-end items-center w-auto gap-4">
                <p className="text-white font-bold md:text-2xl">Hi {userData.username}!</p>
                <UserMenu/>
            </div>
        )
    }else{
        return (
          <div className="flex flex-row justify-center items-center w-50 h-15 rounded-xl bg-gray-100">
              <div className="flex gap-4">
                  <Link href={"/signin"} className="text-blue-500 cursor-pointer hover:underline">Sign in</Link>
                  <Link href={"/signup"} className="text-blue-500 cursor-pointer hover:underline">Sign up</Link>
              </div>
          </div>
        )
     }
}

export default UserHeaderSection