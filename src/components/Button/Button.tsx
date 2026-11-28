import { forwardRef } from 'react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Icon } from '../Icon/Icon'
import type { IconName } from '../Icon/icons'
import { Spinner } from '../Spinner/Spinner'
import styles from './Button.module.css'

export type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

const ICON_SIZE: Record<ButtonSize, number> = {
  sm: 14,
  md: 16,
  lg: 18,
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style of the button. @default 'primary' ('ghost' when `iconOnly` is set) */
  variant?: ButtonVariant
  /** Size of the button. @default 'md' */
  size?: ButtonSize
  /** Stretches the button to fill its container's width. */
  fullWidth?: boolean
  /** Icon shown before the label. */
  icon?: IconName
  /**
   * Renders as a square, label-less icon button (no visible text). Pass `icon` and no
   * `children`. Callers must still provide an accessible name via `aria-label`, since there's
   * no visible label for assistive tech to read.
   */
  iconOnly?: boolean
  /** Shows a spinner over the button's content and disables it, without changing the button's size. */
  loading?: boolean
  children?: ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant,
      size = 'md',
      fullWidth = false,
      icon,
      iconOnly = false,
      loading = false,
      disabled,
      className,
      type = 'button',
      children,
      ...rest
    },
    ref,
  ) => {
    const resolvedVariant = variant ?? (iconOnly ? 'ghost' : 'primary')
    const classNames = [
      styles.button,
      styles[resolvedVariant],
      styles[size],
      fullWidth ? styles.fullWidth : '',
      iconOnly ? styles.iconOnly : '',
      loading ? styles.loading : '',
      className,
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <button
        ref={ref}
        type={type}
        className={classNames}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...rest}
      >
        <span className={styles.content}>
          {icon && <Icon name={icon} size={ICON_SIZE[size]} />}
          <span className={styles.label}>{children}</span>
        </span>
        {loading && (
          <span className={styles.spinner}>
            <Spinner size={ICON_SIZE[size] + 2} />
          </span>
        )}
      </button>
    )
  },
)

Button.displayName = 'Button'
