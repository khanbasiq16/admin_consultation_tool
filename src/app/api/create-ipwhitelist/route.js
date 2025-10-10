import { NextResponse } from "next/server";
import { db } from "@/lib/firebase"; // apne firebase config ka path yahan do
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

export async function POST(req) {
  try {
    const body = await req.json();
    const ipData = body.ip;

    if (!ipData) {
      return NextResponse.json({ error: "IP is required" }, { status: 400 });
    }

   
    const newIps = Array.isArray(ipData) ? ipData : [ipData];

    const docRef = doc(db, "ipwhitelist", "list");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const existingIps = docSnap.data().ip || [];
      const updatedIps = Array.from(new Set([...existingIps, ...newIps]));
      await updateDoc(docRef, { ip: updatedIps });

      return NextResponse.json({
        message: "IPs updated successfully",
        ip: updatedIps,
      });
    } else {
      
      await setDoc(docRef, { ip: newIps });
      return NextResponse.json({
        message: "IPs added successfully",
        ip: newIps,
      });
    }
  } catch (error) {
    console.error("❌ Error verifying IP:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
