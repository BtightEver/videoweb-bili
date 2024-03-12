<template>
    <div class="comment-container">
        <div class="user-info">
            <el-avatar shape="circle" :size="40" fit="fill" :src="UserAvatar" />
            <span class="comment-userName">{{ comment.commentator }}</span>
            <div class="uid-time">
                <span class="comment-uid">{{ comment.uid }}</span>
                <span class="comment-createTime">{{ commentCreatTime }}</span>
            </div>
        </div>
        <span class="comment-content">{{ comment.content }}</span>
        <div class="button-container">
            <el-button v-if="showDeleteButton" type="danger" :icon="Delete" circle @click="DeleteComment" />
        </div>
    </div>
</template>

<script setup>
import request from '@/utils/request';
import { defineProps } from 'vue';
import { ElMessage } from 'element-plus';
import { ref, computed } from 'vue';
import { onMounted } from 'vue';
import { Delete } from '@element-plus/icons-vue'

const props = defineProps({
    comment: Object,         // 定义 comment 属性为object类型
    deleteComment: Function
});

let user = JSON.parse(localStorage.getItem("user"))
let commentCreatTime;
let UserAvatar = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png');


const DeleteComment = () => {
    request.get(`/Comment/deleteComment/${props.comment.cid}`).then(res => {       //向后端传参要用反单引号 `
        if (res.code === 200) {
            ElMessage({ type: 'success', message: '删除评论成功' });
            props.deleteComment();
        }
    }).catch(error => {
        console.error(error)
    })
};

const GetCommentUser = () => {
    request.get(`/User/getUserByUid/${props.comment.uid}`).then(res => {       //向后端传参要用反单引号 `
        if (res.code === 200) {
            UserAvatar.value = res.data.user.avatar;
        }
    }).catch(error => {
        console.error(error)
    })
};

const showDeleteButton = computed(() => {
    return user && user.uid === props.comment.uid;        // 在这里添加条件判断逻辑，返回一个布尔值来决定是否显示删除按钮，判断评论是不是目前登录用户评论的
});

const TimeTrans = (timestamp) => {
    // 创建一个新的 Date 对象，将时间戳作为参数传入
    const date = new Date(timestamp);

    // 使用 Date 对象的方法获取年、月、日信息
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 月份是从0开始的，需要加1
    const day = date.getDate();

    // 格式化日期输出
    const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
    commentCreatTime = formattedDate;
}

onMounted(() => {
    GetCommentUser();
    TimeTrans(props.comment.createTime);
});       //页面初始化时执行
</script>

<style>
.comment-container {
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
}

.user-info {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
}

.avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-right: 10px;
}

.comment-userName {
    font-weight: bold;
    color: darkcyan;
    font-size: 20px;
}

.uid-time {
    display: flex;
    align-items: center;
    padding-left: 10px;
}

.comment-uid {
    font-weight: bold;
    color: darkgoldenrod;
    font-size: 15px;
}

.comment-createTime {
    font-size: 12px;
    color: #999;
    margin-left: 10px;
}

.comment-content {
    font-weight: bold;
    color: black;
    padding-left: 40px;
}

.button-row {
    margin-right: 1000px;
    /* 左对齐按钮 */
}

.button-container {
    display: flex;
    justify-content: flex-end;
}
</style>