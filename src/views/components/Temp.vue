<template>
  <div style="width:1100px;position:relative;">
    <div class="sort" v-show="cchecked">{{(cindex+1) + '.'}}</div>
    <div class="template-create" ref="temp">
      <div class="input-list">
        <div class="select-active">
          <div>选项标题:</div>
          <el-input
            type="text"
            placeholder="请输入标题"
            v-bind:value="text.name"
            @input="inputTitle"
          ></el-input>

        </div>
        <div class="select-active">
          <div>选项描述:</div>
          <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入描述"
            @input="inputArea"
            v-bind:value="text.description"
          ></el-input>
        </div>
        <div class="select-active">
          <div>链接:</div>
          <el-input type="text" placeholder="请输入链接" v-bind:value="text.url" @input="inputLink"></el-input>
        </div>
      </div>
      <div class="upLoader">
        <!--<el-upload
          class="upload-demo"
          :action="updateVote + '?name='"
          :headers="headers"
          :before-upload="beforeUpload"
          :on-success="handleSuccess"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :limit="1"
          :multiple="false"
          :file-list="fileList"
          list-type="picture"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过5M</div>
        </el-upload> -->

        <el-upload
          class="avatar-uploader"
          :action="updateVote + '?name='"
          :headers="headers"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="text.appfilepath" :src="text.appfilepath" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <div class="clear"></div>
      <div class="el-icon-close" @click="close(cindex)"></div>
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import { getToken } from '@/utils/auth';
import {update, updatedEdit, updatedEel} from "@/api/vote";

export default {
  name: "Temp",
  props: {
    cindex: {
      type: Number,
      default: ""
    },
    cchecked: {
      type: Boolean,
      default: false
    },
    citem: {
      type: Array,
      default: function() {
        return Array
      }
    }
  },
  computed: {
    ...mapGetters(["imagesUploadApi", "updateVote", "baseApi"])
  },
  data() {
    return {
      text: {
        name: this.citem[this.cindex].name,
        description: this.citem[this.cindex].description,
        url: this.citem[this.cindex].url,
        appfilepath: this.citem[this.cindex].appfilepath,
        id: this.citem[this.cindex].id
      },
      index: this.cindex,
      headers: { 'Authorization': 'Bearer ' + getToken() },
      fileList: [],
      imageUrl: ''
    };
  },
  watch: {
    text(newV, oldV) {
        this.$emit('uploadData', {index: this.cindex, data: newV})
    },
    citem(newV, oldV) {
        if (newV.length !== 0) {
          this.text = {...newV[this.cindex]}
        }
    }
  },
  methods: {
    beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 5;
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M;
    },
    handleAvatarSuccess(response, file) {
      this.dialog = false
      this.text.appfilepath = this.baseApi + '/file/' + response.webpath
      this.$emit( "updateimg", {url: this.text.appfilepath, idx: this.index})
    },
    // handleSuccess(response, file, fileList) {
    //   console.log(response, file, fileList, this.baseApi)
    //   this.dialog = false
    //   this.text.picUrl = this.baseApi + '/file/' + response.webpath
    //   this.$emit( "updateimg", {url: this.text.picUrl, idx: this.index})
    // },
    // handleRemove(file, fileList) {
    //   console.log( file, fileList, 'remove' )
    //   this.text.picUrl = ''
    //   this.$emit( "updateremoveimg", {url: this.text.picUrl, idx: this.index})
    // },
    // handlePreview(file) {
    //   console.log(file, 'preview')
    // },
    close(item) {
      this.$emit( "parsetemp", {url: this.cindex, idx: this.index})
    },
    inputTitle(val) {
      this.text.name = val
      this.$emit( "inputtitle", {title: this.text.name, idx: this.index})
    },
    inputArea(val) {
      this.text.description = val
      this.$emit( "inputarea", {area:this.text.description, idx: this.index} )
    },
    inputLink(val) {
      this.text.url = val
      this.$emit( "inputlink", {url:this.text.url, idx: this.index})
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.sort {
  width: 20px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 33;
}
.template-create {
  position: relative;
  width: 1000px;
  background: #bbbbbb;
  padding-bottom: 20px;
  margin-top: 20px;
  margin-left: 20px;
  border-radius: 6px;
  z-index: 22;
  .input-list {
    width: 60%;
    margin-left: 20px;
    float: left;
    .select-active {
      padding-top: 15px;
    }
  }
  .upLoader {
    width: 30%;
    margin-top: 40px;
    padding-right: 20px;
    text-align: center;
    float: right;
  }
  .el-icon-close {
    position: absolute;
    top: -19px;
    right: -20px;
    font-size: 40px;
    font-weight: bold;
    color: #757171;
    z-index: 23;
  }
}
.clear {
  clear: both;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>