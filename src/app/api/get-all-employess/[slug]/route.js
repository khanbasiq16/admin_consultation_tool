import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";


const capitalizeWords = (str) => {
  return str
    .replace(/-/g, " ") 
    .replace(/\b\w/g, (l) => l.toUpperCase()); 
};


export async function GET(req, { params }) {
  try {
    const { slug } = params;

    if (!slug) {
      return NextResponse.json(
        { success: false, message: "Company slug is required" },
        { status: 400 }
      );
    }
    
    const formattedCompanyName = capitalizeWords(slug);

    const employeesRef = collection(db, "employees");
    const q = query(employeesRef, where("companyName", "==", formattedCompanyName));
    const snapshot = await getDocs(q);

    const employees = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
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
