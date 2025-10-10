import { NextResponse } from "next/server";
import { collection, query, where, getDocs, doc, setDoc, updateDoc, arrayUnion, serverTimestamp } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export async function POST(req) {
  try {
    const body = await req.json(); 

    const companySlug = body.companyName;
    const employeeEmail = body.employeeemail;
    const employeePassword = body.employeepassword;

    const q = query(collection(db, "companies"), where("companyslug", "==", companySlug));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return NextResponse.json({ success: false, error: "Company not found" }, { status: 404 });
    }

    const companyDoc = querySnapshot.docs[0];
    const companyData = { id: companyDoc.id, ...companyDoc.data() };

    let user;
    try {
      user = await createUserWithEmailAndPassword(auth, employeeEmail, employeePassword);
    } catch (authError) {
      console.error("Auth Error:", authError);
      return NextResponse.json({ success: false, error: authError.message }, { status: 400 });
    }

    const employeeData = {
      id: user.user.uid,
      companyId: companyData.id,
      companyName: companyData.name,
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
      Attendance: [],
      isSalesEmployee: true,
      isCompanyAdmin: false,
      sales: [],
      editedcontracts: [],
      createdAt: serverTimestamp(),
    };

    await setDoc(doc(db, "employees", user.user.uid), employeeData);

 
    await updateDoc(doc(db, "companies", companyData.id), {
      AssignEmployee: arrayUnion(user.user.uid),
    });

    return NextResponse.json({ success: true, uid: user.user.uid });
  } catch (error) {
    console.error("Error creating employee:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
