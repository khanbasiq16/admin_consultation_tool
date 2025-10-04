import { NextResponse } from "next/server";
import { db } from "@/lib/firebase"; // client SDK
import { collection, query, where, getDocs, doc, updateDoc, arrayUnion } from "firebase/firestore";

export async function POST(req) {
  try {
    const { companyId, employeeId, securityKey } = await req.json();

    if (!companyId || !employeeId || !securityKey) {
      return NextResponse.json({ success: false, message: "Missing fields" }, { status: 400 });
    }

    const slug = companyId;

    const companiesRef = collection(db, "companies");
    const q = query(companiesRef, where("companyslug", "==", slug));
    const companySnapshot = await getDocs(q);

    if (companySnapshot.empty) {
      return NextResponse.json({ success: false, message: "Company not found" }, { status: 404 });
    }

    const companyDoc = companySnapshot.docs[0];
    const companyRef = doc(db, "companies", companyDoc.id);

   
    await updateDoc(companyRef, {
      companyAdmin: arrayUnion({
        employeeId,
        securityKey,
      }),
    });

 
    const employeeRef = doc(db, "employees", employeeId);
    await updateDoc(employeeRef, {
      companyData: arrayUnion({
        companyId: companyDoc.id, 
        compuser: slug,
        securityKey,
      }),
    });

    return NextResponse.json({ success: true, message: "Company Admin Assigned Successfully" });

  } catch (error) {
    console.error("Error assigning key:", error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}
