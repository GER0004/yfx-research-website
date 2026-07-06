import { NextResponse } from "next/server";
import { computePerformance } from "@/lib/performance";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = computePerformance();
    if (!data) {
      return NextResponse.json({ stats: null, equityCurve: [], monthlyPerformance: [] });
    }
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ stats: null, equityCurve: [], monthlyPerformance: [] });
  }
}
