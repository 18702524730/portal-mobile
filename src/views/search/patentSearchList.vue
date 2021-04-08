<template>
  <div class="patentsearchlistsebe">
    <div class="patentsearch">
      <div class="xrightpart">
        <div class="search-box">
          <div class="left-search">
            <!-- <div class="senior">
              <span  @click="tosenior" class="jiansuo">高级搜索</span><span @click="toexpression" class="bdsjiansuo">表达式检索 <span class="new">NEW <span class="sanjiao"></span></span></span>
            </div> -->
            <div class="btnboxs">
              <input type="text" v-model="patent" placeholder="请输入要查询的内容" >
              <span @click="onSearch(1)">搜索</span>
            </div>
          </div>
        </div>
        <div class="areas">
            <van-checkbox-group v-model="checkedCities" direction="horizontal">
              <van-checkbox :name="it.value" shape="square" v-for="it in options" :key="it.value">{{it.label}}</van-checkbox>
            </van-checkbox-group>
        </div>
      </div>
    </div>
    <div>
      <div class="patent-search-result">
        <!-- <div class="screeningbox">
          <strong>筛选条件：</strong>
          <div class="clearfix">
            <span v-for="(item, index) in conditions" :key="index">
              <i class="itemconditon">{{ item.name }}：{{ item.title }}</i>
              <van-icon name='cross' @click="remove(item, index)"/>
            </span>
          </div>
        </div> -->
        <div class="top clearfix">
          <div class="counts fl">
            共计<span class="color-red">{{ total }}</span>个结果
          </div>
        </div>
        <div class="middle clearfix">
          <!-- <div class="leftcondition">
            <div class="search-area" v-if="list.length > 0 && allshow">
              <div class="all">
                <van-checkbox shape="square" v-model="all" @change="allchanged">全部国家和地区</van-checkbox>
              </div>

              <div class="china" v-for="(item, index) in list" :key="index">
                <van-checkbox shape="square" :name="item.value" v-model="item.ischeck" @change="dosome(item)">
                  <span class="countryiconbox"><img :src="item.icon" alt=""/></span>
                  <span class="labelbox" >{{ item.valueName }}</span>
                  <span class="itemcount">({{ item.count }})</span>
                </van-checkbox>
                <div style="padding-left: 20px;" v-if="item.list">
                  <van-checkbox-group v-model="item.checked" @change="check(item)">
                    <van-checkbox :name="t.value" shape="square" v-for="(t, key) in item.list" :key="key">{{ t.valueName }}({{ t.count }})</van-checkbox>
                  </van-checkbox-group>
                </div>
              </div>
              <div style="padding-left: 10px;">
                <span class="screening" @click="changetype">筛选</span>
              </div>
            </div>
            <ul class="search-conditons">
              <li v-if="is_effect" @click="changeitem('effect')">
                专利有效性
                <span class="iconbox">
                  <van-icon name="arrow" color="#666" v-if="!effect_show"/>
                  <van-icon name="arrow-down" color="#666" v-if="effect_show"/>
                </span>
                <div class="itembox" v-if="effect_show" @click.stop>
                  <van-checkbox-group v-model="effect_checked">
                    <van-checkbox :name="item.value" shape="square" v-for="(item, key) in effect" :key="key">
                      <span class="labelbox">{{ item.valueName }}</span>
                      <span class="itemcount">{{ item.count }}</span>
                    </van-checkbox>
                  </van-checkbox-group>
                  <div>
                    <span class="screening" @click="add('effect')">筛选</span>
                  </div>
                </div>
              </li>
              <li v-if="is_category" @click="changeitem('category')">
                IPC分类号
                <span class="iconbox">
                  <van-icon name="arrow" color="#666" v-if="!category_show"/>
                  <van-icon name="arrow-down" color="#666" v-if="category_show"/>
                </span>
                <div class="itembox" v-if="category_show" @click.stop>
                  <van-radio-group v-model="whichcategory" direction="horizontal" @change="getfield('category')">
                    <van-radio :name="1">部</van-radio>
                    <van-radio :name="2">大类</van-radio>
                    <van-radio :name="3">小类</van-radio>
                  </van-radio-group>
                  <van-checkbox-group v-model="category_checked">
                    <van-checkbox v-for="(item, key) in category" shape="square" :name="item.value" :key="key"
                      ><span class="labelbox">{{ item.valueName }}</span>
                      <span class="itemcount">{{ item.percent }}%</span>
                    </van-checkbox>
                  </van-checkbox-group>
                  <div>
                    <span class="screening" @click="add('category')">筛选</span>
                  </div>
                </div>
              </li>
              <li v-if="is_apply" @click="changeitem('apply')">
                中国申请人类型
                <span class="iconbox">
                  <van-icon name="arrow" color="#666" v-if="!apply_show"/>
                  <van-icon name="arrow-down" color="#666" v-if="apply_show"/>
                </span>
                <div class="itembox" v-if="apply_show" @click.stop>
                  <van-checkbox-group v-model="apply_checked">
                    <van-checkbox v-for="(item, key) in apply" shape="square" :name="item.value" :key="key"
                      ><span class="labelbox" >{{ item.valueName }}</span>
                      <span class="itemcount">{{ item.percent }}%</span>
                    </van-checkbox>
                  </van-checkbox-group>
                  <div>
                    <span class="screening" @click="add('apply')">筛选</span>
                  </div>
                </div>
              </li>
              <li v-if="is_province" @click="changeitem('province')">
                中国省市
                <span class="iconbox">
                  <van-icon name="arrow" color="#666" v-if="!province_show"/>
                  <van-icon name="arrow-down" color="#666" v-if="province_show"/>
                </span>
                <div class="itembox" v-if="province_show" @click.stop>
                  <van-checkbox-group v-model="province_checked">
                    <van-checkbox v-for="(item, key) in province" shape="square" :name="item.value" :key="key"
                      ><span class="labelbox">{{ item.valueName }}</span>
                      <span class="itemcount">{{ item.percent }}%</span>
                    </van-checkbox>
                  </van-checkbox-group>
                  <div>
                    <span class="screening" @click="add('province')">筛选</span>
                  </div>
                </div>
              </li>
              <li v-if="is_public" @click="changeitem('public')">
                公开(公告日)
                <span class="iconbox">
                  <van-icon name="arrow" color="#666" v-if="!public_show"/>
                  <van-icon name="arrow-down" color="#666" v-if="public_show"/>
                </span>
                <div class="itembox" v-if="public_show" @click.stop>
                  <van-checkbox-group v-model="public_checked">
                    <van-checkbox v-for="(item, key) in publiclist" shape="square" :name="item.value" :key="key"><span class="labelbox">{{ item.valueName }}</span>
                      <span class="itemcount">{{ item.percent }}%</span>
                    </van-checkbox>
                  </van-checkbox-group>
                  <div>
                    <span class="screening" @click="add('public')">筛选</span>
                  </div>
                </div>
              </li>
              <li v-if="is_applyer" @click="changeitem('applyer')">
                申请人(TOP10)
                <span class="iconbox">
                  <van-icon name="arrow" color="#666" v-if="!applyer_show"/>
                  <van-icon name="arrow-down" color="#666" v-if="applyer_show"/>
                </span>
                <div class="itembox" v-if="applyer_show" @click.stop>
                  <van-checkbox-group v-model="applyer_checked">
                    <van-checkbox v-for="(item, key) in applyer" shape="square" :name="item.value" :key="key"
                      ><span class="labelbox" >{{ item.valueName }}</span>
                      <span class="itemcount">{{ item.percent }}%</span>
                    </van-checkbox>
                  </van-checkbox-group>
                  <div>
                    <span class="screening" @click="add('applyer')">筛选</span>
                  </div>
                </div>
              </li>
              <li v-if="is_applyday" @click="changeitem('applyday')">
                申请日(年)
                <span class="iconbox">
                  <van-icon name="arrow" color="#666" v-if="!applyday_show"/>
                  <van-icon name="arrow-down" color="#666" v-if="applyday_show"/>
                </span>
                <div class="itembox" v-if="applyday_show" @click.stop>
                  <van-checkbox-group v-model="applyday_checked">
                    <van-checkbox v-for="(item, key) in applyday" shape="square" :name="item.value" :key="key"
                      ><span class="labelbox">{{ item.valueName }}</span>
                      <span class="itemcount">{{ item.percent }}%</span>
                    </van-checkbox>
                  </van-checkbox-group>
                  <div>
                    <span class="screening" @click="add('applyday')">筛选</span>
                  </div>
                </div>
              </li>
              <li v-if="is_agent" @click="changeitem('agent')">
                代理机构
                <span class="iconbox">
                  <van-icon name="arrow" color="#666" v-if="!agent_show"/>
                  <van-icon name="arrow-down" color="#666" v-if="agent_show"/>
                </span>
                <div class="itembox" v-if="agent_show" @click.stop>
                  <van-checkbox-group v-model="agent_checked">
                    <van-checkbox v-for="(item, key) in agent" shape="square" :name="item.value" :key="key"
                      ><span class="labelbox" >{{ item.valueName }}</span>
                      <span class="itemcount">{{ item.percent }}%</span>
                    </van-checkbox>
                  </van-checkbox-group>
                  <div>
                    <span class="screening" @click="add('agent')">筛选</span>
                  </div>
                </div>
              </li>
              <li v-if="is_years" @click="changeitem('years')">
                维持年限
                <span class="iconbox">
                  <van-icon name="arrow" color="#666" v-if="!years_show"/>
                  <van-icon name="arrow-down" color="#666" v-if="years_show"/>
                </span>
                <div class="itembox" v-if="years_show" @click.stop>
                  <van-checkbox-group v-model="years_checked">
                    <van-checkbox v-for="(item, key) in years" shape="square" :name="item.value" :key="key"
                      ><span class="labelbox">{{ item.valueName }}</span>
                      <span class="itemcount">{{ item.percent }}%</span>
                    </van-checkbox>
                  </van-checkbox-group>
                  <div>
                    <span class="screening" @click="add('years')">筛选</span>
                  </div>
                </div>
              </li>
              <li v-if="is_hangye && hangyechecked" @click="changeitem('hangye')">
                国民经济行业分类
                <span class="iconbox">
                  <van-icon name="arrow" color="#666" v-if="!hangye_show"/>
                  <van-icon name="arrow-down" color="#666" v-if="hangye_show"/>
                </span>
                <div class="itembox" v-if="hangye_show" @click.stop>
                  <van-radio-group v-model="hangye" direction="horizontal" @change="getfield('hangye')">
                    <van-radio :name="1">部</van-radio>
                    <van-radio :name="2">大类</van-radio>
                    <van-radio :name="3">小类</van-radio>
                  </van-radio-group>
                  <van-checkbox-group v-model="hangye_checked">
                    <van-checkbox v-for="(item, key) in hangyearr" shape="square" :name="item.value" :key="key"
                      ><span class="labelbox">{{ item.valueName }}</span>
                      <span class="itemcount">{{ item.percent }}%</span>
                    </van-checkbox>
                  </van-checkbox-group>
                  <div>
                    <span class="screening" @click="add('hangye')">筛选</span>
                  </div>
                </div>
              </li>
              <li v-if="is_zhufenlei && zhufenleichecked" @click="changeitem('zhufenlei')">
                IPC主分类号
                <span class="iconbox">
                  <van-icon name="arrow" color="#666" v-if="!zhufenlei_show"/>
                  <van-icon name="arrow-down" color="#666" v-if="zhufenlei_show"/>
                </span>
                <div class="itembox" v-if="zhufenlei_show" @click.stop>
                  <van-radio-group v-model="zhufenlei" direction="horizontal" @change="getfield('zhufenlei')">
                    <van-radio :name="1">部</van-radio>
                    <van-radio :name="2">大类</van-radio>
                    <van-radio :name="3">小类</van-radio>
                  </van-radio-group>
                  <van-checkbox-group v-model="zhufenlei_checked">
                    <van-checkbox v-for="(item, key) in zhufenleiarr" shape="square" :name="item.value" :key="key"
                      ><span class="labelbox">{{ item.valueName }}</span>
                      <span class="itemcount">{{ item.percent }}%</span>
                    </van-checkbox>
                  </van-checkbox-group>
                  <div>
                    <span class="screening" @click="add('zhufenlei')">筛选</span>
                  </div>
                </div>
              </li>
              <li v-if="is_fenlei && fenleichecked" @click="changeitem('fenlei')">
                CPC分类号
                <span class="iconbox">
                  <van-icon name="arrow" color="#666" v-if="!fenlei_show"/>
                  <van-icon name="arrow-down" color="#666" v-if="fenlei_show"/>
                </span>
                <div class="itembox" v-if="fenlei_show" @click.stop>
                  <van-radio-group v-model="fenlei" direction="horizontal" @change="getfield('fenlei')">
                    <van-radio :name="1">部</van-radio>
                    <van-radio :name="2">大类</van-radio>
                    <van-radio :name="3">小类</van-radio>
                  </van-radio-group>
                  <van-checkbox-group v-model="fenlei_checked">
                    <van-checkbox v-for="(item, key) in fenleiarr" shape="square" :name="item.value" :key="key"
                      ><span class="labelbox">{{ item.valueName }}</span>
                      <span class="itemcount">{{ item.percent }}%</span>
                    </van-checkbox>
                  </van-checkbox-group>
                  <div>
                    <span class="screening" @click="add('fenlei')">筛选</span>
                  </div>
                </div>
              </li>
              <li v-if="is_faming && famingchecked" @click="changeitem('faming')">
                发明/设计人
                <span class="iconbox">
                  <van-icon name="arrow" color="#666" v-if="!faming_show"/>
                  <van-icon name="arrow-down" color="#666" v-if="faming_show"/>
                </span>
                <div class="itembox" v-if="faming_show" @click.stop>
                  <van-checkbox-group v-model="faming_checked">
                    <van-checkbox v-for="(item, key) in famingarr" shape="square" :name="item.value" :key="key"
                      ><span class="labelbox" >{{ item.valueName }}</span>
                      <span class="itemcount">{{ item.count }}</span>
                    </van-checkbox>
                  </van-checkbox-group>
                  <div>
                    <span class="screening" @click="add('faming')">筛选</span>
                  </div>
                </div>
              </li>
              <li v-if="is_zhuanli && zhuanlichecked" @click="changeitem('zhuanli')">
                当前专利权/人
                <span class="iconbox">
                  <van-icon name="arrow" color="#666" v-if="!zhuanli_show"/>
                  <van-icon name="arrow-down" color="#666" v-if="zhuanli_show"/>
                </span>
                <div class="itembox" v-if="zhuanli_show" @click.stop>
                  <van-checkbox-group v-model="zhuanli_checked">
                    <van-checkbox v-for="(item, key) in zhuanliarr" shape="square" :name="item.value" :key="key"
                      ><span class="labelbox" >{{ item.valueName }}</span
                      ><span class="itemcount">{{ item.percent }}%</span>
                    </van-checkbox>
                  </van-checkbox-group>
                  <div>
                    <span class="screening" @click="add('zhuanli')">筛选</span>
                  </div>
                </div>
              </li>
            </ul>
            <div style="text-align:right; padding:5px 10px;font-size: 14px;">
              <span style="cursor:pointer;color:#666;" @click="dialogVisible = true">更多>></span>
            </div>
            <div v-if="dialogVisible" class="morefenleibox">
              
              <div class="fenleibox">
                <span class="closemore" @click="dialogVisible = false"><van-icon name="cross" /></span>
                <div class="fenlei">
                  <h3>分类</h3>
                  <ul>
                    <li>
                      <van-checkbox v-model="hangyechecked">国民经济行业分类</van-checkbox>
                      <van-checkbox v-model="zhufenleichecked">IPC主分类号</van-checkbox>
                      <van-checkbox v-model="fenleichecked">CPC分类</van-checkbox>
                    </li>
                  </ul>
                </div>
                <div class="fenlei">
                  <h3>公司/人</h3>
                  <ul>
                    <li>
                        <van-checkbox v-model="famingchecked">发明/设计人</van-checkbox>
                        <van-checkbox v-model="zhuanlichecked">当前专利权/人</van-checkbox>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div> -->
          <ul class="rightlist" v-show="dataList.length">
            <li v-for="(item, index) in dataList" :key="index">
              <div class="topcont clearfix">
                <div class="picbox">
                  <img :src="item.abstractFigure" alt="" v-if="item.abstractFigure" />
                  <img src="@assets/img/logo.png" alt="" v-else />
                </div>
                <div class="intr">
                  <h3>
                    
                    <span class="tit" @click="topatentinfo(item)">
                      <span class="state">{{ item.validateName }}</span>【{{ item.typeName }}】{{item.title}}
                    </span>
                  </h3>
                  
                </div>
              </div>
              <ul class="info">
                <li>
                  <span class="fl">申请号：</span>
                  <span class="fl">{{ item.applicationDocNum }}</span>
                  <!-- <span class="collect" v-if="item.isCollect == 1" @click.stop="cancelCollect(item)"><van-icon name="star"  class="shou"/> 取消收藏</span>
                  <span class="collect" v-if="item.isCollect == 0" @click.stop="addCollect(item)"><van-icon name="star-o" /> 收藏</span> -->
                </li>
                <li><span>申请日：</span>{{ item.applicationDate }}</li>
                <li><span>公开/公告号：</span>{{ item.publicationDocNum }}</li>
                <li><span>公开/公告日：</span>{{ item.publicationDate }}</li>
                <li><span>申请人：</span>{{ item.applicant }}</li>
                <li><span>发明人：</span>{{ item.inventor }}</li>
                <li><span>代理人：</span>{{ item.agentPersonName }}</li>
                <li><span>分类号：</span>{{ item.ipcList | tostrFormat }}</li>
                <li><span>代理机构：</span>{{ item.agentName }}</li>
              </ul>
              <p><span>摘要：</span> <span v-html="item.abstractDesc"></span></p>
            </li>
          </ul>
          <ul class="nodata fr" v-show="!loading && !total">
            <li>
              没有搜索到你要的结果
            </li>
          </ul>
          <div v-if="!loading && total > 10">
            <van-pagination
              v-model="pgIndex"
              :total-items="total"
              :show-page-size="3"
              @change="handleCurrentChange"
              force-ellipses
            />
          </div>
        </div>
      </div>
    </div>
    <!-- <el-dialog title="数据导出" :visible.sync="exportshow" top="30vh" width="700px">
      <div class="exportallbox">
        <div v-if="!exporting">
          <h3>{{`该检索结果共包含${total}条专利信息，过程可能需要一点时间，是否确定导出？`}}</h3>
          <div class="startbtnbox">
            <span @click="startexport">确定开始</span>
          </div>
        </div>
        <div v-if="exporting">
          <div class="loadingbox">
            <span class="spiner"></span>
          </div>
          <div class="exportintr">
            正在导出数据，请耐心等待，导出成功后将自动打开...
          </div>
          <div class="exportwarn">
            <i class="el-icon-warning"></i>文件下载前，请勿关闭页面
          </div>
        </div>
      </div>
    </el-dialog> -->
    <div class="sebemask" v-if="loading">
      <van-loading type="spinner" vertical  color="#f5f5f5">加载中</van-loading>
    </div>
  </div>
</template>

<script>
// import VueCookie from 'vue-cookie'
import { Toast } from 'vant'
import rootConfig from '@config/hostConfig.js'
// import { mapGetters } from 'vuex'
// import { judgeState } from '@/utils/util'
import filters from '@utils/filters.js'
const addCollectUrl = '/api/addMyCollect'
const cancelCollectUrl = '/api/cancelMyCollect'
// 专利检索接口
const patentUrl = '/api/queryByKeyword'
// 筛选条件接口
const queryUrl = '/api/queryAndStatistic'
// 排序 sortField: 申请日 ad 公开日 pd 被引数量 quotedNum sortType:升序 asc  降序 desc
export default {
  // inject: ['headLogin'],
  data() {
    return {
      testshow: true,
      exporting: false,
      isexportall: false,
      exportshow: false,
      nowconditions: '',
      islogin: false,
      cslist: [
        {
          icon: '',
          checked: [],
          ischeck: false,
          value: '中国',
          valueName: '中国',
          count: '212154',
          list: [{ value: '发明壮丽', count: '212154', valueName: '发明专利' }]
        }
      ],
      options: [
        { label: '国内', value: 'cn' },
        { label: '国外及港澳台地区', value: 'docdb' }
      ],
      quotedNumnum: '',
      adnum: '',
      pdnum: '',
      radios: '1',
      startnum: '',
      endnum: '',
      isvisible: false,
      dialogVisible: false,
      is_effect: true,
      effect_show: false,
      effect_checked: [],
      is_category: true,
      category_show: false,
      category_checked: [],
      whichcategory: 1,
      is_apply: true,
      apply_show: false,
      apply_checked: [],
      is_province: true,
      province_show: false,
      province_checked: [],
      is_public: true,
      public_show: false,
      public_checked: [],
      is_applyer: true,
      applyer_show: false,
      applyer_checked: [],
      is_applyday: true,
      applyday_show: false,
      applyday_checked: [],
      is_agent: true,
      agent_show: false,
      agent_checked: [],
      is_years: true,
      years_show: false,
      years_checked: [],

      is_hangye: true,
      hangye_show: false,
      hangye_checked: [],
      hangyechecked: false,
      hangye: 1,
      is_zhufenlei: true,
      zhufenlei_show: false,
      zhufenlei_checked: [],
      zhufenleichecked: false,
      zhufenlei: 1,
      is_fenlei: true,
      fenlei_show: false,
      fenlei_checked: [],
      fenleichecked: false,
      fenlei: 1,
      is_faming: true,
      faming_show: false,
      faming_checked: [],
      famingchecked: false,
      is_zhuanli: true,
      zhuanli_show: false,
      zhuanli_checked: [],
      zhuanlichecked: false,
      list: [],
      allshow: true,
      label: ['普通搜索', '高级搜索'],
      checkedCities: ['cn', 'docdb'],
      checkedTypes: [],
      checkedCountries: [],
      types: [
        { name: '发明专利', id: 11, num: 250 },
        { name: '实用新型', id: 12, num: 256 }
      ],
      conditions: [],
      now: 1,
      patent: '',
      mark: '',
      cont: '',
      selected: '2',
      current: 0,
      world: false,
      all: false,
      china: false,
      ptype: '',
      search: [
        { name: '专利检索', id: 1 },
        { name: '商标检索', id: 2 },
        { name: '判例检索', id: 3 }
      ],
      effect: [],
      category: [],
      apply: [],
      province: [],
      publiclist: [],
      applyer: [],
      applyday: [],
      agent: [],
      years: [],
      hangyearr: [],
      zhufenleiarr: [],
      fenleiarr: [],
      famingarr: [],
      zhuanliarr: [],
      addconditions: [],
      pgIndex: 1,
      pgCount: 10,
      total: 0,
      dataList: [],
      loading: false,
      query: {},
      selectedField: [],
      categoryevery: '',
      categoryLoading: false,
      hangyeevery: '',
      hangyeLoading: false,
      zhufenleievery: '',
      zhufenleiLoading: false,
      fenleievery: '',
      fenleiLoading: false
    }
  },
  filters: {
    tostrFormat: function(arr) {
      if (arr instanceof Array) {
        return arr.join(',')
      }
      return arr
    }
  },
  methods: {
    // ...mapGetters(['userInfo']),
    allchanged() {
      this.list.forEach(item => {
        item.ischeck = this.all
        if (item.ischeck) {
          const arr = []
          if (item.list) {
            item.list.forEach(it => {
              if (this.all) {
                arr.push(it.value)
              }
            })
          }
          item.checked = arr
        } else {
          item.checked = []
        }
      })
    },
    addCollect(it) {
      // const uid = judgeState()
      const uid = 1
      if (uid) {
        const data = {
          collectType: 1,
          title: it.title,
          abstractFigure: it.abstractFigure,
          applicant: it.applicant,
          applicationDocNum: it.applicationDocNum,
          publicationDocNum: it.publicationDocNum,
          country: it.country,
          type: it.type
        }
        this.$shttp
          .post(addCollectUrl, data)
          .then(res => {
            it.isCollect = 1
            Toast('收藏成功')
          })
          .catch(err => {
            Toast(err.response.data.msg)
          })
      } else {
        // this.headLogin()
      }
    },
    cancelCollect(it) {
      const data = {
        collectType: 1,
        collectItemUuid: it.publicationDocNum
      }
      this.$shttp
        .put(cancelCollectUrl, data)
        .then(res => {
          it.isCollect = 0
          Toast('取消收藏成功')
        })
        .catch(err => {
          Toast(err.response.data.msg)
        })
    },
    quxiao() {
      this.startnum = ''
      this.endnum = ''
      this.isvisible = false
    },
    putcheck(i) {
      const reg = /[^0-9]/g
      if (i === 1) {
        this.startnum = this.startnum.replace(reg, '')
      }
      if (i === 2) {
        this.endnum = this.endnum.replace(reg, '')
      }
    },
    queding() {
      if (!this.startnum) {
        Toast('请输入开始条数')
        return
      }
      if (!this.endnum) {
        Toast('请输入结束条数')
        return
      }
      if (this.endnum - this.startnum > 19) {
        Toast('每次最多导出20条')
        return
      }
      if (this.endnum - this.startnum < 0) {
        Toast('请输入正确的开始条数和结束条数')
        return
      }
      if (this.startnum > this.total || this.endnum > this.total) {
        Toast(`当前共${this.total}条数据，请输入有效的条数`)
        return
      }
      const uinfo = this.userInfo()
      const userId = uinfo && uinfo.id
      const count = {
        exportType: this.radios,
        startLine: this.startnum,
        endLine: this.endnum,
        userId: userId || ''
      }
      const urldata = Object.assign({}, this.query, count)
      this.quxiao()
      const openurl = rootConfig.rootUrl + '/api/exportQueryByKeyword?' + (urldata)
      window.open(openurl)

    },
    sortfn(name, type) {
      this.quotedNumnum = ''
      this.adnum = ''
      this.pdnum = ''
      this.query['sortField'] = name
      this.query['sortType'] = type
      this[name + 'num'] = type
      this.$router.replace({ query: this.query })
      this.getOrderList(this.query)
    },
    sortfns(name) {
      // this.quotedNumnum='';
      // this.adnum ='';
      // this.pdnum ='';
      this.query['sortField'] = name
      switch (name) {
        case 'pd':
          this.adnum = ''
          this.quotedNumnum = ''
          break
        case 'ad':
          this.pdnum = ''
          this.quotedNumnum = ''
          break
        case 'quotedNum':
          this.adnum = ''
          this.pdnum = ''
          break
      }
      if (this[name + 'num'] === 'desc') {
        this[name + 'num'] = 'asc'
        this.query['sortType'] = 'asc'
      } else {
        this[name + 'num'] = 'desc'
        this.query['sortType'] = 'desc'
      }
      this.searchpage()
    },
    async getfield(type) {
      switch (type) {
        case 'category':
          if (this.whichcategory === 1) {
            this.categoryevery = 'ipc-section-list'
          }
          if (this.whichcategory === 2) {
            this.categoryevery = 'ipc-class-list'
          }
          if (this.whichcategory === 3) {
            this.categoryevery = 'ipc-subclass-list'
          }
          try {
            this.categoryLoading = true
            this.query['staticField'] = this.categoryevery
            const data = Object.assign({}, this.query)
            const response = await this.getStatistic(data)
            this.category = response
            this.categoryLoading = false
          } catch (err) {
            this.categoryLoading = false
            Toast(err.response.data.msg)
          }
          break
        case 'hangye':
          if (this.hangye === 1) {
            this.hangyeevery = 'nation-catclass'
          }
          if (this.hangye === 2) {
            this.hangyeevery = 'nation-mainclass'
          }
          if (this.hangye === 3) {
            this.hangyeevery = 'nation-subclass'
          }
          try {
            this.hangyeLoading = true
            this.query['staticField'] = this.hangyeevery
            const data = Object.assign({}, this.query)
            const response = await this.getStatistic(data)
            this.hangyearr = response
            this.hangyeLoading = false
          } catch (err) {
            this.hangyeLoading = false
            Toast(err.response.data.msg)
          }
          break
        case 'zhufenlei':
          if (this.zhufenlei === 1) {
            this.zhufenleievery = 'ipc-section'
          }
          if (this.zhufenlei === 2) {
            this.zhufenleievery = 'ipc-class'
          }
          if (this.zhufenlei === 3) {
            this.zhufenleievery = 'ipc-subclass'
          }
          try {
            this.zhufenleiLoading = true
            this.query['staticField'] = this.zhufenleievery
            const data = Object.assign({}, this.query)
            const response = await this.getStatistic(data)
            this.zhufenleiarr = response
            this.zhufenleiLoading = false
          } catch (err) {
            this.zhufenleiLoading = false
            Toast(err.response.data.msg)
          }
          break
        case 'fenlei':
          if (this.fenlei === 1) {
            this.zhufenleievery = 'cpc-section'
          }
          if (this.fenlei === 2) {
            this.fenleievery = 'cpc-class'
          }
          if (this.fenlei === 3) {
            this.fenleievery = 'cpc-subclass'
          }
          try {
            this.fenleiLoading = true
            this.query['staticField'] = this.fenleievery
            const data = Object.assign({}, this.query)
            const response = await this.getStatistic(data)
            this.fenleiarr = response
            this.fenleiLoading = false
          } catch (err) {
            this.fenleiLoading = false
            Toast(err.response.data.msg)
          }
          break
      }
    },
    async getStatistic(param) {
      const data = param || {}
      return await this.$shttp.get(queryUrl, { params: data })
    },
    topatentinfo(it) {
      // const url = `/portal/search/patent-searchdetail/${it.applicationDocNum}/${it.country}/${it.publicationDocNum}/${it.type}`
      // window.open(url)
      this.$router.push({ name: 'PatentSearchDetail', params: { id: it.applicationDocNum, country: it.country, num: it.publicationDocNum, tp: it.type, istype: it.validateName } })
    },
    check(it) {
      if (it['checked'].length > 0) {
        it['ischeck'] = true
      } else {
        it['ischeck'] = false
      }
    },
    dosome(it) {
      if (it.ischeck) {
        const arr = []
        if (it['list'] && it['list'].length > 0) {
          it['list'].forEach(w => {
            arr.push(w['value'])
          })
        }
        it.checked = arr
      } else {
        it.checked = []
      }
    },
    getquery() {
      const re = {}
      if (this.$route.query) {
        const q = this.$route.query
        for (var k in q) {
          if (q.hasOwnProperty(k)) {
            if (q[k]) {
              re[k] = q[k]
            }
          }
        }
      }
      // const condition = localStorage.getItem('patentSearchConditions')
      // const re = JSON.parse(condition)
      // const loc = window.location.href
      // if (loc.indexOf('?') > -1) {
      //   const stra = loc.split('?')[1]
      //   const arr = stra.split('&')
      //   arr.forEach(item => {
      //     const key = item.split('=')[0]
      //     const val = item.split('=')[1]
      //     re[key] = val
      //   })
      // }
      if (re.all) {
        this.patent = re.all
      }
      this.query = re
      if (this.query['dac']) {
        this.checkedCountries = this.query['dac'].split(',')
      }
      if (this.query['fKind']) {
        this.checkedTypes = this.query['fKind'].split(',')
      }
      console.log(this.checkedCountries, this.checkedTypes)
      if (!re['searchType']) {
        this.ptype = ''
        return
      }
      const thetype = re['searchType'] - 0
      if (thetype === 1) {
        this.ptype = '普通搜索'
        this.nowconditions = ''
      }
      if (thetype === 2) {
        this.ptype = '高级搜索'
        let str = ''
        if (re['in']) {
          str += '发明人:' + re['in'] + ' '
        }
        if (re['an']) {
          str += '申请号:' + re['an'] + '  '
        }
        if (re['pn']) {
          str += '公开(公告)号:' + re['pn'] + '  '
        }
        if (re['applicantSearch']) {
          str += '申请人/专利权人:' + re['applicantSearch'] + '  '
        }
        if (re['ti']) {
          str += '名称:' + re['ti'] + '  '
        }
        if (re['ab']) {
          str += '摘要:' + re['ab'] + '  '
        }
        if (re['cl']) {
          str += '权利要求:' + re['cl'] + '  '
        }
        if (re['ic']) {
          str += 'IPC分类号:' + re['ic'] + '  '
        }
        if (re['agentOrgSearch']) {
          str += '代理机构:' + re['agentOrgSearch'] + '  '
        }
        if (re['agentSearch']) {
          str += '代理人名称:' + re['agentSearch'] + '  '
        }
        if (re['dz']) {
          str += '申请人地址:' + re['ic'] + '  '
        }
        if (re['applicationDateStart'] && re['applicationDateEnd']) {
          const start = filters.formatDate.datesFormat(re['applicationDateStart'])
          const end = filters.formatDate.datesFormat(re['applicationDateEnd'])
          str += '申请日期:' + start + '至' + end + '  '
        }
        if (re['publishDateStart'] && re['publishDateEnd']) {
          const start = filters.formatDate.datesFormat(re['publishDateStart'])
          const end = filters.formatDate.datesFormat(re['publishDateEnd'])
          str += '公开日期:' + start + '至' + end + '  '
        }
        if (re['apProvince'] || re['apCity']) {
          const p = re['apProvince'] || ''
          const c = re['apCity'] || ''
          str += '申请人所在省份:' + p + ' ' + c + '  '
        }
        if (re['fKind']) {
          str += '专利类型:' + re['fKind'] + '  '
        }
        if (re['dac']) {
          str += '国家:' + re['dac'] + '  '
        }
        this.nowconditions = str
      }
      if (thetype === 3) {
        this.ptype = '表达式搜索'
        this.nowconditions = decodeURIComponent(re.expression)
      }
      
    },
    // 国家地区筛选
    changetype() {
      this.checkedCountries = []
      this.checkedTypes = []
      this.list.forEach(item => {
        if (item.ischeck) {
          this.checkedCountries.push(item.value)
          if (item.checked && item.checked.length > 0) {
            this.checkedTypes = [...item.checked]
          }
        }
      })
      if (this.checkedTypes.length === 0 && this.checkedCountries.length === 0) {
        Toast('请选择一个地区')
        return
      }
      // let qobj ={};
      // let query = this.getquery();
      // delete query.searchType;
      // this.ptype =''
      let tit = ''
      let d, f
      if (this.checkedTypes.length > 0) {
        this.query['fKind'] = this.checkedTypes.join(',')
        f = this.checkedTypes.join(',')
      }
      if (this.checkedCountries.length > 0) {
        this.query['dac'] = this.checkedCountries.join(',')
        d = this.checkedCountries.join(' or ')
      }
      tit = d + ' 专利类型： ' + f
      this.conditions.push({ name: '国家地区', char: 1, title: tit })
      this.allshow = false
      this.searchpage()
      // this.$router.replace({path:'patentsearch',query:this.query})
      // this.getOrderList(this.query)
      console.log(this.checkedTypes, this.checkedCountries)
    },
    onSearch(num) {
      const re = {}
      if (num === 1) {
        if (!this.patent) {
          Toast('请输入内容查询')
          return
        }
        re.all = this.patent
        re.searchType = 1
        // re.staticField='dac,f-kind'
        if (this.checkedCities.length === 0 || this.checkedCities.length === 2) {
          re.category = ''
        } else {
          re.category = this.checkedCities[0]
        }
        var pg = {
          pgIndex: this.pgIndex,
          pgCount: this.pgCount
        }
        this.quotedNumnum = ''
        this.adnum = ''
        this.pdnum = ''
        var data = Object.assign({}, pg, re)
        this.$router.replace({ query: data })
        this.getquery()
        this.resets()
        this.getarea()
        this.getOrderList(data)
        // re.searchType =1
        // this.$store.dispatch('set_patent',re)
        // this.$nextTick(()=>{
        //     this.$router.push({name:'patentsearch'})
        // })
      }
      if (num === 2) {
        if (!this.mark) {
          Toast('请输入要查询的商标名称、申请号、申请人等信息')
          return
        }
        re.q = this.mark
        // this.$store.dispatch('set_trademark',re)
        // this.$nextTick(()=>{
        //     this.$router.push({name:'trademarksearch'})
        // })

        this.$router.push({ path: 'trademarksearch', query: re })
      }
      if (num === 3) {
        if (!this.cont) {
          Toast('请输入要查询的专利申请号')
          return
        }
        re.applicationDocNum = this.cont
        if (this.selected === 1) {
          this.$router.push({ path: 'panli', query: re })
        }
        if (this.selected === 2) {
          this.$router.push({ path: 'fushen', query: re })
        }
      }
    },
    tosenior() {
      this.$router.push({ name: 'SeniorSearchShibei' })
    },
    toexpression() {
      // if (!judgeState()) {
      //   const obj = { name: 'ExpressionSearchShibei' }
      //   this.headLogin('goto', obj)
      //   return
      // }
      this.$router.push({ name: 'ExpressionSearchShibei' })
    },
    xuanze(it) {
      this.now = it.id
    },
    //    删除选项
    remove(item, k) {
      if (item.char) {
        this.list.forEach(item => {
          item.ischeck = false
          item.checked = []
        })
        this.checkedTypes = []
        this.checkedCountries = []
        this.allshow = true
        this.all = false
        delete this.query['dac']
        delete this.query['fKind']
      } else {
        this['is_' + item.type] = true
        this[item.type + '_show'] = false
        this[item.type + '_checked'] = []
        switch (item.type) {
          case 'effect':
            delete this.query['status']
            break
          case 'category':
            delete this.query['ipcSectionList']
            delete this.query['ipcClassList']
            delete this.query['ipcSubclassList']
            break
          case 'apply':
            delete this.query['apType']
            break
          case 'province':
            delete this.query['apProvince']
            break
          case 'public':
            delete this.query['pdYear']
            break
          case 'applyer':
            delete this.query['pa']
            break
          case 'applyday':
            delete this.query['adYear']
            break
          case 'agent':
            delete this.query['ag']
            break
          case 'years':
            delete this.query['maintenedYear']
            break
          case 'hangye':
            delete this.query['nationCatclass']
            delete this.query['nationMainclass']
            delete this.query['nationSubclass']
            break
          case 'zhufenlei':
            delete this.query['ipcSection']
            delete this.query['ipcClass']
            delete this.query['ipcSubclass']
            break
          case 'fenlei':
            delete this.query['cpcSection']
            delete this.query['cpcClass']
            delete this.query['cpcSubclass']
            break
          case 'faming':
            delete this.query['in']
            break
          case 'zhuanli':
            delete this.query['patentee']
            break
        }
      }
      delete this.query['staticField']
      delete this.query['specialView']
      this.conditions.splice(k, 1)
      //    this.$router.replace({path:'patentsearch',query:this.query})
      //    this.getOrderList(this.query);
      this.searchpage()
      this.getarea()
    },
    //    打开筛选项
    async changeitem(it) {
      this[it + '_show'] = !this[it + '_show']
      if (!this[it + '_show']) {
        return false
      }
      this.query['specialView'] = false
      switch (it) {
        case 'effect':
          try {
            this.query['staticField'] = 'status'
            const data = Object.assign({}, this.query)
            const response = await this.getStatistic(data)
            this.effect = response
          } catch (err) {
            Toast(err.response.data.msg)
          }
          break
        case 'category':
          this.whichcategory = 1
          this.categoryevery = 'ipc-section-list'
          try {
            this.categoryLoading = true
            this.query['staticField'] = this.categoryevery
            const data = Object.assign({}, this.query)
            const response = await this.getStatistic(data)
            this.category = response
            this.categoryLoading = false
          } catch (err) {
            this.categoryLoading = false
            console.log(err)
            Toast(err.response.data.msg)
          }
          break
        case 'apply':
          try {
            this.query['staticField'] = 'ap-type'
            const data = Object.assign({}, this.query)
            const response = await this.getStatistic(data)
            this.apply = response
          } catch (err) {
            Toast(err.response.data.msg)
          }
          break
        case 'province':
          try {
            this.query['staticField'] = 'ap-province'
            const data = Object.assign({}, this.query)
            const response = await this.getStatistic(data)
            this.province = response
          } catch (err) {
            Toast(err.response.data.msg)
          }
          break
        case 'public':
          try {
            this.query['staticField'] = 'pd-year'
            const data = Object.assign({}, this.query)
            const response = await this.getStatistic(data)
            this.publiclist = response
          } catch (err) {
            Toast(err.response.data.msg)
          }
          break
        case 'applyer':
          try {
            this.query['staticField'] = 'pa'
            const data = Object.assign({}, this.query)
            const response = await this.getStatistic(data)
            this.applyer = response
          } catch (err) {
            Toast(err.response.data.msg)
          }
          break
        case 'applyday':
          try {
            this.query['staticField'] = 'ad-year'
            const data = Object.assign({}, this.query)
            const response = await this.getStatistic(data)
            this.applyday = response
          } catch (err) {
            Toast(err.response.data.msg)
          }
          break
        case 'agent':
          try {
            this.query['staticField'] = 'ag'
            const data = Object.assign({}, this.query)
            const response = await this.getStatistic(data)
            this.agent = response
          } catch (err) {
            Toast(err.response.data.msg)
          }
          break
        case 'years':
          try {
            this.query['staticField'] = 'valid-year'
            const data = Object.assign({}, this.query)
            const response = await this.getStatistic(data)
            this.years = response
          } catch (err) {
            Toast(err.response.data.msg)
          }
          break
        case 'hangye':
          try {
            this.hangye = 1
            this.query['staticField'] = 'nation-catclass'
            const data = Object.assign({}, this.query)
            const response = await this.getStatistic(data)
            this.hangyearr = response
          } catch (err) {
            Toast(err.response.data.msg)
          }
          break
        case 'zhufenlei':
          try {
            this.zhufenlei = 1
            this.query['staticField'] = 'ipc-section'
            const data = Object.assign({}, this.query)
            const response = await this.getStatistic(data)
            this.zhufenleiarr = response
          } catch (err) {
            Toast(err.response.data.msg)
          }
          break
        case 'fenlei':
          try {
            this.fenlei = 1
            this.query['staticField'] = 'cpc-section'
            const data = Object.assign({}, this.query)
            const response = await this.getStatistic(data)
            this.fenleiarr = response
          } catch (err) {
            Toast(err.response.data.msg)
          }
          break
        case 'faming':
          try {
            this.query['staticField'] = 'in'
            const data = Object.assign({}, this.query)
            const response = await this.getStatistic(data)
            this.famingarr = response
          } catch (err) {
            Toast(err.response.data.msg)
          }
          break
        case 'zhuanli':
          try {
            this.query['staticField'] = 'patentee'
            const data = Object.assign({}, this.query)
            const response = await this.getStatistic(data)
            this.zhuanliarr = response
          } catch (err) {
            Toast(err.response.data.msg)
          }
          break
      }
    },
    //    筛选
    async add(it) {
      const arr = this[it + '_checked']
      if (arr.length < 1) {
        Toast('请选择一个筛选条件')
        return
      }
      //    let qobj ={};
      //     let query = this.getquery();
      //     delete query.searchType;
      //     this.ptype =''
      let data = {}
      const titarr = []
      let tit = ''
      switch (it) {
        case 'effect':
          this.effect.forEach(item => {
            for (let i = 0; i < arr.length; i++) {
              if (item['value'] === arr[i]) {
                titarr.push(item['valueName'])
              }
            }
          })
          tit = `${titarr.join(' or ')}`
          this.query['status'] = arr.join(',')
          data = Object.assign({}, this.query)
          this.conditions.push({
            name: '专利有效性',
            type: 'effect',
            title: tit
          })
          this['is_' + it] = false
          break
        case 'category':
          this.category.forEach(item => {
            for (let i = 0; i < arr.length; i++) {
              if (item['value'] === arr[i]) {
                titarr.push(item['valueName'])
              }
            }
          })
          if (this.whichcategory === 1) {
            this.query['ipcSectionList'] = arr.join(',')
            tit = `${titarr.join(' or ')}`
          }
          if (this.whichcategory === 2) {
            this.query['ipcClassList'] = arr.join(',')
            tit = `${titarr.join(' or ')}`
          }
          if (this.whichcategory === 3) {
            this.query['ipcSubclassList'] = arr.join(',')
            tit = `${titarr.join(' or ')}`
          }
          data = Object.assign({}, this.query)
          this.conditions.push({
            name: 'IPC分类号',
            type: 'category',
            title: tit
          })
          this['is_' + it] = false
          break
        case 'apply':
          this.apply.forEach(item => {
            for (let i = 0; i < arr.length; i++) {
              if (item['value'] === arr[i]) {
                titarr.push(item['valueName'])
              }
            }
          })
          tit = `${titarr.join(' or ')}`
          this.query['apType'] = arr.join(',')
          data = Object.assign({}, this.query)
          this.conditions.push({
            name: '中国申请人类型',
            type: 'apply',
            title: tit
          })
          this['is_' + it] = false
          break
        case 'province':
          this.province.forEach(item => {
            for (let i = 0; i < arr.length; i++) {
              if (item['value'] === arr[i]) {
                titarr.push(item['valueName'])
              }
            }
          })
          tit = `${titarr.join(' or ')}`
          this.query['apProvince'] = arr.join(',')
          data = Object.assign({}, this.query)
          this.conditions.push({
            name: '中国省市',
            type: 'province',
            title: tit
          })
          this['is_' + it] = false
          break
        case 'public':
          this.publiclist.forEach(item => {
            for (let i = 0; i < arr.length; i++) {
              if (item['value'] === arr[i]) {
                titarr.push(item['valueName'])
              }
            }
          })
          tit = `${titarr.join(' or ')}`
          this.query['pdYear'] = arr.join(',')
          data = Object.assign({}, this.query)
          this.conditions.push({
            name: '公开(公告日)',
            type: 'public',
            title: tit
          })
          this['is_' + it] = false
          break
        case 'applyer':
          this.applyer.forEach(item => {
            for (let i = 0; i < arr.length; i++) {
              if (item['value'] === arr[i]) {
                titarr.push(item['valueName'])
              }
            }
          })
          tit = `${titarr.join(' or ')}`
          this.query['pa'] = arr.join(',')
          data = Object.assign({}, this.query)
          this.conditions.push({
            name: '申请人(TOP10)',
            type: 'applyer',
            title: tit
          })
          this['is_' + it] = false
          break
        case 'applyday':
          this.applyday.forEach(item => {
            for (let i = 0; i < arr.length; i++) {
              if (item['value'] === arr[i]) {
                titarr.push(item['valueName'])
              }
            }
          })
          tit = `${titarr.join(' or ')}`
          this.query['adYear'] = arr.join(',')
          data = Object.assign({}, this.query)
          this.conditions.push({
            name: '申请日(年)',
            type: 'applyday',
            title: tit
          })
          this['is_' + it] = false
          break
        case 'agent':
          this.agent.forEach(item => {
            for (let i = 0; i < arr.length; i++) {
              if (item['value'] === arr[i]) {
                titarr.push(item['valueName'])
              }
            }
          })
          tit = `${titarr.join(' or ')}`
          this.query['ag'] = arr.join(',')
          data = Object.assign({}, this.query)
          this.conditions.push({
            name: '代理机构',
            type: 'agent',
            title: tit
          })
          this['is_' + it] = false
          break
        case 'years':
          this.years.forEach(item => {
            for (let i = 0; i < arr.length; i++) {
              if (item['value'] === arr[i]) {
                titarr.push(item['valueName'])
              }
            }
          })
          tit = `${titarr.join(' or ')}`
          this.query['maintenedYear'] = arr.join(',')
          data = Object.assign({}, this.query)
          this.conditions.push({
            name: '维持年限',
            type: 'years',
            title: tit
          })
          this['is_' + it] = false
          break
        case 'hangye':
          this.hangyearr.forEach(item => {
            for (let i = 0; i < arr.length; i++) {
              if (item['value'] === arr[i]) {
                titarr.push(item['valueName'])
              }
            }
          })

          if (this.hangye === 1) {
            this.query['nationCatclass'] = arr.join(',')
            tit = `${titarr.join(' or ')}`
          }
          if (this.hangye === 2) {
            this.query['nationMainclass'] = arr.join(',')
            tit = `${titarr.join(' or ')}`
          }
          if (this.hangye === 3) {
            this.query['nationSubclass'] = arr.join(',')
            tit = `${titarr.join(' or ')}`
          }
          data = Object.assign({}, this.query)
          console.log(data)
          this.conditions.push({
            name: '国民经济行业分类',
            type: 'hangye',
            title: tit
          })
          this['is_' + it] = false
          break
        case 'zhufenlei':
          this.zhufenleiarr.forEach(item => {
            for (let i = 0; i < arr.length; i++) {
              if (item['value'] === arr[i]) {
                titarr.push(item['valueName'])
              }
            }
          })
          tit = `${titarr.join(' or ')}`
          if (this.zhufenlei === 1) {
            this.query['ipcSection'] = arr.join(',')
          }
          if (this.zhufenlei === 2) {
            this.query['ipcClass'] = arr.join(',')
          }
          if (this.zhufenlei === 3) {
            this.query['ipcSubclass'] = arr.join(',')
          }
          data = Object.assign({}, this.query)
          console.log(data)
          this.conditions.push({
            name: 'IPC主分类号',
            type: 'zhufenlei',
            title: tit
          })
          this['is_' + it] = false
          break
        case 'fenlei':
          this.fenleiarr.forEach(item => {
            for (let i = 0; i < arr.length; i++) {
              if (item['value'] === arr[i]) {
                titarr.push(item['valueName'])
              }
            }
          })
          tit = `${titarr.join(' or ')}`
          if (this.fenlei === 1) {
            this.query['cpcSection'] = arr.join(',')
          }
          if (this.fenlei === 2) {
            this.query['cpcClass'] = arr.join(',')
          }
          if (this.fenlei === 3) {
            this.query['cpcSubclass'] = arr.join(',')
          }
          data = Object.assign({}, this.query)
          console.log(data)
          this.conditions.push({
            name: 'CPC分类号',
            type: 'fenlei',
            title: tit
          })
          this['is_' + it] = false
          break
        case 'faming':
          this.famingarr.forEach(item => {
            for (let i = 0; i < arr.length; i++) {
              if (item['value'] === arr[i]) {
                titarr.push(item['valueName'])
              }
            }
          })
          tit = `${titarr.join(' or ')}`
          this.query['in'] = arr.join(',')
          data = Object.assign({}, this.query)
          this.conditions.push({
            name: '发明设计人',
            type: 'faming',
            title: tit
          })
          this['is_' + it] = false
          break
        case 'zhuanli':
          this.zhuanliarr.forEach(item => {
            for (let i = 0; i < arr.length; i++) {
              if (item['value'] === arr[i]) {
                titarr.push(item['valueName'])
              }
            }
          })
          tit = `${titarr.join(' or ')}`
          this.query['patentee'] = arr.join(',')
          data = Object.assign({}, this.query)
          this.conditions.push({
            name: '当前专利权/人',
            type: 'zhuanli',
            title: tit
          })
          this['is_' + it] = false
          break
      }

      //    this.$router.replace({query:this.query})
      //    this.getOrderList(this.query);
      delete this.query['specialView']
      this.searchpage(true)
      this.getarea()
    },
    handleCurrentChange() {
      // this.pgIndex = i
      this.searchpage()
    },
    searchpage(isf) {
      // delete ret.searchType
      // var pg = {
      //     pgIndex: this.pgIndex,
      //     pgCount: this.pgCount
      // };
      // var data = Object.assign({},this.query,pg);
      // this.$router.replace({query: data})
      // this.getOrderList(data)

      this.query.pgIndex = isf ? 1 : this.pgIndex
      this.query.pgCount = this.pgCount
      this.$router.replace({ query: this.query })
      this.getOrderList(this.query)
    },
    getOrderList(paramsData) {
      paramsData = paramsData || {}
      this.loading = true
      this.$shttp
        .get(patentUrl, { params: paramsData })
        .then(resp => {
          this.loading = false
          var data = resp
          var dataList = data.elements
          // if(this.patent){
          //     dataList.forEach(item=>{

          //         item.abstractDesc = item.abstractDesc.replace(this.patent,'<span style="color:red">'+this.patent+'</span>')
          //         item.title = item.abstractDesc.replace(this.title,'<span style="color:red">'+this.patent+'</span>')
          //         item.abstractDesc = item.abstractDesc.replace(this.patent,'<span style="color:red">'+this.patent+'</span>')
          //     })
          // }
          this.dataList = dataList
          this.pgIndex = data.pageNum || 1
          this.total = data.totalElements
        })
        .catch(err => {
          this.loading = false
          Toast(err.response.data.msg)
        })
    },
    getarea() {
      const query = {
        staticField: 'dac,f-kind',
        specialView: true
      }
      const data = Object.assign({}, this.query, query)
      this.$shttp.get(queryUrl, { params: data }).then(response => {
        const arr = []
        if (response && response.length) {
          response.forEach(item => {
            item.checked = []
            item.ischeck = false
            if (item.value === 'WO') {
              item.list = null
            }
            arr.push(item)
          })
        }
        this.list = arr
      })
    },
    resets() {
      this.checkedTypes = []
      this.checkedCountries = []
      this.conditions = []
      if (this.query.searchType === 1) {
        delete this.query['dac']
        delete this.query['fKind']
      }
      this.is_effect = true
      this.is_category = true
      this.is_apply = true
      this.is_province = true
      this.is_public = true
      this.is_applyer = true
      this.is_applyday = true
      this.is_agent = true
      this.is_years = true
      this.is_hangye = true
      this.is_zhufenlei = true
      this.is_fenlei = true
      this.is_faming = true
      this.is_zhuanli = true
      this.allshow = true
      this.effect_show = false
      this.category_show = false
      this.apply_show = false
      this.province_show = false
      this.public_show = false
      this.applyer_show = false
      this.applyday_show = false
      this.agent_show = false
      this.years_show = false
      this.hangye_show = false
      this.zhufenlei_show = false
      this.fenlei_show = false
      this.faming_show = false
      this.zhuanli_show = false

      this.effect_checked = []
      this.category_checked = []
      this.apply_checked = []
      this.province_checked = []
      this.public_checked = []
      this.applyer_checked = []
      this.applyday_checked = []
      this.agent_checked = []
      this.years_checked = []
      this.hangye_checked = []
      this.zhufenlei_checked = []
      this.fenlei_checked = []
      this.faming_checked = []
      this.zhuanli_checked = []
      delete this.query['status']
      delete this.query['ipcSectionList']
      delete this.query['ipcClassList']
      delete this.query['ipcSubclassList']
      delete this.query['apType']
      delete this.query['apProvince']
      delete this.query['pdYear']
      delete this.query['pa']
      delete this.query['adYear']
      delete this.query['ag']
      delete this.query['maintenedYear']
      delete this.query['nationCatclass']
      delete this.query['nationMainclass']
      delete this.query['nationSubclass']
      delete this.query['ipcSection']
      delete this.query['ipcClass']
      delete this.query['ipcSubclass']
      delete this.query['cpcSection']
      delete this.query['cpcClass']
      delete this.query['cpcSubclass']
      if (this.query.searchType === 1) {
        delete this.query['in']
      }

      delete this.query['patentee']
      delete this.query['staticField']
      delete this.query['specialView']
    },
    exportlist() {
      if (!this.total) {
        Toast('当前没有搜索结果')
        return
      }
      this.exporting = false
      this.exportshow = true
    },
    startexport() {
      const equery = Object.assign({}, this.query)
      equery.userId = this.userInfo().id
      delete equery.searchType
      this.exporting = true
      this.$shttp.get('/api/batchExportQueryByKeyword', { params: equery }).then(res => {
        this.exportshow = false
        setTimeout(() => {
          window.open(res.url)
        }, 500)
        
      }).catch(err => {
        this.exporting = false
        Toast(err.response.data.msg || '导出失败，请重试')
      })
      // const url = rootConfig.rootUrl + '/api/exportQueryByKeyword?' + (equery) + '&userId=' + this.userInfo().id
      // window.open(url)
    }
  },
  created(){
    this.getquery()
    // const info = this.userInfo()
    // if (judgeState() && info) {
    //   const num = info.batchExport - 0
    //   if (num === 1) {
    //     this.isexportall = true
    //   }
    //   console.log(info)
    // }
  },
  mounted() {
    
    this.resets()
    this.searchpage()
    this.getarea()
    // window.parent.postMessage(
    //     document.documentElement.scrollHeight + 'px',
    //     '*'
    // );
    // console.log(document.documentElement.scrollHeight)
  }
}
</script>

<style lang="less">
// @import '../../assets/css/common';
.patentsearchlistsebe {
  padding: 50px 15px;
  ul, h3, p {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .fl {
    float: left;
  }
  .fr {
    float: right;
  }
  .color-red {
    color: red;
  }
  .clearfix:after {
    content: '';
    display: block;
    clear: both
  }
  button {
    padding: 0;
    margin: 0;
  }
  .comsearchbtn {
    width: 60px;
    height: 40px;
    text-align: center;
  }
  .patentsearch {
    padding-bottom: 50px;
  }
  .exportallbox {
    padding: 20px 50px;
    h3 {
      font-size: 16px;
      font-weight: 400;
      margin-bottom: 30px;
    }
    .startbtnbox {
      text-align: right;
      font-size: 0;
      > span {
        display: inline-block;
        width: 120px;
        height: 40px;
        font-size: 14px;
        background-color: #2f72d1;
        color: #fff;
        border-radius: 4px;
        text-align: center;
        line-height: 40px;
        cursor: pointer;
      }
    }
    .loadingbox {
      margin-bottom: 20px;
      text-align: center;
      color: #999;
      font-size: 0px;
      .spiner {
        display: inline-block;
        width: 100px;
        height: 100px;
        background: url('../../assets/img/uploader/Spinner.gif') center center no-repeat;
        background-size: 100% 100%;
      }
    }
    .exportintr {
      text-align: center;
      font-size: 14px;
      color: #666;
      margin-bottom: 20px;
    }
    .exportwarn {
      text-align: center;
      color: #f00;
      font-size: 16px;
    }
  }


.patent-search-result {
  background-color: #fff;
  .top {
    padding: 15px 0 10px;
    border-bottom: 1px solid #eee;
  }
  .middle {
    padding-top: 10px;
  }
  .counts {
    padding-top: 16px;
    font-size: 16px;
  }
  .sortlist {
    color: #999;
    > span {
      display: inline-block;
      font-size: 14px;
      padding: 0 10px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border: 1px solid #eee;
      margin-left: 10px;
      border-radius: 2px;
      cursor: pointer;
      i {
        display: inline-block;
        width: 6px;
      }
      .active {
        color: red;
      }
    }
    .exportall {
      background-color: #2f72d1;
      color: #fff;
    }
    .totop {
      width: 14px;
      height: 14px;
      color: #ccc;
    }
    .todown {
      width: 14px;
      height: 14px;
      color: #ccc;
    }
    .exportbtn {
      img {
        vertical-align: middle;
        width: 16px;
        height: 16px;
      }
      em {
        font-style: normal;
        vertical-align: middle;
      }
    }
    .confirmbox {
      padding: 10px 0;
      text-align: right;
      span {
        display: inline-block;
        width: 60px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 14px;
        cursor: pointer;
        border-radius: 4px;
      }
      .no {
        margin-right: 20px;
        border: 1px solid #379dea;
        color: #379dea;
      }
      .yes {
        background-color: #379dea;
        color: #fff;
      }
    }
    .exportbtnbox {
      padding-bottom: 30px;
      border-bottom: 1px solid #eee;
      p {
        font-size: 12px;
        color: #999;
        padding-left: 20px;
      }
      .itembox {
        margin-bottom: 20px;
        padding-left: 20px;
        .left {
          margin-right: 20px;
          line-height: 20px;
        }
        .left:before {
          content: '*';
          color: red;
        }
      }
      .exportcount {
        min-width: 220px;
        white-space: nowrap;
        line-height: 24px;
        input {
          width: 100px;
          height: 28px;
          padding: 4px;
          border: 1px solid #eee;
        }
      }
    }
  }
  .leftcondition {
    width: 100%;
    padding-right: 5px;
    .morefenleibox {
      position: fixed;
      padding: 15px;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      z-index: 9;
      background: rgba(0, 0, 0, 0.5);
      .closemore {
        position: absolute;
        right: 20px;
        top: 20px;
        font-size: 20px;
        color: #333;
      }
      .fenleibox {
        box-sizing: border-box;
        position: absolute;
        width: 300px;
        padding: 20px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;
      }
      .fenlei {
        font-size: 12px;
        margin-bottom: 20px;
        h3 {
          font-size: 14px;
          font-weight: normal;
          margin-bottom: 10px;
        }
      }
    }
    
    .van-checkbox {
      margin: 4px 0;
    }
    .countryiconbox {
      float: left;
      width: 20px;
      height: 18px;
      padding: 0;
      margin: 0;
      margin-right: 5px;
      vertical-align: middle;
      img {
        width: 100%;
        height: 100%;
        vertical-align: top;
      }
    }
  }
  .rightlist {
    width: 100%;
    font-size: 12px;
    > li {
      padding: 10px 15px;
      border: 1px solid #eee;
      margin-bottom: 5px;
    }
    p {
      font-size: 12px;
      color: #999;
      display: -webkit-box;
      overflow: hidden;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
    }
    .info {
        > li {
          line-height: 16px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 12px;
          margin-bottom: 5px;
          &:last-child {
            margin-bottom: 0;
          }
        }
        .collect {
          float: right;
          vertical-align: middle;
          line-height: 14px;
          font-size: 14px;
          cursor: pointer;
          .shou {
            color: #379dea;
          }
        }
      }
    .topcont {
      margin-bottom: 10px;
      overflow: hidden;
      color: #666;
      .picbox {
        float: left;
        width: 75px;
        height: 75px;
        background-color: #f5f5f5;
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      .intr {
        float: right;
        width: 225px;
        h3 {
          overflow: hidden;
          font-weight: normal
        }
        
        .state {
          display: inline-block;
          padding: 0 10px;
          height: 15px;
          text-align: center;
          line-height: 16px;
          font-size: 12px;
          color: #fff;
          background-color: #379dea;
          border-radius: 10px;
          vertical-align: middle;
        }
        .tit {
          display: inline-block;
          width: 100%;
          font-size: 12px;
          
          line-height: 15px;
          vertical-align: middle;
          cursor: pointer;
        }
      }
    }
  }
  .bread {
    padding: 10px 0;
    color: #333;
    font-size: 14px;
    span {
      vertical-align: middle;
    }
    .gaojicondition {
      display: inline-block;
      max-width: 300px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .screening {
    display: inline-block;
    width: 60px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border: 1px solid #379dea;
    color: #379dea;
    font-size: 14px;
    margin-bottom: 10px;
    cursor: pointer;
  }
  .screeningbox {
    padding-left: 15px;
    padding-top: 5px;
    background-color: #f5f5f5;
    border: 1px solid #eee;
    > strong {
      display: block;
      font-weight: bold;
      color: #000;
      line-height: 30px;
      font-size: 14px;
    }
    span {
      float: left;
      box-sizing: border-box;
      width: 48%;
      padding: 5px;
      line-height: 15px;
      margin-bottom: 5px;
      height: 25px;
      background-color: #fff;
      color: #999;
      border: 1px solid #eee;
      font-size: 12px;
      position: relative;
      margin-right: 2%;
      .itemconditon {
        width: 90%;
        float: left;
        font-style: normal;
        vertical-align: middle;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .icon {
        float: right;
        padding: 3px;
        margin-left: 10px;
        font-size: 14px;
        /* margin-left: 10px; */
        text-align: center;
        overflow: hidden;
        color: #ccc;
        font-weight: normal;
        cursor: pointer;
      }
    }
  }
}

.search-box {
  width: 100%;
  .senior {
    height: 32px;
    margin: 0;
    line-height: 32px;
    color: #1890ff;
    cursor: pointer;
    font-size: 16px;
    .jiansuo {
      margin-right: 20px;
    }
    .bdsjiansuo {
      position: relative;
      .new {
        position: absolute;
        right: 0;
        top: -32px;
        width: 60px;
        height: 24px;
        text-align: center;
        line-height: 24px;
        color: #fff;
        font-size: 16px;
        background-color: #f66;
        border-radius: 2px;
        .sanjiao {
          position: absolute;
          left: 26px;
          bottom: -6px;
          width: 0;
          height: 0;
          overflow: hidden;
          border-width: 6px 6px 0;
          border-color: #f66 transparent;
          border-style: solid dashed;
        }
      }
    }
  }
}
.left-search {
  position: relative;
  width: 100%;
  .btnboxs {
    display: flex;
    width: 100%;
    > input {
      box-sizing: border-box;
      flex: 1;
      height: 40px;
      padding: 5px 10px;
      border: 1px solid #f5f5f5;
      border-radius: 2px;
      font-size: 14px;
      line-height: 30px;
    }
    > span {
      display: inline-block;
      width: 80px;
      height: 40px;
      background-color: #1890ff;
      color: #fff;
      text-align: center;
      font-size: 14px;
      line-height: 40px;
    }
  }
  
}
.areas {
  width: 100%;
  padding-top: 10px;
  font-size: 12px;
  margin-bottom: 10px;
}
.search-select {
  width: 700px;
  height: 40px;
  font-size: 0;
  span {
    float: left;
    width: 102px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border: 1px solid #eee;
    font-size: 14px;
    cursor: pointer;
  }
  span.active {
    border: none;
    background-color: #379dea;
    color: #fff;
  }
}
.search-area {
  border: 1px solid #eee;
  font-size: 14px;
  .all {
    padding: 5px;
    border-bottom: 1px solid #eee;
  }
  .china {
    padding: 5px 5px 5px 15px;
    .van-checkbox + .van-checkbox {
      margin-left: 0;
    }
    .labelbox {
      float: left;
      max-width: 150px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .itemcount {
      float: left;
      vertical-align: middle;
    }
    .van-checkbox {
      width: 100%;
      overflow: hidden;
      /* text-overflow: ellipsis; */
      .van-checkbox__label {
        width: 100%;
        line-height: 18px;
        vertical-align: middle;
      }
    }
  }
  .world {
    padding: 5px 5px 5px 15px;
  }
}
.search-conditons {
  font-size: 12px;
  .van-checkbox + .van-checkbox {
    margin-left: 0;
  }
  .itemcount {
    float: right;
    /* margin-left: 30px; */
  }
  > li {
    padding-right: 5px;
    line-height: 30px;
    font-size: 14px;
    border-bottom: 1px solid #eee;
    cursor: pointer;
    .itembox {
      padding-left: 15px;
      .labelbox {
        float: left;
        max-width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .van-checkbox {
        width: 100%;
        overflow: hidden;
        line-height: 20px;
        /* text-overflow: ellipsis; */
        .van-checkbox__label {
          width: 90%;
          line-height: 18px;
          vertical-align: middle;
        }
        .van-checkbox__input {
          vertical-align: middle
        }
      }
    }
    .iconbox {
      float: right;
      width: 14px;
      height: 14px;
      color: #999;
      cursor: pointer;
    }
  }
}
.nodata {
  width: 100%;
  border: 1px solid #eee;
  text-align: center;
  line-height: 100px;
  font-size: 14px;
}
}
</style>
