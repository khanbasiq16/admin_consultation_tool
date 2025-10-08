
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
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    let userCredential;
    try {
      userCredential = await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const user = userCredential.user;
    const userDoc = await getDoc(doc(db, "users", user.uid));
    const userData = userDoc.exists() ? userDoc.data() : {};

    const token = signToken({ id: user.uid, email: user.email, role: userData.role || "user" });

    const res = NextResponse.json({
      message: "Login successfully",
      success: true,
      user: {
        id: user.uid,
        name: userData.name,
        email: user.email,
        phone: userData.phone,
        role: userData.role,
      },
    });

    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60, 
      // path: "/",
    });

    return res;
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
