interface BadgeProps {
  label: string
  variant?: 'default' | 'muted'
}

export function Badge({ label, variant = 'default' }: BadgeProps) {
  const variantClass =
    variant === 'muted'
      ? 'bg-mist/60 text-stone'
      : 'bg-parchment text-clay'

  return (
    <span className={`inline-block rounded px-2.5 py-0.5 text-xs font-medium ${variantClass}`}>
      {label}
    </span>
  )
}
