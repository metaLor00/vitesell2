import type { Meta, StoryObj } from "@storybook/react";
import SectionHeader from "./section-header";

const meta: Meta<typeof SectionHeader> = {
  title: "Components/SectionHeader",
  component: SectionHeader,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    icon: { control: "text" },
    iconClassName: { control: "text" },
  },
  args: {
    title: "عنوان بخش",
    icon: "i-pen",
    iconClassName: "text-primary text-2xl",
  },
};

export default meta;

type Story = StoryObj<typeof SectionHeader>;

export const Default: Story = {
  args: {},
  render: (args) => <SectionHeader {...args} />,
};

export const WithAction: Story = {
  args: {},
  render: (args) => (
    <SectionHeader {...args}>
      <button className="inline-flex items-center gap-2 rounded-md bg-pink-linear text-white px-3 py-1 text-sm">
        <i className="i-pen"></i>
        ویرایش
      </button>
    </SectionHeader>
  ),
};

export const LongTitle: Story = {
  args: {
    title: "عنوان طولانی تستی برای نمایش رفتار هدر در خطوط بیش از حد و بررسی overflow و alignment",
  },
  render: (args) => <SectionHeader {...args} />,
};

export const English: Story = {
  args: {
    title: "Section title",
    icon: "i-pen",
    iconClassName: "text-primary text-2xl",
  },
  render: (args) => (
    <div dir="ltr">
      <SectionHeader {...args}>
        <button className="inline-flex items-center gap-2 rounded-md bg-primary text-white px-3 py-1 text-sm">
          Edit
        </button>
      </SectionHeader>
    </div>
  ),
};

export const RTLPreview: Story = {
  args: {},
  render: (args) => (
    <div dir="rtl">
      <SectionHeader {...args}>
        <button className="inline-flex items-center gap-2 rounded-md bg-pink-linear text-white px-3 py-1 text-sm">
          ویرایش
        </button>
      </SectionHeader>
    </div>
  ),
};
