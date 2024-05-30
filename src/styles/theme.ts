import { createTheme } from '@mantine/core'
import { components } from './components'
import { colors } from './colors'
import { variantColorResolver } from './variantColorResolver'

export const theme = createTheme({
  cursorType: 'pointer',
  components,
  primaryShade: {
    light: 9,
    dark: 9,
  },
  black: '#0D0E0F',
  colors,
  variantColorResolver,
})
