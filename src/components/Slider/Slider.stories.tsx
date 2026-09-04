import type { Meta, StoryObj } from '@storybook/react-vite'
import { Slider } from './Slider'

const meta = {
  title: 'Components/Slider',
  component: Slider,
  args: {
    label: 'Volume',
    min: 0,
    max: 100,
    defaultValue: 50,
    formatValue: (v: number) => `${v}%`,
  },
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithHelperText: Story = {
  args: { helperText: 'Applies to notification sounds only.' },
}

export const WithError: Story = {
  args: { errorText: 'Must be above 10% to be audible.', defaultValue: 5 },
}

export const NoValueText: Story = {
  args: { formatValue: undefined },
}

export const QualitativeLabels: Story = {
  args: {
    label: 'How confident are you?',
    min: 1,
    max: 10,
    step: 1,
    defaultValue: 5,
    formatValue: (v: number) => {
      const labels: Record<number, string> = {
        1: 'A real stretch',
        4: 'Ambitious but doable',
        7: 'Confident',
        9: 'Very confident',
      }
      const key = Object.keys(labels)
        .map(Number)
        .filter((k) => k <= v)
        .sort((a, b) => b - a)[0]
      return `${v}/10 · ${labels[key]}`
    },
  },
}

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 30 },
}

export const FullWidth: Story = {
  args: { fullWidth: true },
  render: (args) => (
    <div style={{ width: 400 }}>
      <Slider {...args} />
    </div>
  ),
}
