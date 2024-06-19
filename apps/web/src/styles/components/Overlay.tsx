import { Overlay } from "@mantine/core";

export const DefaultOverlay = Overlay.extend({
  defaultProps: {
    blur: 1.72,
    backgroundOpacity: 0.24,
  },
});
