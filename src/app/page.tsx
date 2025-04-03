"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import styles from "./styles/Home.module.css";

export default function Home() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start("animate");
  }, [controls]);

  const floatingDotsVariants = {
    initial: { opacity: 0, y: 0 },
    animate: {
      opacity: [0.2, 0.5, 0.2],
      y: [0, -20, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };

  return (
    <main className={styles.container}>
      <div className={styles.content}>
        {/* Floating dots */}
        <div className="absolute inset-0 z-0">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-400 rounded-full"
              initial="initial"
              animate="animate"
              variants={floatingDotsVariants}
              style={{
                left: `${i * 10 + 5}%`,
                top: `${i * 8 + 10}%`,
              }}
            />
          ))}
        </div>

        {/* Main content */}
        <div className="relative z-10 max-w-7xl mx-auto p-8">
          <motion.h1
            className="text-5xl font-bold mb-12 text-white text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Smart Healthcare Appointment System
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Patient Section */}
            <motion.div
              className="p-6 bg-white/10 backdrop-blur-lg rounded-lg shadow-xl border border-white/20"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <h2 className="text-2xl font-semibold mb-4 text-white">
                Patient Portal
              </h2>
              <ul className="space-y-3">
                <motion.li whileHover={{ x: 5 }}>
                  <a
                    href="/dashboard/patient/appointments"
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    Book Appointment
                  </a>
                </motion.li>
                <motion.li whileHover={{ x: 5 }}>
                  <a
                    href="/dashboard/patient/records"
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    Medical Records
                  </a>
                </motion.li>
                <motion.li whileHover={{ x: 5 }}>
                  <a
                    href="/dashboard/patient/chat"
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    Chat with AI Assistant
                  </a>
                </motion.li>
              </ul>
            </motion.div>

            {/* Doctor Section */}
            <motion.div
              className="p-6 bg-white/10 backdrop-blur-lg rounded-lg shadow-xl border border-white/20"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
            >
              <h2 className="text-2xl font-semibold mb-4 text-white">
                Doctor Portal
              </h2>
              <ul className="space-y-3">
                <motion.li whileHover={{ x: 5 }}>
                  <a
                    href="/dashboard/doctor/appointments"
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    Manage Appointments
                  </a>
                </motion.li>
                <motion.li whileHover={{ x: 5 }}>
                  <a
                    href="/dashboard/doctor/patients"
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    View Patients
                  </a>
                </motion.li>
              </ul>
            </motion.div>

            {/* Admin Section */}
            <motion.div
              className="p-6 bg-white/10 backdrop-blur-lg rounded-lg shadow-xl border border-white/20"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ scale: 1.02 }}
            >
              <h2 className="text-2xl font-semibold mb-4 text-white">
                Admin Portal
              </h2>
              <ul className="space-y-3">
                <motion.li whileHover={{ x: 5 }}>
                  <a
                    href="/dashboard/admin/users"
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    Manage Users
                  </a>
                </motion.li>
                <motion.li whileHover={{ x: 5 }}>
                  <a
                    href="/dashboard/admin/analytics"
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    View Analytics
                  </a>
                </motion.li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
