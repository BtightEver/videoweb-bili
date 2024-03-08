<template>
    <div class="comment-container">
        <div class="user-info">
            <img :src="commentUser.avatar" class="avatar" alt="userAvatar">
            <span class="comment-userName">{{ comment.commentator }}</span>
            <span class="comment-uid">{{ comment.uid }}</span>
        </div>
            <span class="comment-content">{{ comment.content }}</span>
        <div class="comment-footer">
            <span class="comment-time">{{ comment.createtime }}</span>
            <el-row v-if="showDeleteButton" class="button-row">
                <el-button type="primary" size="mini" @click="DeleteComment">删除评论</el-button>
            </el-row>
        </div>
    </div>
</template>

<script setup>
import request from '@/utils/request';
import { defineProps } from 'vue';
import { ElMessage } from 'element-plus';
import { ref, computed } from 'vue';
import { onMounted } from 'vue';

const props = defineProps({
    comment: Object,         // 定义 comment 属性为对象类型
    deleteComment: Function
});

    let user = JSON.parse(localStorage.getItem("user"))
    let commentUser = ref(JSON.parse(localStorage.getItem("user")));
    

    const DeleteComment =()=>{
        request.get(`/Comment/deleteComment/${props.comment.cid}`).then(res => {       //向后端传参要用反单引号 `
            if(res.code === 200){
                ElMessage({ type: 'success', message: '删除评论成功' });
                props.deleteComment();
            }
        }).catch(error => {
            console.error(error)
        })
    };

    const GetCommentUser =()=>{
        request.get(`/User/getUserByUid/${props.comment.uid}`).then(res => {       //向后端传参要用反单引号 `
            if(res.code === 200){
                commentUser.value = res.data.user;
            }
        }).catch(error => {
            console.error(error)
        })
    };

    const showDeleteButton = computed(() => {
        return user && user.uid === props.comment.uid;        // 在这里添加条件判断逻辑，返回一个布尔值来决定是否显示删除按钮，判断评论是不是目前登录用户评论的
    });

    onMounted(() => {
        GetCommentUser();
    });       //页面初始化时执行
</script>

<style>
.comment-container {
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
}

.user-info {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
}

.avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
}

.comment-userName {
    font-weight: bold;
    color: darkcyan;
    font-size: 20px;
}

.comment-uid {
    font-weight: bold;
    color: darkgoldenrod;
    font-size: 15px;
    padding-left: 10px;
}

.comment-content {
    font-weight: bold;
    color: black;
    padding-left: 40px;
}

.comment-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.comment-time {
    font-size: 12px;
    color: #999;
}

.button-row {
    margin-left: 95%; /* 添加按钮和输入框之间的间距 */
}
</style>
