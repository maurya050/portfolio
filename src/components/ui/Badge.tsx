interface BadgeProps {
  label: string
  variant?: 'default' | 'muted'
}

export function Badge({ label, variant = 'default' }: BadgeProps) {
  const variantClass =
    variant === 'muted'
      ? 'bg-[#1E293B] text-[#475569]'
      : 'bg-[#1E3A5F] text-[#60A5FA]'

  return (
    <span className={`inline-block rounded px-2.5 py-0.5 text-xs font-medium ${variantClass}`}>
      {label}
    </span>
  )
}
