import User from "@/models/user.model";
import connectDB from "@/utils/db";

export async function GET(req, { params }) {
  const { userId } = await params;
  console.log(userId);
  try {
    await connectDB();
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("unable to find user", { status: 404 });
    }

    return new Response(
      JSON.stringify(
        {
          user: user.generateHistory,
        },
        { status: 200 }
      )
    );
  } catch (error) {
    console.log("error fetching user", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
