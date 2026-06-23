import { cn } from '@/lib/utils'

interface ContainerProps {
  children: React.ReactNode
  className?: string
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn('max-w-[1280px] mx-auto', className)}>
      {children}
    </div>
  )
}