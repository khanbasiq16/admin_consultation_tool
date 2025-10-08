import { NextResponse } from "next/server";
import { db } from "@/lib/firebase"; // Your Firebase init file
import { collection, addDoc, Timestamp } from "firebase/firestore";


export async function POST(req , {params}) {
  try {
    const {price  , description}= body
    const {id} = params


    const employeeRef = doc(db, "employees", id);
      const snapshot = await getDoc(companyRef);


    const docRef = await addDoc(collection(db, "expenses"), {
        expenseId,
      expenseName,
      price: Number(price),
      description,
      attachmentUrl: uploadResult.secure_url,
      createdAt: Timestamp.now(),
    });

    return NextResponse.json({ success: true, id: docRef.id });
  } catch (error) {
    console.error("Error creating expense:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
