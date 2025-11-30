import type { Meta, StoryObj } from "@storybook/react";
import PriceRange from "./price-range";

const meta: Meta<typeof PriceRange> = {
  title: "Components/PriceRange",
  component: PriceRange,
  tags: ["autodocs"],
  argTypes: {
    min: { control: { type: "number" } },
    max: { control: { type: "number" } },
    step: { control: { type: "number" } },
    disabled: { control: "boolean" },
    rtl: { control: "boolean" },
    onApply: { action: "applied" },
  },
  args: {
    min: 1000000,
    max: 100000000,
    step: 100000,
    disabled: false,
    rtl: true,
  },
};

export default meta;

type Story = StoryObj<typeof PriceRange>;

export const Default: Story = {
  args: {},
};

export const LTR: Story = {
  args: {
    rtl: false,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const CustomRange: Story = {
  args: {
    min: 0,
    max: 5000000,
    step: 50000,
  },
};
