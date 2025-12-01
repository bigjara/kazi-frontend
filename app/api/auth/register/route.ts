import { NextResponse } from 'next/server';
// import { hash } from 'bcrypt';

export async function POST(request: Request) {
    try {
        const { firstName, lastName, email, password } = await request.json();

        // Basic validation for required input fields
        if (!firstName || !lastName || !email || !password) {
            return NextResponse.json({ success: false, message: 'All fields are required.' }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Invalid request data.' }, { status: 404 });
    }
}