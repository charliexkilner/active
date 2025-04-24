"use client"

import type React from "react"

import { useState } from "react"
import { joinWaitlist } from "../actions/waitlist"

interface WaitlistFormProps {
  onSuccess: (count: number) => void
}

export function WaitlistForm({ onSuccess }: WaitlistFormProps) {
  const [phone, setPhone] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    try {
      const formData = new FormData()
      formData.append("phone", phone)

      const result = await joinWaitlist(null, formData)

      if (result.success) {
        setMessage({ type: "success", text: result.message })
        if (result.count) {
          onSuccess(result.count)
        }
        setPhone("")
      } else {
        setMessage({ type: "error", text: result.message })
      }
    } catch (error) {
      setMessage({ type: "error", text: "An unexpected error occurred. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers
    const value = e.target.value.replace(/[^0-9]/g, "")
    setPhone(value)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4 mb-8">
      <div className="flex overflow-hidden rounded-none border-2 border-black bg-white p-1 max-w-xs mx-auto">
        <input
          id="phone"
          name="phone"
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="0730000321"
          required
          value={phone}
          onChange={handlePhoneChange}
          aria-describedby="phone-error"
          className="w-full border-0 bg-transparent text-black placeholder:text-gray-500 focus:outline-none px-3 py-2"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-black hover:bg-gray-800 text-white font-bold px-4 py-2 uppercase disabled:opacity-50"
        >
          {isSubmitting ? "..." : "Join"}
        </button>
      </div>

      {message && (
        <div className={`text-center text-sm ${message.type === "success" ? "text-green-600" : "text-red-600"}`}>
          {message.text}
        </div>
      )}
    </form>
  )
}
