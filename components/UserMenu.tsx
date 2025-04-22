"use client";

import { useState, useTransition } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faChevronRight, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import { logout } from "@/app/actions (old)/logout"; // ← your server action
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
    if (isOpen) setShowConfirm(false);
  }

  const toggleLogout = () => setShowConfirm((prev) => !prev); // Toggle confirmation modal

  const confirmLogout = () => {
    setShowConfirm(false);
    startTransition(async () => {
      await logout();
      router.push("/");
    });
  };

  

  return (
    <div className = "relative">
    {isOpen && <div className="fixed inset-0 w-full h-full bg-gray-900/10" onClick={toggleMenu}> </div>}
      {/* Button Container */}
      <button
        onClick={toggleMenu}
        className="flex justify-between items-center w-18 h-8 px-4 md:w-20 md:h-9 md:px-5 bg-emerald-700 border-2 border-emerald-400 rounded-full hover:bg-emerald-600 transition">
        <FontAwesomeIcon icon={faUser} className="text-emerald-400" />
        <FontAwesomeIcon
          icon={isOpen ? faChevronDown : faChevronRight}
          className="text-emerald-400 transition-transform duration-300"
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-27 bg-white border rounded-lg font-semibold">
            <ul className="flex flex-col text-black p-1">
              <li className="px-4 py-2 hover:bg-gray-100 hover:rounded-lg cursor-pointer"> <Link href={"/dashboard"}>Profile</Link></li>
              <li className="px-4 py-2 hover:bg-gray-100 hover:rounded-lg cursor-pointer"><Link href={"/dashboard/settings"}>Settings</Link></li>
              <li className="px-4 py-2 hover:bg-gray-100 hover:rounded-lg cursor-pointer" onClick={toggleLogout}>Logout</li>
              
              {/* Confirmation Modal */}
              {showConfirm && (
              <motion.div 
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center justify-center gap-1 text-sm p-1">
                    <div className="h-px bg-gray-300 w-full"></div>
                    <button
                      onClick={confirmLogout}
                      className="w-full py-1 rounded bg-red-500 hover:bg-red-600 text-white">
                      Logout
                    </button>
              </motion.div>
      )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

 
      </div>
  );
}
