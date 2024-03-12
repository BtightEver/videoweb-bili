<template>
    <div>
        <div style="display: flex; flex-direction: row; padding: 10px;">
            <div class="left" style="padding: 10px;">
                <span class="title">{{ product.name }}解决方案</span>
                <p style="font-size: 18px; line-height: 40px; color: #888888;">{{ product.intro_de }}</p>
                <but></but>
            </div>
            <img :src="product.intro_url" style="width: 40%;">
        </div>
        <div v-for="(item, index) in product.proIntros" :key="index" style="margin: 0px 20px;">
            <div class="box">
                <span style="font-size: 40px;">{{ item.title }}</span>
                <p style="line-height: 40px;">{{ item.detail }}</p>
            </div>
            <img :src="item.url" style="width: 100%;">
        </div>
    </div>
</template>

<script>
import But from '../but.vue'
import axios from 'axios'
export default {
    components: {
        But
    },
    data: function () {
        return {
            product: null
        }
    },
    created() {
        console.log("ok")
        axios({
            method: 'get',
            url: 'http://localhost:8088/query/product2',
            params: {
                id: this.$route.params.id
            }
        }).then(res => {
            console.log(res.data)
            this.product = res.data
        }).catch(e => {
            console.log(e)
        })
    },
    watch: {
        $route: {
            immediate: true,
            deep: true,
            handler(newO, oldO) {
                console.log(newO + " changed " + oldO)
                axios({
                    method: 'get',
                    url: 'http://localhost:8088/query/product2',
                    params: {
                        id: this.$route.params.id
                    }
                }).then(res => {
                    console.log(res.data)
                    this.product = res.data
                }).catch(e => {
                    console.log(e)
                })
            }
        }
    }
}
</script>

<style>
.left {
    width: 60%;
}

.box {
    width: 30%;
    background-color: #007eef;
    position: relative;
    left: 700px;
    top: 400px;
    color: white;
    padding: 40px;
    border-radius: 10%;
}
</style>