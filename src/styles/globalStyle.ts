/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import {colors} from "@/styles/theme"

export const globalStyles = css`
  @font-face {
    font-family: 'SCoreDream';
    src: url('/fonts/S-Core-Dream/SCDream4.otf') format('otf');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'SCoreDream';  
    src: url('/fonts/S-Core-Dream/SCDream5.otf') format('otf');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'SCoreDream';
    src: url('/fonts/S-Core-Dream/SCDream7.otf') format('otf');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'SCoreDream', sans-serif;
    background-color: ${colors.background};
    color: ${colors.text};
  }
`