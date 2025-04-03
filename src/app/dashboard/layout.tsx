"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isPatient = pathname.includes("/patient");
  const isDoctor = pathname.includes("/doctor");
  const isAdmin = pathname.includes("/admin");

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r">
        <div className="p-4">
          <h2 className="text-xl font-bold">
            {isPatient && "Patient Dashboard"}
            {isDoctor && "Doctor Dashboard"}
            {isAdmin && "Admin Dashboard"}
          </h2>
        </div>

        <nav className="mt-4">
          {isPatient && (
            <ul className="space-y-2 px-4">
              <li>
                <Link
                  href="/dashboard/patient/appointments"
                  className="block p-2 rounded hover:bg-gray-100"
                >
                  Appointments
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/patient/records"
                  className="block p-2 rounded hover:bg-gray-100"
                >
                  Medical Records
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/patient/chat"
                  className="block p-2 rounded hover:bg-gray-100"
                >
                  Chat Assistant
                </Link>
              </li>
            </ul>
          )}

          {isDoctor && (
            <ul className="space-y-2 px-4">
              <li>
                <Link
                  href="/dashboard/doctor/appointments"
                  className="block p-2 rounded hover:bg-gray-100"
                >
                  Manage Appointments
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/doctor/patients"
                  className="block p-2 rounded hover:bg-gray-100"
                >
                  Patients
                </Link>
              </li>
            </ul>
          )}

          {isAdmin && (
            <ul className="space-y-2 px-4">
              <li>
                <Link
                  href="/dashboard/admin/users"
                  className="block p-2 rounded hover:bg-gray-100"
                >
                  Users
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/admin/analytics"
                  className="block p-2 rounded hover:bg-gray-100"
                >
                  Analytics
                </Link>
              </li>
            </ul>
          )}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50">{children}</main>
    </div>
  );
}
