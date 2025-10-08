import { NextResponse } from "next/server";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
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
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      user = userCredential.user;
    } catch (err) {
      return NextResponse.json(
        { error: "Invalid credentials" },
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

    let employee = null;
    let docId = null;
    snapshot.forEach((docSnap) => {
      employee = docSnap.data();
      docId = docSnap.id;
    });

    if (!employee.ipwhitelist.includes(ip)) {
      return NextResponse.json({ error: "Access denied: IP not allowed" }, { status: 403 });
    }

    if (employee.isCompanyAdmin) {
      return NextResponse.json({ success: true, message: "Company Admin Logged In", employee });
    }

  
    const formatTimeToDate = (t) => {
      const [timeStr, modifier] = t.split(" ");
      let [hours, minutes] = timeStr.split(":").map(Number);

      if (modifier === "PM" && hours !== 12) {
        hours += 12;
      }

      if (modifier === "AM" && hours === 12) {
        hours = 0;
      }

      const d = new Date();
      d.setHours(hours, minutes, 0, 0);
      return d;
    };

    const checkIn = formatTimeToDate(time);
    const officeTime = formatTimeToDate(employee.checkInTime);
    const graceTime = formatTimeToDate(employee.graceTime);

    let status = "Present";
    if (checkIn > graceTime) {
      status = "Late";
    }

    await updateDoc(doc(db, "employees", docId), {
      Attendance: arrayUnion({
        date,
        checkInTime: time,
        status,
      }),
    });

    return NextResponse.json({
      success: true,
      message: `Attendance Marked as ${status}`,
      role: "employee",
      employee,
    });

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
