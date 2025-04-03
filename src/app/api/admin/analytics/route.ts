import { NextResponse } from 'next/server';

// Mock analytics data
const analyticsData = {
  summary: {
    totalPatients: 1250,
    totalDoctors: 45,
    totalAppointments: 3200,
    activeChats: 28,
    growth: {
      patients: 12,
      doctors: 5,
      appointments: 8,
      chats: -3,
    },
  },
  appointments: [
    { month: "Jan", count: 280 },
    { month: "Feb", count: 320 },
    { month: "Mar", count: 350 },
    { month: "Apr", count: 410 },
    { month: "May", count: 380 },
    { month: "Jun", count: 450 },
  ],
  userActivity: [
    { date: "2024-01", patients: 850, doctors: 40 },
    { date: "2024-02", patients: 950, doctors: 42 },
    { date: "2024-03", patients: 1100, doctors: 43 },
    { date: "2024-04", patients: 1250, doctors: 45 },
  ],
  departmentStats: [
    {
      name: "Cardiology",
      appointments: 850,
      satisfaction: 4.8,
      waitTime: "15 mins",
    },
    {
      name: "Neurology",
      appointments: 620,
      satisfaction: 4.6,
      waitTime: "20 mins",
    },
    {
      name: "Pediatrics",
      appointments: 780,
      satisfaction: 4.9,
      waitTime: "10 mins",
    },
  ],
};

export async function GET(request: Request) {
  try {
    // Get the timeRange from query parameters
    const { searchParams } = new URL(request.url);
    const timeRange = searchParams.get('timeRange') || '6m';

    // In a real application, you would filter data based on timeRange
    // For now, we'll return all data
    return NextResponse.json(analyticsData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch analytics data' },
      { status: 500 }
    );
  }
}

// Endpoint to update analytics preferences (e.g., dashboard layout, favorite metrics)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    // In a real application, you would save these preferences to a database
    return NextResponse.json(
      { message: 'Preferences updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update preferences' },
      { status: 500 }
    );
  }
} 