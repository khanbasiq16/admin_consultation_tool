import { NextResponse } from "next/server";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password, ip, date, time } = body;

    if (!email || !password || !ip) {
      return NextResponse.json(
        { error: "Email, Password and IP required" },
        { status: 400 }
      );
    }

    let user;

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    user = userCredential.user;

    if (!user) {
      return NextResponse.json(
        { message: "Authentication failed Invalid Credentials" },
        { status: 401 }
      );
    }


    const userDoc = await getDoc(doc(db, "employees", user.uid));
    const userData = userDoc.exists() ? userDoc.data() : {};

    if (!userData) {
      return NextResponse.json(
        { message: "Employee not found in Firestore" },
        { status: 404 }
      );
    }


    const listDoc = await getDoc(doc(db, "ipwhitelist", "list"));

    if (!listDoc.exists()) {
      return NextResponse.json(
        { error: "IP whitelist not found" },
        { status: 404 }
      );
    }

    const allowedIps = listDoc.data().ip || [];

    if (!allowedIps.includes(ip)) {
      return NextResponse.json(
        { error: "Access denied: IP not allowed", ip },
        { status: 403 }
      );
    }

    const formatTimeToDate = (t) => {
      if (!t) return null;

      const [timeStr, modifier] = t.split(" ");
      let [hours, minutes] = timeStr.split(":").map(Number);

      if (modifier.toUpperCase() === "PM" && hours !== 12) hours += 12;
      if (modifier.toUpperCase() === "AM" && hours === 12) hours = 0;

      const d = new Date();
      d.setHours(hours, minutes, 0, 0);
      return d;
    };

    const checkInDate = formatTimeToDate(time);
    const graceDate = formatTimeToDate(userData.graceTime);
    const officeDate = formatTimeToDate(userData.checkInTime);

    if (officeDate.getHours() > 12 && checkInDate.getHours() < 12) {
      checkInDate.setDate(checkInDate.getDate() + 1);
    }

    let status = "Present";
    if (checkInDate > graceDate) {
      status = "Late";
    }

    await updateDoc(doc(db, "employees", user.uid), {
      Attendance: arrayUnion({
        date,
        checkInTime: time,
        status,
      }),
    });

    if (userData?.isCompanyAdmin) {
      return NextResponse.json({
        success: true,
        message: "Company Admin Logged In",
        User: userData,
        IsCompanyAdmin: userData?.isCompanyAdmin,
      });
    }

    if (userData?.isSalesEmployee) {
      const companyDoc = await getDoc(doc(db, "companies", userData?.companyId));
      const companyData = companyDoc.exists() ? companyDoc.data() : {};

      
      return NextResponse.json({
        success: true,
        message: "Sales Employee Logged In",
        User: userData,
        IsSalesEmployee: userData?.isSalesEmployee,
        Company: companyData,
      });
    }

    return NextResponse.json({
      success: true,
      message: `Employee Logged In`,
      User: userData,
    });


  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
