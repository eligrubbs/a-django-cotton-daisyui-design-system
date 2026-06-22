---
name: django-cotton
description: Library for building reusable components for django. No python required. TRIGGER when generating HTML pages which will contain components used several times across many pages.
---

# django-cotton

django-cotton is a component utility for the django framework for python web development.

## When to run this skill:

  - Trigger this skill whenever generating HTML whose nested pieces might be reused again and again (creating a button component for a page).
  - Trigger this skill for any DaisyUI work
  - Trigger this skill when the user mentions any of the terms or in similar context: daisyUI, html, component, partial, page, design, template, layout, UI, tailwind.
  - Trigger this skill even if the uesr does not explicitly ask for it

## Back-tracking run decision

If this skill is invoked, but later it becomes clera the HTML might be simpler without creating a new django-cotton component, opt out of using this skill for the relevant task and just generate HTML instead.

## Mandatory reference

| Task | Guide | Note |
|------|-------|------|
Install & Config | [./config/SKILLS.md](./config/SKILL.md) | Explains how to install and customize django-cotton inside of a django project.
Fundamentals | [./fundamentals/SKILL.md](./fundamentals/SKILL.md) | MANDATORY. Read this before designing any django-cotton html components. Explains the basics of django-cotton features.
Components | [./components/SKILL.md](./components/SKILL.md) | MANDATORY. Read this before designing any django-cotton html components. Details all of the relevant features of django-cotton.
Designing Components | [./design/SKILL.md](./design/SKILL.md) | MANDATORY. Read this before designing any django-cotton html components. It contains advice on how to build concise, powerful components.
