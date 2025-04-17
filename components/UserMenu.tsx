"use client";

import { useState, useTransition } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faChevronRight, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import { logout } from "@/app/actions/logout"; // ← your server action
import { useRouter } from "next/navigation";

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();


  const handleLogout = () => setShowConfirm(true); // Show confirm modal

  const confirmLogout = () => {
    setShowConfirm(false);
    startTransition(async () => {
      await logout();
      router.push("/");
    });
  };

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <div className="relative">
      {/* Button Container */}
      <button
        onClick={toggleMenu}
        className="flex justify-between items-center w-18 h-8 md:w-24 md:h-12 md:px-7 px-4 bg-white rounded-full hover:bg-gray-100 transition">
        <FontAwesomeIcon icon={faUser} className="text-gray-700" />
        <FontAwesomeIcon
          icon={isOpen ? faChevronDown : faChevronRight}
          className="text-gray-500 transition-transform duration-300"
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
            className="absolute right-0 mt-2 w-48 bg-white border rounded">
            <ul className="flex flex-col text-black">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={handleLogout}>Logout</li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

 {/* Confirmation Modal */}
 {showConfirm && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-[999]">
          <div className="bg-white rounded-lg p-6 w-auto max-w-sm">
            <h3 className="text-black text-center font-semibold mb-4">Are you sure you want to logout?</h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
