import React, { Component } from 'react';
import wx from 'weixin-js-sdk';
import { connect } from 'dva';
import { Toast, Button, Switch, Badge, Drawer, Card, List, Stepper, SwipeAction } from 'antd-mobile';
import styles from './IndexPage.less'

import scanIcon from '../statics/条码采集.png';
import listIcon from '../statics/类目.png';
import orderIcon from '../statics/订单.png';
import cartIcon from '../statics/购物车.png';

const { Item: ListItem } = List;

class IndexPage extends Component {

  state = {
    cartNum: 200,
    cartTotal: 200.14,
    cartOpen: false,
    flag: 1,//1：收银；2：调价
    selectedNum: 100
  }

  handleSwitch = (checked) => {
    this.setState({ flag: checked ? 1 : 2 });
  }

  handleGoods = () => {
    Toast.info('查货...');
  }

  handleOrders = () => {
    Toast.info('订单...');
  }

  handleCheckout = () => {
    Toast.info('去结算...');
  }

  handleScanning = () => {
    wx.scanQRCode({
      needResult: 1,
      success: (res) => {
        const result = res.resultStr;
        Toast.info(`扫码结果：${result}`);
        this.props.dispatch({
          type: 'index/fetchGoodInfo',
          payload: {
            cond: {
              barcode: result
            }
          }
        })
      }
    });
  }

  handleCartOpen = () => {
    this.setState({ cartOpen: !this.state.cartOpen });
  }

  render() {
    const { cartNum, cartTotal, cartOpen, flag, selectedNum } = this.state;
    const { _GoodInfo } = this.props.index;
    console.log(_GoodInfo);
    const sidebar = (
      <Card full>
        <Card.Header
          title={`已选商品 (${selectedNum})`}
        />
        <Card.Body>
          <List>
            {
              [1, 2, 3, 4, 5, 6].map(item => {
                return (
                  <SwipeAction
                    key={item}
                    style={{ backgroundColor: 'gray' }}
                    autoClose
                    right={[
                      {
                        text: '删除',
                        onPress: () => console.log('delete'),
                        style: { backgroundColor: '#F4333C', color: 'white', width: 80 },
                      },
                    ]}
                    onOpen={() => console.log('global open')}
                    onClose={() => console.log('global close')}
                  >
                    <ListItem
                      extra={
                        <Stepper
                          showNumber
                          size={'small'}
                          value={100}
                          className={styles.cart_item_num}
                        />
                      }
                      thumb={
                        <img
                          alt={item}
                          src={'https://gd1.alicdn.com/imgextra/i3/0/TB1yNVHXv5TBuNjSspmXXaDRVXa_!!0-item_pic.jpg'}
                          style={{ width: 50, height: 50 }}
                        />
                      }
                      multipleLine
                      wrap
                      onClick={() => { }}
                    >
                      <div className={styles.cart_item_name}>商品名称商品名商品名称商品名商品名称商品名商品名称商品名商品名称商品名</div>
                      <ListItem.Brief>
                        <span className={styles.cart_item_price}>￥19.8</span>
                        <span className={styles.cart_item_subtotal}>1980</span>
                      </ListItem.Brief>
                    </ListItem>
                  </SwipeAction>
                );
              })
            }
          </List>
        </Card.Body>
      </Card>
    );

    return (
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.top_item} onClick={this.handleGoods}>
            <img src={listIcon} alt={'查货'} className={styles.top_item_icon} />
            <span className={styles.top_item_text}>查货</span>
          </div>
          <div className={styles.top_item} onClick={this.handleOrders}>
            <img src={orderIcon} alt={'订单'} className={styles.top_item_icon} />
            <span className={styles.top_item_text}>订单</span>
          </div>
        </div>
        <div className={styles.center}>
          <img src={scanIcon} alt={'扫码'} className={styles.center_icon} onClick={this.handleScanning} />
          <div className={styles.center_switch}>
            <Switch
              color={'#000'}
              checked={flag === 1}
              className={styles.center_switch_ctrl}
              onChange={this.handleSwitch}
            />
            <span className={styles.center_switch_text}>{{ 1: '收银', 2: '调价' }[flag]}</span>
          </div>
        </div>
        <Drawer
          sidebar={sidebar}
          open={cartOpen}
          sidebarStyle={{ marginBottom: 80, background: '#fff' }}
          onOpenChange={this.handleCartOpen}
          position={'bottom'}
        >
          <div className={styles.bottom} onClick={this.handleCartOpen}>
            <Badge text={cartNum}>
              <img src={cartIcon} alt={'购物车'} className={styles.bottom_cart} />
            </Badge>
            <div className={styles.bottom_total}>合计：<span className={styles.bottom_sum}>￥{cartTotal || 0}</span></div>
            <Button className={styles.bottom_btn_checkout} type="primary" onClick={this.handleCheckout}>去结算</Button>
          </div>
        </Drawer>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    loading: state.loading.global,
    index: state.index || {},
  };
}

export default connect(mapStateToProps)(IndexPage);