<template>
    <div class="protocol">
      <mheader></mheader>
      <div class="container content-fr">
        <div class="content">
            <div class="title">
              {{'注册协议'| translate}}
            </div>
          <div class="desc">
            <!-- <div class="desc-item" :key="index" v-for="(item,index) in contentArr">
              <div class="title">
                {{item.title}}
              </div>
              <div class="sub-desc-item" :key="jndex" v-for="(jtem,jndex) in item.arr">
                {{jtem}}
              </div>
            </div> -->
            <div class="desc-item">
              <div class="title">
                {{'第一章 总则' | translate}}
              </div>
              <div class="sub-desc-item">
                {{'msg1' | translate}}
              </div>
              <div class="sub-desc-item">
                {{'msg2' | translate}}
              </div>
            </div>
            <div class="desc-item">
              <div class="title">
                {{'第二章 新AMF会员进场须知' | translate}}
              </div>
              <div class="sub-desc-item">
                {{'msg3' | translate}}
              </div>
              <div class="sub-desc-item">
                {{'msg4' | translate}}
              </div>
              <div class="sub-desc-item">
                {{'msg5' | translate}}
              </div>
              <div class="sub-desc-item">
                {{'msg6' | translate}}
              </div>
              <div class="sub-desc-item">
                {{'msg7' | translate}}
              </div>
            </div>
            <div class="desc-item">
              <div class="title">
                {{'第三章 老AMF粉丝行为规范' | translate}}
              </div>
              <div class="sub-desc-item">
                {{'msg8' | translate}}
              </div>
              <div class="sub-desc-item">
                {{'msg9' | translate}}
              </div>
              <div class="sub-desc-item">
                {{'msg10' | translate}}
              </div>
              <div class="sub-desc-item">
                {{'msg11' | translate}}
              </div>
              <div class="sub-desc-item">
                {{'msg12' | translate}}
              </div>
            </div>
            <div class="desc-item">
              <div class="title">
                {{'第四章 严重声明事项' | translate}}
              </div>
              <div class="sub-desc-item">
                {{'msg13' | translate}}
              </div>
              <div class="sub-desc-item">
                {{'msg14' | translate}}
              </div>
              <div class="sub-desc-item">
                {{'msg15' | translate}}
              </div>
              <div class="sub-desc-item">
                {{'msg16' | translate}}
              </div>
            </div>
            <div class="desc-item">
              <div class="title">
                {{'第五章 温馨提示' | translate}}
              </div>
              <div class="sub-desc-item">
                {{'msg17' | translate}}
              </div>
              <div class="sub-desc-item">
                {{'msg18' | translate}}
              </div>
              <div class="sub-desc-item">
                {{'msg19' | translate}}
              </div>
              <div class="sub-desc-item">
                {{'msg20' | translate}}
              </div>
            </div>
            <div class="desc-item">
              <div class="title">
                {{'第六章 附则' | translate}}
              </div>
              <div class="sub-desc-item">
                {{'msg21' | translate}}
              </div>
              <div class="sub-desc-item">
                {{'msg22' | translate}}
              </div>
            </div>
          </div>
        </div>
        <p></p>
      </div>
    </div>
</template>
<style lang="less">
@import (reference) "../../style/css/main";
.protocol {
}
.protocol .content-fr {
  padding: 0 20/@rem;
}
.protocol .content {
  background-color: #fff;
  padding: 0 60/@rem;
}

.protocol .content > .title {
  text-align: center;
  font-size: 30px;
  line-height: 1;
  padding: 30px 0;
  border-bottom: 1px solid #e5e5e5;
}

.desc-item {
  padding: 20px 0 30px 0;
}
.desc-item .title {
  font-size: 16px;
  line-height: 2;
  color: #333;
}
.desc-item .sub-desc-item {
  font-size: 13px;
  color: #797979;
}

@media (min-width: 576px) {
}

// Medium devices (tablets, 768px and up)
@media (min-width: 768px) {
  .protocol .content-fr {
    padding: 0 200/@rem;
  }
}

// Large devices (desktops, 992px and up)
@media (min-width: 992px) {
}

// Extra large devices (large desktops, 1200px and up)
@media (min-width: 1199px) {
}
</style>
<script>
import { translate } from "@/tool/filters";

export default {
  data() {
    return {
      contentArr: [
        {
          title: "第一章 总则",
          arr: [
            "第一条 为能维护平台的稳定，切实保障到所有Ameriprise Financial（以下简称AMF）粉丝的共同利益，本着“AMF粉丝利益高于一切”和“稳定市场秩序高于一切”的宗旨，特制定本《AMF会员行为规范》。",
            "第二条 AMF是以互联网为交易平台的新型理财工具，AMF会员之间必须共同遵循平台的交易规则，通过AMF会员之间相互交易的方式，从而轻松愉快的学会理财，倍增财富。"
          ]
        },
        {
          title: "第二章 新AMF会员进场须知",
          arr: [
            "第三条 每位新人须在知情、自愿的前提下方可申请注册成为AMF会员，且认可和遵守平台交易规则，并承诺自己管理和操作自己的理财账户，不得以任何理由和借口委托他人代管及操作。",
            "第四条 注册账户必须是不影响自己和家庭生活的闲钱，不得使用借贷、挪用的款项以及非法所得用于AMF会员平台理财。",
            "第五条 AMF会员理财是一种新型理财模式，涉及到很多新的观念和知识，须有一至三个月的学习和领会时间，有意要进场参与理财的新人须承诺有一定的学习时间，能够参加平台组织的空中课堂的学习方可进场。",
            "第六条 如果你不是想来学习理财，误将AMF当直销或传销来做，投机取巧，指望一夜暴富者，请不要进场！",
            "第七条 AMF第三方交易平台是一个教会AMF会员学习用闲钱理财的互联网理财产品，不是投资理财平台，更不是直销平台。当自己还不明白或者说不清楚时，请不要做推广，因为你不仅不能说服人，反而会被消极者或自以为是的假内行影响，给AMF平台带来负面影响。"
          ]
        },
        {
          title: "第三章 老AMF粉丝行为规范",
          arr: [
            "第八条 正确理解和宣导AMF，规范讲解用语。积极使用平台推广用语。AMF是一个学习理财的平台，是合法的，更是安全的，不能说成是投资平台；AMF平台不是买卖产品，更不是直销和传销。",
            "第九条 每位AMF会员必须在第一时间学习相关理财基础知识，熟练掌握理财模式精髓，尤其是系统平台操作，因为这是每个AMF会员理财变现的必经途径。为保障每位AMF会员的合法权益，每个AMF会员须按时参加平台组织的地面和空中课堂学习，学习和掌握必须的专业知识和技能，及时了解平台和行业动态。无故不参加学习者将视为自动放弃旅游研讨资格。",
            "第九条 AMF会员在推广过程中，须严格遵循平台理念和文化，必须实事求是，不得夸大收益，蛊惑和利诱他人参与，如有违反，经查实后平台将冻结其账户。",
            "第十条 AMF会员重质不重量，每位AMF会员须配合平台抓好基础培训和晋级培训，认真复制，层层落实，新增一个务必教会一个！每一位老AMF会员做推广时须在第一时间让新粉丝熟悉交易规则，手把手教会所推荐新粉丝自己操作和管理账户。否则将受到相应处罚。平台不求速度，但求稳健；每位AMF会员须遵循低调运作原则一对一复制到位。平台管委会将定期或不定期进行抽查，不合格者一经发现将取消注册新账户资格或暂停分红。",
            "第十一条 AMF会员之间不得有金钱借贷和不正当关系。一经发现将冻结或者取消注册账户资格！",
            "第十二条 每位AMF会员都有维护平台形象的责任和义务，不得有损害平台形象的言行，积极传播正能量，不得传播消极言论。AMF是一个你中有我、我中有你的大家庭，树立“一荣俱荣、一损俱损”的价值观。"
          ]
        },
        {
          title: "第四章 严重声明事项",
          arr: [
            "第十三条 平台严禁AMF会员未经允许在微信群，朋友圈、QQ空间、QQ群发布和讲解AMF（平台组建的QQ群、微信群除外），希望所有AMF会员积极配合并严格遵照执行，如有违反平台规则将对群主冻结账户。",
            "第十四条 每个AMF会员的账户必须自己管理， 老AMF会员不得以任何理由和借口为别人代管账户。 一经发现将予以暂停分红、冻结账户直至取消账户的处罚。",
            "第十五条 严禁AMF会员在没有激活积分的情况下先预收新AMF会员的款项，如有违反者经查实后将取消推广资格。",
            "第十六条 AMF会员在买卖积分之前务必要先了解操作流程，然后按照正确的操作流程操作，因不正确操作造成的损失均由会员自行负责，平台不承担任何责任。"
          ]
        },
        {
          title: "第五章 温馨提示",
          arr: [
            "第十七条 行有不得，反求诸己，平台兴旺，人人有责！为了AMF的长治久安，请规范好自己的行为，服务好市场；用心感悟AMF平台、用心经营AMF会员，谨言慎行，切忌浮躁。",
            "第十八条 AMF平台是让我们一生的聚富而不是一夜暴富。AMF会员理财是需要随缘的，真正学会理人、理事、理财，切不可做有伤害AMF会员的事，说伤害AMF会员的话，只要我们遵守游戏规则，AMF平台会让我们长久受益。",
            "第十九条 每位AMF会员要切实理解并遵照循环往复原则进行操作，共同“护盘”和“扶盘”，防止大盘不正常的疯涨和盘震，让大盘遵循自然规律稳步前行。",
            "第二十条 AMF平台是我们共同的家园，维护平台稳定，人人有责。处罚不是目的而是手段，每位AMF会员均应做好自己的本份，用感恩之心做人、用助人之心做事。"
          ]
        },
        {
          title: "第六章 附则",
          arr: [
            "第二十一条 本行为规范经平台管委会、服务中心代表一致同意后通过并发布，以上各项各位AMF会员均应严格遵守。",
            "第二十二条 本行为规范最终解释权、修改权归AMF平台方所有。平台现有AMF会员及新增AMF会员平台均有权视为已经详细解读、认可并执行本行为规范。"
          ]
        }
      ]
    };
  },
  components: {
    mheader: () => import(/* webpackChunkName: "com" */ "@/components/head.vue")
  }
};
</script>
