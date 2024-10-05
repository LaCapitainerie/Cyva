import { cn } from "@/lib/utils"
import React from "react"
import Cell from "../Morpion/cell";

type RecursiveList = Array<string | RecursiveList>;

interface MorpionProps {
    default_board?: string | RecursiveList
    depth: number
    cellId?: number
    depthMax: number
}

function Morpion({ default_board, depth, cellId, depthMax }: MorpionProps) {
    return (
        <div className="grid grid-cols-3 grid-rows-3 gap-4 h-full w-full justify-around border-gray-500" style={{ border: "1px solid black" }}>
            {Array.from({ length: 9 }, (_, i) => (
                <div key={i} className={cn(depth < depthMax ? "" : ((9 * (depthMax - depth) + i + 9 * (cellId || 0)) % 2 ? 'bg-lime-800' : 'bg-gray-200'), "hover:bg-opacity-60")}>
                    {
                        depth < depthMax ? (
                            <Morpion default_board={default_board ? default_board[i] : undefined} depth={depth + 1} cellId={i + depth * (cellId || 0)} depthMax={depthMax}/>
                        ) : (
                            <Cell value={typeof default_board === "string" ? default_board[i] : ""} />
                        )
                    }
                </div>
            ))}
        </div>
    )
}

interface Morpion3Props {
    board: string
    depth: number
}

export function Morpion3({ board, depth, className }: Morpion3Props & React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={className}>
            <Morpion default_board={board} depth={0} depthMax={depth - 1} />
        </div>
    )
}
