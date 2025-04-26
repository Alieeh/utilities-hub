import Link from 'next/link'
import React, { Suspense } from 'react'
import UserMenu from './UserMenu'
import { Button } from './ui/button'
import { auth, signOut } from '@/auth'
import { Loader2 } from 'lucide-react'



const UserHeaderSection = async () => {
        const session = await auth();
        
        return (
          <div className="flex justify-center items-center gap-2 p-2 max-w-60 h-15 ">
                <Suspense fallback={ <Loader2 className="animate-spin bg-white" />}> 
            
                {session?.user ? 
                        <div className='flex flex-row justify-center items-center gap-5 text-white'> 
                        Hi {session.user.name} 
                        <form action={async () => {
                                "use server"
                                await signOut();
                                
                                }}>
                              <Button type="submit" variant="destructive">
                                Sign out
                              </Button>
                              </form>
                        </div> 
                : 
                <div>
                  <Link href={"/auth/login"} className="text-emerald-500 p-3 py-2 rounded-xl bg-emerald-950 cursor-pointer ">Sign in</Link>
                </div>}
                </Suspense>
          </div>
        )
}

export default UserHeaderSection