import dbConnect from "@/lib/db";
import Course from "@/models/Course";

// POST Request: Create a new course
export async function POST(req) {
  await dbConnect();

  const { name, grade, credits } = await req.json();

  if (!name || !grade || credits < 0) {
    return new Response(JSON.stringify({ message: "Invalid course data" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store", // Disable cache
      },
    });
  }

  const newCourse = new Course({ name, grade, credits });

  try {
    const savedCourse = await newCourse.save();
    return new Response(JSON.stringify(savedCourse), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store", // Disable cache
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error creating course" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store", // Disable cache
      },
    });
  }
}
