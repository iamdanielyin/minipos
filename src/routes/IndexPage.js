import React, { Component } from 'react';
import { connect } from 'dva';
import { Toast, Button, Switch, Badge, Drawer, Card, List, Stepper } from 'antd-mobile';
import { Icon } from 'react-fa'
import styles from './IndexPage.less'

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
    Toast.info('扫码...');
  }
  handleCartOpen = () => {
    this.setState({ cartOpen: !this.state.cartOpen });
  }

  render() {
    const { cartNum, cartTotal, cartOpen, flag, selectedNum } = this.state;
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
                  <ListItem
                    key={item}
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
                      <span className={styles.cart_item_subtotal}>￥19.8</span>
                    </ListItem.Brief>
                  </ListItem>
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
        <Drawer
          sidebar={sidebar}
          open={cartOpen}
          sidebarStyle={{ marginBottom: 80, background: '#fff' }}
          onOpenChange={this.handleCartOpen}
          position={'bottom'}
        >
          <div className={styles.bottom} onClick={this.handleCartOpen}>
            <Badge text={cartNum}><Icon name="shopping-cart" className={styles.bottom_cart} /></Badge>
            <div className={styles.bottom_total}>合计：￥{cartTotal || 0}</div>
            <Button className={styles.bottom_btn_checkout} type="primary" onClick={this.handleCheckout}>去结算</Button>
          </div>
        </Drawer>
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