import React, { Component } from 'react';
import { connect } from 'dva';
import { Toast, Button, Switch, Badge } from 'antd-mobile';
import { Icon } from 'react-fa'
import styles from './IndexPage.less'

class IndexPage extends Component {

  state = {
    cartNum: 200,
    cartTotal: 200.14,
    flag: 1//1：收银；2：调价
  }

  handleSwitch = (checked) => {
    this.setState({ flag: checked ? 1 : 2 });
  }

  handleCart = () => {
    Toast.info('购物车...');
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
    Toast.info('扫码...');
  }

  render() {
    const { cartNum, cartTotal, flag } = this.state;
    return (
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.top_item} onClick={this.handleGoods}>
            <Icon name="list" className={styles.top_item_icon} />
            <span className={styles.top_item_text}>查货</span>
          </div>
          <div className={styles.top_item} onClick={this.handleOrders}>
            <Icon name="shopping-bag" className={styles.top_item_icon} />
            <span className={styles.top_item_text}>订单</span>
          </div>
        </div>
        <div className={styles.center}>
          <div className={styles.center_border} onClick={this.handleScanning}>
            <Icon name="barcode" className={styles.center_icon} />
            <div className={styles.center_line_horizontal} />
            <div className={styles.center_line_vertical} />
          </div>
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
        <div className={styles.bottom}>
          <Badge text={cartNum} onClick={this.handleCart}><Icon name="shopping-cart" className={styles.bottom_cart} onClick={this.handleCart} /></Badge>
          <div className={styles.bottom_total}>合计：￥{cartTotal || 0}</div>
          <Button className={styles.bottom_btn_checkout} type="primary" onClick={this.handleCheckout}>去结算</Button>
        </div>
      </div >
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