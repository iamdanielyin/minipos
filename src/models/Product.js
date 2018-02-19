/**
 * 模块依赖
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const defineSchema = new Schema({
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
    }
});

module.exports = {
    name: 'Product',
    displayName: '商品',
    schema: defineSchema
};