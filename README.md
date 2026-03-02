# multi themes page

This showcases advance use of Designsystemet theme variables. This not officially supported as layers or selectors can change. Use at own risk and add safeguards.

Made a simple custom element that parses theme files and injects color variables from other themes into `<head>`.

## Getting started
- `npm i`
- make color changes in [designsystemet.config.json](./designsystemet.config.json)
- run `npm run tokens`
- run `npm run dev`

## Usage

[src/theme-color](./src/theme-color.ts)
```html
<button class="ds-button">will be colored farge1 from main theme (theme1)</button>   
<ds-theme-color data-theme="theme2" data-color="farge1">
    <button class="ds-button">will be colored farge1 from theme2</button>   
</ds-theme-color>
```
## Color variables

```css
[data-theme="theme2"][data-color="farge1"][data-color-scheme="light"] {
  --ds-color-farge1-background-default: #ffffff;
  --ds-color-farge1-background-tinted: #f9f2f4;
  --ds-color-farge1-surface-default: #ffffff;
  --ds-color-farge1-surface-tinted: #f4e5ea;
  --ds-color-farge1-surface-hover: #edd3dd;
  --ds-color-farge1-surface-active: #e5c0ce;
  --ds-color-farge1-border-subtle: #deafc0;
  --ds-color-farge1-border-default: #bb587c;
  --ds-color-farge1-border-strong: #a92c59;
  --ds-color-farge1-text-subtle: #a92c59;
  --ds-color-farge1-text-default: #5c0323;
  --ds-color-farge1-base-default: #99053a;
  --ds-color-farge1-base-hover: #77042d;
  --ds-color-farge1-base-active: #550320;
  --ds-color-farge1-base-contrast-subtle: #f4e5eb;
  --ds-color-farge1-base-contrast-default: #ffffff;
  color-scheme: light;
}

@media (prefers-color-scheme: light) {
  [data-theme="theme2"][data-color="farge1"][data-color-scheme="auto"] {
    --ds-color-farge1-background-default: #ffffff;
  --ds-color-farge1-background-tinted: #f9f2f4;
  --ds-color-farge1-surface-default: #ffffff;
  --ds-color-farge1-surface-tinted: #f4e5ea;
  --ds-color-farge1-surface-hover: #edd3dd;
  --ds-color-farge1-surface-active: #e5c0ce;
  --ds-color-farge1-border-subtle: #deafc0;
  --ds-color-farge1-border-default: #bb587c;
  --ds-color-farge1-border-strong: #a92c59;
  --ds-color-farge1-text-subtle: #a92c59;
  --ds-color-farge1-text-default: #5c0323;
  --ds-color-farge1-base-default: #99053a;
  --ds-color-farge1-base-hover: #77042d;
  --ds-color-farge1-base-active: #550320;
  --ds-color-farge1-base-contrast-subtle: #f4e5eb;
  --ds-color-farge1-base-contrast-default: #ffffff;
  color-scheme: light;
  }
}

[data-theme="theme2"][data-color="farge1"][data-color-scheme="dark"] {
  --ds-color-farge1-background-default: #2b0f15;
  --ds-color-farge1-background-tinted: #38131b;
  --ds-color-farge1-surface-default: #461822;
  --ds-color-farge1-surface-tinted: #501c27;
  --ds-color-farge1-surface-hover: #5d212d;
  --ds-color-farge1-surface-active: #752938;
  --ds-color-farge1-border-subtle: #893244;
  --ds-color-farge1-border-default: #ad707d;
  --ds-color-farge1-border-strong: #c79da6;
  --ds-color-farge1-text-subtle: #c79da6;
  --ds-color-farge1-text-default: #f3eaec;
  --ds-color-farge1-base-default: #d393aa;
  --ds-color-farge1-base-hover: #c87895;
  --ds-color-farge1-base-active: #bc5b7e;
  --ds-color-farge1-base-contrast-subtle: #1e1518;
  --ds-color-farge1-base-contrast-default: #000000;
  color-scheme: dark;
}

@media (prefers-color-scheme: dark) {
  [data-theme="theme2"][data-color="farge1"][data-color-scheme="auto"] {
    --ds-color-farge1-background-default: #2b0f15;
  --ds-color-farge1-background-tinted: #38131b;
  --ds-color-farge1-surface-default: #461822;
  --ds-color-farge1-surface-tinted: #501c27;
  --ds-color-farge1-surface-hover: #5d212d;
  --ds-color-farge1-surface-active: #752938;
  --ds-color-farge1-border-subtle: #893244;
  --ds-color-farge1-border-default: #ad707d;
  --ds-color-farge1-border-strong: #c79da6;
  --ds-color-farge1-text-subtle: #c79da6;
  --ds-color-farge1-text-default: #f3eaec;
  --ds-color-farge1-base-default: #d393aa;
  --ds-color-farge1-base-hover: #c87895;
  --ds-color-farge1-base-active: #bc5b7e;
  --ds-color-farge1-base-contrast-subtle: #1e1518;
  --ds-color-farge1-base-contrast-default: #000000;
  color-scheme: dark;
  }
}
```
