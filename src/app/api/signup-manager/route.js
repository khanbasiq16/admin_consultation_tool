import { NextResponse } from "next/server";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { signToken } from "@/lib/signToken";
export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }
    let managerCredential;
    try {
      managerCredential = await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      return NextResponse.json(
        { error: "Invalid manager email or password" },
        { status: 401 }
      );
    }
    const manager = managerCredential.user;
    const managerDoc = await getDoc(doc(db, "manager", manager.uid));
    if (!managerDoc.exists()) {
      return NextResponse.json(
        { error: "Manager record not found in database" },
        { status: 404 }
      );
    }
    const managerData = managerDoc.data();
    const token = signToken({
      id: manager.uid,
      email: manager.email,
      role: managerData.role || "manager",
    });
    const res = NextResponse.json({
      message: "Manager login successful",
      success: true,
      manager: {
        id: manager.uid,
        name: managerData.name,
        email: manager.email,
        phone: managerData.phone || null,
        role: managerData.role || "manager",
      },
    });
    // Set secure HTTP-only cookie
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      // path: "/",
    });
    return res;
  } catch (error) {
    console.error("Manager Login Error:", error);
    return NextResponse.json(
      { error: "Something went wrong on server" },
      { status: 500 }
    );
  }
}