<template>
  <div class="Message-View">
    <div class="Message-title"><h1>我的消息</h1></div>
    <el-divider />
    <div class="Message-layout">
      <el-container class="box">
        <el-aside width="150px" class="user-list">
          <div
            v-for="(sedList, index) in sendData"
            :key="sedList.id"
            :class="index != active_index ? 'sed-message-item' : 'sed'"
            @click="openMessage(sedList.uidSed, sedList.uidRec, index)"
          >
            <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" alt="头像" style="width: 40px; height: 40px "/>
            <div style="margin-left:15px;">{{ sedList.uidSed }}</div>
          </div>
        </el-aside>
        <el-container v-show="isShow">
          <el-main>
            <div class="Message-list">
              <div
                v-for="message in messageData"
                :key="message.id"
                class="message-item"
              >
                <div class="message-send">{{ message.uidSed }}:</div>
                <div class="message-content">
                  <div class="message-text">{{ message.message }}</div>
                  <div class="message-time">{{ message.time }}</div>
                </div>
              </div>
            </div>
          </el-main>
          <el-footer class="footer">
            <el-input
              v-model="textarea"
              style="width: 600px"
              :rows="2"
              type="textarea"
              placeholder="Please input"
            />
            <el-button
              @click="
                sendMessage(
                  messageData[0].uidRec,
                  messageData[0].uidSed,
                  textarea
                )
              "
              type="primary"
              style="margin-right: 80px"
              >发送消息</el-button
            >
          </el-footer>
        </el-container>
      </el-container>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";

export default {
  name: "MessageView",
  data: function () {
    return {
      sendData: [],
      messageData: [],
      textarea: "",
      isShow: false,
      active_index: -1,
    };
  },
  created() {
    this.fetchSendData();
  },
  methods: {
    fetchSendData() {
      axios
        .get("http://localhost:8088/UserMessage/getSedList/02")
        .then((response) => {
          this.sendData = response.data.data.sedList;
          console.log("111");
          console.log(this.sendData);
        })
        .catch((error) => {
          console.error("Error fetching Send data: ", error);
        });
    },
    openMessage(uidSed, uidRec, index) {
      if (this.active_index != index) {
        this.active_index = index;
        this.isShow = true;
      } else {
        this.active_index = -1;
        this.isShow = false;
      }
      this.fetchMessageData(uidSed, uidRec);
    },
    TimeTrans(timestamp) {
      // 创建一个新的 Date 对象，将时间戳作为参数传入
      const date = new Date(timestamp);

      // 使用 Date 对象的方法获取年、月、日、时、分、秒信息
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // 月份是从0开始的，需要加1
      const day = date.getDate();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();

      // 格式化日期输出，确保月、日、时、分、秒小于10时前面补0
      const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${
        day < 10 ? "0" + day : day
      } ${hours < 10 ? "0" + hours : hours}:${
        minutes < 10 ? "0" + minutes : minutes
      }:${seconds < 10 ? "0" + seconds : seconds}`;
      return formattedDate;
    },
    fetchMessageData(uidSed, uidRec) {
      axios
        .get(
          `http://localhost:8088/UserMessage/getMessageList/${uidSed}/${uidRec}`
        )
        .then((response) => {
          this.messageData = response.data.data.messageList;
          for (let i = 0; i < response.data.data.messageList.length; i++) {
            this.messageData[i].time = this.TimeTrans(this.messageData[i].time);
          }
          console.log(this.messageData);
        })
        .catch((error) => {
          console.error("Error fetching Message data: ", error);
        });
    },
    sendMessage(uidSed, uidRec, message) {
      const currentTime = Math.floor(Date.now() / 1000); // 获取当前时间戳（精确到秒）

      // 构造要发送的数据
      const data = {
        uidSed: uidSed,
        uidRec: uidRec,
        message: message,
        time: currentTime,
      };
      const url = `http://localhost:8088/UserMessage/addMessage/${uidSed}/${uidRec}/${message}`;

      // 调用后端接口发送数据
      axios
        .post(url, data)
        .then((response) => {
          // 在成功响应后可以根据需要进行一些操作
          this.fetchMessageData(uidSed, uidRec); // 刷新消息列表
          console.log("Message sent successfully");
          // 清空输入框内容
          this.textarea = "";
        })
        .catch((error) => {
          console.error("Error sending message: ", error);
        });
    },
  },
};
</script>
<script setup>
</script>
<style scoped>
.sed-message-item {
  border: 1px solid #ccc; /* 添加边框样式 */
  padding: 10px; /* 添加内边距 */
  margin-bottom: 0px; /* 为元素之间添加一些间距 */
  background-color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.sed-message-item:hover {
  background-color: #e4e5e6;
}

.sed {
  border: 1px solid #ccc; /* 添加边框样式 */
  padding: 10px; /* 添加内边距 */
  margin-bottom: 0px; /* 为元素之间添加一些间距 */
  background-color: #e4e5e6;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.Message-list {
  display: flex;
  flex-direction: column; /* 垂直方向排列 */
}

.message-item {
  display: flex;
  justify-content: space-between; /* 左右分布 */
  border-bottom: 1px solid #ccc; /* 添加下方横线 */
  padding-bottom: 10px; /* 添加一些底部间距 */
}
.message-container {
  display: flex;
  justify-content: space-between;
}
.message-send {
  width: 50px;
}
.message-content {
  flex: 1;
  display: flex;
  justify-content: space-between;
}
.message-text {
  text-align: left; /* 将文本内容左对齐 */
  color: #315c9e;
  font-weight: 500;
  font-size: 14px;
}
.message-time {
  text-align: right;
  color: #a1adc5;
  font-size: 14px;
  margin-left: 16px;
}

.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  bottom: 0px;
  justify-content: space-between;
}

.box {
  height: 390px;
}
</style>