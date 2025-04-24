"use client"

import { useState, useEffect } from "react"
import { getWaitlistCount } from "../actions/waitlist"
import { WaitlistForm } from "./waitlist-form"

export function WaitlistSignup() {
  const [waitlistCount, setWaitlistCount] = useState(300) // Start with 300 for demo purposes

  useEffect(() => {
    getWaitlistCount().then((count) => setWaitlistCount(count))
  }, [])

  const handleSuccess = (count: number) => {
    setWaitlistCount(count)
  }

  return (
    <div className="w-full max-w-xl mx-auto p-8 flex flex-col justify-between min-h-screen">
      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="w-full max-w-md">
          <p className="text-xs font-bold tracking-widest mb-1 text-center">CULTURE COLLECTIVE & PSYKED PRESENTS</p>
          <h1 className="text-7xl sm:text-8xl font-black tracking-tighter text-center">ACTIVE</h1>
          <p className="text-xs font-bold tracking-widest mb-8 text-center">join for limited pre-sale tickets</p>

          <div className="w-full pt-12">
            <WaitlistForm onSuccess={handleSuccess} />
          </div>
        </div>
      </div>

      <div className="mt-auto">
        {/* Changed to flex-col to stack items vertically */}
        <div className="flex flex-col items-center justify-center mb-6">
          {/* Profile pictures centered */}
          <div className="flex -space-x-2 mb-3">
            <div className="w-10 h-10 rounded-full border border-white/20 overflow-hidden bg-black"></div>
            <div className="w-10 h-10 rounded-full border border-white/20 overflow-hidden bg-black"></div>
            <div className="w-10 h-10 rounded-full border border-white/20 overflow-hidden bg-black"></div>
          </div>
          {/* Text now positioned below the profile pictures */}
          <p className="font-bold uppercase tracking-wide">join {waitlistCount} students on the waitlist</p>
        </div>

        <div className="flex justify-center">
          <p className="text-xs tracking-widest">3 VENUES. 1 TICKET. &nbsp;&nbsp;&nbsp;&nbsp; WED 18TH JUNE.</p>
        </div>
      </div>
    </div>
  )
}
