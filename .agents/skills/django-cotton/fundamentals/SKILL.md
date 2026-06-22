---
name: django-cotton-features
description: MANDATORY explains quickly the features of django-cotton
---

# django-cotton Fundamentals

## Location

- Cotton components should be placed in the `templates/cotton` folder (`cotton` is configurable using `COTTON_DIR`).
- The `templates` folder can exist either:
  - At the app level
  - At the project root level

## Naming

Cotton uses the following naming conventions:

- By default, component filenames use `snake_case`.

  Example:

  ```text
  my_component.html
  ```

- Kebab-case filenames can be enabled with:

  ```python
  COTTON_SNAKE_CASED_NAMES = False
  ```

  Example:

  ```text
  my-component.html
  ```

- Components are referenced using kebab-case tags:

  ```html
  <c-my-component />
  ```

## Subfolders

- Components can be organized into subfolders.
- Subfolders are referenced using dot notation.

Example file:

```text
templates/cotton/sidebar/menu/link.html
```

Usage:

```html
<c-sidebar.menu.link />
```

## Tag Syntax

Cotton components can be used using either:

1. HTML-like component syntax (recommended)
2. Native Django template tags

### HTML-like Syntax

Cotton's HTML-like syntax provides:

- Editor autocompletion
- Automatic tag closing
- Syntax highlighting
- Better readability

Example:

```html
<c-button>
    Click me
</c-button>
```

Equivalent native syntax:

```django
{% cotton button %}
    Click me
{% endcotton %}
```

---

### Native Template Tags

If preferred, Cotton components can also be rendered using Django template tags.

#### HTML-like Syntax

```html
<c-button title="Click me">
    Click here
</c-button>
```

#### Native Django Syntax

```django
{% cotton button title="Click me" %}
    Click here
{% endcotton %}
```

## Syntax Comparison

| Feature | HTML-like Syntax | Native Template Syntax |
|----------|----------|----------|
| Component | `<c-button>...</c-button>` | `{% cotton button %}...{% endcotton %}` |
| Self-closing Component | `<c-button />` | `{% cotton button / %}` |
| Variables | `<c-vars title />` | `{% cotton:vars title %}` |
| Named Slot | `<c-slot name="header">...</c-slot>` | `{% cotton:slot header %}...{% endcotton:slot %}` |
