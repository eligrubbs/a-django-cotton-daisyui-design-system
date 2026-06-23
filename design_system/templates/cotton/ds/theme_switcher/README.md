# Theme Switcher

Custom implementation of a DaisyUI theme switcher.

## Pieces

1. `head_js.html`
    - javascript snippet that should go in the head of the page. It puts the theme cookie contents into the <html> tag of the entire page
    - You need to change your <html> tag on the page to <html class="group/html">
2. `index.html`
    - the theme element which uses DaisyUI for switching between themes by controlling the `data-theme` attribute
3. `footer_js.html`
    - javascript snippet that should go at the bottom of the page. It looks for 

## Modes

1. Default: System default
2. Light
3. Dark



## Tailwind Dark Selector

In your tailwind CSS manager, make sure you add this snippet.

This follows advice straight from [daisyUI](https://daisyui.com/docs/themes/#how-to-apply-tailwinds-dark-selector-for-specific-themes).

```
/* Make sure to use dark selector when a dark theme is applied */
@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));
```

## Context

Assumes that you have a theme named `light` and `dark` loaded somehow in whichever way you chose to manage your DaisyUI configuration.

Creates a cookie titled `__app_config__` which stores the information on the theme.

