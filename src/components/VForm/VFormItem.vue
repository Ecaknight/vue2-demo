<template>
  <el-form-item v-bind="$attrs" :ref="(ref) => $attrs.itemRef && $attrs.itemRef(ref)">
    <el-select v-if="type === 'select'" v-model="value" v-bind="attrs" v-on="events">
      <el-option
        v-for="(sub, index) in $attrs.children"
        :key="index"
        :label="sub.label"
        :value="sub.value"
        v-bind="sub"
      ></el-option>
    </el-select>

    <el-checkbox-group v-else-if="type === 'checkbox' || type === 'checkbox-group'" v-model="value" v-bind="attrs">
      <component
        :is="'el-' + item.type"
        v-for="(item, index) in $attrs.children"
        :key="index"
        :label="item.label"
        :value="item.value"
        v-bind="item"
        v-on="events"
      />
    </el-checkbox-group>

    <el-radio-group v-else-if="type === 'radio' || type === 'radio-group'" v-model="value" v-bind="attrs" v-on="events">
      <component :is="'el-' + item.type" v-for="(item, index) in $attrs.children" :key="index" :label="item.value">{{
        item.label
      }}</component>
    </el-radio-group>

    <!-- 最后的组件兼容 -->
    <component :is="'el-' + type" v-else-if="otherType" v-model="value" v-bind="attrs" v-on="events" />

    <!-- 最后都没有组件就直接展示文字 -->
    <span v-else v-bind="attrs" v-on="events">{{ value }}</span>
  </el-form-item>
</template>

<script>
export default {
  model: {
    prop: 'modelValue',
    event: 'update:modelValue',
  },
  props: {
    type: {
      type: String,
      default: '',
    },
    modelValue: {
      type: [String, Number, Object, Array, Date],
      default: '',
    },
    attrs: {
      type: Object,
      default: () => ({}),
    },
    events: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      value: this.modelValue,
    };
  },
  computed: {
    otherType() {
      console.log(this.type, this.modelValue);
      return this.type && !['select', 'radio', 'checkbox'].includes(this.type);
    },
  },
  watch: {
    value: {
      handler(newVal) {
        this.$emit('update:modelValue', newVal);
      },
      deep: true,
    },
  },
};
</script>

<style lang="less" scoped></style>
