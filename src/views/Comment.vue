<template>
    <div class="bottom-input">
         <!-- 使用 v-for 遍历 commentList，并向 EveryComment 组件传递每个评论对象 comment -->
         <div class="comment-container">
            <ul>
                <EveryComment v-for="comment in commentList" :key="comment.id" :comment="comment" :deleteComment="DeleteComment"/>
            </ul>
        </div>
        <el-input
            placeholder="请输入内容"
            v-model="comment.content"
            clearable>
        </el-input>
        <el-row class="button-row">
            <el-button type="primary" round @click="publishComment">发表评论</el-button>
        </el-row>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { defineComponent } from 'vue';
import { onMounted } from 'vue';
import request from '@/utils/request';
import EveryComment from './EveryComment.vue';

    onMounted(() => {       //视图渲染时加载评论
        getCommentsByVideoId();
    });

    const ComTestComponent = defineComponent({          // 注册组件
        components: {
            EveryComment
        }
    });

    let comment = ref({ cid: '', uid: '', commentator: '', videoId: '', likes: 0, dislikes: 0, creatTime: new Date(), content: ''})
    let user = JSON.parse(localStorage.getItem("user"))
    let videoId = '123'
    let commentList = ref([])

    const getCommentsByVideoId =()=> {      // 获取视频评论
        request.get(`/Comment/getCommentsByVideoId/${videoId}`).then(res => {       //反单引号 
            //console.log("commentList："+JSON.stringify(res.data.commentList))
            commentList.value = res.data.commentList            //赋值需要加上 .value
        }).catch(error => {
            console.error(error)
        })
    }

    const getCommentsByUid =()=> {      // 获取用户评论
        request.get(`/Comment/getCommentsByVideoId/${comment.uid}`).then(res => {       //反单引号 

            commentList.value = res.data.commentList            //赋值需要加上 .value
        }).catch(error => {
            console.error(error)
        })
    }
    
    const publishComment =()=> {        //用户发表评论
        if(user != null){

            // 获取当前时间的毫秒数
            const currentTime = Date.now();
            comment.value.uid = user.uid
            comment.value.commentator = user.userName
            comment.value.videoId = '123'
            comment.value.cid = user.uid + '_' + '123' + "_" + currentTime

            request.post('/Comment/addComment', comment.value).then(res => {
                if(res.code === 200){
                    ElMessage({ type: 'success', message: '评论成功！' });
                    getCommentsByVideoId();
                }
            }).catch(error => {
                console.error(error)
            })
        }
        else {
            ElMessage({ type: 'error', message: '请登录后评论！' });
        }
    }

    const DeleteComment =()=> {     //删除评论后重新渲染视图
        getCommentsByVideoId();
    }

</script>

<style>
.bottom-input {
    position: fixed;
    bottom: 100;
    left: 0;
    width: 99%;
    padding: 10px;
    background-color: #f5f5f5;
}
.button-row {
    margin-left: 95%; /* 添加按钮和输入框之间的间距 */
}
.highlighted {
    background-color: #f9f9f9; /* 添加高亮背景色 */
    padding: 5px;
    margin-bottom: 5px;
    border-radius: 5px;
}
.comment-container {
    max-height: 750px; /* 设置最大高度 */
    overflow-y: auto; /* 启用垂直滚动条 */
}
</style>