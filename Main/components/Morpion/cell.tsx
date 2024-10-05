interface CellProps {
    value: string
}

export default function Cell({ value }: CellProps) {
    return (
        <span className={`h-full w-full text-accent-foreground`}>
            {value}
        </span>
    )
}
