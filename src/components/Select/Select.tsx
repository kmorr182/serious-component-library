import { forwardRef, useId } from 'react'
import type { SelectHTMLAttributes } from 'react'
import { Icon } from '../Icon/Icon'
import styles from './Select.module.css'

export type SelectSize = 'sm' | 'md' | 'lg'

const ICON_SIZE: Record<SelectSize, number> = {
  sm: 14,
  md: 16,
  lg: 18,
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /** Visible label rendered above the field. */
  label?: string
  /** Helper text shown below the field when there is no error. */
  helperText?: string
  /** Error message shown below the field; also puts the field in an error state. */
  errorText?: string
  /** Size of the field. @default 'md' */
  size?: SelectSize
  /** Stretches the field to fill its container's width. */
  fullWidth?: boolean
  /**
   * Renders a disabled, initially-selected option with this text before your own `<option>`s —
   * a prompt like "Choose…" rather than a native select silently defaulting to its first option.
   */
  placeholder?: string
  /** `<option>` (and optionally `<optgroup>`) elements. */
  children: SelectHTMLAttributes<HTMLSelectElement>['children']
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      helperText,
      errorText,
      size = 'md',
      fullWidth = false,
      placeholder,
      required,
      id,
      className,
      value,
      defaultValue,
      children,
      'aria-describedby': ariaDescribedBy,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId()
    const selectId = id ?? generatedId
    const helperId = `${selectId}-helper`
    const errorId = `${selectId}-error`
    const hasError = Boolean(errorText)

    const describedBy =
      [ariaDescribedBy, hasError ? errorId : undefined, !hasError && helperText ? helperId : undefined]
        .filter(Boolean)
        .join(' ') || undefined

    const selectClassNames = [styles.select, styles[size], hasError ? styles.error : '', className]
      .filter(Boolean)
      .join(' ')

    return (
      <div className={[styles.wrapper, fullWidth ? styles.fullWidth : ''].filter(Boolean).join(' ')}>
        {label && (
          <label className={styles.label} htmlFor={selectId}>
            {label}
            {required && <span className={styles.requiredMark}>*</span>}
          </label>
        )}
        <div className={styles.selectContainer}>
          <select
            ref={ref}
            id={selectId}
            className={selectClassNames}
            required={required}
            value={value}
            defaultValue={defaultValue}
            aria-invalid={hasError || undefined}
            aria-describedby={describedBy}
            {...rest}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {children}
          </select>
          <Icon name="chevron-down" size={ICON_SIZE[size]} className={styles.chevron} />
        </div>
        {hasError ? (
          <span id={errorId} className={styles.errorText} role="alert">
            {errorText}
          </span>
        ) : (
          helperText && (
            <span id={helperId} className={styles.helperText}>
              {helperText}
            </span>
          )
        )}
      </div>
    )
  },
)

Select.displayName = 'Select'
