<template>
  <el-dialog :title="titleMap[status]" :visible.sync="visible" :close-on-click-modal="false" @open="open" @close="$emit('update:show', false)">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" />
        <el-button @click="genPassword">
          生成密码
        </el-button>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="opObj">确定</el-button>
        <el-button @click="cancelDialog">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import {
  createAssetApi as createObjApi,
  updateAssetApi as updateObjApi,
  getAssetApi as getObjApi
} from '@/api/system/asset'
import {
  encrypt,
  decrypt
} from '@/utils/crypto'
import {
  genPassword
} from '@/utils/password'
import { enc } from 'crypto-js/core'
export default {
  name: 'FormDialog',
  props: {
    objId: {
      type: String,
      default: null
    },
    status: {
      required: true,
      type: String
    },
    show: {
      type: Boolean,
      default: false
    },
    salt: {
      type: String,
      default: '123'
    }
  },
  data() {
    return {
      loading: false,
      visible: this.show,
      titleMap: {
        create: '创建',
        update: '编辑'
      },
      form: {
        name: '',
        password: '',
        remark: ''
      },
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  watch: {
    show: function() {
      this.visible = this.show
    }
  },
  methods: {
    open() {
      this.$nextTick(() => {
        this.$refs['form'].clearValidate()
      })
      this.resetForm()
      if (this.status === 'update') {
        this.getObj()
      }
    },
    getObj() {
      this.loading = true
      const data = {
        obj_id: parseInt(this.objId)
      }
      getObjApi(data).then(resp => {
        if (resp.code === 0) {
          this.form = resp.data
          const password = resp.data.password
          this.form.password = decrypt(password)
        }
        this.loading = false
      })
    },
    resetForm() {
      this.form.name = ''
      this.form.password = ''
      this.form.remark = ''
    },
    cancelDialog() {
      this.$emit('update:show', false)
    },
    opObj() {
      if (this.status === 'create') {
        this.createObj()
      } else if (this.status === 'update') {
        this.updateObj()
      }
    },
    createObj() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          const data = Object.assign({}, this.form)
          console.log(data)
          console.log('salt: ', this.salt)
          data['password'] = encrypt(this.form.password, this.salt)
          console.log(data)
          createObjApi(data).then(resp => {
            if (resp.code === 0) {
              this.$emit('update:show', false)
              this.$notify({
                message: '操作成功',
                type: 'success',
                duration: 2000
              })
              this.$emit('success')
            }
            this.loading = false
          })
        }
      })
    },
    updateObj() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          const data = this.form
          data['obj_id'] = parseInt(this.objId)
          data['password'] = encrypt(this.form.password, this.salt)
          updateObjApi(data).then(resp => {
            if (resp.code === 0) {
              this.$emit('update:show', false)
              this.$notify({
                message: '操作成功',
                type: 'success',
                duration: 2000
              })
              this.$emit('success')
            }
            this.loading = false
          })
        }
      })
    },
    genPassword() {
      this.form.password = genPassword(10, 'complex')
    }
  }
}
</script>
