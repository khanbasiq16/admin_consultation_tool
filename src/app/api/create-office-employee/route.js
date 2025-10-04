import { NextResponse } from "next/server";
import { collection, query, where, getDocs, doc, setDoc, updateDoc, arrayUnion, serverTimestamp } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export async function POST(req) {
  try {
    const body = await req.json(); 
    const employeeEmail = body.employeeemail;
    const employeePassword = body.employeepassword;

    let user;
    try {
      user = await createUserWithEmailAndPassword(auth, employeeEmail, employeePassword);
    } catch (authError) {
      console.error("Auth Error:", authError);
      return NextResponse.json({ success: false, error: authError.message }, { status: 400 });
    }

    const employeeData = {
      id: user.user.uid,
      employeeName: body.employeeName,
      employeeemail: employeeEmail,
      employeeAddress: body.employeeAddress,
      employeePhone: body.employeePhone,
      employeeCNIC: body.employeeCNIC,
      employeeSalary: body.employeeSalary,
      checkInTime: body.checkInTime,
      graceTime: body.graceTime,
      checkOutTime: body.checkOutTime,
      totalWorkingHours: body.totalWorkingHours,
      dateOfJoining: body.dateOfJoining,
      ipwhitelist: ["74.80.182.78", "103.35.213.126", "119.73.104.152", "45.132.115.211"],
      Attendance: [],
      isSalesEmployee: false,
      createdAt: serverTimestamp(),
    };

    await setDoc(doc(db, "employees", user.user.uid), employeeData);


    return NextResponse.json({ success: true, uid: user.user.uid });
  } catch (error) {
    console.error("Error creating employee:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
