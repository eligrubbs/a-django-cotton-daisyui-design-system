---
name: django-cotton-config
description: Configuration options for django-cotton.
---

# For automatic configuration:

```settings.py
INSTALLED_APPS = [
    'django_cotton',
]
```

This will attempt to automatically handle the settings.py by adding the required loader and templatetags. This is the preferred method for 99% of use cases.

# For custom configuration

If your project requires any non-default loaders or you do not wish Cotton to manage your settings, you should instead provide `django_cotton.apps.SimpleAppConfig` in your `INSTALLED_APPS`:

```settings.py
INSTALLED_APPS = [
    'django_cotton.apps.SimpleAppConfig',
]

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        ...
        "OPTIONS": {
            "loaders": [(
                "django.template.loaders.cached.Loader",
                [
                    "django_cotton.cotton_loader.Loader",
                    "django.template.loaders.filesystem.Loader",
                    "django.template.loaders.app_directories.Loader",
                ],
            )],
            "builtins": [
                "django_cotton.templatetags.cotton"
            ],
        }
    }
]

```

The following configurations can be provided in your django settings (usually organized at `settings.py`).

# Configuration Variables

## `COTTON_DIR`

| Variable | Type & Default | Description |
| -------- | -------------- | ----------- |
| `COTTON_DIR` | `str`<br>Default: `'cotton'` | Defines the directory name inside your templates folder where Cotton components are stored. Useful if you prefer a different folder name such as `components`. |

### Example

```python
COTTON_DIR = "components"
```

---

## `COTTON_BASE_DIR`

| Variable | Type & Default | Description |
| -------- | -------------- | ----------- |
| `COTTON_BASE_DIR` | `str \| None`<br>Default: `None` | Specifies the base directory where Cotton should look for the `templates` directory, in addition to installed app template directories. If not provided, Cotton falls back to the project's `BASE_DIR` (when available). |

### Example

```python
COTTON_BASE_DIR = "/path/to/project"
```

---

## `COTTON_SNAKE_CASED_NAMES`

| Variable | Type & Default | Description |
| -------- | -------------- | ----------- |
| `COTTON_SNAKE_CASED_NAMES` | `bool`<br>Default: `True` | Controls how component names map to template filenames. When enabled, component names are converted to `snake_case`. When disabled, hyphenated filenames are used instead. |

### Example

Component usage:

```html
<c-my-button />
```

| Setting                            | Resolved Template       |
| ---------------------------------- | ----------------------- |
| `COTTON_SNAKE_CASED_NAMES = True`  | `cotton/my_button.html` |
| `COTTON_SNAKE_CASED_NAMES = False` | `cotton/my-button.html` |

---

## `COTTON_ISOLATE_BY_DEFAULT`

| Variable | Type & Default | Description |
| -------- | -------------- | ----------- |
| `COTTON_ISOLATE_BY_DEFAULT` | `bool`<br>Default: `False` | Enables Smart Isolation for all components. Components cannot access variables from the surrounding template context, but still receive global context processor output such as `request`, `user`, `messages`, `perms`, and any custom context processor values. |

### Additional Notes

* Context processor output is captured once per request and reused across all components on the page.
* Prevents accidental context leakage between templates and components.
* For complete isolation (including blocking context processors), use the `only` attribute on individual components.

### Example

```python
COTTON_ISOLATE_BY_DEFAULT = True
```

```html
<c-user-card :user="user" only />
```
