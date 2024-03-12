<template>
    <div>
        <el-button type="text" round @click="dialogFormVisible = true" class="mybutton">申请试用</el-button>
        <el-dialog title="在线体验" v-model="dialogFormVisible">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="适用系统">
                    <el-input v-model="product.name" disabled></el-input>
                </el-form-item>
                <el-form-item label="公司名称">
                    <el-input v-model="form.company"></el-input>
                </el-form-item>
                <el-form-item label="用户姓名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="联系电话">
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios';
import { nanoid } from 'nanoid'
import request from '@/utils/request';

export default {
    data: function () {
        return {
            dialogFormVisible: false,
            form: {
                id: -1,
                company: '',
                name: '',
                phone: ''
            },
            product: null
        }
    },
    methods: {
        submit() {
            axios({
                method: 'post',
                url: 'http://localhost:8088/submit',
                data:{
                    id: nanoid(15),
                    user_id: JSON.parse(localStorage.getItem("user")).uid,
                    pro_id: this.product.id,
                    pro_name: this.product.name,
                    company: this.form.company,
                    name: this.form.name,
                    tel: this.form.phone
                }
            }).then(res => {
                console.log(res)
                this.dialogFormVisible = false;
                this.$message({
                    type: 'success',
                    message: '提交成功！'
                })
            }).catch(r=>{
                console.log(r)
            })
        }
    },
    created() {
        request.get(`/query/product1/${this.$route.params.id}`).then(res => {
            console.log("==="+JSON.stringify(res))
            this.product = res
        }).catch(e => {
            console.log(e)
        })
    }
}
</script>

<style>
.mybutton {
    /*position: relative;*/
    position: absolute;
    height: 55px;
    width: 150px;
    font-size: 20px;
    left: 320px;
    top: 270px;
    background-color: orangered;
    color: aliceblue;
}

.mybutton:hover {
    background-color: rgb(253, 143, 103);
    color: aliceblue;
}
</style>