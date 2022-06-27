const MailForm = {
    MailForm:{
        expressType: '1', // 快件产品类别
        jCompany: '',
        jContact: '',
        jTel: '',
        jAddress: '',
        jAreaCode: '',
        dAddress: '上海市闵行区,陈行公路2168号10B幢106室',
        dCompany: '上海恩元医学检验实验室',
        dContact: 'HPV收样组',
        dTel: '021-33752320',
        dAreaCode: '',
        parcelQuantity: '1', // 包裹数
        payMethod: '2',  // 付款方式 1:寄方付,2:收方付,3:第三方付 ,
        name: '',   // 货物名称
        isgenBillNo: '', // 1,要求,其它为不要求
        isDocall: '1', // 默认上门取件
        sendStartTime: '',
        sendStartTimeText: '',  // 上门取件时间显示

        // 下面是为了显示需要自定义的字段
        payMethodText: '快递到付', // 默认快递到付 1:寄方付,2:收方付,3:第三方付
        isDocallText: '上门取件', // 默认上门取件
        expressTypeText:'京东特惠送', // 默认上门取件

        // 下面是拼接地址所需要的临时字段
        province: '',
        city: '',
        area: '',
        PCAinfo: '', // 省-市-区
        detail: ''
    }
}

export default MailForm