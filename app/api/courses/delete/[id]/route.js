import dbConnect from "@/lib/db";
import Course from "@/models/Course";

// DELETE Request: Delete a course by ID
export async function DELETE(req, { params }) {
  const { id } = params;
  await dbConnect();

  try {
    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
      return new Response(JSON.stringify({ message: "Course not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store", // Disable cache
        },
      });
    }

    return new Response(null, {
      status: 204,
      headers: {
        "Cache-Control": "no-store", // Disable cache
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error deleting course" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store", // Disable cache
      },
    });
  }
}
