"use server"
import Link from 'next/link'
import React from 'react'
import UserMenu from './UserMenu'
import { Button } from './ui/button'



const UserHeaderSection = async () => {

        return (
          <div className="flex flex-row justify-center items-center gap-2 p-2 max-w-60 h-15 font-bold text-sm ">
                  <Link href={"/login"} className="text-emerald-500 p-3 py-2 rounded-xl bg-emerald-950 cursor-pointer ">Sign in</Link>
          </div>
        )
}

export default UserHeaderSection