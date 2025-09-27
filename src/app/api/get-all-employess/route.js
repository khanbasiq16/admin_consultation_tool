import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const employeesRef = collection(db, "employees");
    const snapshot = await getDocs(employeesRef);

    const employees = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({ success: true, employees }, { status: 200 });
  } catch (error) {
    console.error("Error fetching employees:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch employees", error: error.message },
      { status: 500 }
    );
  }
}
