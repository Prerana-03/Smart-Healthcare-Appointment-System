"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface AnalyticsSummary {
  totalPatients: number;
  totalDoctors: number;
  totalAppointments: number;
  activeChats: number;
  growth: {
    patients: number;
    doctors: number;
    appointments: number;
    chats: number;
  };
}

interface AppointmentsByMonth {
  month: string;
  count: number;
}

interface UserActivity {
  date: string;
  patients: number;
  doctors: number;
}

interface DepartmentStats {
  name: string;
  appointments: number;
  satisfaction: number;
  waitTime: string;
}

interface AnalyticsData {
  summary: AnalyticsSummary;
  appointments: AppointmentsByMonth[];
  userActivity: UserActivity[];
  departmentStats: DepartmentStats[];
}

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("6m");
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/admin/analytics?timeRange=${timeRange}`
        );
        if (!response.ok) throw new Error("Failed to fetch data");
        const analyticsData = await response.json();
        setData(analyticsData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [timeRange]);

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  if (!data) return null;

  const maxAppointments = Math.max(...data.appointments.map((a) => a.count));

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="input-field w-32"
        >
          <option value="1m">1 Month</option>
          <option value="3m">3 Months</option>
          <option value="6m">6 Months</option>
          <option value="1y">1 Year</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            title: "Total Patients",
            value: data.summary.totalPatients,
            growth: data.summary.growth.patients,
          },
          {
            title: "Total Doctors",
            value: data.summary.totalDoctors,
            growth: data.summary.growth.doctors,
          },
          {
            title: "Total Appointments",
            value: data.summary.totalAppointments,
            growth: data.summary.growth.appointments,
          },
          {
            title: "Active Chats",
            value: data.summary.activeChats,
            growth: data.summary.growth.chats,
          },
        ].map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <h3 className="text-gray-500 text-sm font-medium">{item.title}</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {item.value}
            </p>
            <div
              className={`text-sm mt-2 ${
                item.growth >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {item.growth >= 0 ? "↑" : "↓"} {Math.abs(item.growth)}% from last
              month
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Appointments Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-lg shadow"
        >
          <h3 className="text-lg font-semibold mb-4">Appointments by Month</h3>
          <div className="h-64 flex items-end space-x-2">
            {data.appointments.map((month, index) => (
              <motion.div
                key={month.month}
                className="flex-1 flex flex-col items-center"
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <motion.div
                  className="w-full bg-blue-500 rounded-t hover:bg-blue-600 transition-colors"
                  style={{
                    height: `${(month.count / maxAppointments) * 200}px`,
                  }}
                  whileHover={{ scale: 1.05 }}
                />
                <div className="text-sm text-gray-600 mt-2">{month.month}</div>
                <div className="text-xs text-gray-500">{month.count}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Department Performance */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-lg shadow"
        >
          <h3 className="text-lg font-semibold mb-4">Department Performance</h3>
          <div className="space-y-4">
            {data.departmentStats.map((dept, index) => (
              <motion.div
                key={dept.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">{dept.name}</h4>
                  <span className="text-sm text-gray-500">
                    {dept.appointments} appointments
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <span className="text-yellow-500">★</span>
                    <span className="ml-1 text-sm">{dept.satisfaction}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Avg. Wait Time: {dept.waitTime}
                  </div>
                </div>
                <div className="mt-2 bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-blue-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(dept.satisfaction / 5) * 100}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* User Growth Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-lg shadow"
      >
        <h3 className="text-lg font-semibold mb-4">User Growth</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left text-sm text-gray-500 pb-2">Month</th>
                <th className="text-right text-sm text-gray-500 pb-2">
                  Patients
                </th>
                <th className="text-right text-sm text-gray-500 pb-2">
                  Doctors
                </th>
                <th className="text-right text-sm text-gray-500 pb-2">
                  Growth Rate
                </th>
              </tr>
            </thead>
            <tbody>
              {data.userActivity.map((activity, index) => {
                const prevMonth = data.userActivity[index - 1];
                const growthRate = prevMonth
                  ? ((activity.patients - prevMonth.patients) /
                      prevMonth.patients) *
                    100
                  : 0;

                return (
                  <motion.tr
                    key={activity.date}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="border-b"
                  >
                    <td className="py-2 text-sm text-gray-600">
                      {activity.date}
                    </td>
                    <td className="py-2 text-right text-sm text-gray-900">
                      {activity.patients}
                    </td>
                    <td className="py-2 text-right text-sm text-gray-900">
                      {activity.doctors}
                    </td>
                    <td className="py-2 text-right text-sm">
                      <span
                        className={`${
                          growthRate >= 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {growthRate.toFixed(1)}%
                      </span>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
