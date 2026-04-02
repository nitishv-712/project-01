import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Stats from "@/models/Stats";

export async function GET() {
  try {
    await dbConnect();
    let stats = await Stats.findOne();
    
    if (!stats) {
      stats = await Stats.create({
        studentsEnrolled: "230,000+",
        videoTutorials: "1,300+",
        expertCourses: "21+",
        youtubeSubscribers: "2M+"
      });
    }
    
    return NextResponse.json({ success: true, data: stats });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch stats" }, { status: 500 });
  }
}
