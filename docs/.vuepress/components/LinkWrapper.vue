<template>
  <div :class="{'doc-link-wrapper': editorMode}">
    <slot></slot>
    <div class="doc-links" v-if="editorMode">
      <a v-for="(value, key) in links" :href="value">{{ key }}</a>
    </div>
  </div>
</template>

<script>
import links from "../links.js";
export default {
  props: {
    entry: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      links: links[this.entry],
      editorMode: links.editorMode
    };
  }
};
</script>

<style>
.doc-link-wrapper {
  position: relative;
  background-color: rgba(126, 255, 223, 0.363);
}

.doc-links {
  position: absolute;
  top: 0;
  right: -35%;
  padding: 10px;
  border: 1px solid lightgray;
}

.doc-links a {
  display: block;
}
</style>


