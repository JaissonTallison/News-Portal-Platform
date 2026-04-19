import { NextResponse } from "next/server";
import { getDashboardMetricsService } from "@/server/services/dashboard.service";
import { getCurrentUserServer } from "@/lib/auth-server"; 
import { withErrorHandler } from "@/lib/error-handler";

export const dynamic = "force-dynamic";

export const GET = withErrorHandler(async () => {
  const user = await getCurrentUserServer(); 

  if (!user) {
    return NextResponse.json(
      { success: false, error: "Não autenticado" },
      { status: 401 }
    );
  }

  const data = await getDashboardMetricsService();

  return NextResponse.json({
    success: true,
    data,
  });
});