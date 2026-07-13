import connectDB from "@/lib/mongodb"
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { name, brand, tags, shortDesc, category, description, cod, variants } = await req.json()
    await connectDB()

    const session = await auth()
    const user = session?.user


  } catch (error) {

  }
}

