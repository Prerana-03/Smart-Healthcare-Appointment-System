import { NextResponse } from 'next/server';

// Mock database
let users = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "patient",
    status: "active",
    joinDate: "2024-01-15",
  },
  {
    id: "2",
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@example.com",
    role: "doctor",
    status: "active",
    joinDate: "2024-01-10",
  },
];

export async function GET() {
  try {
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newUser = {
      id: (users.length + 1).toString(),
      ...body,
      joinDate: new Date().toISOString().split('T')[0],
    };
    
    users.push(newUser);
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;
    
    users = users.map(user =>
      user.id === id ? { ...user, ...updates } : user
    );
    
    const updatedUser = users.find(user => user.id === id);
    if (!updatedUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
} 