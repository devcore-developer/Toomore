import Link from 'next/link'
import { cn } from '@/lib/utils'

type ButtonVariant =
  | 'primary'
  | 'outline-green'
  | 'dark'
  | 'gold'
  | 'white'
  | 'outline-white'
  | 'sm'
  | 'submit'
  | 'outline-gold'

interface ButtonProps {
  children: React.ReactNode
  variant?: ButtonVariant
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  className?: string
  fullWidth?: boolean
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'btn-primary',
  'outline-green': 'btn-outline-green',
  dark: 'btn-dark',
  gold: 'btn-gold',
  white: 'btn-white',
  'outline-white': 'btn-outline-white',
  sm: 'btn-sm',
  submit: 'btn-submit',
  'outline-gold': 'btn-outline-gold',
}

export default function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  type = 'button',
  className,
  fullWidth,
}: ButtonProps) {
  const classes = cn(
    variantClasses[variant],
    fullWidth && 'w-full md:w-auto',
    className
  )

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  )
}