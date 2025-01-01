import { NextResponse } from 'next/server';

if (!process.env.BUZZ_PASSWORD || !process.env.BUZZ_URL) {
  throw new Error('Missing required environment variables');
}

export async function POST() {
  try {
    const response = await fetch(process.env.BUZZ_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        password: process.env.BUZZ_PASSWORD!
      }),
    });
    
    const responseText = await response.text();
    console.log('Server response:', responseText);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}