import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    
    const managersRef = collection(db, "manager");
    const snapshot = await getDocs(managersRef);
   
    const managers = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return NextResponse.json({ success: true, managers }, { status: 200 });
  } catch (error) {
    console.error("Error fetching managers:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch managers", error: error.message },
      { status: 500 }
    );
  }
}