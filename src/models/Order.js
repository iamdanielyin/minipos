/**
 * 模块依赖
 */

const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

const defineSchema = new Schema({
    order_no: {
        type: String,
        displayName: '单号'
    },
    order_time: {
        type: Number,
        displayName: '下单时间'
    },
    total_num: {
        type: Number,
        displayName: '总数量'
    },
    total_amount: {
        type: Number,
        displayName: '总金额'
    },
    goods: [{
        thumb: {
            type: String,
            displayName: '缩略图'
        },
        barcode: {
            type: String,
            displayName: '商品条码'
        },
        name: {
            type: String,
            displayName: '商品名称',
            required: '商品名称不能为空'
        },
        brief: {
            type: String,
            displayName: '商品简介'
        },
        unit: {
            type: String,
            displayName: '商品单位'
        },
        price: {
            type: Number,
            displayName: '商品单价',
            default: 0
        },
        sub_num: {
            type: Number,
            displayName: '小计数量'
        },
        sub_amount: {
            type: Number,
            displayName: '小计金额'
        },
    }]
});

defineSchema.pre('save', function (next) {
    if (!this.order_time) {
        this.order_time = moment().unix();
        this.order_no = `${moment(this.order_time, 'X').format('ddd').toUpperCase() + '-' + this.order_time}`
    }
    next();
});

module.exports = {
    name: 'Order',
    displayName: '订单',
    schema: defineSchema
};