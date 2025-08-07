import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/model/user"; // Create this model

export const getCurrentUser = async () => {
  const { userId } =await auth();
  if (!userId) return null;

  await connectDB();

  let user = await User.findOne({ clerkUserId: userId });

  if (!user) {
    user = await User.create({
      clerkUserId: userId,
    });
  }

  return user;
};
