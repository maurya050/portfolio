import { useState } from 'react'
import type { ContactFormState } from '@/types/content'
import { Button } from './Button'

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID as string | undefined

interface FieldErrors {
  name?: string
  email?: string
  message?: string
}

export function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<FieldErrors>({})
  const [formState, setFormState] = useState<ContactFormState>({ status: 'idle' })

  if (!FORMSPREE_ID) {
    return (
      <p className="text-stone text-sm">
        Contact form not configured — email directly at{' '}
        <a
          href="mailto:mauryashivam050@gmail.com"
          className="text-clay hover:underline"
        >
          mauryashivam050@gmail.com
        </a>
        .
      </p>
    )
  }

  function validateName(val: string): string | undefined {
    if (!val.trim()) return 'Please enter your name'
    if (val.trim().length < 2) return 'Please enter your name'
    return undefined
  }

  function validateEmail(val: string): string | undefined {
    if (!val.trim()) return 'Please enter a valid email address'
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(val)) return 'Please enter a valid email address'
    return undefined
  }

  function validateMessage(val: string): string | undefined {
    if (!val.trim()) return 'Message must be at least 10 characters'
    if (val.trim().length < 10) return 'Message must be at least 10 characters'
    return undefined
  }

  function handleBlurName() {
    setErrors(prev => ({ ...prev, name: validateName(name) }))
  }

  function handleBlurEmail() {
    setErrors(prev => ({ ...prev, email: validateEmail(email) }))
  }

  function handleBlurMessage() {
    setErrors(prev => ({ ...prev, message: validateMessage(message) }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const nameErr = validateName(name)
    const emailErr = validateEmail(email)
    const messageErr = validateMessage(message)
    if (nameErr || emailErr || messageErr) {
      setErrors({ name: nameErr, email: emailErr, message: messageErr })
      return
    }

    setFormState({ status: 'submitting' })

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })

      if (res.ok) {
        setFormState({ status: 'success' })
      } else {
        setFormState({ status: 'error', errorMessage: 'Something went wrong. Please try again.' })
      }
    } catch {
      setFormState({ status: 'error', errorMessage: 'Network error. Please try again.' })
    }
  }

  if (formState.status === 'success') {
    return (
      <div className="space-y-4">
        <p className="text-ink font-medium">Thank you! Your message has been sent.</p>
        <Button
          variant="ghost"
          onClick={() => {
            setName('')
            setEmail('')
            setMessage('')
            setErrors({})
            setFormState({ status: 'idle' })
          }}
        >
          Send another message
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {formState.status === 'error' && (
        <p role="alert" className="text-sm text-red-600">
          {formState.errorMessage ?? 'Something went wrong. Please try again.'}
        </p>
      )}

      {/* Name */}
      <div className="flex flex-col gap-1">
        <label htmlFor="contact-name" className="text-ink text-base font-medium">
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          onBlur={handleBlurName}
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
          aria-invalid={!!errors.name}
          className="border border-mist rounded px-3 py-2 text-base text-ink bg-sand placeholder:text-stone focus:outline-none focus:border-clay focus-visible:ring-2 focus-visible:ring-clay"
          placeholder="Your name"
          autoComplete="name"
        />
        {errors.name && (
          <span id="contact-name-error" role="alert" className="text-sm text-red-600">
            {errors.name}
          </span>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1">
        <label htmlFor="contact-email" className="text-ink text-base font-medium">
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onBlur={handleBlurEmail}
          aria-describedby={errors.email ? 'contact-email-error' : undefined}
          aria-invalid={!!errors.email}
          className="border border-mist rounded px-3 py-2 text-base text-ink bg-sand placeholder:text-stone focus:outline-none focus:border-clay focus-visible:ring-2 focus-visible:ring-clay"
          placeholder="you@example.com"
          autoComplete="email"
        />
        {errors.email && (
          <span id="contact-email-error" role="alert" className="text-sm text-red-600">
            {errors.email}
          </span>
        )}
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1">
        <label htmlFor="contact-message" className="text-ink text-base font-medium">
          Message
        </label>
        <textarea
          id="contact-message"
          rows={5}
          value={message}
          onChange={e => setMessage(e.target.value)}
          onBlur={handleBlurMessage}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          aria-invalid={!!errors.message}
          className="border border-mist rounded px-3 py-2 text-base text-ink bg-sand placeholder:text-stone focus:outline-none focus:border-clay focus-visible:ring-2 focus-visible:ring-clay resize-y"
          placeholder="Your message…"
        />
        {errors.message && (
          <span id="contact-message-error" role="alert" className="text-sm text-red-600">
            {errors.message}
          </span>
        )}
      </div>

      <Button
        variant="primary"
        disabled={formState.status === 'submitting'}
      >
        {formState.status === 'submitting' ? 'Sending…' : 'Send Message'}
      </Button>
    </form>
  )
}
