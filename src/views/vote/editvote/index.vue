<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="创建主题" name="first">
        <el-row>
          <el-col :span="12">
              <div class="grid-content bg-purple-dark editor-active">
                <div>投票活动标题:</div>
                <el-input
                  class="input-title"
                  type="text"
                  placeholder="请输入内容"
                  v-model="text"
                  maxlength="128"
                  show-word-limit
                >
                </el-input>
              </div>
          </el-col>

          <el-col :span="18">
            <div class="editor-active">
              <div>投票活动描述:</div>
              <div ref="editorActive" style="text-align:left;margin: 5px;margin-left:0px;"></div>
            </div>
          </el-col>
          <el-col :span="18">
            <div class="editor-active">
                <div>完成投票显示信息:</div>
                <div ref="editorInfo" style="text-align:left;margin: 5px;margin-left:0px;"></div>           
            </div>
          </el-col>
          <el-col :span="20"><div style="height:30px;"></div></el-col>
          <el-col :span="4">
            <div class="button-next">
              <el-button type="primary" @click="nextFrist">下一步</el-button>
            </div>
          </el-col>
        </el-row>

      </el-tab-pane>
      <el-tab-pane label="投票选项" name="second">
        <div><el-checkbox v-model="checked">启用编号</el-checkbox></div>
       <!-- <div class="template-create">
            <div class="input-list">
              <div class="select-active">
                <div>选项标题:</div>
                <el-input
                      type="text"
                      placeholder="请输入标题"
                      v-model="text"
                    >
                </el-input>
              </div>
              <div class="select-active">
                <div>选项描述:</div>
                <el-input
                  type="textarea"
                  :rows="3"
                  placeholder="请输入描述"
                  v-model="textarea">
                </el-input>
              </div>
              <div class="select-active">
                  <div>链接:</div>
                  <el-input
                        type="text"
                        placeholder="请输入链接"
                        v-model="text"
                      >
                  </el-input>
              </div>
            </div>
            <div class="upLoader">
               <el-upload
                :on-preview="handlePictureCardPreview"
                :before-remove="handleBeforeRemove"
                :on-success="handleSuccess"
                :on-error="handleError"
                :headers="headers"
                :file-list="fileList"
                :action="imagesUploadApi"
                list-type="picture-card">
                <i class="el-icon-plus"/>
              </el-upload>
            </div>
            <div class="clear"></div> 
            </div>-->

           
            <Temp rel="test"  v-for="(item,index) in counter" :key="index" @parsetemp="closeindex"  v-bind:cindex="index"></Temp>
            
        
        <el-row>
          <div class="elRow">
            <el-col :span="18">
              <el-button type="info" @click="addOptions">增加选项</el-button>
            </el-col>
            <el-col :span="6">
              <el-button type="primary" @click="prevSecond">上一步</el-button>
              <el-button type="primary" @click="nextSecond">下一步</el-button>
            </el-col>
          </div>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="功能设置" name="third">
        
        <el-row>
          <el-col>
            <div class="vote-date">投票时间设置:
                <span></span>
                <el-date-picker
                  class="picker"
                  v-model="date"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="timestamp"
                  :picker-options="pickerOptions">
                </el-date-picker>
             
            </div>
            <div>
              <div class="vote-radio">投票选项设置:
                <span></span>
                <el-radio v-model="radio" label="单选">单选</el-radio>
                <el-radio v-model="radio" label="多选">多选</el-radio>
                <el-radio v-model="radio" label="一键投票">一键投票</el-radio>
              </div>
            </div>
            <div>
              <div class="vote-layout">
                <div>排版设置:</div>
                <div class="pc">
                  <span style="padding-right:30px;">pc端每行显示</span>
                    <el-radio v-model="PCradio" label="1">1</el-radio>
                    <el-radio v-model="PCradio" label="2">2</el-radio>
                    <el-radio v-model="PCradio" label="3">3</el-radio>
                    <el-radio v-model="PCradio" label="4">4</el-radio>
                    <el-radio v-model="PCradio" label="5">5</el-radio>
                  <div class="mobile">
                    <span style="padding-right:17px;">移动端每行显示</span>
                      <el-radio v-model="Mradio" label="1">1</el-radio>
                      <el-radio v-model="Mradio" label="2">2</el-radio>
                      <el-radio v-model="Mradio" label="3">3</el-radio>
                      <el-radio v-model="Mradio" label="4">4</el-radio>
                      <el-radio v-model="Mradio" label="5">5</el-radio>
                  </div>
                </div>

                <div class="clear"></div>
              </div>
              <div class="clear"></div>
            </div>
            <div class="vote-ip">
              <span>IP限制:</span>
              <el-select v-model="valueIP" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <div class="clear"></div>
            </div>
          </el-col>
        </el-row>

        <div class="vote-btn">
          <el-button type="primary" @click="prevThird">上一步</el-button>
          <el-button type="primary" @click="nextThird">下一步</el-button>
        </div>

      </el-tab-pane>
      <el-tab-pane label="发布设置" name="fourth">
        <el-row>
          <el-col :span="18">
            <div class="vote-copy">
              <span>系统自动生成地址:</span>
              <span>{{address}}</span>
              <el-button @click='handleCopy(address,$event)'>复制地址</el-button>
            </div>
          </el-col>
          <el-col :span="18">
            <div class="vote-address">
              <span>投票活动地址设置:</span>
              <el-input
                    class="address"
                    type="text"
                    placeholder="请输入地址"
                    v-model="voteAddress"
              >
              </el-input>
            </div>
          </el-col>
        </el-row>
        <div class="complete-btn">
          <el-button type="primary" @click="prevFourth">上一步</el-button>
          <el-button type="primary" @click="complete">完成</el-button>
        </div>

      </el-tab-pane>
    </el-tabs>


  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import E from 'wangeditor'
import { getToken } from '@/utils/auth'

import { add, edit } from '@/api/vote'
import Treeselect from '@riophae/vue-treeselect'
import clip from '@/utils/clipboard'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import Temp from '../../components/Temp'
/*
var temp = '';
    temp = '<div class="template-create">' +
               '<div class="input-list">' +
                     '<div class="select-active">' +
                      '<div>选项标题:</div>' +
                      '<el-input type="text" placeholder="请输入标题" v-model="text"></el-input>' +
                  '</div>' +
                   '<div class="select-active">' +
                        '<div>选项描述:</div>' +
                      '<el-input type="textarea" :rows="3" placeholder="请输入描述" v-model="textarea"></el-input>' +
                    '</div>' +
                    '<div class="select-active">' +
                        '<div>链接:</div>' +
                        '<el-input type="text" placeholder="请输入链接" v-model="text"></el-input>' +
                    '</div>' +
                  '</div>' +
                  '<div class="upLoader">' +
                    '<el-upload :on-preview="handlePictureCardPreview" :before-remove="handleBeforeRemove" :on-success="handleSuccess" :on-error="handleError" :headers="headers" :file-list="fileList" :action="imagesUploadApi" list-type="picture-card">' +
                      '<i class="el-icon-plus"/>' +
                    '</el-upload>' +
                  '</div>' +
                  '<div class="close el-icon-close"></div>' + 
                  '<div class="clear"></div>' +
              '</div>'
*/
var editor, editor2;
export default {
  name:'addVote',
  components: { Treeselect, Temp },
  computed: {
    ...mapGetters([
      'imagesUploadApi'
    ])
  },
  data() {
    return {
      text:'',
      textarea:'',
      date:'',
      radio:'',
      checked: false,
      options: [{
        value: '选项24小时',
        label: '24小时内不能重复投票'
      }, {
        value: '选项12小时',
        label: '12小时内不能重复投票'
      },{
        value: '选项10票',
        label: '每个自然日可投10票'
      },{
        value: '选项50票',
        label: '每个自然日可投50票'
      }],
      value: '',
      headers: {
        'Authorization': 'Bearer ' + getToken()
      },
      counter: [{textTitle: '111', textarea: '222', textLink: '333'}],
      editorContentActive:'kasjf',
      editorContentInfo:'dsfafd',
      address: 'http://wwww.baidu.com',
      activeName: 'first',
      PCradio: '',
      Mradio: '',
      valueIP: '',
      copyAddress: '',
      voteAddress: '',
      loading: false, dialog: false, depts: [],
      form: {
        topicName: '',
        url: '',
        enabled: 'true',
        createTime: '',
        description: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
      var config = [
          'head',  // 标题
          'bold',  // 粗体
          'fontSize',  // 字号
          'fontName',  // 字体
          'italic',  // 斜体
          'underline',  // 下划线
          'strikeThrough',  // 删除线
          'foreColor',  // 文字颜色
          'link',  // 插入链接
          'list',  // 列表
          'justify',  // 对齐方式
          'undo',  // 撤销
          'redo'  // 重复
      ]
      editor = new E(this.$refs.editorActive)
      editor.customConfig.menus = config
      editor.customConfig.uploadImgShowBase64 = true // 使用 base64 保存图片
      // 不可修改
      editor.customConfig.uploadImgHeaders = this.headers
      // 自定义文件名，不可修改，修改后会上传失败
      editor.customConfig.uploadFileName = 'file'
      editor.customConfig.uploadImgServer = this.imagesUploadApi // 上传图片到服务器
      editor.customConfig.onchange = (html) => {
        this.editorContentActive = html
      }
      editor.create()

      editor2 = new E(this.$refs.editorInfo)
      editor2.customConfig.menus = config
      editor2.customConfig.uploadImgShowBase64 = true // 使用 base64 保存图片
      // 不可修改
      editor2.customConfig.uploadImgHeaders = this.headers
      // 自定义文件名，不可修改，修改后会上传失败
      editor2.customConfig.uploadFileName = 'file'
      editor2.customConfig.uploadImgServer = this.imagesUploadApi // 上传图片到服务器
      editor2.customConfig.onchange = (html) => {
        this.editorContentInfo = html
      }
      editor2.create()
  },
  methods: {
    nextFrist() {
      this.activeName = 'second'
    },
    nextSecond() {
      this.activeName = 'third'
    },
    prevSecond() {
      this.activeName = 'first'
    },
    nextThird() {
      this.activeName = 'fourth'
    },
    prevThird() {
      this.activeName = 'second'
    },
    nextFourth() {
      this.activeName = 'fourth'
    },
    prevFourth() {
      this.activeName = 'third'
    },
    complete() {
      editor.txt.clear()
      editor2.txt.clear()
      console.log( this.$refs)
      console.log(
        '投票活动标题:' + this.text, 
        "投票活动描述:" + this.editorContentActive, 
        "完成投票显示信息:" + this.editorContentInfo,
        "投票时间设置:" + this.date,
        "投票选项设置: " + this.radio,
        "排版设置:" + this.PCradio, this.Mradio,
        "IP限制: " + this.valueIP,
        "系统自动生成地址:" + this.copyAddress,
        "投票活动地址设置:" + this.voteAddress,
        "test:" + this.$refs
        )
    },
    handleCopy(text, event) {
      clip(text, event)
      this.copyAddress = text
    },
    handleClick(tab, event) {  
      console.log(tab, event);
    },
    addOptions() {
      this.counter.push('1')
    },
    pickerOptions() {

    },
    closeindex(data) {
      console.log(data)
    }
  }
}



</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  
  .el-input-number .el-input__inner {
    text-align: left;
  }
  .input-title{
    margin-top:10px;
  }
  .editor-active{
    margin-top:50px;
    width:800px;
  }
  .button-next{
    margin-bottom: 50px;
  }
  .editor-content{
    padding-left: 5px;
  }
  .elRow{
    padding:20px 0 60px 0;
  }
  .vote-date span, .vote-radio span {
    display: inline-block;
    width: 10px;
  }
  .vote-radio,.vote-layout,.vote-date{
    margin-top: 50px;
  }
  .vote-layout{
    span {
      font-size: 14px;
      color: #bbbbbb;
    }
    .pc {
      margin-top: 0;
      margin-left: 50px;
      float: left;
    }
    .mobile{
      margin-top: 50px;
    }
  }
  .vote-layout div:first-child{
    float: left;
  }
  .vote-ip{
    width: 1200px;
    margin-top: 50px;
    margin-bottom: 50px;
    float: left;
  }
  .vote-btn{
    width: 50%;
    float: right;
  }
  .el-select{
    padding-left:67px;
  }
  .el-picker-panel, .el-date-range-picker, .el-popper{
    margin-left: 174px;
  }
  .vote-copy{
     padding-top:10px;
    span {
      padding-right: 20px;
     
    }
  }
  .vote-address{
    padding-top: 30px;
    span {
      padding-right: 20px;
    }
    .address{
      width: 400px;
    }
  }
  .complete-btn{
    width: 560px;
    padding-top: 50px;
    text-align: right;
  }
</style>
