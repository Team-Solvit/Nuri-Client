/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import {colors} from "@/styles/theme"
import { mq } from './media'

export const globalStyles = css`
  @font-face {
    font-family: 'SCoreDream';
    src: url('/fonts/S-Core-Dream/SCDream1.otf') format('opentype');
    font-weight: 100;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'SCoreDream';
    src: url('/fonts/S-Core-Dream/SCDream2.otf') format('opentype');
    font-weight: 200;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'SCoreDream';
    src: url('/fonts/S-Core-Dream/SCDream3.otf') format('opentype');
    font-weight: 300;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'SCoreDream';
    src: url('/fonts/S-Core-Dream/SCDream4.otf') format('opentype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'SCoreDream';
    src: url('/fonts/S-Core-Dream/SCDream5.otf') format('opentype');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'SCoreDream';
    src: url('/fonts/S-Core-Dream/SCDream6.otf') format('opentype');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'SCoreDream';
    src: url('/fonts/S-Core-Dream/SCDream7.otf') format('opentype');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'SCoreDream';
    src: url('/fonts/S-Core-Dream/SCDream8.otf') format('opentype');
    font-weight: 800;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'SCoreDream';
    src: url('/fonts/S-Core-Dream/SCDream9.otf') format('opentype');
    font-weight: 900;
    font-style: normal;
    font-display: swap;
  }

  input::placeholder {
    font-family: 'SCoreDream', sans-serif;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .main-container {
    width: 84.5vw;
    max-width: 84.5vw;
    height: 100vh;
    max-height: 100vh;

    ${mq.mobile} {
      width: 100vw;
      max-width: 100vw;
      height: 92vh;
      max-height: 92vh;
    }
  }

  body {
    font-family: 'SCoreDream', sans-serif;
    background-color: ${colors.background};
    color: ${colors.text};
  }
`