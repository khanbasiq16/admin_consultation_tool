import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { companyId } = params;

    if (!companyId) {
      return NextResponse.json(
        { success: false, message: "Company ID is required" },
        { status: 400 }
      );
    }

    const companyRef = doc(db, "companies", companyId);
    const snapshot = await getDoc(companyRef);

    if (!snapshot.exists()) {
      return NextResponse.json(
        { success: false, message: "Company not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, company: { id: snapshot.id, ...snapshot.data() } },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching company details:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch company details", error: error.message },
      { status: 500 }
    );
  }
}
