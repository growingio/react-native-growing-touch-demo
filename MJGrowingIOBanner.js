import React,{Component} from 'react';
import {requireNativeComponent,ViewPropTypes} from 'react-native';
import PropTypes from "prop-types";

const BannerView = requireNativeComponent('BannerView');

export default class MJGrowingIOBanner extends Component {
    static propTypes = {
        callback:PropTypes.func,
      };
    //默认类型检查
    // static defaultProps = {
    //     name: 'stranger'
    // }
    render(){
        return  <BannerView {...this.props} onClickGIOBanner={this.props.callback} style={{width:420,height:397}}/>
    }
}
