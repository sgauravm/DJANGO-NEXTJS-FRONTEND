import { DJANGO_API_ENDPOINT } from "@/config/defaults";
import { NextResponse } from "next/server";

export async function GET(request) {
  const data = { apiEndpoint: DJANGO_API_ENDPOINT };
  return NextResponse.json(data, { status: 200 });
}
