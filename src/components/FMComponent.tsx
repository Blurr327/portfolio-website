"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function FMComponent({
  children,
  className,
  amount = 0.8,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 1, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
      viewport={{ amount: amount }}
    >
      {children}
    </motion.div>
  );
}
