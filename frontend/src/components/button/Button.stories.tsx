
import type { Meta, StoryObj } from "@storybook/react";
import Button from "./button";

const meta: Meta<typeof Button> = {
	title: "Components/Button",
	component: Button,
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: { type: "select" },
			options: ["default" ,"white"],
		},
		size: {
			control: { type: "select" },
			options: ["default", "sm", "lg", "icon"],
		},
		asChild: { control: "boolean" },
		disabled: { control: "boolean" },
		children: { control: "text" },
		onClick: { action: "clicked" },
	},
	args: {
		children: "Button",
		variant: "default",
		size: "default",
		asChild: false,
		disabled: false,
	},
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
	args: {
		children: "دکمه اصلی",
		variant: "default",
        size: "default",
	},
};

export const White: Story = {
	args: {
		children: "لینک",
        variant: "white",
        size: "default",
	},
};

export const Small: Story = {
	args: {
		children: "Small",
		size: "sm",
	},
};
