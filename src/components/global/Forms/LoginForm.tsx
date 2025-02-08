"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, LogIn, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { LoginSchema } from "@/lib/ZodSchema";
import { cn } from "@/lib/utils";

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border-2 border-black/10 dark:border-white/15",
            "shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.2),transparent_70%)] dark:after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
          )}
        />
      </motion.div>
    </motion.div>
  );
}

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    console.log(values);

    setIsLoading(true);

    try {
      const response = await new Promise((resolve) =>
        setTimeout(() => {
          resolve({ error: false });
        }, 1000)
      );

      console.log("Login response:", response);
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error(
        "Failed to log in. Please check your credentials and try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1, y: [0, 30, 0] }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.5 }}
        className="fixed  w-52 h-52 bg-gradient-to-r from-purple-500 via-purple-700 to-indigo-600 blur-3xl opacity-50 rounded-full"
      />

      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient={cn(
            "from-black/[0.15] to-gray-500/10",
            "dark:from-indigo-500/[0.15] dark:to-transparent"
          )}
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
        />

        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient={cn(
            "from-black/[0.15] to-gray-500/10", // Light mode
            "dark:from-rose-500/[0.15] dark:to-transparent" // Dark mode
          )}
          className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
        />

        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-violet-500/[0.15]"
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
        />

        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient="from-amber-500/[0.15]"
          className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
        />

        <ElegantShape
          delay={0.7}
          width={150}
          height={40}
          rotate={-25}
          gradient="from-cyan-500/[0.15]"
          className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
        />
        <ElegantShape
          delay={0.3}
          width={300}
          height={40}
          rotate={-25}
          gradient="from-cyan-500/[0.15]"
          className="left-[60%] md:left-[55%] top-[45%] md:top-[40%]"
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="backdrop-blur-2xl rounded-2xl shadow-xl p-8 border border-gray-300 dark:border-gray-700 bg-white/20 dark:bg-black/30 ">
          <div className="flex flex-col items-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4"
            >
              <Lock className="w-8 h-8 text-primary-foreground" />
            </motion.div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Welcome back
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Please sign in to continue
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900 dark:text-gray-300">
                        Email
                      </FormLabel>
                      <FormControl>
                        <div className="relative flex items-center justify-center bg-gray-700/30 backdrop-blur-lg p-2 rounded-lg border border-gray-600 dark:border-gray-400 shadow-lg">
                          <Mail className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                          <Input
                            placeholder="Enter your email"
                            className="bg-transparent outline-none border-none text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900 dark:text-gray-300">
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative flex items-center justify-center bg-gray-700/30 backdrop-blur-lg p-2 rounded-lg border border-gray-600 dark:border-gray-400 shadow-lg">
                          <Lock className=" h-5 w-5 text-gray-400 dark:text-gray-500" />
                          <Input
                            type="password"
                            placeholder="Enter your password"
                            className="  text-gray-900 dark:text-gray-100 outline-none border-none"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 rounded-md px-4 py-2 
             bg-gradient-to-r from-gray-900/80 to-gray-700/80 dark:from-gray-800/80 dark:to-gray-600/80
             border border-gray-700 dark:border-gray-500 text-white 
             shadow-md transition-all duration-300 
             hover:shadow-lg hover:scale-[1.02] active:scale-95
             focus:ring-2 focus:ring-gray-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="h-5 w-5" />
                      <span>Sign in</span>
                    </>
                  )}
                </Button>
              </motion.div>
            </form>
          </Form>

          <div className="mt-6 text-center">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-sm text-gray-600 dark:text-gray-400"
            >
              Don&apos;t have an account?{" "}
              <a
                href="#"
                className="font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Sign up
              </a>
            </motion.p>
          </div>
        </div>
      </motion.div>
    </>
  );
}
