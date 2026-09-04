import { forwardRef, useId, useState } from 'react'
import type { ChangeEvent, CSSProperties, InputHTMLAttributes } from 'react'
import styles from './Slider.module.css'

export interface SliderProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'value' | 'defaultValue' | 'onChange'> {
  /** Visible label rendered above the track. */
  label?: string
  /** Helper text shown below the field when there is no error. */
  helperText?: string
  /** Error message shown below the field; also puts the field in an error state. */
  errorText?: string
  /** Current value (controlled). Use with `onChange`. */
  value?: number
  /** Initial value for uncontrolled usage. @default min */
  defaultValue?: number
  /** Called with the new numeric value as the user drags or presses arrow keys. */
  onChange?: (value: number) => void
  /** Minimum value. @default 0 */
  min?: number
  /** Maximum value. @default 100 */
  max?: number
  /** Increment the value moves by. @default 1 */
  step?: number
  /**
   * Formats the current value for display next to the label, e.g. `(v) => \`${v}/10\`` or a
   * mapping to a qualitative label like "Ambitious but doable". Omit to show no value text.
   */
  formatValue?: (value: number) => string
  /** Stretches the field to fill its container's width. */
  fullWidth?: boolean
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      label,
      helperText,
      errorText,
      value,
      defaultValue,
      onChange,
      min = 0,
      max = 100,
      step = 1,
      formatValue,
      fullWidth = false,
      required,
      id,
      className,
      disabled,
      'aria-describedby': ariaDescribedBy,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId()
    const sliderId = id ?? generatedId
    const helperId = `${sliderId}-helper`
    const errorId = `${sliderId}-error`
    const hasError = Boolean(errorText)

    const isControlled = value !== undefined
    const [internalValue, setInternalValue] = useState(defaultValue ?? min)
    const currentValue = isControlled ? value : internalValue

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const next = Number(event.target.value)
      if (!isControlled) setInternalValue(next)
      onChange?.(next)
    }

    const describedBy =
      [ariaDescribedBy, hasError ? errorId : undefined, !hasError && helperText ? helperId : undefined]
        .filter(Boolean)
        .join(' ') || undefined

    const percent = max > min ? ((currentValue - min) / (max - min)) * 100 : 0

    return (
      <div className={[styles.wrapper, fullWidth ? styles.fullWidth : ''].filter(Boolean).join(' ')}>
        {(label || formatValue) && (
          <div className={styles.headerRow}>
            {label && (
              <label className={styles.label} htmlFor={sliderId}>
                {label}
                {required && <span className={styles.requiredMark}>*</span>}
              </label>
            )}
            {formatValue && (
              <span className={styles.valueText} aria-hidden="true">
                {formatValue(currentValue)}
              </span>
            )}
          </div>
        )}
        <input
          ref={ref}
          type="range"
          id={sliderId}
          className={[styles.slider, hasError ? styles.error : '', className].filter(Boolean).join(' ')}
          min={min}
          max={max}
          step={step}
          value={currentValue}
          onChange={handleChange}
          required={required}
          disabled={disabled}
          style={{ '--ruk-slider-percent': `${percent}%` } as CSSProperties}
          aria-invalid={hasError || undefined}
          aria-describedby={describedBy}
          aria-valuetext={formatValue ? formatValue(currentValue) : undefined}
          {...rest}
        />
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

Slider.displayName = 'Slider'
