<template>
  <el-form ref="form" :model="form" label-width="120px" :rules="rules">
    <el-form-item label="规则" prop="rule">
      <el-input v-model="form.rule" placeholder="请输入规则"></el-input>
    </el-form-item>
    <el-form-item label="表格数据" prop="tableData">
      <el-table :data="tableData" border>
        <el-table-column prop="name" label="姓名">
          <template slot-scope="scope">
            <el-form-item>
              <el-input v-model="scope.row.name" placeholder="请输入姓名"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄">
          <template slot-scope="scope">
            <el-form-item>
              <el-input v-model="scope.row.age" placeholder="请输入年龄"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="addRow(scope.$index)">添加行</el-button>
            <el-button type="text" @click="deleteRow(scope.$index)">删除行</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        rule: '',
      },
      rules: {
        rule: [{ required: true, message: '请输入规则名称', trigger: 'blur' }],
        'tableData.0.name': [{ required: true, message: '请输入名字', trigger: 'blur' }],
      },
      tableData: [{ name: '', age: '' }],
    };
  },
  methods: {
    addRow(index) {
      this.tableData.splice(index + 1, 0, { name: '', age: '' });
    },
    deleteRow(index) {
      this.tableData.splice(index, 1);
    },
    submitForm() {
      this.$refs.form.validate((valid) => {
        console.log(valid);
      });
    },
  },
};
</script>
