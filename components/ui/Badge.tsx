import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'flavor' | 'occasion'
  className?: string
}

export default function Badge({ children, variant = 'flavor', className }: BadgeProps) {
  return (
    <span className={cn(variant === 'flavor' ? 'flavor-tag' : 'occ-tag', className)}>
      {children}
    </span>
  )
}