import { NextResponse } from 'next/server';

const API_KEY = process.env.HG_API_KEY;

export async function GET() {
  try {
    const response = await fetch(`https://api.hgbrasil.com/finance?key=${API_KEY}`);
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Erro na requisição externa' },
        { status: response.status }
      );
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Erro interno';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}