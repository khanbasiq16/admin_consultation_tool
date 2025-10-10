import { NextResponse } from "next/server";
import { db } from "@/lib/firebase"; // 🔹 your Firebase init file
import { collection, query, where, getDocs } from "firebase/firestore";

export async function GET(req, { params }) {
  try {
    const { id } = params; // 🔹 dynamic id from URL

    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID is required" },
        { status: 400 }
      );
    }

    // 🔹 Firestore query — adjust 'employee_id' if you filter by clientId instead
    const q = query(
      collection(db, "invoices"),
      where("employee_id", "==", id)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return NextResponse.json({
        success: true,
        invoices: [],
        message: "No invoices found for this ID",
      });
    }

    // 🔹 Format result
    const invoices = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ success: true, invoices });
  } catch (error) {
    console.error("Error fetching invoices:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Server error" },
      { status: 500 }
    );
  }
}
