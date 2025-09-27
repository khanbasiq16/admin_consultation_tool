import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { employeeId } = params;

    if (!employeeId) {
      return NextResponse.json(
        { success: false, message: "Employee ID is required" },
        { status: 400 }
      );
    }

    const employeeRef = doc(db, "employees", employeeId);
    const snapshot = await getDoc(employeeRef);

    if (!snapshot.exists()) {
      return NextResponse.json(
        { success: false, message: "Employee not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, employee: { id: snapshot.id, ...snapshot.data() } },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching employee details:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch employee details", error: error.message },
      { status: 500 }
    );
  }
}
