<template>
  <div id="app">
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item label="规则">
        <el-table :data="form.datas" highlight-current-row style="width: 100%">
          <el-table-column prop="id" label="序号" width="60"></el-table-column>

          <el-table-column prop="name" label="姓名">
            <template slot-scope="scope">
              <template v-if="scope.row.action == 'view'">
                {{ scope.row.name }}
              </template>
              <template v-else>
                <el-form-item :prop="'datas.' + scope.$index + '.name'" :rules="rules.name">
                  <el-input v-model.trim="scope.row.name" size="mini" style="width: 120px"></el-input>
                </el-form-item>
              </template>
            </template>
          </el-table-column>

          <el-table-column prop="name" label="年龄">
            <template slot-scope="scope">
              <template v-if="scope.row.action == 'view'">
                {{ scope.row.age }}
              </template>
              <template v-else>
                <el-form-item :prop="'datas.' + scope.$index + '.age'" :rules="rules.age">
                  <el-input v-model.number="scope.row.age" size="mini" style="width: 60px"></el-input>
                </el-form-item>
              </template>
            </template>
          </el-table-column>

          <el-table-column prop="operation" label="操作">
            <template slot-scope="scope">
              <template v-if="scope.row.action == 'view'">
                <el-button size="mini" @click="click_edit(scope.row, scope.$index)">编辑</el-button>
                <el-button size="mini" @click="click_delete(scope.row, scope.$index)">删除</el-button>
              </template>
              <template v-else-if="scope.row.action == 'add'">
                <el-button size="mini" @click="click_add(scope.row, scope.$index)">新增</el-button>
                <el-button size="mini" @click="click_reset(scope.row, scope.$index)">重置</el-button>
              </template>
              <template v-else>
                <el-button size="mini" @click="click_save(scope.row, scope.$index)">保存</el-button>
                <el-button size="mini" @click="click_cancle(scope.row, scope.$index)">取消</el-button>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script></script>
<script>
export default {
  data() {
    return {
      form: {
        datas: [
          { id: 1, name: '张三', age: 20 },
          { id: 2, name: '李四', age: 32 },
        ],
      },

      //表单验证规则
      rules: {
        name: [
          {
            type: 'string',
            required: true,
            trigger: 'blur',
            message: '请输入姓名',
          },
        ],
        age: [
          {
            type: 'number',
            required: true,
            trigger: 'blur',
            message: '请输入年龄',
          },
          {
            type: 'number',
            trigger: 'blur',
            min: 0,
            max: 120,
            message: '年龄最小0，最大120',
          },
        ],
      },
    };
  },

  created() {
    //处理数据，为已有数据添加action:'view'
    this.form.datas.map((item) => {
      this.$set(item, 'action', 'view');
      return item;
    });

    //再插入一条添加操作的数据
    this.form.datas.unshift({
      id: undefined,
      name: undefined,
      age: undefined,
      action: 'add',
    });
  },

  methods: {
    //对部分表单字段进行校验
    validateField(form, index) {
      let result = true;
      for (let item of this.$refs[form].fields) {
        if (item.prop.split('.')[1] == index) {
          this.$refs[form].validateField(item.prop, (error) => {
            if (error != '') {
              result = false;
            }
          });
        }
        if (!result) break;
      }
      return result;
    },

    //对部分表单字段进行重置
    resetField(form, index) {
      this.$refs[form].fields.forEach((item) => {
        if (item.prop.split('.')[1] == index) {
          item.resetField();
        }
      });
    },

    //新增操作
    click_add(item, index) {
      if (!this.validateField('form', index)) return;
      //模拟新增一条数据
      let itemClone = JSON.parse(JSON.stringify(item));
      itemClone.id = this.form.datas.length;
      itemClone.action = 'view';
      this.form.datas.push(itemClone);
      this.resetField('form', index);
    },

    //新增-重置操作
    click_reset(item, index) {
      this.resetField('form', index);
    },

    //编辑-保存操作
    click_save(item, index) {
      if (!this.validateField('form', index)) return;
      item.action = 'view';
    },

    //编辑-取消操作
    click_cancle(item, index) {
      this.resetField('form', index);
      item.action = 'view';
    },

    //编辑操作
    click_edit(item, index) {
      item.action = 'edit';
    },

    //删除操作
    click_delete(item, index) {
      this.$confirm('确定删除该条数据(ID' + item.id + ')吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          //模拟删除一条数据
          this.form.datas.splice(index, 1);
        })
        .catch(() => {});
    },

    submitForm() {
      this.$refs.form.validate((valid) => {
        console.log(valid);
      });
    },
  },
};
</script>

<style>
.el-table .cell {
  overflow: visible;
}
.el-form-item {
  margin-bottom: 0;
}
.el-form-item__error {
  padding-top: 0;
  margin-top: -3px;
}
</style>
