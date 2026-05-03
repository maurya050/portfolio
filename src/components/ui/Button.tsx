import React from 'react'

interface ButtonProps {
  variant?: 'primary' | 'ghost'
  href?: string
  onClick?: () => void
  disabled?: boolean
  download?: boolean
  children: React.ReactNode
  className?: string
}

export function Button({
  variant = 'primary',
  href,
  onClick,
  disabled = false,
  download = false,
  children,
  className = '',
}: ButtonProps) {
  const baseClass =
    variant === 'primary'
      ? 'bg-clay text-sand hover:bg-clay/90 px-5 py-2.5 rounded text-base font-medium transition-colors'
      : 'border border-clay text-clay hover:bg-clay/10 px-5 py-2.5 rounded text-base font-medium transition-colors'

  const disabledClass = disabled ? 'cursor-not-allowed opacity-50 pointer-events-none' : ''
  const combinedClass = `${baseClass} ${disabledClass} ${className}`.trim()

  if (href) {
    const isExternal = href.startsWith('http')
    return (
      <a
        href={href}
        className={combinedClass}
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...(download ? { download: true } : {})}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={combinedClass}
    >
      {children}
    </button>
  )
}
