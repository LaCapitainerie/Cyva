import { cn } from "@/lib/utils"
import React from "react"

interface MorpionProps {
    board: string
    text: string
    url: string
}

export function GameDisplay({board, text, url}: MorpionProps) {
    return (
        <div>
            <div className="grid grid-cols-3 grid-rows-3 gap-4 h-full w-full justify-around border-gray-500" style={{border: "1px solid black"}}>
                {Array.from({length: 9}, (_, i) => (
                    <div key={i} className={cn("hover:bg-opacity-60")}>
                        <span className={`h-full w-full text-accent-foreground`}>
                            {text}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
  }