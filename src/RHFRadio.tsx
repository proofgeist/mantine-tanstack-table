import React from "react";
import { Radio, RadioProps } from "@mantine/core";
import RHFRadioGroup from "./RHFRadioGroup";

function RHFRadio(props: RadioProps) {
  return <Radio {...props} />;
}
RHFRadio.Group = RHFRadioGroup;
export default RHFRadio;
