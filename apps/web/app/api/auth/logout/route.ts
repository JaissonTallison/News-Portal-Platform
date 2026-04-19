import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({
      success: true,
      message: "Logout realizado com sucesso",
    });

    // remove cookie corretamente
    response.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(0),
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Erro ao fazer logout",
      },
      { status: 500 }
    );
  }
}