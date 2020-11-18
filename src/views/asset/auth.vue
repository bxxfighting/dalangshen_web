<template>
  <div v-loading="loading" class="app-container">
    <el-card>
      <div slot="header">
        <span> 请输入密钥 </span>
      </div>
      <div>
        <el-form ref="form" :model="form">
          <el-form-item label="密钥">
            <el-input v-model="form.key" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="go">
              进入
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Auth',
  data() {
    return {
      loading: false,
      form: {
        key: '',
        show: false,
        status: 'create'
      }
    }
  },
  methods: {
    go() {
    }
  }
}
</script>
