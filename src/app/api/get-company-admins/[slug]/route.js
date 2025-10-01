// app/api/get-company-admins/[slug]/route.js
import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";

export async function GET(req, { params }) {
  try {
    const { slug } = params;

    if (!slug) {
      return NextResponse.json({ success: false, message: "Missing company slug" }, { status: 400 });
    }

    // 1️⃣ Find company by slug
    const companiesRef = collection(db, "companies");
    const q = query(companiesRef, where("companyslug", "==", slug));
    const companySnapshot = await getDocs(q);

    if (companySnapshot.empty) {
      return NextResponse.json({ success: false, message: "Company not found" }, { status: 404 });
    }

    const companyDoc = companySnapshot.docs[0];
    const companyData = companyDoc.data();
    const companyId = companyDoc.id;

    // 2️⃣ Get companyAdmin array
    const companyAdmin = companyData.companyAdmin || [];

    const employees = [];

    // 3️⃣ Fetch all employee docs
    for (const adminObj of companyAdmin) {
      const employeeId = adminObj.employeeId;
      if (!employeeId) continue;

      const employeeRef = doc(db, "employees", employeeId);
      const employeeSnap = await getDoc(employeeRef);

      if (employeeSnap.exists()) {
        const employeeData = employeeSnap.data();

        // 4️⃣ Check if employee's companyData array has current companyId
        const matchedCompany = (employeeData.companyData || []).find(
          (c) => c.companyId === companyId
        );

        if (matchedCompany) {
          // 5️⃣ Create a simplified object for the client
          const simplifiedEmployee = {
            id: employeeSnap.id,
            employeeName: employeeData.employeeName || "",
            employeeemail: employeeData.employeeemail || "",
            securityKey: matchedCompany.securityKey || "", // optional if role exists in companyData
          };

          employees.push(simplifiedEmployee);
        }
      }
    }

    return NextResponse.json({ success: true, employees });

  } catch (error) {
    console.error("Error fetching company admins:", error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}
