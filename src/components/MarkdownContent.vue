<template>
  <div class="md-content" v-html="html" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { marked } from 'marked';

type Props = {
  content: string;
};

const props = defineProps<Props>();

const html = computed(() => {
  // NOTE: In production with remote content, add sanitization.
  return marked.parse(props.content) as string;
});
</script>

<style scoped lang="scss">
.md-content :deep(h1) {
  font-size: 28px;
  line-height: 1.2;
  font-weight: 700;
  margin: 0 0 12px;
}

.md-content :deep(h2) {
  font-size: 20px;
  line-height: 1.3;
  font-weight: 700;
  margin: 18px 0 10px;
}

.md-content :deep(h3) {
  font-size: 16px;
  line-height: 1.3;
  font-weight: 700;
  margin: 16px 0 8px;
}

.md-content :deep(p) {
  margin: 0 0 12px;
  color: rgba(0, 0, 0, 0.78);
}

.md-content :deep(ul),
.md-content :deep(ol) {
  padding-left: 18px;
  margin: 0 0 12px;
}

.md-content :deep(li) {
  margin: 6px 0;
}

.md-content :deep(blockquote) {
  margin: 12px 0;
  padding: 10px 12px;
  border-left: 4px solid rgba(25, 118, 210, 0.4);
  background: rgba(25, 118, 210, 0.06);
  border-radius: 12px;
}

.md-content :deep(code) {
  padding: 1px 6px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.06);
}

.md-content :deep(a) {
  color: #1976d2;
  text-decoration: none;
}

.md-content :deep(a:hover) {
  text-decoration: underline;
}
</style>
