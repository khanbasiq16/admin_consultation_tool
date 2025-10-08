import { NextResponse } from "next/server";
import { collection, query, where, getDocs, doc, setDoc, updateDoc, arrayUnion, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { v4 as uuidv4 } from "uuid";
import { createUserWithEmailAndPassword } from "firebase/auth";
export async function POST(req) {
  try {
    const body = await req.json();
    const {name, email, phone, password} = body
    if(!name || !email || !phone || !password){
        return NextResponse.json({ success: false, message: "please Fill all the details" });
    }
  const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const managerId = user.uid;
    const clientData = {
      id: managerId,
      managerName: name,
      managerEmail: email,
      managerPhone: phone,
      role:"manager",
      createdAt: Date.now(),
    };
    await setDoc(doc(db, "manager", managerId), clientData);
    return NextResponse.json({ success: true, message:"Manager Created" ,managerId });
  } catch (error) {
    console.error("Error creating client:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}