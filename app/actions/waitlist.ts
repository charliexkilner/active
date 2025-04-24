"use server"

import { z } from "zod"
import { memoryStore } from "../lib/memory-store"

const schema = z.object({
  phone: z
    .string()
    .min(10, "Invalid phone number")
    .max(15, "Phone number too long")
    .regex(/^0[0-9]{10,11}$/, "Must be a valid UK mobile number starting with 0"),
})

export async function joinWaitlist(prevState: any, formData: FormData) {
  try {
    const phone = formData.get("phone")

    if (!phone) {
      return { success: false, message: "Phone number is required" }
    }

    const result = schema.safeParse({ phone })

    if (!result.success) {
      return { success: false, message: result.error.errors[0].message }
    }

    const formattedPhone = phone.toString()

    // Store phone in memory store
    await memoryStore.add(formattedPhone)

    // For a real app, you would send an SMS here
    console.log(`Would send SMS to ${formattedPhone}`)

    const count = await getWaitlistCount()

    return {
      success: true,
      message: "You have been added to the waitlist! We'll text you when tickets are available.",
      count,
    }
  } catch (error) {
    console.error("Error:", error)
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    }
  }
}

export async function getWaitlistCount() {
  try {
    // Get count from memory store and add a base number for demo purposes
    const count = await memoryStore.getCount()
    return count + 300 // Start with 300 for demo purposes
  } catch (error) {
    return 300 // Fallback count
  }
}
