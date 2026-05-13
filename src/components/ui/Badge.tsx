interface BadgeProps {
  label: string
  variant?: 'default' | 'sage' | 'dark'
}

export function Badge({ label, variant = 'default' }: BadgeProps) {
  const variantClass =
    variant === 'dark'
      ? 'bg-[#4D4338] text-[#C8864A]'
      : variant === 'sage'
      ? 'bg-sage/20 text-ink'
      : 'bg-clay/10 text-[#6B5035]'

  return (
    <span
      className={`inline-block rounded px-2.5 py-0.5 text-sm font-medium ${variantClass}`}
    >
      {label}
    </span>
  )
}
