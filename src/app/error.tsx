"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ErrorPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center  ">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-6xl font-bold text-red-500">Oops!</h1>
        <p className="mt-4 text-lg text-gray-300">
          Something went wrong. Please try again later.
        </p>
        <motion.div initial={{ opacity: 0, y: 20 }} className="mt-6">
          <Link href="/">
            <Button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg shadow-lg">
              Go Home
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
