import React from 'react';
import { Meta, Story } from '@storybook/react';
import { WrittenTextManifestation, WrittenTextManifestationProps } from './';

export default {
  title: 'Components/WrittenTextManifestation',
  component: WrittenTextManifestation,
  argTypes: { onDone: { action: 'done' } },
} as Meta;

const Template: Story<WrittenTextManifestationProps> = args => (
  <WrittenTextManifestation {...args} />
);

const dialogue = [
  'Ad sint consectetur et aliquip laboris amet ea non.',
  'Ex est dolore ipsum mollit dolor deserunt incididunt nulla elit ea Lorem eiusmod.',
];

export const DefaultView = Template.bind({});
DefaultView.args = { dialogue };

export const AdjustSpeed = Template.bind({});
AdjustSpeed.args = { dialogue, typingDelay: 2 };

export const AdjustInterlinePause = Template.bind({});
AdjustInterlinePause.args = { dialogue, typingDelay: 2, interlinePause: 5000 };
