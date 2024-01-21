<!-- 表单嵌套表格 -->
<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="场景">
        <el-table :data="form.list" border>
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-table :data="props.row.ruleList" border style="padding: 10px">
                <el-table-column prop="rule" label="规则">
                  <template slot-scope="scope">
                    <el-form-item
                      :prop="'list.' + props.$index + '.ruleList.' + scope.$index + '.sence'"
                      :rules="rules.rule"
                    >
                      <el-input v-model="scope.row.rule" size="mini" style="width: 140px"></el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column prop="id" label="序号" width="60"></el-table-column>
          <el-table-column prop="sence" label="场景">
            <template slot-scope="scope">
              <el-form-item :prop="'list.' + scope.$index + '.sence'" :rules="rules.sence">
                <el-input v-model.trim="scope.row.sence" size="mini" style="width: 120px"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="operation" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="onAdd(scope.row, scope.$index)">新增</el-button>
              <el-button size="mini" @click="onDelete(scope.row, scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        list: [{ id: 1, sence: '', ruleList: [{ rule: '' }] }],
      },
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        sence: [{ required: true, message: '请输入场景', trigger: 'blur' }],
        rule: [{ required: true, message: '请输入规则', trigger: 'blur' }],
      },
    };
  },
  methods: {
    onAdd() {
      this.form.list.push({ id: this.form.list.length + 1, sence: '' });
    },
    onDelete(row, index) {
      this.form.list.splice(index, 1);
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log(this.form);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
::v-deep .el-table__cell {
  padding: 6px 0px;
}

// 改变error位置
// ::v-deep .cell {
//   .el-form-item__error {
//     top: 50%;
//     transform: translateY(-50%);
//     left: 126px;
//   }
// }

::v-deep .cell {
  display: flex;
  height: 64px;
  align-items: center;

  .el-form-item__content {
    line-height: 34px;
  }
  .el-form-item__error {
    padding: 0;
  }
}
</style>
