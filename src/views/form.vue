<template>
  <div>
    <VForm v-model="model" :schema="schema" :rules="rules">
      <template #actions>
        <el-button type="primary" size="small" @click="onSubmit">创建</el-button>
      </template>
    </VForm>
    {{ model }}
    <br />
    {{ rules }}
  </div>
</template>

<script>
import VForm from '@/components/VForm/index.vue';
import { setFormModel, setRules } from '@/components/VForm/utils';

export default {
  components: { VForm },
  data() {
    return {
      model: {},
      regionList: [],
      ActivityRef: null,
    };
  },
  computed: {
    schema() {
      return [
        {
          prop: 'name',
          value: '1234',
          label: 'Activity name',
          'label-width': '200px',
          type: 'input',
          attrs: {
            // disabled: true,
          },
          rules: [
            { required: true, message: 'Please input Activity name', trigger: 'blur' },
            { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
          ],
          itemRef: (ref) => {
            this.ActivityRef = ref;
          },
          events: {
            change: (val) => {
              this.valueChange(val);
            },
          },
        },
        {
          prop: 'region',
          value: '',
          label: '活动区域',
          'label-width': '200px',
          type: 'select',
          attrs: {},
          rules: [{ required: true, message: '请选择' }],
          children: this.regionList,
        },
        {
          prop: 'numObj',
          value: '',
          label: '申请数量',
          'label-width': '200px',
          attrs: {},
          rules: [{ required: true, message: '请选择', trigger: 'change' }],
          schema: [
            {
              prop: 'mem',
              value: '',
              span: 20,
              'label-width': '80px',
              type: 'input',
              label: 'm数量',
              rules: [{ required: true, message: '请选择', trigger: 'blur' }],
            },
            {
              prop: 'hhd',
              value: '',
              span: 20,
              type: 'input',
              'label-width': '80px',
              label: 'hhd数量',
              attrs: {
                style: {
                  'margin-bottom': '20px',
                },
              },
              rules: [{ required: true, message: '请选择', trigger: 'blur' }],
            },
            {
              prop: 'ssd',
              value: '',
              span: 20,
              type: 'input',
              'label-width': '80px',
              label: 'ssd数量',
              rules: [{ required: true, message: '请选择', trigger: 'blur' }],
            },
          ],
        },
      ];
    },
  },
  created() {
    this.model = setFormModel(this.schema);
    this.rules = setRules(this.schema);
    console.log(this.model, this.rules);
  },
  mounted() {
    setTimeout(() => {
      this.regionList = [
        { label: '区域1', value: 'shanghai' },
        { label: '区域2', value: 'beijing' },
      ];
    }, 2000);
  },
  methods: {
    valueChange(val) {
      console.log(val, this.ActivityRef);
    },
    onSubmit() {
      console.log(this.ActivityRef, this.model);
    },
  },
};
</script>

<style lang="less" scoped></style>
