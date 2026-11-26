import { forwardRef } from 'react'
import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react'
import { Icon } from '../Icon/Icon'
import styles from './Tile.module.css'

/** A limited, brand-consistent palette. It is not an arbitrary CSS color. Tiles stay visually
 * consistent across apps instead of drifting off-brand one tile at a time. */
export type TileColor = 'emerald' | 'violet' | 'amber' | 'cobalt' | 'ruby' | 'forest' | 'wine' | 'slate'

const TILE_COLOR_VAR: Record<TileColor, string> = {
  emerald: 'var(--ruk-color-tile-emerald)',
  violet: 'var(--ruk-color-tile-violet)',
  amber: 'var(--ruk-color-tile-amber)',
  cobalt: 'var(--ruk-color-tile-cobalt)',
  ruby: 'var(--ruk-color-tile-ruby)',
  forest: 'var(--ruk-color-tile-forest)',
  wine: 'var(--ruk-color-tile-wine)',
  slate: 'var(--ruk-color-tile-slate)',
}

export interface TileProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Shows a focus-ring-style selection outline, independent of actual keyboard focus. */
  selected?: boolean
  /** Darkens the fill and shows a check badge. */
  completed?: boolean
  /** Dashed-border, muted placeholder treatment instead of a filled tile. This is used 
   * for an empty slot in a grid of tiles, before it has content. */
  empty?: boolean
  /** Tint the filled tile's background and text from the brand palette. Ignored while `empty`. */
  color?: TileColor
  children?: ReactNode
}

/**
 * A square, selectable grid tile. It is a `<button>` under the hood, so it keeps normal keyboard
 * and screen-reader button behavior for free. `children` carries whatever content the tile
 * shows; this component only owns the selectable/completed/empty/color presentation around it.
 * Callers combining `completed` with meaningful content should still pass their own `aria-label`
 * describing both, since `aria-pressed` alone doesn't announce "completed" to assistive tech.
 */
export const Tile = forwardRef<HTMLButtonElement, TileProps>(
  (
    { selected = false, completed = false, empty = false, color, className, type = 'button', style, children, ...rest },
    ref,
  ) => {
    const classNames = [
      styles.tile,
      empty ? styles.empty : styles.filled,
      completed ? styles.completed : '',
      selected ? styles.selected : '',
      className,
    ]
      .filter(Boolean)
      .join(' ')

    const tileStyle = color ? ({ ...style, '--tile-color': TILE_COLOR_VAR[color] } as CSSProperties) : style

    return (
      <button ref={ref} type={type} className={classNames} style={tileStyle} aria-pressed={selected} {...rest}>
        <span className={styles.content}>{children}</span>
        {completed && (
          <span className={styles.check} aria-hidden="true">
            <Icon name="check" size={11} />
          </span>
        )}
      </button>
    )
  },
)

Tile.displayName = 'Tile'
