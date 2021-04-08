<template>
  <div class="expsearchsebe">
    <div class="seniorconditions">
      <div class="countries">
        <div class="all">
          <van-checkbox shape="square" v-model="all">全部国家和地区</van-checkbox>
        </div>
        <div class="allcountry">
          <div class="each" v-for="(item, index) in list" :key="index">
            <van-checkbox shape="square" v-model="item.ischeck" @change="dosome(item)"  :title="item.valueName">
                <span class="countryiconbox" v-if="item.icon"><img :src="item.icon" alt=""/></span><span style="vertical-align:middle;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;display:inline-block;max-width:150px;">{{ item.valueName }}</span><span style="vertical-align:middle">({{ item.value }})</span>
            </van-checkbox>
            <div style="padding-left: 30px;" v-if="item.list">
              <van-checkbox-group v-model="item.checked" @change="check(item)">
                <van-checkbox shape="square" v-for="t in item.list" :name="t.value" :key="t.value">{{ t.valueName }}</van-checkbox>
              </van-checkbox-group>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="tabsbtn">
          <span  @click="qiehuan('1')"  :class="{active: current === '1'}">简单检索</span>
          <span  @click="qiehuan('2')"  :class="{active: current === '2'}">高级检索</span>
          <span  @click="qiehuan('3')"  :class="{active: current === '3'}">表达式检索</span>
        </div>
        <div v-if="current === '3'" class="forms clearfix">
          <div class="bdstitle">
            <h3>检索表达式 <span class="help" @click="helpshow = true"><span>使用帮助</span><span class="helpmark">?</span></span></h3>
            <p>
              <van-field
                v-model="expression"
                rows="1"
                autosize
                type="textarea"
                placeholder="请输入需要检索的内容，或直接编辑表达式"
              />
            </p>
            <div class="bdsbtns">
              <span class="jiansuo" @click="jiansuo">检索</span><span class="qingkong" @click="clearexpression">清空</span><span class="lishi" @click="openhistory">历史检索式</span>
            </div>
          </div>
          
          <div class="allzdbox">
            <div class="scbds">
              <span class="scbdsbtn" @click="createbds">生成检索式</span>
            </div>
            <div class="itemsearch">
              <h3 class="itemsearchtitle">号码 <span class="openorclose" v-show="hmshow" @click="closeitem('hm')">收起</span><span class="openorclose" v-show="!hmshow" @click="openitem('hm')">打开</span></h3>
              <div class="clearfix" v-show="hmshow">
                <div class="itemsearcheach fl">
                  <div class="itemsearchit clearfix">
                    <div class="itemsearchlabel fl">
                      申请号
                    </div>
                    <ul class="itemsearchlist fl">
                      <li>
                        <div class="itemsearchtype">
                          <select v-model="sqhtype">
                            <option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</option>
                          </select>
                        </div>
                        <div class="itemsearchval">
                          <input v-model="sqhval" />
                        </div>
                        <div class="addbtn" @click="additem('sqh')">
                          +
                        </div>
                      </li>
                      <li v-for="(it, key) in sqhaddlist" :key="it.id">
                        <div class="itemsearchtype">
                          <select v-model="it.type">
                            <option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</option>
                          </select>
                        </div>
                        <div class="itemsearchval">
                          <input v-model="it.value" />
                        </div>
                        <div class="addbtn" @click="delitem('sqh',key)">
                          -
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="itemsearchit clearfix">
                    <div class="itemsearchlabel fl">
                      优先权号
                    </div>
                    <ul class="itemsearchlist fl">
                      <li>
                        <div class="itemsearchtype">
                          <select v-model="yxqhtype">
                            <option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</option>
                          </select>
                        </div>
                        <div class="itemsearchval">
                          <input v-model="yxqhval" />
                        </div>
                        <div class="addbtn" @click="additem('yxqh')">
                          +
                        </div>
                      </li>
                      <li v-for="(it, key) in yxqhaddlist" :key="it.id">
                        <div class="itemsearchtype">
                          <select v-model="it.type">
                            <option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</option>
                          </select>
                        </div>
                        <div class="itemsearchval">
                          <input v-model="it.value" />
                        </div>
                        <div class="addbtn" @click="delitem('yxqh',key)">
                          -
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="itemsearcheach fr">
                  <div class="itemsearchit clearfix">
                    <div class="itemsearchlabel fl">
                      公开号
                    </div>
                    <ul class="itemsearchlist fl">
                      <li>
                        <div class="itemsearchtype">
                          <select v-model="gkhtype">
                            <option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</option>
                          </select>
                        </div>
                        <div class="itemsearchval">
                          <input v-model="gkhval" class="sqh" />
                        </div>
                        <div class="addbtn" @click="additem('gkh')">
                          +
                        </div>
                      </li>
                      <li v-for="(it, key) in gkhaddlist" :key="it.id">
                        <div class="itemsearchtype">
                          <select v-model="it.type">
                            <option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</option>
                          </select>
                        </div>
                        <div class="itemsearchval">
                          <input v-model="it.value">
                        </div>
                        <div class="addbtn" @click="delitem('gkh',key)">
                          -
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="itemsearch">
              <h3 class="itemsearchtitle">名称地址<span class="openorclose" v-show="mcdzshow" @click="closeitem('mcdz')">收起</span><span class="openorclose" v-show="!mcdzshow" @click="openitem('mcdz')">打开</span></h3>
              <div class="clearfix" v-show="mcdzshow">
                <div class="itemsearcheach fl">
                  <div class="itemsearchit clearfix">
                    <div class="itemsearchlabel fl">
                      申请人
                    </div>
                    <ul class="itemsearchlist fl">
                      <li>
                        <div class="itemsearchtype">
                          <select v-model="sqrentype">
                            <option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</option>
                          </select>
                        </div>
                        <div class="itemsearchval">
                          <input v-model="sqrenval">
                        </div>
                        <div class="addbtn" @click="additem('sqren')">
                          +
                        </div>
                      </li>
                      <li v-for="(it, key) in sqrenaddlist" :key="it.id">
                        <div class="itemsearchtype">
                          <select v-model="it.type">
                            <option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</option>
                          </select>
                        </div>
                        <div class="itemsearchval">
                          <input v-model="it.value">
                        </div>
                        <div class="addbtn" @click="delitem('sqren',key)">
                          -
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="itemsearchit clearfix">
                    <div class="itemsearchlabel fl">
                      代理人
                    </div>
                    <ul class="itemsearchlist fl">
                      <li>
                        <div class="itemsearchtype">
                          <select v-model="dlrtype">
                            <option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</option>
                          </select>
                        </div>
                        <div class="itemsearchval">
                          <input v-model="dlrval">
                        </div>
                        <div class="addbtn" @click="additem('dlr')">
                          +
                        </div>
                      </li>
                      <li v-for="(it, key) in dlraddlist" :key="it.id">
                        <div class="itemsearchtype">
                          <select v-model="it.type">
                            <option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</option>
                          </select>
                        </div>
                        <div class="itemsearchval">
                          <input v-model="it.value">
                        </div>
                        <div class="addbtn" @click="delitem('dlr',key)">
                          -
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="itemsearchit clearfix">
                    <div class="itemsearchlabel fl">
                      申请人国别
                    </div>
                    <ul class="itemsearchlist fl">
                      <li>
                        <div class="itemsearchtype">
                          <select v-model="sqgbtype">
                            <option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</option>
                          </select>
                        </div>
                        <div class="itemsearchval">
                          <select v-model="sqgbval">
                            <option v-for="it in list" :key="it.value" :value="it.value" :label="it.valueName">{{it.valueName}}</option>
                          </select>
                          <!-- <input v-model="sqgbval"> -->
                        </div>
                        <div class="addbtn" @click="additem('sqgb')">
                          +
                        </div>
                      </li>
                      <li v-for="(it, key) in sqgbaddlist" :key="it.id">
                        <div class="itemsearchtype">
                          <select v-model="it.type">
                            <option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</option>
                          </select>
                        </div>
                        <div class="itemsearchval">
                          <select v-model="it.value">
                            <option v-for="its in list" :key="its.value" :value="its.value" :label="its.valueName">{{its.valueName}}</option>
                          </select>
                          <!-- <input v-model="it.value"> -->
                        </div>
                        <div class="addbtn" @click="delitem('sqgb',key)">
                          -
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="itemsearchit clearfix">
                    <div class="itemsearchlabel fl">
                      申请人省
                    </div>
                    <ul class="itemsearchlist fl">
                      <li>
                        <div class="itemsearchtype">
                          <select v-model="sqsstype">
                            <option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</option>
                          </select>
                        </div>
                        <div class="itemsearchval">
                          <input v-model="sqssval">
                        </div>
                        <div class="addbtn" @click="additem('sqss')">
                          +
                        </div>
                      </li>
                      <li v-for="(it, key) in sqssaddlist" :key="it.id">
                        <div class="itemsearchtype">
                          <select v-model="it.type">
                            <option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</option>
                          </select>
                        </div>
                        <div class="itemsearchval">
                          <input v-model="it.value">
                        </div>
                        <div class="addbtn" @click="delitem('sqss',key)">
                          -
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="itemsearcheach fr">
                  <div class="itemsearchit clearfix">
                    <div class="itemsearchlabel fl">
                      发明人
                    </div>
                    <ul class="itemsearchlist fl">
                      <li>
                        <div class="itemsearchtype">
                          <select v-model="fmrtype">
                            <option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</option>
                          </select>
                        </div>
                        <div class="itemsearchval">
                          <input v-model="fmrval">
                        </div>
                        <div class="addbtn" @click="additem('fmr')">
                          +
                        </div>
                      </li>
                      <li v-for="(it, key) in fmraddlist" :key="it.id">
                        <div class="itemsearchtype">
                          <select v-model="it.type">
                            <option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</option>
                          </select>
                        </div>
                        <div class="itemsearchval">
                          <input v-model="it.value">
                        </div>
                        <div class="addbtn" @click="delitem('fmr',key)">
                          -
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="itemsearchit clearfix">
                    <div class="itemsearchlabel fl">
                      代理机构
                    </div>
                    <ul class="itemsearchlist fl">
                      <li>
                        <div class="itemsearchtype">
                          <select v-model="dljgtype">
                            <option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</option>
                          </select>
                        </div>
                        <div class="itemsearchval">
                          <input v-model="dljgval" class="sqh">
                        </div>
                        <div class="addbtn" @click="additem('dljg')">
                          +
                        </div>
                      </li>
                      <li v-for="(it, key) in dljgaddlist" :key="it.id">
                        <div class="itemsearchtype">
                          <select v-model="it.type">
                            <option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</option>
                          </select>
                        </div>
                        <div class="itemsearchval">
                          <input v-model="it.value">
                        </div>
                        <div class="addbtn" @click="delitem('dljg',key)">
                          -
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="itemsearchit clearfix">
                    <div class="itemsearchlabel fl">
                      发明人国别
                    </div>
                    <ul class="itemsearchlist fl">
                      <li>
                        <div class="itemsearchtype">
                          <select v-model="fmgbtype">
                            <option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</option>
                          </select>
                        </div>
                        <div class="itemsearchval">
                          <select v-model="fmgbval">
                            <option v-for="it in list" :key="it.value" :value="it.value" :label="it.valueName">{{it.valueName}}</option>
                          </select>
                          <!-- <input v-model="fmgbval"> -->
                        </div>
                        <div class="addbtn" @click="additem('fmgb')">
                          +
                        </div>
                      </li>
                      <li v-for="(it, key) in fmgbaddlist" :key="it.id">
                        <div class="itemsearchtype">
                          <select v-model="it.type">
                            <option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</option>
                          </select>
                        </div>
                        <div class="itemsearchval">
                          <select v-model="it.value">
                            <option v-for="its in list" :key="its.value" :value="its.value" :label="its.valueName">{{its.valueName}}</option>
                          </select>
                          <!-- <input v-model="it.value"> -->
                        </div>
                        <div class="addbtn" @click="delitem('fmgb',key)">
                          -
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="itemsearchit clearfix">
                    <div class="itemsearchlabel fl">
                      申请人市
                    </div>
                    <ul class="itemsearchlist fl">
                      <li>
                        <div class="itemsearchtype">
                          <select v-model="sqshitype">
                            <option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</option>
                          </select>
                        </div>
                        <div class="itemsearchval">
                          <input v-model="sqshival">
                        </div>
                        <div class="addbtn" @click="additem('sqshi')">
                          +
                        </div>
                      </li>
                      <li v-for="(it, key) in sqshiaddlist" :key="it.id">
                        <div class="itemsearchtype">
                          <select v-model="it.type">
                            <option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</option>
                          </select>
                        </div>
                        <div class="itemsearchval">
                          <input v-model="it.value">
                        </div>
                        <div class="addbtn" @click="delitem('sqshi',key)">
                          -
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="itemsearch">
              <h3 class="itemsearchtitle">关键字 <span class="openorclose" v-show="gjzshow" @click="closeitem('gjz')">收起</span><span class="openorclose" v-show="!gjzshow" @click="openitem('gjz')">打开</span></h3>
              <div class="clearfix" v-show="gjzshow">
                <div class="itemsearcheach fl">
                  <div class="itemsearchit clearfix">
                    <div class="itemsearchlabel fl">
                      所有字段
                    </div>
                    <ul class="itemsearchlist fl">
                      <li>
                        <div class="itemsearchtype">
                          <select v-model="sytype">
                            <option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</option>
                          </select>
                        </div>
                        <div class="itemsearchval">
                          <input v-model="syval">
                        </div>
                        <div class="addbtn" @click="additem('sy')">
                          +
                        </div>
                      </li>
                      <li v-for="(it, key) in syaddlist" :key="it.id">
                        <div class="itemsearchtype">
                          <select v-model="it.type">
                            <option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</option>
                          </select>
                        </div>
                        <div class="itemsearchval">
                          <input v-model="it.value">
                        </div>
                        <div class="addbtn" @click="delitem('sy',key)">
                          -
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="itemsearchit clearfix">
                    <div class="itemsearchlabel fl">
                      摘要
                    </div>
                    <ul class="itemsearchlist fl">
                      <li>
                        <div class="itemsearchtype">
                          <select v-model="zytype">
                            <option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</option>
                          </select>
                        </div>
                        <div class="itemsearchval">
                          <input v-model="zyval" class="sqh">
                        </div>
                        <div class="addbtn" @click="additem('zy')">
                          +
                        </div>
                      </li>
                      <li v-for="(it, key) in zyaddlist" :key="it.id">
                        <div class="itemsearchtype">
                          <select v-model="it.type">
                            <option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</option>
                          </select>
                        </div>
                        <div class="itemsearchval">
                          <input v-model="it.value">
                        </div>
                        <div class="addbtn" @click="delitem('zy',key)">
                          -
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="itemsearchit clearfix">
                    <div class="itemsearchlabel fl">
                      说明书
                    </div>
                    <ul class="itemsearchlist fl">
                      <li>
                        <div class="itemsearchtype">
                          <select v-model="smshutype">
                            <option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</option>
                          </select>
                        </div>
                        <div class="itemsearchval">
                          <input v-model="smshuval">
                        </div>
                        <div class="addbtn" @click="additem('smshu')">
                          +
                        </div>
                      </li>
                      <li v-for="(it, key) in smshuaddlist" :key="it.id">
                        <div class="itemsearchtype">
                          <select v-model="it.type">
                            <option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</option>
                          </select>
                        </div>
                        <div class="itemsearchval">
                          <input v-model="it.value">
                        </div>
                        <div class="addbtn" @click="delitem('smshu',key)">
                          -
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="itemsearcheach fr">
                  <div class="itemsearchit clearfix">
                    <div class="itemsearchlabel fl">
                      专利名称
                    </div>
                    <ul class="itemsearchlist fl">
                      <li>
                        <div class="itemsearchtype">
                          <select v-model="zlmctype">
                            <option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</option>
                          </select>
                        </div>
                        <div class="itemsearchval">
                          <input v-model="zlmcval">
                        </div>
                        <div class="addbtn" @click="additem('zlmc')">
                          +
                        </div>
                      </li>
                      <li v-for="(it, key) in zlmcaddlist" :key="it.id">
                        <div class="itemsearchtype">
                          <select v-model="it.type">
                            <option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</option>
                          </select>
                        </div>
                        <div class="itemsearchval">
                          <input v-model="it.value">
                        </div>
                        <div class="addbtn" @click="delitem('zlmc',key)">
                          -
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="itemsearchit clearfix">
                    <div class="itemsearchlabel fl">
                      权利要求
                    </div>
                    <ul class="itemsearchlist fl">
                      <li>
                        <div class="itemsearchtype">
                          <select v-model="qlyqtype">
                            <option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</option>
                          </select>
                        </div>
                        <div class="itemsearchval">
                          <input v-model="qlyqval" class="sqh">
                        </div>
                        <div class="addbtn" @click="additem('qlyq')">
                          +
                        </div>
                      </li>
                      <li v-for="(it, key) in qlyqaddlist" :key="it.id">
                        <div class="itemsearchtype">
                          <select v-model="it.type">
                            <option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</option>
                          </select>
                        </div>
                        <div class="itemsearchval">
                          <input v-model="it.value">
                        </div>
                        <div class="addbtn" @click="delitem('qlyq',key)">
                          -
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="itemsearch">
              <h3 class="itemsearchtitle">日期 <span class="openorclose" v-show="rqshow" @click="closeitem('rq')">收起</span><span class="openorclose" v-show="!rqshow" @click="openitem('rq')">打开</span></h3>
              <div class="clearfix" v-show="rqshow">
                <div class="itemsearcheachline">
                  <div class="itemsearchit clearfix">
                    <div class="itemsearchlabel fl">
                      申请日
                    </div>
                    <ul class="itemsearchlist fl">
                      <li>
                        <div class="itemsearchtype">
                          <select v-model="sqrtype">
                            <option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</option>
                          </select>
                        </div>
                        <div class="itemsearchvalline">
                          <span class="fl start"><input v-model="sqrval.start" /></span>
                          <span class="fl zhi">至</span>
                          <span class="fl end"><input v-model="sqrval.end" /></span>
                          <!-- <el-date-picker
                            v-model="sqrval"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                          >
                          </el-date-picker> -->
                        </div>
                        <div class="addbtn" @click="additemdate('sqr')">
                          +
                        </div>
                      </li>
                      <li v-for="(it, key) in sqraddlist" :key="it.id">
                        <div class="itemsearchtype">
                          <select v-model="it.type">
                            <option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</option>
                          </select>
                        </div>
                        <div class="itemsearchvalline">
                          <span class="fl start"><input v-model="it['value']['start']"></span>
                          <span class="fl zhi">至</span>
                          <span class="fl end"><input v-model="it['value']['end']"></span>
                          <!-- <el-date-picker
                            v-model="it.value"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                          >
                          </el-date-picker> -->
                        </div>
                        <div class="addbtn" @click="delitem('sqr',key)">
                          -
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="itemsearchit clearfix">
                    <div class="itemsearchlabel fl">
                      公开日
                    </div>
                    <ul class="itemsearchlist fl">
                      <li>
                        <div class="itemsearchtype">
                          <select v-model="gkrtype">
                            <option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</option>
                          </select>
                        </div>
                        <div class="itemsearchvalline">
                          <span class="fl start"><input v-model="gkrval.start"></span>
                          <span class="fl zhi">至</span>
                          <span class="fl end"><input v-model="gkrval.end"></span>
                          <!-- <el-date-picker
                            v-model="gkrval"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                          >
                          </el-date-picker> -->
                        </div>
                        <div class="addbtn" @click="additemdate('gkr')">
                          +
                        </div>
                      </li>
                      <li v-for="(it, key) in gkraddlist" :key="it.id">
                        <div class="itemsearchtype">
                          <select v-model="it.type">
                            <option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</option>
                          </select>
                        </div>
                        <div class="itemsearchvalline">
                          <span class="fl start"><input v-model="it['value']['start']"></span>
                          <span class="fl zhi">至</span>
                          <span class="fl end"><input v-model="it['value']['end']"></span>
                          <!-- <el-date-picker
                            v-model="it.value"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                          >
                          </el-date-picker> -->
                        </div>
                        <div class="addbtn" @click="delitem('gkr',key)">
                          -
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="itemsearchit clearfix">
                    <div class="itemsearchlabel fl">
                      转让年
                    </div>
                    <ul class="itemsearchlist fl">
                      <li>
                        <div class="itemsearchtype">
                          <select v-model="zrntype">
                            <option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</option>
                          </select>
                        </div>
                        <div class="itemsearchvalline">
                          <input v-model="zrnval">
                        </div>
                        <div class="addbtn" @click="additem('zrn')">
                          +
                        </div>
                      </li>
                      <li v-for="(it, key) in zrnaddlist" :key="it.id">
                        <div class="itemsearchtype">
                          <select v-model="it.type">
                            <option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</option>
                          </select>
                        </div>
                        <div class="itemsearchvalline">
                          <input v-model="it.value">
                        </div>
                        <div class="addbtn" @click="delitem('zrn',key)">
                          -
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="itemsearchit clearfix">
                    <div class="itemsearchlabel fl">
                      许可年
                    </div>
                    <ul class="itemsearchlist fl">
                      <li>
                        <div class="itemsearchtype">
                          <select v-model="xkntype">
                            <option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</option>
                          </select>
                        </div>
                        <div class="itemsearchvalline">
                          <input v-model="xknval">
                        </div>
                        <div class="addbtn" @click="additem('xkn')">
                          +
                        </div>
                      </li>
                      <li v-for="(it, key) in xknaddlist" :key="it.id">
                        <div class="itemsearchtype">
                          <select v-model="it.type">
                            <option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</option>
                          </select>
                        </div>
                        <div class="itemsearchvalline">
                          <input v-model="it.value">
                        </div>
                        <div class="addbtn" @click="delitem('xkn',key)">
                          -
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="itemsearchit clearfix">
                    <div class="itemsearchlabel fl">
                      质押年
                    </div>
                    <ul class="itemsearchlist fl">
                      <li>
                        <div class="itemsearchtype">
                          <select v-model="zyntype">
                            <option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</option>
                          </select>
                        </div>
                        <div class="itemsearchvalline">
                          <input v-model="zynval">
                        </div>
                        <div class="addbtn" @click="additem('zyn')">
                          +
                        </div>
                      </li>
                      <li v-for="(it, key) in zynaddlist" :key="it.id">
                        <div class="itemsearchtype">
                          <select v-model="it.type">
                            <option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</option>
                          </select>
                        </div>
                        <div class="itemsearchvalline">
                          <input v-model="it.value">
                        </div>
                        <div class="addbtn" @click="delitem('zyn',key)">
                          -
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="itemsearch" style="margin-bottom: 0;">
              <h3 class="itemsearchtitle">分类号 <span class="openorclose" v-show="flhshow" @click="closeitem('flh')">收起</span><span class="openorclose" v-show="!flhshow" @click="openitem('flh')">打开</span></h3>
              <div class="clearfix" v-show="flhshow">
                <div class="itemsearcheach fl">
                  <div class="itemsearchit clearfix">
                    <div class="itemsearchlabel fl">
                      IPC分类号
                    </div>
                    <ul class="itemsearchlist fl">
                      <li>
                        <div class="itemsearchtype">
                          <select v-model="ipctype">
                            <option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</option>
                          </select>
                        </div>
                        <div class="itemsearchval">
                          <input v-model="ipcval" class="sqh">
                        </div>
                        <div class="addbtn" @click="additem('ipc')">
                          +
                        </div>
                      </li>
                      <li v-for="(it, key) in ipcaddlist" :key="it.id">
                        <div class="itemsearchtype">
                          <select v-model="it.type">
                            <option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</option>
                          </select>
                        </div>
                        <div class="itemsearchval">
                          <input v-model="it.value">
                        </div>
                        <div class="addbtn" @click="delitem('ipc',key)">
                          -
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="itemsearchit clearfix">
                    <div class="itemsearchlabel fl">
                      国民经济分类
                    </div>
                    <ul class="itemsearchlist fl">
                      <li>
                        <div class="itemsearchtype">
                          <select v-model="gmjjtype">
                            <option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</option>
                          </select>
                        </div>
                        <div class="itemsearchval">
                          <input v-model="gmjjval">
                        </div>
                        <div class="addbtn" @click="additem('gmjj')">
                          +
                        </div>
                      </li>
                      <li v-for="(it, key) in gmjjaddlist" :key="it.id">
                        <div class="itemsearchtype">
                          <select v-model="it.type">
                            <option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</option>
                          </select>
                        </div>
                        <div class="itemsearchval">
                          <input v-model="it.value">
                        </div>
                        <div class="addbtn" @click="delitem('gmjj',key)">
                          -
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="itemsearcheach fr">
                  <div class="itemsearchit clearfix">
                    <div class="itemsearchlabel fl">
                      CPC分类号
                    </div>
                    <ul class="itemsearchlist fl">
                      <li>
                        <div class="itemsearchtype">
                          <select v-model="cpctype">
                            <option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</option>
                          </select>
                        </div>
                        <div class="itemsearchval">
                          <input v-model="cpcval">
                        </div>
                        <div class="addbtn" @click="additem('cpc')">
                          +
                        </div>
                      </li>
                      <li v-for="(it, key) in cpcaddlist" :key="it.id">
                        <div class="itemsearchtype">
                          <select v-model="it.type">
                            <option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</option>
                          </select>
                        </div>
                        <div class="itemsearchval">
                          <input v-model="it.value">
                        </div>
                        <div class="addbtn" @click="delitem('cpc',key)">
                          -
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="scbds">
              <span class="scbdsbtn" @click="createbds">生成检索式</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="helppicbox" v-if="helpshow" @click="helpshow = false">
      <div class="helppic" >
        <img src="@assets/img/bz.png" alt="">
      </div>
    </div>
    <div v-if="historyshow" class="result_typebox">
        <div class="tablebox">
            <div class="historyclose"><i class="el-icon-close" @click="closehistory"></i></div>
            <table class="result_type">
                <thead>
                    <tr class="thead">
                        <th width="100" class="firstone"><van-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleAllCheckChange">全选</van-checkbox></th>
                        <th width="640">表达式</th>
                        <th width="100">检索库</th>
                        <th width="100">命中数</th>
                        <th width="150">检索时间</th>
                        <th width="60">操作</th>
                    </tr>
                </thead>
                <tbody class="tr-color">
                    <tr :class="{hover:item.checked}" v-for="(item, index) in dataList" v-show="!loading && dataList.length" :key="index">
                        <td class="firstone"><van-checkbox v-model="item.checked" @change="handleCheckChange(item)"></van-checkbox></td>
                        <td :title="item.expression">{{item.expression}}</td>
                        <td>{{item.searchDatabase}}</td>
                        <td>{{item.hits}}</td>
                        <td>{{item.createTime | dateFormat }}</td>
                        <td class="alignc action">
                            <a href="#" class="view" @click.prevent="topatent(item)">查看</a>
                        </td>
                    </tr>
                    <tr class="empty" v-show="!loading && !dataList.length">
                        <td colspan="6" class="norecord">
                            <div class="empty_ic"><span>暂无信息</span></div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div class="opbtns" v-if="dataList.length && !loading"><span class="delbtn" @click="delall">删除</span><span class="join">合并：</span><span class="andbtn" @click="joinall('AND')">AND</span><span class="orbtn" @click="joinall('OR')">OR</span></div>
        </div>
    </div>
  </div>
</template>

<script>
// import { judgeState } from '@utils/util.js'
import filters from '@utils/filters.js'
// import $ from 'jquery'
const cityUrl = '/api/queryProvinceCity'
const condition = {
  an: null,
  pn: null,
  applicantSearch: null,
  in: null,
  cl: null,
  ab: null,
  ic: null,
  agentOrgSearch: null,
  agentSearch: null,
  ti: null,
  dz: null
}
const treeData = [
  {
    id: 0,
    label: '全部国家',
    children: [
      {
        id: 2,
        label: '中国',
        children: [
          {
            id: 21,
            label: '发明'
          },
          {
            id: 22,
            label: '实用新型'
          },
          {
            id: 23,
            label: '外观设计'
          }
        ]
      },
      {
        id: 3,
        label: '美国'
      },
      {
        id: 4,
        label: '日本'
      },
      {
        id: 5,
        label: '韩国'
      },
      {
        id: 6,
        label: '欧专局'
      },
      {
        id: 7,
        label: '英国'
      },
      {
        id: 8,
        label: '法国'
      },
      {
        id: 9,
        label: '俄罗斯'
      },
      {
        id: 10,
        label: '其他国家和地区'
      }
    ]
  }
]

export default {
  data() {
    return {
      sqh: false,
      helpshow: false,
      historyshow: false,
      loading: false,
      dataList: [],
      selectedItems: [],
      options: [],
      date1: '',
      date2: '',
      expression: '',
      selectopts: [
        'AND','OR','NOT'
      ],
      sf: [],
      'ap-province': '',
      'ap-city': '',
      hasprovince: true,
      all: true,
      label: ['普通搜索', '高级搜索'],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      cities: [
        { name: '国内', key: '1' },
        { name: '国外', key: '2' }
      ],
      checkedCities: [],
      cont: '',
      cobj: { ...condition },
      ishow: false,
      treeData: treeData,
      current: '3',
      
      checklist: [],
      defaultExpandedKeys: [],
      defaultCheckedKeys: [],
      checkedKeys: [],
      curSelectedSmallIdList: [],
      sqdate: 0,
      gkdate: 0,
      
      tabs: [
        { name: '简单检索', id: 1 },
        { name: '高级检索', id: 2 },
        { name: '检索式检索', id: 3 }
      ],
      list: [
        {
          field: 'dac',
          value: 'CN',
          valueName: '中国',
          count: 15329459,
          percent: '55.95',
          ischeck: false,
          checked: [],
          icon: 'http://open.sipop.cn/dataplatpro/static/sipop/images/country/CN.png',
          list: [
            { field: 'f-kind', value: '01', valueName: '发明专利', count: 9516527, percent: '62.08', icon: null },
            { field: 'f-kind', value: '02', valueName: '实用新型', count: 9516527, percent: '62.08', icon: null },
            { field: 'f-kind', value: '03', valueName: '外观设计', count: 5812932, percent: '37.92', icon: null }
          ]
        },
        {
          field: 'dac',
          value: 'US',
          valueName: '美国',
          icon: 'http://open.sipop.cn/dataplatpro/static/sipop/images/country/US.png',
          ischeck: false,
          list: null
        },
        {
          field: 'dac',
          value: 'JP',
          valueName: '日本',
          icon: 'http://open.sipop.cn/dataplatpro/static/sipop/images/country/JP.png',
          ischeck: false,
          list: null
        },
        {
          field: 'dac',
          value: 'KR',
          valueName: '韩国',
          icon: 'http://open.sipop.cn/dataplatpro/static/sipop/images/country/KR.png',
          ischeck: false,
          list: null
        },
        {
          field: 'dac',
          value: 'EP',
          valueName: '欧专局',
          icon: 'http://open.sipop.cn/dataplatpro/static/sipop/images/country/EP.png',
          ischeck: false,
          list: null
        },
        {
          field: 'dac',
          value: 'WO',
          valueName: '世界知识产权组织',
          icon: 'http://open.sipop.cn/dataplatpro/static/sipop/images/country/WO.png',
          ischeck: false,
          list: null
        },
        // {
        //     field: "dac", value: "GB", valueName: "英国",
        //     icon: "http://open.sipop.cn/dataplatpro/static/sipop/images/country/GB.png",
        //     ischeck: false,
        //     list: null
        // },
        // {
        //     field: "dac", value: "FR", valueName: "法国",
        //     icon: "http://open.sipop.cn/dataplatpro/static/sipop/images/country/FR.png",
        //     ischeck: false,
        //     list: null
        // },
        // {
        //     field: "dac", value: "RU", valueName: "俄罗斯",
        //     icon: "http://open.sipop.cn/dataplatpro/static/sipop/images/country/RU.png",
        //     ischeck: false,
        //     list: null
        // },
        {
          field: 'dac',
          value: 'ELSE',
          valueName: '其他国家和地区',
          count: 1559,
          percent: '5.95',
          icon: null,
          ischeck: false,
          list: null
        }
      ],
      // 申请号
      sqhtype: 'AND',
      sqhval: '',
      sqhaddlist: [],
      // 公开号
      gkhtype: 'AND',
      gkhval: '',
      gkhaddlist: [],
      // 优先权号
      yxqhtype: 'AND',
      yxqhval: '',
      yxqhaddlist: [],
      // 申请人
      sqrentype: 'AND',
      sqrenval: '',
      sqrenaddlist: [],
      // 发明人
      fmrtype: 'AND',
      fmrval: '',
      fmraddlist: [],
      // 代理人
      dlrtype: 'AND',
      dlrval: '',
      dlraddlist: [],
      // 代理机构
      dljgtype: 'AND',
      dljgval: '',
      dljgaddlist: [],
      // 申请人国别
      sqgbtype: 'AND',
      sqgbval: '',
      sqgbaddlist: [],
      // 发明人国别
      fmgbtype: 'AND',
      fmgbval: '',
      fmgbaddlist: [],
      // 申请人省市
      sqsstype: 'AND',
      sqssval: '',
      sqssaddlist: [],
      sqshitype: 'AND',
      sqshival: '',
      sqshiaddlist: [],
      // 所有字段
      sytype: 'AND',
      syval: '',
      syaddlist: [],
      // 专利名称
      zlmctype: 'AND',
      zlmcval: '',
      zlmcaddlist: [],
      // 摘要
      zytype: 'AND',
      zyval: '',
      zyaddlist: [],
      // 权利要求
      qlyqtype: 'AND',
      qlyqval: '',
      qlyqaddlist: [],
      // 说明书
      smshutype: 'AND',
      smshuval: '',
      smshuaddlist: [],
      // 申请日
      sqrtype: 'AND',
      sqrval: {
        start: '',
        end: ''
      },
      sqraddlist: [],
      // 公开日
      gkrtype: 'AND',
      gkrval: {
        start: '',
        end: ''
      },
      gkraddlist: [],
      // 转让年
      zrntype: 'AND',
      zrnval: '',
      zrnaddlist: [],
      // 许可年
      xkntype: 'AND',
      xknval: '',
      xknaddlist: [],
      // 质押年
      zyntype: 'AND',
      zynval: '',
      zynaddlist: [],
      // IPC分类号
      ipctype: 'AND',
      ipcval: '',
      ipcaddlist: [],
      // CPC分类号
      cpctype: 'AND',
      cpcval: '',
      cpcaddlist: [],
      // 国民经济分类
      gmjjtype: 'AND',
      gmjjval: '',
      gmjjaddlist: [],
      hmshow: true,
      mcdzshow: true,
      gjzshow: true,
      rqshow: true,
      flhshow: true,
      isIndeterminate: false,
      checkAll: false

    }
  },
  watch: {
    all() {
      this.list.forEach(item => {
        item.ischeck = this.all
        this.dosome(item)
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
    }
  },
  filters: {
      dateFormat: filters.formatDate.datesFormat
  },
  methods: {
    topatent(item) {
      const ret = this.getkeys()
      const re = ret.re
      const type = ret.type
      const queryobj = {}
      if (re.length) {
        const str = re.join(',')
        queryobj.dac = str
      }
      if (type.length) {
        const strt = type.join(',')
        queryobj.fKind = strt
      }
      queryobj.expression = item.expression
      queryobj.searchType = 3
      const url = '/portal/search/patent-searchlist?' + this.objtostr(queryobj)
      window.open(url)
      // this.$router.push({ path: '/portal/search/patent-searchlist', query: queryobj })
    },
    clearall() {
      // 申请号
      this.sqhval = ''
      this.sqhaddlist = []
      // 公开号
      this.gkhval = ''
      this.gkhaddlist = []
      // 优先权号
      this.yxqhval = ''
      this.yxqhaddlist = []
      // 申请人
      this.sqrenval = ''
      this.sqrenaddlist = []
      // 发明人
      this.fmrval = ''
      this.fmraddlist = []
      // 代理人
      this.dlrval = ''
      this.dlraddlist = []
      // 代理机构
      this.dljgval = ''
      this.dljgaddlist = []
      // 申请人国别
      this.sqgbval = ''
      this.sqgbaddlist = []
      // 发明人国别
      this.fmgbval = ''
      this.fmgbaddlist = []
      // 申请人省市
      this.sqssval = ''
      this.sqssaddlist = []
      this.sqshival = ''
      this.sqshiaddlist = []
      // 所有字段
      this.syval = ''
      this.syaddlist = []
      // 专利名称
      this.zlmcval = ''
      this.zlmcaddlist = []
      // 摘要
      this.zyval = ''
      this.zyaddlist = []
      // 权利要求
      this.qlyqval = ''
      this.qlyqaddlist = []
      // 说明书
      this.smshuval = ''
      this.smshuaddlist = []
      // 申请日
      this.sqrval = {
        start: '',
        end: ''
      }
      this.sqraddlist = []
      // 公开日
      this.gkrval = {
        start: '',
        end: ''
      }
      this.gkraddlist = []
      // 转让年
      this.zrnval = ''
      this.zrnaddlist = []
      // 许可年
      this.xknval = ''
      this.xknaddlist = []
      // 质押年
      this.zynval = ''
      this.zynaddlist = []
      // IPC分类号
      this.ipcval = ''
      this.ipcaddlist = []
      // CPC分类号
      this.cpcval = ''
      this.cpcaddlist = []
      // 国民经济分类
      this.gmjjval = ''
      this.gmjjaddlist = []
    },
    openhistory() {
        this.getOrderList()
    },
    closehistory() {
        this.selectedItems = []
        this.checkAll = false
        this.historyshow = false
    },
    delall() {
        if (!this.selectedItems.length) {
            this.$messagesebe.warning('请选中记录')
            return 
        }
        this.$confirmsebe('您确定删除选中记录吗？', '提示', {
            type: 'warning'
        }).then(() => {
            const arr = []
            this.selectedItems.forEach(item => {
                arr.push(item.id)
            })
            const str = arr.join(',')
            this.$shttp.delete('/api/deleteExpressionHistory?ids=' + str).then(res => {
                this.$messagesebe.success('删除成功')
                this.selectedItems = []
                this.getOrderList()
            }).catch(err => {
                this.$messagesebe.error(err.response.data.msg || '操作失败')
            })
        })
        
    },
    joinall(tp) {
        if (this.selectedItems.length < 2) {
            this.$messagesebe.warning('请至少选中2条记录')
            return 
        }
        const ret = this.getkeys()
        const re = ret.re
        const type = ret.type
        const queryobj = {}
        if (re.length) {
            const str = re.join(',')
            queryobj.dac = str
        }
        if (type.length) {
            const strt = type.join(',')
            queryobj.fKind = strt
        }
        const arr = []
        this.selectedItems.forEach(item => {
            arr.push(item.expression)
        })
        queryobj.expression = arr.join(` ${tp} `)
        queryobj.searchType = 3
        const url = '/portal/search/patent-searchlist?' + this.objtostr(queryobj)
        window.open(url)
        // this.$router.push({ path: '/portal/search/patent-searchlist', query: queryobj })
    },
    getOrderList() {
        this.loading = true
        const listUrl = '/api/findExpressionHistoryList'
        this.$shttp.get(listUrl)
        .then((resp) => {
            this.loading = false
            var dataList = resp
            dataList.forEach((item, i) => {
                // var arr = this.selectedItems;
                // var idx = this.inArrayOf(arr, item, 'id');
                // item.checked = idx !== -1;
                item.checked = false
            })
            this.dataList = dataList
            this.historyshow = true
            // this.checkIsAll();
        })
        .catch((err) => {
            this.loading = false
            this.$messagesebe.error(err.response.data.msg || '获取失败')
        })
    },
    checkIsAllSelected() {
        var dataList = this.dataList
        var temp = 0
        dataList.forEach((item, i) => {
            if (item.checked) {
                temp += 1
            }
        })
        return temp === dataList.length
    },
    inArrayOf(arr, sortItem, sortName) {
        var ret = -1
        arr.forEach((item, i) => {
            if (item[sortName] === sortItem[sortName]) {
                ret = i
                return false
            }
        })
        return ret
    },
    handleCheckChange(item) {
        var arr = this.selectedItems
        var idx = this.inArrayOf(arr, item, 'id')
        if (idx !== -1) {
            arr.splice(idx, 1)
        } else {
            arr.push(item)
        }
        if (!item.checked) {
            this.isIndeterminate = true
        } else if (this.checkIsAllSelected()) {
            this.checkAll = true
            this.isIndeterminate = false
        }
        if (arr.length === 0) {
            this.checkAll = false
            this.isIndeterminate = false
        }
    },
    checkIsAll() {
        var self = this
        var arr = this.selectedItems
        var dataList = this.dataList
        var ret = true
        self.isIndeterminate = false
        self.checkAll = false
        // 没有获取到数据的时候选择框不选中
        if (dataList.length) {
            dataList.forEach((item, i) => {
                var idx = self.inArrayOf(arr, item, 'id')
                if (idx === -1) {
                    ret = false
                    return false
                }
            })
        } else {
            ret = false
        }
        self.checkAll = ret
    },
    handleAllCheckChange() {
        this.isIndeterminate = false
        var self = this
        var arr = this.selectedItems
        var dataList = this.dataList
        // 处理选中的数据
        dataList.forEach((item, i) => {
            var idx = self.inArrayOf(arr, item, 'id')
            if (self.checkAll) {
                item.checked = true
                if (idx === -1) {
                    arr.push(item)
                }
            } else {
                item.checked = false
                if (idx !== -1) {
                    arr.splice(idx, 1)
                }
            }
        })
    },
    closeitem(tp) {
      this[tp + 'show'] = false
    },
    openitem(tp) {
      this[tp + 'show'] = true
    },
    clearexpression() {
      this.expression = ''
    },
    arrtostr(arr, tp) {
      if (!arr.length || !arr) {
        return ''
      }
      let str = ` ${arr[0]['type']} ${tp}:(${arr[0]['value']}`
      if (arr.length === 1) {
        return str + ')'
      }
      for (let i = 1; i < arr.length; i++) {
        str += ` ${arr[i]['type']} ${arr[i]['value']}`
      }
      return str + ')' 
    },
    datetostr(d) {
      if (!d) {
        return null
      }
      const odate = new Date(d)
      const y = odate.getFullYear()
      const m = odate.getMonth() + 1
      const od = odate.getDate()
      const mm = m > 9 ? m : '0' + m
      const dd = od > 9 ? od : '0' + od 
      return y + mm + dd
    },
    arrdatetostr(arr, tp) {
      if (!arr.length || !arr) {
        return ''
      }
      let str = ''
      // if (arr[0]['value']['start'] && arr[0]['value']['end']) {
      //   str = ` ${arr[0]['type']} ${tp}:({${arr[0]['value']['start']} TO ${arr[0]['value']['end']}}`
      // }
      // if (arr[0]['value']['start'] && !arr[0]['value']['end']) {
      //   str = ` ${arr[0]['type']} ${tp}:(${arr[0]['value']['start']}`
      // }
      // if (!arr[0]['value']['start'] && arr[0]['value']['end']) {
      //   str = ` ${arr[0]['type']} ${tp}:(${arr[0]['value']['end']}}`
      // }
      
      // if (arr.length === 1) {
      //   return str + ')'
      // }
      // for (let i = 1; i < arr.length; i++) {
      //   let itstr = ''
      //   if (arr[i]['value']['start'] && arr[i]['value']['end']) {
      //   itstr = ` ${arr[i]['type']} {${arr[i]['value']['start']} To ${arr[i]['value']['end']}}`
      //   }
      //   if (arr[i]['value']['start'] && !arr[i]['value']['end']) {
      //     itstr = ` ${arr[i]['type']} ${arr[i]['value']['start']}`
      //   }
      //   if (!arr[i]['value']['start'] && arr[i]['value']['end']) {
      //     itstr = ` ${arr[i]['type']} ${arr[i]['value']['end']}`
      //   }
      //   str += itstr
      // }
      // return str + ')' 

      for (let i = 0; i < arr.length; i++) {
        let itstr = ''
        if (arr[i]['value']['start'] && arr[i]['value']['end']) {
          itstr = ` ${arr[i]['type']} ${tp}:({${arr[i]['value']['start']} TO ${arr[i]['value']['end']}})`
        }
        if (arr[i]['value']['start'] && !arr[i]['value']['end']) {
          itstr = ` ${arr[i]['type']} ${tp}:(${arr[i]['value']['start']})`
        }
        if (!arr[i]['value']['start'] && arr[i]['value']['end']) {
          itstr = ` ${arr[i]['type']} ${tp}:(${arr[i]['value']['end']})`
        }
        str += itstr
      }
      return str
    },
    createarr(tp) {
      const ret = []
      const arr = this[tp + 'addlist']
      const val = this[tp + 'val']
      const type = this[tp + 'type']
      if (tp === 'sqr' || tp === 'gkr') {
        if (!this.isempty(val)) {
          ret.push({ value: val, type: type })
        }
      } else {
        if (val) {
          ret.push({ value: val, type: type })
        }
      }
      if (arr.length) {
        arr.forEach((item) => {
          if (item.value) {
            ret.push(item)
          }
          
        })
      }
      return ret
    },
    createbds() {
      // 申请号 an
      const sqh = this.arrtostr(this.createarr('sqh'), 'anc-an')
      // 公开号 pn
      const gkh = this.arrtostr(this.createarr('gkh'), 'pnc-pn')
      // 优先权号 pr
      const yxqh = this.arrtostr(this.createarr('yxqh'), 'pr')
      // 申请人 pa
      const sqren = this.arrtostr(this.createarr('sqren'), 'pa')
      // 发明人 in
      const fmr = this.arrtostr(this.createarr('fmr'), 'in')
      // 代理人 at
      const dlr = this.arrtostr(this.createarr('dlr'), 'at')
      // 代理机构 ag
      const dljg = this.arrtostr(this.createarr('dljg'), 'ag')
      // 申请人国别 ap-country
      const sqgb = this.arrtostr(this.createarr('sqgb'), 'ap-country')
      // 发明人国别 in-country
      const fmgb = this.arrtostr(this.createarr('fmgb'), 'in-country')
      // 申请人省市 ap-province
      const sqss = this.arrtostr(this.createarr('sqss'), 'ap-province')
      const sqshi = this.arrtostr(this.createarr('sqshi'), 'ap-city')
      // 所有字段 all
      const sy = this.arrtostr(this.createarr('sy'), 'all')
      // 专利名称 ti
      const zlmc = this.arrtostr(this.createarr('zlmc'), 'ti')
      // 摘要 ab
      const zy = this.arrtostr(this.createarr('zy'), 'ab')
      // 权利要求 cl
      const qlyq = this.arrtostr(this.createarr('qlyq'), 'cl')
      // 说明书 ds
      const smshu = this.arrtostr(this.createarr('smshu'), 'ds')
      // 申请日 ad
      const sqr = this.arrdatetostr(this.createarr('sqr'), 'ad')
      // 公开日 pd
      const gkr = this.arrdatetostr(this.createarr('gkr'), 'pd')
      // 转让年 assignyear
      const zrn = this.arrtostr(this.createarr('zrn'), 'assignyear')
      // 许可年 licenseyear
      const xkn = this.arrtostr(this.createarr('xkn'), 'licenseyear')
      // 质押年 pled-year
      const zyn = this.arrtostr(this.createarr('zyn'), 'pled-year')
      // ipc分类号 ic
      const ipc = this.arrtostr(this.createarr('ipc'), 'ic')
      // cpc分类号 ipc-subgroup
      const cpc = this.arrtostr(this.createarr('cpc'), 'ipc-subgroup')
      // 国民经济分类 nation-class
      const gmjj = this.arrtostr(this.createarr('gmjj'), 'nation-class')
      const exp = sqh + gkh + yxqh + sqren + fmr + dlr + dljg + sqgb + fmgb + sqss + sqshi + sy + zlmc + zy + qlyq + smshu + sqr + gkr + zrn + xkn + zyn + ipc + cpc + gmjj
      if (!exp) {
        this.$messagesebe.warning('请先添加表达式条件')
        return 
      }
      this.expression = exp.replace(/^\s+(AND)|(OR)|(NOT)\s+/,'').replace(/^\s+/,'')
    },
    additem(tp) {
      const arr = this[tp + 'addlist']
      arr.push({
        type: 'AND',
        value: ''
      })
    },
    additemdate(tp) {
      const arr = this[tp + 'addlist']
      arr.push({
        type: 'AND',
        value: {
          start: '',
          end: ''
        }
      })
    },
    delitem(tp, key) {
      const arr = this[tp + 'addlist']
      arr.splice(key, 1)
    },
    getcity() {
      this.$shttp.get(cityUrl).then(res => {
        console.log(res)
        this.options = res
      })
    },
    doshow() {
      console.log(11111)
    },
    qiehuan(num) {
      
      if (num === '1') {
        this.$router.push({ name: 'PatentSearchShiBei' })
      } 
      if (num === '2') {
        this.$router.push({ name: 'SeniorSearchShibei' })
      }
    },
    jiansuo() {
      const ret = this.getkeys()
      const re = ret.re
      const type = ret.type
      const queryobj = {}
      if (re.length) {
        const str = re.join(',')
        queryobj.dac = str
      }
      if (type.length) {
        const strt = type.join(',')
        queryobj.fKind = strt
      }
      queryobj.expression = this.expression.replace(/^\s+/,'')
      queryobj.searchType = 3
      if (!this.expression) {
          this.$messagesebe.warning('请生成表达式后检索')
          return
      }
      // const storagestr = JSON.stringify(queryobj)
      // localStorage.setItem('patentSearchConditions', storagestr)
      const url = '/portal/search/patent-searchlist?' + this.objtostr(queryobj)
      window.open(url)
      // this.$router.push({ path: '/portal/search/patent-searchlist', query: queryobj })
    },
    objtostr(obj) {
      const arr = []
      for (var k in obj) {
        if (obj.hasOwnProperty(k)) {
          if (obj[k]) {
            const str = `${k}=${obj[k]}`
            arr.push(str)
          }
        }
      }
      return arr.join('&')
    },
    getkeys() {
      const re = []
      let type = []
      this.list.forEach(item => {
        if (item.ischeck) {
          re.push(item.value)
          if (item.checked && item.checked.length) {
            type = [...item.checked]
          }
        }
      })
      return { re, type }
    },
    dosome(it) {
      if (it.value === 'CN') {
        if (it.ischeck) {
          this.hasprovince = true
          const arr = []
          if (it['list'] && it['list'].length > 0) {
            it['list'].forEach(w => {
              arr.push(w['value'])
            })
          }
          it.checked = arr
        } else {
          this.hasprovince = false
          it.checked = []
        }
      }
    },
    isempty(obj) {
      for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
          if (obj[p]) {
            return false
          }
        }
      }
      return true
    },
    resets() {
      this.cobj = { ...condition }
      this.date1 = ''
      this.date2 = ''
      this.sf = []
      this.checkall()
    },
    check(it) {
      if (it['checked'].length > 0) {
        it['ischeck'] = true
        this.hasprovince = true
      } else {
        it['ischeck'] = false
        this.hasprovince = false
      }
    },
    checkall() {
      if (this.all) {
        this.hasprovince = true
        this.list.forEach(item => {
          item.ischeck = this.all
          if (item.list) {
            item.list.forEach(it => {
              if (this.all) {
                item.checked.push(it.value)
              } else {
                item.checked = []
              }
            })
          }
        })
      }
    },
    sethover() {
      const sqh = document.querySelectorAll('.sqh')
      const sqhbox = document.querySelectorAll('.popbox')
      if (sqh) {
      const len = sqh.length

      for (let i = 0; i < len; i++) {
        let timer = null
        sqh[i].onmouseover = function() {
          clearTimeout(timer)
          sqhbox[i].style.display = 'block'
        }
        sqh[i].onmouseout = function() {
          timer = setTimeout(() => {
            sqhbox[i].style.display = 'none'
          }, 200)
          sqhbox[i].onmouseover = function() {
            clearTimeout(timer)
            this.style.display = 'block'
          }
          sqhbox[i].onmouseout = function() {
            timer = setTimeout(() => {
              this.style.display = 'none'
            }, 100)
          }
        }
      }
      }
    }
  },
  created() {
      // if (!judgeState()) {
      //   this.$router.replace({ name: 'PatentSearchShiBei' })
      // }
  },
  mounted() {
    window.scrollTo(0, 0)
    this.checkall()
    this.sethover()
  }
}
</script>

<style lang="less">

.expsearchsebe {
  padding: 30px 15px;
  background-color: #fff;
  .clearfix:after {
    content: '';
    display: block;
    clear: both;
  }
  .seniorconditions {
    font-size: 12px;
    .countries {
      width: 100%;
      height: 360px;
      border: 1px solid #eee;
      .van-checkbox {
        margin: 5px 0;
      }
      .all {
        padding: 10px;
        border-bottom: 1px solid #eee;
      }
      .allcountry {
        padding: 10px;
      }
      .each {
        &:first-child {
          border-bottom: 1px solid #eee;
        }
      }
    }
    .forms {
      width: 100%;
    }
  }
  .countryiconbox {
    display: inline-block;
    width: 20px;
    height: 19px;
    padding: 2px 0;
    margin-right: 10px;
    margin-left: 5px;
    vertical-align: middle;
    img {
      width: 100%;
      height: 100%;
      vertical-align: top;
    }
  }
  .helppicbox {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    padding: 0 15px;
    background-color: rgba(51, 51, 51, 0.6);;
    z-index: 9999;
  }
  .helppic {
    position: absolute;
    width: 340px;
    height: 356px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    overflow: hidden;
    background-color: #fff;
    img {
      display: block;
      height: 100%;
    }
  }
  .input {
    position: relative;
  }
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  h3,
  p {
    padding: 0;
    margin: 0;
  }
  .fl {
    float: left;
  }
  .fr {
    float: right;
  }
  .allzdbox {
    border: 1px solid #DCDCDC;
  }
  .bdstitle {
    padding: 10px ;
    border: 1px solid #DCDCDC;
    background-color: #f5f5f5;
    margin-bottom: 15px;
    > h3 {
      position: relative;
      height: 26px;
      line-height: 26px;
      margin-bottom: 20px;
      font-size: 16px;
      font-weight: 600;
      .help {
        position: absolute;
        right: 0;
        top: 0;
        color: #2F72D1;
        font-size: 14px;
        font-weight: normal;
        cursor: pointer;
        > span {
          vertical-align: middle;
        }
        .helpmark {
          display: inline-block;
          width: 16px;
          height: 16px;
          margin-left: 5px;
          border-radius: 50%;
          background-color: #2F72D1;
          color: #fff;
          text-align: center;
          line-height: 16px;
          
        }
      }
    }
    > p {
      // padding: 15px;
      // min-height: 58px;
      font-size: 12px;
      line-height: 20px;
      background-color: #fff;
      color: #333;
      margin-bottom: 15px;
    }
  }
  .bdsbtns {
    font-size: 0;
    > span {
      box-sizing: border-box;
      display: inline-block;
      margin-right: 10px;
      height: 30px;
      padding: 0 20px;
      line-height: 30px;
      text-align: center;
      font-size: 14px;
      border-radius: 2px;
      cursor: pointer;
    }
    .jiansuo {
      background-color: #2F72D1;
      color: #fff;
    }
    .qingkong {
      color:#2F72D1;
      border: 1px solid #2F72D1;
    }
    .lishi {
      color: #2F72D1;
    }
    
  }
  .scbds {
    padding: 15px;
    overflow: hidden;
    .scbdsbtn {
      float: left;
      width: 100px;
      height: 30px;
      font-size: 14px;
      background-color: #2F72D1;
      color: #fff;
      cursor: pointer;
      text-align: center;
      line-height: 30px;
    }
  }
  .itemsearchtitle {
    position: relative;
    padding: 15px 0;
    font-size: 16px;
    font-weight: 600;
    .openorclose {
        position: absolute;
        right: 10px;
        top: 15px;
        color: #2F72D1;
        font-size: 14px;
        font-weight: normal;
        cursor: pointer;
    }
  }
  .itemsearch {
    padding: 0 10px;
    border-top: 1px solid #DCDCDC;
    border-bottom: 1px solid #DCDCDC;
    background-color: #f5f5f5;
    margin-bottom: 15px;
  }
  .itemsearchit {
    margin-bottom: 10px;
    // .select {
    //   height: 30px;
      
    // }
    // .input {
    //   height: 30px
    // }
    // .input__inner {
    //   height: 30px;
    // }
  }
  .itemsearcheach {
    width: 100%;
  }
  .itemsearcheachline {
    width: 100%;
  }
  .itemsearchlist {
    width: 240px;
  }
    .itemsearchlist > li {
      position: relative;
      height: 30px;
      vertical-align: middle;
      margin-bottom: 5px;
      select {
        display: inline-block;
        width: 100%;
        height: 30px;
        border: none;
        font-size: 12px;
        line-height: 30px;
        border-right: 1px solid #eee;
      }
      option {
        display: inline-block;
        border: none;
        line-height: 30px;
      }
    }
    .itemsearchlabel {
      width: 80px;
      text-align: left;
      font-size: 12px;
      line-height: 30px;
    }
    .itemsearchtype {
      width: 50px;
      float: left;
    }
    .addbtn {
      float: left;
      width: 30px;
      height: 30px;
      border-radius: 15px;
      background-color: #379dea;
      color: #fff;
      cursor: pointer;
      font-size: 20px;
      line-height: 30px;
      text-align: center;

    }
    .itemsearchval {
      width: 150px;
      height: 30px;
      margin-right: 10px;
      float: left;
      background-color: #fff;
      input {
        box-sizing: border-box;
        width: 100%;
        height: 30px;
        border: none;
        outline: none;
        color: #666;
        border-left: 1px solid #eee;
        font-size: 12px;
        padding: 5px 10px;
        border-radius: 2px;
        background: none;
      }
    }
    .itemsearchvalline {
      float: left;
      width: 150px;
      margin-right: 10px;
      input {
        box-sizing: border-box;
        width: 100%;
        height: 30px;
        border: none;
        outline: none;
        color: #666;
        border-left: 1px solid #eee;
        font-size: 12px;
        padding: 5px 0;
        border-radius: 2px;
        background: #fff;
      }
      .start {
        width: 65px;
      }
      .zhi {
        width: 20px;
        line-height: 30px;
        text-align: center;
        font-size: 12px;
      }
      .end {
        width: 65px;
      }
    }
  
  .tabsbtn {
    margin-top: 10px;
    margin-bottom: 20px;
    font-size: 0;
    > span {
      display: inline-block;
      width: 100px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background-color: #E9E9E9;
      color: #333;
      margin-right: 5px;
      font-size: 14px;
      cursor: pointer;
      &.active {
        background-color: #2F72D1;
        color: #fff;
      }
    }
  }
  .popbox {
    display: none;
    position: absolute;
    top: 44px;
    width: 100%;
    padding: 15px 10px;
    border-radius: 3px;
    background-color: #fff;
    font-size: 14px;
    box-shadow: 0 0 4px #ccc;
    color: #666;
    z-index: 9;
    > p {
      line-height: 20px;
      margin-bottom: 8px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  .result_typebox {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 2000;
    background-color: rgba(51, 51, 51, 0.6);
    .tablebox {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        padding: 15px;
        min-height: 300px;
        background-color: #fff;
        .opbtns {
            font-size: 0;
            > span {
                display: inline-block;
                width: 60px;
                height: 24px;
                text-align: center;
                line-height: 24px;
                font-size: 14px;
            }
            .delbtn {
                margin-right: 35px;
                background-color: #f66;
                color: #fff;
                border-radius: 2px;
                cursor: pointer;
            }
            .join {
                text-align: right;
                margin-right: 5px;
                color: #333;
            }
            .andbtn {
                margin-right: 10px;
                background-color: #2F72D1;
                color: #fff;
                border-radius: 2px;
                cursor: pointer;
            }
            .orbtn {
                background-color: #E9E9E9;
                border: 2px;
                color: #333;
                cursor: pointer;
            }
        }
    }
    .historyclose {
        height: 20px;
        margin-bottom: 25px;
        font-size: 20px;
        color: #333;
        .el-icon-close {
            float: right;
            cursor: pointer;
        }
    }
    .result_type {
        width: 100%;
        margin-bottom: 70px;
        border: 1px solid #E9E9E9;
        border-collapse: collapse;
        .thead {
            height: 52px;
            line-height: 52px;
            background-color: #E9E9E9;
            color: #666;
            th {
                text-align: center;
            }
            .firstone {
                text-align: left;
            }
        }
        tr {
            border-bottom: 1px solid #E9E9E9;
            &:last-child {
                border-bottom: none;
            }
            td {
                max-width: 640px;
                padding: 0 5px;
                text-align: center;
                color: #333;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .firstone {
                text-align: left;
                padding-left: 20px;
            }
        }
        
        .tr-color tr {
            line-height: 50px;
        }
        
    }
  }
}

</style>
