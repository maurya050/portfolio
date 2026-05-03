interface BadgeProps {
  label: string
  variant?: 'default' | 'sage'
}

export function Badge({ label, variant = 'default' }: BadgeProps) {
  const variantClass =
    variant === 'sage'
      ? 'bg-sage/20 text-ink'
      : 'bg-clay/10 text-clay'

  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-sm font-medium ${variantClass}`}
    >
      {label}
    </span>
  )
}
