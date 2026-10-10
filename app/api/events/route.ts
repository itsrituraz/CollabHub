import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";

import connectDB from "@/lib/mongodb";
import Event from "@/database/event.model";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const contentType = req.headers.get("content-type") || "";
    let eventData: Record<string, unknown> = {};
    let imageUrl = "/images/event1.png";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      eventData = Object.fromEntries(formData.entries());

      const file = formData.get("image");
      if (file && typeof file === "object" && "arrayBuffer" in file && (file as File).size > 0) {
        try {
          const arrayBuffer = await (file as File).arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);

          const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
            cloudinary.uploader.upload_stream(
              { resource_type: "image", folder: "DevEvent" },
              (error, results) => {
                if (error) return reject(error);
                resolve(results as { secure_url: string });
              }
            ).end(buffer);
          });

          imageUrl = uploadResult.secure_url;
        } catch (uploadError) {
          console.error("Cloudinary upload failed, using fallback poster:", uploadError);
          imageUrl = (formData.get("imageUrl") as string) || "/images/event-full.png";
        }
      } else if (formData.get("imageUrl")) {
        imageUrl = formData.get("imageUrl") as string;
      } else if (formData.get("image") && typeof formData.get("image") === "string") {
        imageUrl = formData.get("image") as string;
      }

      if (typeof eventData.tags === "string") {
        try {
          eventData.tags = JSON.parse(eventData.tags as string);
        } catch {
          eventData.tags = (eventData.tags as string).split(",").map((t) => t.trim()).filter(Boolean);
        }
      }

      if (typeof eventData.agenda === "string") {
        try {
          eventData.agenda = JSON.parse(eventData.agenda as string);
        } catch {
          eventData.agenda = (eventData.agenda as string).split("\n").map((a) => a.trim()).filter(Boolean);
        }
      }
    } else {
      const json = await req.json();
      eventData = json;
      if (json.image) imageUrl = json.image;
    }

    eventData.image = imageUrl;

    if (!eventData.slug && typeof eventData.title === "string") {
      eventData.slug = (eventData.title as string)
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
    }

    // Default required fields if not provided
    if (!eventData.overview && eventData.description) {
      eventData.overview = (eventData.description as string).slice(0, 200);
    }
    if (!eventData.venue && eventData.location) {
      eventData.venue = eventData.location;
    }
    if (!eventData.mode) eventData.mode = "In-Person";
    if (!eventData.audience) eventData.audience = "Developers";
    if (!eventData.organizer) eventData.organizer = "Community";
    if (!Array.isArray(eventData.tags) || eventData.tags.length === 0) {
      eventData.tags = ["Tech", "Community"];
    }
    if (!Array.isArray(eventData.agenda) || eventData.agenda.length === 0) {
      eventData.agenda = ["Opening Keynote", "Presentations", "Networking"];
    }

    const createdEvent = await Event.create(eventData);

    revalidatePath("/");
    revalidatePath("/events");

    return NextResponse.json(
      { message: "Event created successfully", event: createdEvent },
      { status: 201 }
    );
  } catch (e) {
    console.error("Event creation error:", e);
    return NextResponse.json(
      { message: "Event Creation Failed", error: e instanceof Error ? e.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const events = await Event.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ message: "Events fetched successfully", events }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: "Event fetching failed", error: e }, { status: 500 });
  }
}