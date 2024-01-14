<template>
  <el-form ref="formRef" :model="form" :rules="rules">
    <slot name="default">
      <VFormLayout v-for="(item, index) in schema" :key="index" v-bind="item" v-model="form[item.prop]" />
    </slot>
    <slot name="actions"></slot>
  </el-form>
</template>

<script>
import VFormLayout from './VFormLayout.vue';

export default {
  components: {
    VFormLayout,
  },
  model: {
    prop: 'modelValue',
    event: 'inputchange',
  },
  props: {
    modelValue: {
      type: Object,
      default: () => ({}),
    },
    schema: {
      type: Array,
      default: () => [],
    },
    rules: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      form: { ...this.modelValue },
    };
  },
  watch: {
    form: {
      handler(value) {
        this.$emit('inputchange', value);
      },
      deep: true,
    },
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    },
  },
};
</script>

<style lang="less" scoped></style>
