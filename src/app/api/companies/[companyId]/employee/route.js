import { db } from "@/lib/firebase";
import { doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req, { params }) {
  try {
    const { companyId } = params;
    const body = await req.json();

    const { 
      name, 
      email,  
      phone, 
      address, 
      checkintime, 
      maxrangetime, 
      checkouttime, 
      companytype,
      role = "employee",
      hourlyRate = 0,
      commissionType = "none",
      commissionConfig = {},
      permissions = {}
    } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Employee name aur email required hain" },
        { status: 400 }
      );
    }

    const employeeId = uuidv4();

    const employeeRef = doc(db, "employees", employeeId);
    await setDoc(employeeRef, {
      employeeId,
      companyId,
      name,
      ipWhitelist: ["103.35.213.117" , "45.132.115.206" , "119.73.97.16" , "74.80.182.78"],  
      email,
      phone: phone || "",
      checkintime: checkintime || null,
      maxrangetime: maxrangetime || null,
      checkouttime: checkouttime || null,
      role,
      address: address || "",
      companytype: companytype || "",
      companyAdmin:false,
      Attendance: [],
      hourlyRate,
      commissionType,
      commissionConfig,
      permissions,
      createdAt: new Date().toISOString(),
      status: "active",
    });

    
    const companyRef = doc(db, "companies", companyId);
    await updateDoc(companyRef, {
      AssignEmployee: arrayUnion(employeeId),
    });

    return NextResponse.json({
      success: true,
      message: "Employee created successfully & assigned to company",
      employeeId,
    });

  } catch (error) {
    console.error("POST /api/companies/[companyId]/employees error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
