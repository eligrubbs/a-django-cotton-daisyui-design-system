# a-django-cotton-daisyui-design-system
A small repo where I play around with mixing django cotton and DaisyUI

## Motivation

In the django world, the default for frontend development is using the built-in templating system.

This templating system is similar to jinja, and you quickly realize there are strong limitations with extendability / composability of templates.

Templates are great for having a base page and few sections which you need solely to change in a downstream template. But when you want to render a template partial with specific context things get either verbose or confusing very fast.

`django-cotton` is a django ecosystem package that brings html syntax to template partials. But this package alone does not come with a solution for designing common frontend patterns. Instead, it stops it's responsibility right at giving you ways to create better template partials that feel like writing HTML.

A very popular css-only solution to the common frontend design system problem is DaisyUI. It just has pre-styled primitives for buttons, alerts, dropdowns, etc. that use only CSS styling, and give advice on how to structure your HTML (for dropdowns, etc.).

The goal is to create a simple, flexible, design system for django which at the end of the day feels like you have day 0 frontend superpowers the way shadcn or Chakra UI empower frontend developers to start building styled buttons, banners, etc. which interface with the code.

## Integration

The good and bad thing about both of these packages is their flexibility. For DaisyUI, you have the freedom to use standalone CSS files, or integrate it with your javscript build pipeline. For django-cotton, it does not ship with any pre-built anything.

Combining the two packages means making decisions for everyone who is going to use the package. 

### Decisions made for you

1. Basic organization of django-cotton components in design system
2. Assumes you have injected relevant HTML pages with CSS artifacts needed.


### Decisions we do NOT make

1. What icon pack to use
2. How you bundle / organize your css

