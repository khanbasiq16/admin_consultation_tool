import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { compempID } = params;

    if (!compempID) {
      return NextResponse.json({ success: false, message: "Company ID is required" }, { status: 400 });
    }

    const employeesRef = collection(db, "employees");
    const q = query(employeesRef, where("companyId", "==", compempID));
    const snapshot = await getDocs(q);

    const employees = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return NextResponse.json({ success: true, employees }, { status: 200 });
  } catch (error) {
    console.error("Error fetching employees:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
