'use strict'
import React from 'react'
import $ from 'jquery'
import ReactDOM from 'react-dom'
import './index.scss'

import { Router, Route, IndexRoute, IndexRedirect } from 'react-router'

import WorkPage from './components/WorkPage'
import WorkDetailPage from './components/WorkDetailPage'
import GrapherPage from './components/GrapherPage'
import GrapherDetailPage from './components/GrapherDetailPage'

import LoginPage from './components/LoginPage'
import SignupPage from './components/LoginPage/SignupPage'
import EmailSignupPage from './components/LoginPage/EmailSignupPage'
import FindByMobileForm from './components/LoginPage/FindByMobileForm'
import ChangePassWordForm from './components/LoginPage/ChangePassWordForm'

import UserCenterPage from './components/UserCenterPage/UserCenterPage'
import UserEditProfile from './components/UserCenterPage/UserEditProfilePage'
import UserNickNameChange from './components/UserCenterPage/UserNickNameChangePage'
import UserGenderChange from './components/UserCenterPage/UserGenderChangePage'
import UserCityChange from './components/UserCenterPage/UserCityChangePage'

import GrapherCenterPage from './components/UserCenterPage/GrapherCenterPage'
import UserAttentionList from './components/UserCenterPage/UserAttentionList'
import UserCollectList from './components/UserCenterPage/UserCollectList'

// imports UserCenter for User
import UserOrderTabLayout from './components/layout/center/user/order/OrderTabLayout'
import UserOrderDetailLayout from './components/layout/center/user/order/OrderDetailLayout'
import UserOrderSubmitResultLayout from './components/layout/center/user/order/OrderSubmitResultLayout'
import UserOrderRefundLayout from './components/layout/center/user/order/OrderRefundLayout'
import WorkBookPage from './components/layout/center/user/appointment/BookPage'

// imports GrapherCenter for Grapher
import GrapherOrderTabLayout from './components/layout/center/grapher/order/OrderTabLayout'
import GrapherOrderDetailLayout from './components/layout/center/grapher/order/OrderDetailLayout'
// imports purse for Grapher
import PurseLayout from './components/layout/center/grapher/purse/PurseLayout'
import PurseTabLayout from './components/layout/center/grapher/purse/PurseTabLayout'
import PurseDetailLayout from './components/layout/center/grapher/purse/PurseDetailLayout'

//绑定支付宝 提现
import BindCardLayout from './components/layout/center/grapher/purse/BindCardLayout'
import CardDetailLayout from './components/layout/center/grapher/purse/CardDetailLayout'
import WithdrawDepositLayout from './components/layout/center/grapher/purse/WithdrawDepositLayout'

// 发现页面
import DiscoverLayout from './components/UI/DiscoverLayout'
// 化妆师
import makeupArtistRouter from './components/MakeupArtist'
// 模特
import moteRouter from './components/Mote'


main()

function main(){
  const makeBackgroundDimBlack = () => $('#app').css('backgroundColor', '#282828')
  const removeBackgroundDimBlack = () => $('#app').css('backgroundColor', '#F2F2F2')

  ReactDOM.render((
    <Router>
      <Route path="/">
        <IndexRedirect to="/work(/:tag)(/:tag)(/:tag)(/:tag)" />
        <Route path="/work(/:tag)(/:tag)(/:tag)(/:tag)" component={WorkPage} />
        <Route path="/workDetail/:Id" component={WorkDetailPage} />

        <Route path="/grapher" component={GrapherPage} />
        <Route path="/grapherDetail/:Id" component={GrapherDetailPage} />
        <Route path="/login_page" component={LoginPage}
          onEnter={() => makeBackgroundDimBlack()}
          onLeave={() => removeBackgroundDimBlack()}
        />
        <Route path="/signupPage" component={SignupPage}
          onEnter={() => makeBackgroundDimBlack()}
          onLeave={() => removeBackgroundDimBlack()}
        />
        <Route path="/email_signup" component={EmailSignupPage}
          onEnter={() => makeBackgroundDimBlack()}
          onLeave={() => removeBackgroundDimBlack()}
        />
        <Route path="/findByMobileForm" component={FindByMobileForm}
          onEnter={() => makeBackgroundDimBlack()}
          onLeave={() => removeBackgroundDimBlack()}
        />
        <Route path="/changePassWordForm" component={ChangePassWordForm}
          onEnter={() => makeBackgroundDimBlack()}
          onLeave={() => removeBackgroundDimBlack()}
        />
        <Route path="/work_book_page/:workId/:photographerId" component={WorkBookPage} />

        {/* 发现页面 */}
        <Route path="discover">
          <IndexRoute component={DiscoverLayout} />
          { /* 化妆师 */ }
          {makeupArtistRouter}
          { /* 模特 */ }
          {moteRouter}
        </Route>

        <Route path="center">
          {/*用户修改资料（普通用户和摄影师共用）*/}
          <Route path="user_edit_profile">
            <IndexRoute component={UserEditProfile} />
            <Route path="user_nickname_change" component={UserNickNameChange} />
            <Route path="user_gender_change" component={UserGenderChange} />
            <Route path="user_city_change" component={UserCityChange} />
          </Route>

          {/*用户收藏/关注列表*/}
          <Route path="mark">
            <IndexRedirect to="user_collect" />
            <Route path="user_collect" component={UserCollectList} />
            <Route path="user_attention" component={UserAttentionList} />
          </Route>

          {/*用户中心*/}
          <Route path="u">
            <IndexRoute component={UserCenterPage} />
            <Route path="order">
              <IndexRoute component={UserOrderTabLayout} />
              <Route path="submit/:id">
                <IndexRedirect to="/center/u/order/:id" />
                <Route path="result" component={UserOrderSubmitResultLayout}/>
              </Route>
            </Route>
            <Route path="order/:id">
              <IndexRoute  component={UserOrderDetailLayout}/>
              <Route path="refund" component={UserOrderRefundLayout}/>
            </Route>
          </Route>
          {/*摄影师中心*/}
          <Route path="g">
            <IndexRoute component={GrapherCenterPage} />
            <Route path="order" component={GrapherOrderTabLayout} />
            <Route path="order/:id">
              <IndexRoute component={GrapherOrderDetailLayout}/>
            </Route>
            {/* 摄影师钱包 */}
            <Route path="purse">
              <IndexRoute component={PurseLayout}/>
              <Route path="detail" component={PurseTabLayout} />
              <Route path="detail/:type/:id" component={PurseDetailLayout} />
              <Route path="bind" component={BindCardLayout} />
              <Route path="bindDetail" component={CardDetailLayout} />
              <Route path="withdraw" component={WithdrawDepositLayout} />
            </Route>
          </Route>
        </Route>
      </Route>
      {/* 填错 URL 的情况一律跳转到首页 */}
      <Route path="*" component={ WorkPage } />
    </Router>
    ), document.getElementById('app')
  )
}
