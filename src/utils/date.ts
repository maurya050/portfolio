export function formatDate(iso: string | null): string {
  if (!iso) return 'Present'
  const date = new Date(iso + 'T00:00:00')
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}
