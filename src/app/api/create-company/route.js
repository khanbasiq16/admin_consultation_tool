import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";  // UUID generator

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, companytype  } = body;

    if (!name ) {
      return NextResponse.json(
        { error: "Company name aur ownerUid required hain" },
        { status: 400 }
      );
    }

   
    const companyId = uuidv4();

    await setDoc(doc(db, "companies", companyId), {
      companyId,
      name,
      timezone: "Asia/Karachi",    
      ipWhitelist: ["103.35.213.117" , "45.132.115.206" , "119.73.97.16" , "74.80.182.78" ],              
      holdingPeriodDays: 120,       
    //   latePolicy: {
    //     graceMinutes: 10,
    //     penaltyType: "percentage",
    //     penaltyValue: 5,
    //   },
      AssignEmployee:[],
      companytype:companytype,
      createdAt: new Date().toISOString(),
      status: "active",
    });

    return NextResponse.json({
      success: true,
      message: "Company created successfully",
      companyId,
    });

  } catch (error) {
    console.error("POST /api/companies error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
