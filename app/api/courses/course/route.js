import dbConnect from "@/lib/db";
import Course from "@/models/Course";

// GET Request: Fetch all courses
export async function GET(req) {
  await dbConnect();

  try {
    const courses = await Course.find();
    return new Response(JSON.stringify(courses), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store", // Disable cache
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error fetching courses" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store", // Disable cache
      },
    });
  }
}
