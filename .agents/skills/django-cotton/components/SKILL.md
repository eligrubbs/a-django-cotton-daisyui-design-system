---
name: django-cotton-components
description: Reference for all features in django-cotton that enable creating custom components.
---

Components are reusable pieces of view template. They can contain native Django template syntax and can be used inside standard Django templates.

## Quick Reference

| Feature                     | Purpose                                       |
| --------------------------- | --------------------------------------------- |
| `{{ slot }}`                | Default content injection                     |
| Attributes                  | Pass simple values into a component           |
| Named Slots                 | Pass HTML/template content                    |
| `:attribute`                | Pass variables, lists, dicts, booleans, etc.  |
| `{{ attrs }}`               | Output all HTML attributes                    |
| `:attrs`                    | Merge a dictionary of attributes              |
| `<c-vars />`                | Define defaults and component state           |
| Boolean Attributes          | Attributes without values become `True`       |
| `<c-component>`             | Render components dynamically                 |
| `only`                      | Fully isolate component context               |
| `COTTON_ISOLATE_BY_DEFAULT` | Project-wide context isolation                |
| Alpine `::`                 | Escape Alpine shorthand bindings              |
| Compound Components         | A parent component with coordinated sub-parts |

## # 1. The Basic Building Block: `{{ slot }}`

The `{{ slot }}` variable captures all content passed between a component's opening and closing tags.

### Component

```cotton/box.html
<div class="box">
    {{ slot }}
</div>
```

### Usage

```my_view.html
<c-box>
    <p>Some <strong>content</strong></p>
</c-box>
```

### Output

```html
<div class="box">
    <p>Some <strong>content</strong></p>
</div>
```


## 2. Component Attributes

Attributes allow you to pass data into a component as key-value pairs.

### Component

```cotton/weather.html
<p>
    It's {{ temperature }}<sup>o</sup>{{ unit }}
    and the condition is {{ condition }}.
</p>
```

### Usage

```view.html
<c-weather
    temperature="23"
    unit=unit
    condition="windy">
</c-weather>
```

### Output

```text
It's 23°C and the condition is windy.
```


## 3. Named Slots

Use named slots when you need to pass HTML (or other complex content) into a component.

### Component

```cotton/weather_card.html
<div class="flex ...">
    <h2>{{ day }}:</h2>
    {{ icon }}
    {{ label }}
</div>
```

### Usage

```view.html
<c-weather-card day="Tuesday">
    <c-slot name="icon">
        <img src="sunny-icon.png" alt="Sunny">
    </c-slot>

    <c-slot name="label">
        <div class="yellow">Sunny</div>
    </c-slot>
</c-weather-card>
```

### Notes

Component filenames are snake_case by default:

```text
weather_card.html
```

To use kebab-case filenames instead, set:

```python
COTTON_SNAKE_CASED_NAMES = False
```

## 4. Dynamic Attributes

By default, component attributes are treated as strings.

To pass variables, booleans, numbers, dictionaries, or lists, use dynamic attributes.

### Syntax Options

#### Quoteless Values

For simple values without spaces.

```html
<c-button enabled=True />
<c-button enabled=False />
<c-input value=my_variable />
<c-counter start=42 />
```

#### Colon Prefix

For complex expressions.

```html
<c-select :options="['yes', 'no', 'maybe']" />
<c-card :config="{'open': True}" />
```

### Passing Objects From Context

#### Parent Template

```html
<!-- context = { 'today': Weather.objects.get(...) } -->

<c-weather :today="today"></c-weather>
```

#### Component

```html
<!-- cotton/weather.html -->

<p>
    It's {{ today.temperature }}<sup>o</sup>{{ today.unit }}
    and the condition is {{ today.condition }}.
</p>
```


### Supported Python Types

#### Integers & Floats

```html
<c-mycomp :prop="1" />
```

```python
prop == 1
```

#### None

```html
<c-mycomp :prop="None" />
```

```python
prop is None
```

#### Lists

```html
<c-mycomp :items="['item1','item2','item3']" />
```

```django
{% for item in items %}
```

#### Dictionaries

```html
<c-mycomp :mydict="{'name': 'Thom', 'products': [1,2]}" />
```

```django
{{ mydict.name }}
{{ mydict.products }}
```

#### Parent Variables

```html
<c-mycomp :product="product" />
```

```django
{{ product.title }}
```

#### Template Expressions

```html
<c-mycomp :slides="['{{ image1 }}', '{{ image2 }}']" />
```

#### Generated Values

```html
<c-mycomp
    :is_highlighted="{% if important %}True{% endif %}" />
```

### Example: Dynamic Select Options

#### Usage

```html
<c-select :options="['no', 'yes', 'maybe']" />
```

#### Component

```html
<!-- cotton/select.html -->

<select>
    {% for option in options %}
        <option value="{{ option }}">
            {{ option }}
        </option>
    {% endfor %}
</select>
```


## 5. Passing All Attributes With `{{ attrs }}`

Useful for form controls and wrapper components.

### Usage

```html
<!-- form_view.html -->

<c-input
    name="first_name"
    placeholder="First name" />

<c-input
    name="last_name"
    placeholder="First name"
    value="Smith"
    readonly />
```

### Component

```html
<!-- cotton/input.html -->

<input type="text" {{ attrs }} />
```

### Output

```html
<input
    type="text"
    name="first_name"
    placeholder="First name" />

<input
    type="text"
    name="last_name"
    placeholder="First name"
    value="Smith"
    readonly />
```

---

## 5.1 Merging Attributes With `:attrs`

Pass a dictionary of attributes into a component.

### Component

```html
<!-- cotton/input.html -->

<input type="text" {{ attrs }} />
```

### View Context

```python
context = {
    "widget_attrs": {
        "placeholder": "Enter your name",
        "data-validate": "true",
        "size": "40",
    }
}
```

### Usage

```html
<c-input :attrs="widget_attrs" required />
```

### Output

```html
<input
    type="text"
    placeholder="Enter your name"
    data-validate="true"
    size="40"
    required />
```

### Proxying Attributes

Forward all attributes to another component:

```html
<c-comp :attrs="attrs" />
```

---

## 6. Local Variables With `<c-vars />`

`<c-vars />` allows local variable definitions and default values inside components.

Place a single `<c-vars />` at the top of the component.

### Default Component Configuration

#### Component

```html
<!-- cotton/alert.html -->

<c-vars type="success" />

<div class="
    {% if type == 'success' %}
        ...
    {% elif type == 'danger' %}
        ...
    {% endif %}
">
    {{ slot }}
</div>
```

#### Usage

```html
<c-alert>
    All good!
</c-alert>

<c-alert type="danger">
    Oh no!
</c-alert>
```

### `<c-vars />` and `{{ attrs }}`

Variables defined in `<c-vars />` are excluded from `{{ attrs }}`.

#### Component

```html
<!-- cotton/input_group.html -->

<c-vars label errors />

<label>{{ label }}</label>

<input
    type="text"
    class="border ..."
    {{ attrs }} />

{% if errors %}
    {% for error in errors %}
        {{ error }}
    {% endfor %}
{% endif %}
```

#### Usage

```html
<c-input-group
    label="First name"
    placeholder="First name"
    :errors="errors.first_name" />

<c-input-group
    label="Last name"
    placeholder="Last name"
    :errors="errors.last_name" />
```


## 7. Boolean Attributes

Providing an attribute without a value passes `True`.

### Usage

```html
<c-input
    name="telephone"
    required />
```

### Component

```html
<!-- cotton/input.html -->

<input type="text" {{ attrs }} />

{% if required is True %}
    <span class="text-red-500">*</span>
{% endif %}
```

## 8. Dynamic Components

Use `<c-component>` when the component name is determined at runtime.

### Loop Example

```html
<!-- cotton/icon_list.html -->

{% for icon in icons %}
    <c-component is="icons.{{ icon }}" />
{% endfor %}
```

### Using a Variable

```html
<c-component :is="icon_name" />
```

### Using a Template Expression

```html
<c-component is="icon_{{ icon_name }}" />
```

---

## 9. Context Isolation

By default, components inherit the full parent template context.

### `only`

Completely isolates a component.

```html
<c-profile-card
    user=user
    only />
```

The component receives:

* Directly passed attributes only
* No parent template variables
* No context processors
* No `request`
* No `user`

---

### `COTTON_ISOLATE_BY_DEFAULT`

Enable project-wide isolation:

```python
COTTON_ISOLATE_BY_DEFAULT = True
```

This blocks parent template variables from leaking into components while still allowing context processor values such as:

* `request`
* `user`
* `messages`

Use `only` if you also want to block context processors.


## 10. Alpine.js Support

Cotton includes several Alpine.js integration features.

### `x-data`

Kebab-case Alpine attributes become snake_case variables inside the component.

#### Usage

```html
<c-counter x-data="{ count: 0 }" />
```

#### Inside Component

```django
{{ x_data }}
```

If using `{{ attrs }}`, the original attribute format is preserved.

---

### Shorthand `x-bind`

Because `:` is reserved for Cotton dynamic attributes, escape Alpine shorthand bindings with a double colon.

#### Usage

```html
<c-button ::disabled="loading" />
```

#### Result

```html
<button :disabled="loading">
```

## 11. Compound Components

A compound component is a parent made up of several coordinated sub-parts that are used together as a family, like a card with its own header and body. Cotton lets you build one by grouping the parts in a folder: add an index.html to make the folder itself usable as the default component, then address the siblings with dot notation. This also keeps your project structure tidy and cuts repetition in the template.

```
templates/
├── cotton/
│   ├── card/
│   │   ├── index.html
│   │   ├── header.html
```

```example.html
<c-card>
    <c-card.header>...</c-card.header>
</c-card>
```
