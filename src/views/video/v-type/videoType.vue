<template>
    <el-container>
        <el-header height="80px">{{ $route.params.id }}</el-header>
        <el-main>
            <div class="box">
                <div v-for="item in videos" :key="item.id">
                    <router-link :to="'/videos/' + item.id" style="text-decoration: none;">
                        <div class="image">
                            <img :src="item.cover">
                            <p>{{ item.title }}</p>
                        </div>
                    </router-link>
                </div>
            </div>
        </el-main>
    </el-container>
</template>

<script>
import router from '@/router'
import axios from 'axios'
export default {
    data: function () {
        return {
            type: this.$route.params.id,
            videos: [],
        }
    },
    methods: {
        // navi() {
        //     router.push({path: '/videos/:video'})
        // }
    },
    created() {
        axios({
            method: 'get',
            url: 'http://localhost:8088/query/videos',
            params: {
                type: this.$route.params.id
            }
        }).then(res => {
            console.log(res)
            this.videos = res.data
        })
    },
    watch: {
        $route: {
            handler() {
                axios({
                    method: 'get',
                    url: 'http://localhost:8088/query/videos',
                    params: {
                        type: this.$route.params.id
                    }
                }).then(res => {
                    console.log(res)
                    this.videos = res.data
                })
            }
        }
    }

}
</script>

<style>
.el-header {
    vertical-align: center;
    text-align: center;
    font-size: 50px;
    border-bottom: solid 1px #409EFF;
}

.box {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.image {
    align-items: center;
    text-align: center;
    margin: 20px 20px;
}

.image>img {
    width: 200px;
    height: auto;
    border-radius: 10%;
    transition: all 0.3s ease;
}

.image>img:hover {
    transform: scale(1.2);
}

.image>p:hover {
    color: #409EFF;
}
</style>