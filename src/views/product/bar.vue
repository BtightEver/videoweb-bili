<template>
    <div>
        <div class="top">
            <span>{{ product.name }}管理系统</span>
            <but></but>
        </div>
        <el-tabs type="border-card" stretch>
            <el-tab-pane label="产品介绍">
                <div class="title">
                    <span>产品介绍</span>
                    <div class="line"></div>
                </div>
                <div class="detail">
                    <p>{{ product.intro_de }}</p><img :src="product.intro_url">
                </div>
            </el-tab-pane>
            <el-tab-pane label="适用对象">
                <div class="title">
                    <span>适用对象</span>
                    <div class="line"></div>
                </div>
                <div class="detail">
                    <div class="fit" v-for="(item, index) in product.fits" :key="index">
                        <img :src="item.url"><span>{{ item.name }}</span>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="功能框架"><img :src="product.architecture"></el-tab-pane>
            <el-tab-pane label="案例">
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import But from '../product/but.vue'
import axios from 'axios'
import request from '@/utils/request'

var d = "针对小额贷款公司面临的挑战及业务模式，满足多种类信贷业务管理需求，结合小额贷款的监管要求及行业特点，广州帝隆科技股份有限公司为小额贷款公司量身锻造了一套全终端的小额贷款管理系统，有效地解决了小额贷款公司业务运营过程中面临的诸多挑战。通过数字营销、可视化流程管理，智能数据决策分析、强大的风控体系让您的业务更智慧更高效。基于银行系统架构设计，功能全面，多终端覆盖，提供PC+移动端（Android\iOS）全终端产品系统，快速交付，节约成本。"
export default {
    components: {
        But
    },
    data: function () {
        return {
            product: {
                name:''
            }
        }
    },
    methods: {
        submit() {
            this.dialogFormVisible = false;
            this.$message({
                type: 'success',
                message: '提交成功！'
            })
        }
    },
    created() {
        request.get(`/query/product1/${this.$route.params.id}`).then(res => {
            this.product = res
        }).catch(e => {
            console.log(e)
        })
    },
    watch: {
        $route: {
            handler() {
                axios({
                    method: 'get',
                    url: 'http://localhost:8088/query/product1',
                    params: {
                        id: this.$route.params.id
                    }
                }).then(res => {
                    console.log(res.data)
                    this.product = res.data
                })
            }
        }
    }
}
</script>

<style>
.top {
    background-image: url('../../assets/banner/Jerry.jpg');
    height: 400px;
    font-size: 35px;
}

.top>span {
    position: relative;
    top: 100px;
    left: 300px;
}

.title {
    display: flex;
    flex-direction: row;
    font-size: 30px;
    font-weight: 700;
}

.line {
    position: relative;
    top: 20px;
    left: 10px;
    width: 90%;
    border-top: #333 solid 1px;
}

.detail {
    display: flex;
    flex-direction: row;
}

.detail>p {
    width: 50%;
    line-height: 40px;
    color: #606266;
}

.detail>img {
    width: 50%;
}

.fit {
    align-items: center;
    text-align: center;
    width: 20%;
    margin: 10px;
}

.fit>img {
    width: 100%;
    border-radius: 10%;
}</style>