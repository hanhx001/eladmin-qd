<template>
  <div style="width:1100px;position:relative;">
    <div class="sort">{{(cindex+1) + '.'}}</div>
    <div class="template-create" ref="temp">
      <div class="input-list">
        <div class="select-active">
          <div>选项标题:</div>
          <el-input
            type="text"
            placeholder="请输入标题"
            v-model="textTitle"
            @input="inputTitle(textTitle)"
          ></el-input>
        </div>
        <div class="select-active">
          <div>选项描述:</div>
          <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入描述"
            @input="inputArea(textarea)"
            v-model="textarea"
          ></el-input>
        </div>
        <div class="select-active">
          <div>链接:</div>
          <el-input type="text" placeholder="请输入链接" v-model="textLink" @input="inputLink(textLink)"></el-input>
        </div>
      </div>
      <div class="upLoader">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :limit="1"
          list-type="picture"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </div>
      <div class="clear"></div>
      <div class="el-icon-close" @click="close(cindex)"></div>
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  name: "Temp",
  props: {
    cindex: {
      type: Number,
      default: ""
    }
  },
  computed: {
    ...mapGetters(["imagesUploadApi"])
  },
  data() {
    return {
      textarea: "",
      textTitle: "",
      textLink: "",
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ]
    };
  },
  mounted() {},
  methods: {
    handleRemove(file, fileList) {
      console.log( file, fileList )
    },
    handlePreview(file) {
      console.log  (file)
    },
    close(item) {
      this.$emit( "parsetemp", item )
    },
    inputTitle() {
      console.log( this.textTitle )
      this.$emit( "inputtitle", this.textTitle )
    },
    inputArea() {
      console.log( this.textarea )
      this.$emit( "inputarea", this.textarea )
    },
    inputLink() {
      this.$emit( "inputlink", this.textLink )
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
</style>