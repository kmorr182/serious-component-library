import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Tile } from './Tile'
import type { TileProps } from './Tile'

// Tile is width: 100% by design — it fills whatever grid column it's placed in. Wrap single-tile
// stories in a fixed-width box so they render at a realistic size instead of filling the canvas.
const singleTileRender = (args: TileProps) => (
  <div style={{ width: 120 }}>
    <Tile {...args} />
  </div>
)

const meta = {
  title: 'Components/Tile',
  component: Tile,
  args: {
    children: 'Click here',
    onClick: fn(),
  },
  argTypes: {
    color: {
      control: 'select',
      options: ['emerald', 'violet', 'amber', 'cobalt', 'ruby', 'forest', 'wine', 'slate'],
    },
  },
  render: singleTileRender,
} satisfies Meta<typeof Tile>

export default meta
type Story = StoryObj<typeof meta>

export const Filled: Story = {
  args: { color: 'violet' },
}

export const Completed: Story = {
  args: { color: 'violet', completed: true },
}

export const Selected: Story = {
  args: { color: 'violet', selected: true },
}

export const Empty: Story = {
  args: { empty: true, children: 'Add an item' },
}

export const Colors: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 10, width: 500 }}>
      <Tile {...args} color="emerald" />
      <Tile {...args} color="violet" />
      <Tile {...args} color="amber" />
      <Tile {...args} color="cobalt" />
      <Tile {...args} color="ruby" />
      <Tile {...args} color="forest" />
      <Tile {...args} color="wine" />
      <Tile {...args} color="slate" />
    </div>
  ),
}

export const Grid: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 10, width: 300 }}>
      <Tile {...args} color="violet" />
      <Tile {...args} empty>
        Add an item
      </Tile>
      <Tile {...args} color="emerald" completed>
        Click here
      </Tile>
    </div>
  ),
}
