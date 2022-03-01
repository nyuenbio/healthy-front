<template>
  <div class="popup">
    <div class="book" :class="{fullBook: goFull}">
      <h4>HPV分型基因检测</h4>
      <h4 style="margin-bottom: 1rem">知情同意书</h4>
      <p><span>1检测项目概况</span></p>
      <p>
        <span>1.1 宫颈癌是严重威胁女性健康的恶性肿瘤。</span>研究显示，99.7%的宫颈癌可能与HPV（人乳头瘤病毒）感染有关，持续反复的高危型HPV感染可能发展成宫颈癌前病变或宫颈癌，低危型HPV感染可能导致生殖道疣等良性病变。因此HPV检测己成为宫颈癌筛查的重要手段。本检测通过提取女性宫颈脱落细胞中HPV的DNA，采用荧光PCR溶解曲线法可对17种高危型HPV(16、18、31、33、35、39、45、51、52、53、56、58、59、66、68、73、82型)及6种低危型HPV(6、11、42、70、81、83型)进行精准分型,以提示宫颈病变风险。在该项服务实施前，请您务必仔细阅读该服务的详细条款，确保您知悉您所拥有的权益和需要承担的义务。
      </p>
      <p>
        <span>1.2适用人群：</span>有过性生活的女性方可使用。
      </p>
      <p>
        <span>1.3禁用人群：</span>处于妊娠期的女性不能使用；做过全子宫切除的女性不能使用；接受过盆腔放射治疗的女性不能使用；处于急、亚急性生殖道感染期的女性不能使用。
      </p>
      <p>
        <span>1.4注意事项：</span>使用前24小时内避免性生活；月经期女性请于月经结束3天后使用；私处用药者，请停药3天后使用；私处治疗者，需停止治疗并在医生评估痊愈后方可使用；哺乳期女性请避开产褥期使用；有明显出血病史和血液疾病史的女性请遵医嘱使用；取样过程中,少数人可能会有局部轻微不适，极少数人可能会有出血症状，如出现严重不适，务必及时就医治疗。
      </p>
      <p>
        <span>2检测局限性</span>
      </p>
      <p>
        由于检测技术具有一定的局限性，本检测无法排除假阴性或假阳性的出现。
      </p>
      <p>
        <span>3受检者风险提示</span>
      </p>
      <p>
      </p>
      <p>
        3.1请确认您符合本检测的相关要求,以避免不必要的检测、心理恐慌或伤害性治疗。
      </p>
      <p>
        3.2请如实填写个人信息，以确保检测样本信息准确无误。
      </p>
      <p>
        3.3由于个人差异，可能会造成取样失败而需要重新取样,需要您的配合。
      </p>
      <p>
        3.4检测结果属于个人隐私，受检者须妥善保管，以免资料泄露可能对个人及家庭造成不利影响。本机构将对该检测结果保密并依法保护受检者的隐私，但因受检者造成的个人信息外泄，本机构不承担连带责任。
      </p>
      <p>
        3.5受检者在知晓检测结果引起的精神负担，本机构作为检测方不承担连带责任。
      </p>
      <p>
        <span>4检测结果与报告</span>
      </p>
      <p>
        4.1本机构提供的HPV分型基因检测结果仅为临床参考，不作为诊断依据。
      </p>
      <p>
        4.2如样本采集过程是由受检者自行完成，本机构只对受检样本和检测结果的一致性负责，不对受检者和受检样本的一致性承担责任。
      </p>
      <p>
        4.3本机构对检测结果保留最终解释权，如有疑问，请在收到检测结果后的7个工作日内与我们联系。
      </p>
      <p>
        <span>5意外发现(不涉及)</span>
      </p>
      <p>
        <span>6其他(不涉及)</span>
      </p>
    </div>
    <div v-if="!goFull" class="top" @click="full"><van-icon name="arrow-down" /></div>
    <div v-if="goFull" class="top" @click="small"><van-icon name="arrow-up" /></div>
  </div>
</template>

<script>
export default {
  name: "consent",
  data() {
    return {
      goFull: false
    }
  },
  methods:{
    full() {
      this.goFull = true
    },
    small() {
      this.goFull = false
    }
  }
}
</script>

<style scoped>
.popup {
  border: 1px dashed #E4E7ED;
}
.top{
  text-align: center;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  font-size: 1.2rem;
  background-image: linear-gradient(to bottom,#FFFFFF,rgba(100,100,100,0.1));
}
.book {
  height: 20rem;
  overflow-y: auto;
  text-overflow: ellipsis;
  padding: 1rem;
  font-family: "PingFang SC";
  line-height: 1.5rem;
  background: #FFFFFF;
  z-index: 500;
  width: calc(100% - 2.1rem);
}
.fullBook{
  height: auto;
  overflow-y: auto;
  text-overflow: ellipsis;
  padding: 1rem;
  font-family: "PingFang SC";
  background: #FFFFFF;
  z-index: 500;
  width: calc(100% - 2.1rem);
}
.book > p {
  font-size: 0.9rem;
  letter-spacing: 0.5px;
}

.book > h4 {
  font-size: 0.9rem;
  text-align: center;
}

.book > p > span {
  font-weight: bolder;
}


</style>