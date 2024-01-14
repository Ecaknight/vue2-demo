<template>
  <div>
    <template v-if="schema && schema.length">
      <el-form-item v-bind="$attrs">
        <el-col
          v-for="(item, index) in schema"
          v-bind="item.colProps"
          :key="index"
          :span="item.span || item.colProps?.span"
        >
          <VFormItem
            v-bind="{ ...item, prop: `${$attrs.prop}.${item.prop}` }"
            v-model="curValue[item?.prop]"
          ></VFormItem>
        </el-col>
      </el-form-item>
    </template>

    <template v-else-if="colProps || span">
      <el-col :span="colProps?.span || span" v-bind="colProps">
        <VFormItem v-bind="$attrs" v-model="curValue"></VFormItem>
      </el-col>
    </template>

    <template v-else>
      <!-- {{ $attrs }} -->
      <VFormItem v-bind="$attrs" v-model="curValue"></VFormItem>
    </template>
  </div>
</template>

<script>
import VFormItem from './VFormItem.vue';

export default {
  components: {
    VFormItem,
  },
  model: {
    prop: 'modelValue',
    event: 'update:modelValue',
  },
  props: {
    schema: {
      type: Array,
      default: () => [],
    },
    colProps: {
      type: Object,
      default: null,
    },
    span: {
      type: Number,
      default: null,
    },
    modelValue: {
      type: [Object, Array, Number, String],
      default: null,
    },
  },
  data() {
    console.log(this.modelValue, '--------');
    return {
      curValue: this.modelValue,
    };
  },
  watch: {
    curValue(val) {
      this.$emit('update:modelValue', val);
    },
  },
};
</script>

<style lang="less" scoped></style>
