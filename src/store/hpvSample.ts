// adminRemarks === '1' 代表 此样本采集已经完成
// department === '1' 代表 此样本邮寄已经完成

const HpvSample = {
    HpvSample:{
        oldInfoId:'',
        infoId:'',
        userName: '',
        age: '',
        defined3: '',
        patientPhone: '',
        agreement: 0,
        projectName: '临检项目', // 项目
        projectId: '0',
        productType: '268', // 产品大类
        productTypeName: 'HPV',
        _disease: ['HPV'], // 产品类型
        _diseaseRadio: '',
        disease: 'HPV', // 产品类型
        _priceCodeNum: [], // 价格
        priceCodeNum: 1, // 产品类型code
        sampleType: '宫颈分泌物', // 样本种类
        organizeName: 'HPV', // 医院名称
        hospital: 'HPV', // 医院名称(新增，解决数据缺失的问题)
        organizeId: '4648',
        sampleDutyNameA: '恩元医检所', // 送检医生姓名
        diagnosis: '', // 诊断结果
        _diagnosisLocalImgs: [],
        diagnosisLocalImgs: '',
        _diagnosisImgs: [],
        diagnosisImgs: '',
        isImgChange: 2,
        familyHis: '', // 家族史
        consistency: '', // 疾病一致否
        samplingDate: '',
        sex: '',
        price: '',
        department:'',
        adminRemarks:'',
    },
    order:{
        sampleregistertemp:{}
    }
}

export default HpvSample