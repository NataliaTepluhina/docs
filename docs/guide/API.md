# API

## Slots

### vm.\$scopedSlots

> New in 2.1.0+

- **Type:** `{ [name: string]: props => Array<VNode> | undefined }`

- **Read only**

- **Details:**

  <LinkWrapper entry="scopedSlots">

  Used to programmatically access scoped slots. For each slot, including the `default` one, the object contains a corresponding function that returns VNodes.

  </LinkWrapper>

  **Note:** since 2.6.0+, there are two notable changes to this property:

  1. Scoped slot functions are now guaranteed to return an array of VNodes, unless the return value is invalid, in which case the function will return `undefined`.

  2. All `$slots` are now also exposed on `$scopedSlots` as functions. If you work with render functions, it is now recommended to always access slots via `$scopedSlots`, whether they currently use a scope or not. This will not only make future refactors to add a scope simpler, but also ease your eventual migration to Vue 3, where all slots will be functions.

### v-slot

- **Shorthand:** `#`

- **Expects:** JavaScript expression that is valid in a function argument position (supports destructuring in supported environments). Optional - only needed if expecting props to be passed to the slot.

- **Argument:** slot name (optional, defaults to `default`)

- **Usage:**

  Denote named slots or slots that expect to receive props.

- **Example:**

  ```html
  <!-- Named slots -->
  <base-layout>
    <template v-slot:header>
      Header content
    </template>

    Default slot content

    <template v-slot:footer>
      Footer content
    </template>
  </base-layout>

  <!-- Named slot that receives props -->
  <infinite-scroll>
    <template v-slot:item="slotProps">
      <div class="item">
        {{ slotProps.item.text }}
      </div>
    </template>
  </infinite-scroll>

  <!-- Default slot that receive props, with destructuring -->
  <mouse-position v-slot="{ x, y }">
    Mouse position: {{ x }}, {{ y }}
  </mouse-position>
  ```
