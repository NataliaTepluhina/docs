## Named Slots

There are times when it's useful to have multiple slots. For example, in a `<base-layout>` component with the following template:

```html
<div class="container">
  <header>
    <!-- We want header content here -->
  </header>
  <main>
    <!-- We want main content here -->
  </main>
  <footer>
    <!-- We want footer content here -->
  </footer>
</div>
```

For these cases, the `<slot>` element has a special attribute, `name`, which can be used to define additional slots:

```html
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

A `<slot>` outlet without `name` implicitly has the name "default".

To provide content to named slots, we can use the `v-slot` directive on a `<template>`, providing the name of the slot as `v-slot`'s argument:

```html
<base-layout>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template v-slot:footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>
```

Now everything inside the `<template>` elements will be passed to the corresponding slots. Any content not wrapped in a `<template>` using `v-slot` is assumed to be for the default slot.

However, you can still wrap default slot content in a `<template>` if you wish to be explicit:

```html
<base-layout>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>

  <template v-slot:default>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </template>

  <template v-slot:footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>
```

Either way, the rendered HTML will be:

```html
<div class="container">
  <header>
    <h1>Here might be a page title</h1>
  </header>
  <main>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </main>
  <footer>
    <p>Here's some contact info</p>
  </footer>
</div>
```

## Scoped Slots

Sometimes, it's useful for slot content to have access to data only available in the child component. For example, imagine a `<current-user>` component with the following template:

```html
<span>
  <slot>{{ user.lastName }}</slot>
</span>
```

We might want to replace this fallback content to display the user's first name, instead of last, like this:

```html
<current-user>
  {{ user.firstName }}
</current-user>
```

That won't work, however, because only the `<current-user>` component has access to the `user` and the content we're providing is rendered in the parent.

To make `user` available to the slot content in the parent, we can bind `user` as an attribute to the `<slot>` element:

```html
<span>
  <slot v-bind:user="user">
    {{ user.lastName }}
  </slot>
</span>
```

Attributes bound to a `<slot>` element are called **slot props**. Now, in the parent scope, we can use `v-slot` with a value to define a name for the slot props we've been provided:

```html
<current-user>
  <template v-slot:default="slotProps">
    {{ slotProps.user.firstName }}
  </template>
</current-user>
```

In this example, we've chosen to name the object containing all our slot props `slotProps`, but you can use any name you like.

### Abbreviated Syntax for Lone Default Slots

In cases like above, when _only_ the default slot is provided content, the component's tags can be used as the slot's template. This allows us to use `v-slot` directly on the component:

```html
<current-user v-slot:default="slotProps">
  {{ slotProps.user.firstName }}
</current-user>
```

This can be shortened even further. Just as non-specified content is assumed to be for the default slot, `v-slot` without an argument is assumed to refer to the default slot:

```html
<current-user v-slot="slotProps">
  {{ slotProps.user.firstName }}
</current-user>
```

Note that the abbreviated syntax for default slot **cannot** be mixed with named slots, as it would lead to scope ambiguity:

```html
<!-- INVALID, will result in warning -->
<current-user v-slot="slotProps">
  {{ slotProps.user.firstName }}
  <template v-slot:other="otherSlotProps">
    slotProps is NOT available here
  </template>
</current-user>
```

Whenever there are multiple slots, use the full `<template>` based syntax for _all_ slots:

```html
<current-user>
  <template v-slot:default="slotProps">
    {{ slotProps.user.firstName }}
  </template>

  <template v-slot:other="otherSlotProps">
    ...
  </template>
</current-user>
```
