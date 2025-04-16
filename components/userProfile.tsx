"use server"
import { getUser } from '@/app/_data/user'
import Link from 'next/link'
import React from 'react'

const UserProfile = async () => {
    const userData = await getUser();
    console.log("User data: ", userData);
    if(userData){
        return (
            <div className="flex flex-row justify-end items-center w-auto gap-8 h-15">
                <p className="text-white">Hi {userData.username}!</p>
                <Link 
                    href={"/dashboard"} 
                    className="text-blue-500 rounded-xl bg-gray-100 px-5 py-3 cursor-pointer hover:underline"
                    >
                    Profile
                </Link>
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

export default UserProfile