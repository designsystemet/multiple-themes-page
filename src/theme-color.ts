import theme1CSS from '../design-tokens-build/theme1.css?raw';
import theme2CSS from '../design-tokens-build/theme2.css?raw';
import theme3CSS from '../design-tokens-build/theme3.css?raw';


const THEME_CSS: Record<string, string> = {
  theme1: theme1CSS,
  theme2: theme2CSS,
  theme3: theme3CSS,
};

const injectedThemes = new Set<string>();

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const extractColorVars = (css: string, scheme: 'light' | 'dark', color: string) => {
  const layerStart = css.indexOf(`@layer ds.theme.color-scheme.${scheme}`);
  if (layerStart === -1) return '';

  const colorPattern = escapeRegExp(color);
  const colorSchemeLayer = new RegExp(`@layer ds.theme.color-scheme.${scheme} {[\\s\\S]*?[\\s\\S]*?}`, 'g');
  const varRegex = new RegExp(`--ds-color-${colorPattern}-[^:]+:\\s*[^;]+;`, 'g');
  const vars = css.match(colorSchemeLayer)?.[0].match(varRegex) ?? [];

  return [...vars, `color-scheme: ${scheme};`].join('\n  ');
};

const buildThemeCSS = (theme: string, color: string) => {
  const css = THEME_CSS[theme];
  if (!css) return '';

  const lightVars = extractColorVars(css, 'light', color);
  const darkVars = extractColorVars(css, 'dark', color);
  const selector = `[data-theme="${theme}"][data-color="${color}"]`;

  return [
    `${selector}[data-color-scheme="light"] {\n  ${lightVars}\n}`,
    `@media (prefers-color-scheme: light) {\n  ${selector}[data-color-scheme="auto"] {\n    ${lightVars}\n  }\n}`,
    `${selector}[data-color-scheme="dark"] {\n  ${darkVars}\n}`,
    `@media (prefers-color-scheme: dark) {\n  ${selector}[data-color-scheme="auto"] {\n    ${darkVars}\n  }\n}`,
  ].join('\n\n');
};

/**
 * Parses Designsystemet color variables for a given theme and color, and injects them in `<head>` under `data-theme` attributes.
 */
class DsTheme extends HTMLElement {
  static get observedAttributes() {
    return ['data-theme', 'data-color', 'data-color-scheme'];
  }

  connectedCallback() {
    this.ensureThemeStyles();
  }

  disconnectedCallback() {
    const theme = this.getAttribute('data-theme') ?? '';
    const color = this.getAttribute('data-color') ?? '';
    const key = `${theme}:${color}`;
    if (injectedThemes.has(key)) {
      const style = document.querySelector(`style[title="ds-theme-color:${key}"]`);
      style?.remove();
      injectedThemes.delete(key);
    }
  }

  attributeChangedCallback() {
    this.ensureThemeStyles();
  }

  private ensureThemeStyles() {
    const theme = this.getAttribute('data-theme') ?? '';
    const color = this.getAttribute('data-color') ?? '';
    if (!theme || !color) return;

    if (!this.hasAttribute('data-color-scheme')) {
      this.setAttribute('data-color-scheme', 'auto');
    }

    const key = `${theme}:${color}`;
    if (injectedThemes.has(key)) return;

    const css = buildThemeCSS(theme, color);
    if (!css) return;




    //   Using CSSStyleSheet; https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/CSSStyleSheet
    //   const styleSheet = new CSSStyleSheet();
    //   styleSheet.replaceSync(css);
    //   document.adoptedStyleSheets = [...document.adoptedStyleSheets, styleSheet];

    // Using <style> element; for browsers that don't support CSSStyleSheet
    const style = document.createElement('style');
    style.title = `ds-theme-color:${theme}:${color}`;
    style.textContent = css;
    document.head.append(style);
    injectedThemes.add(key);
  }
}

customElements.define('ds-theme-color', DsTheme);