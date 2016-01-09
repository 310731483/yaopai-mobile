var React = require('react');
var Reflux = require('reflux');
const $ = require('jquery');
var DocumentTitle = require('react-document-title');

var GrapherIntro = require('../GrapherDetailPage/GrapherIntro');
var HamburgMenu = require('../HamburgMenu');
var UserActions = require('../../actions/UserActions');
var ActivityStore = require('../../stores/ActivityStore');
var ActivityActions = require('../../actions/ActivityActions');
import { GET_WORK_DETAIL, imgModifier } from '../Tools';
import {History, Link} from 'react-router';
import Share from '../Share';

var ActivityDetailPage = React.createClass({
  mixins : [Reflux.listenTo(ActivityStore,'_onActivityStoreChange'),History],
  getInitialState: function() {
    return {
      data:[],
    };
  },
  
  componentDidMount: function() {
    if(!this.props.params.Id)
      return this.history.pushState(null,'/Activity');
    ActivityActions.get(this.props.params.Id);
  },
  _onActivityStoreChange :function(data){
    if(data.flag == 'get'){
      if(data.hintMessage){
        console.log(data.hintMessage);
      }else{
        this.setState({data : data.workData});
      }
    }
  },
  renderPrice: function(){
    const negotiable = this.state.data.Negotiable;
    const price = this.state.data.Price;
    let priceResult = "面议";
    
    if(!negotiable){
      priceResult = price;
    }
    return (
    <span 
      style={{color:'#050505',fontWeight:'bold'}}
      ref="workPrice" 
      className="workPrice">{priceResult}</span>
    )
  },
  render: function() {
    const contentText = this.state.data.Content;
    function makeContent() {return {__html: contentText};};

    let coverSoruce = this.state.data.Cover;
    const cover = imgModifier(coverSoruce, "ad");

    let grapherId = '';
    if (this.state.data.User) {
      grapherId = this.state.data.User.Id;
    }
    return (
      <div style={{height: '100%'}} className="ActivityDetailPage">
        <HamburgMenu />
        <DocumentTitle title={this.state.data.Title || '访谈'} />

        <div style={{margin:'56px 20% 0 11%'}}>
          <span style={{color:'green',float:'left',fontSize:'2em',mariginRight:3}}>-</span>
          <h1>{this.state.data.Title}</h1>
        </div>

        <img
          style={{width: '70%', margin: '-10px 0 20px 8%'}}
          src="imgs/workDetailPage/work-split-line.png"
          srcSet="imgs/workDetailPage/work-split-line@2X.png 2x" />

        <div className="ActivityCover" >
          <img 
            style={{width:'100%',height:210/375*innerWidth, marginBottom: 15}}
            src={cover} />
        </div>

        <div 
          className="ActivityContent"
          dangerouslySetInnerHTML={makeContent()} />

        <div style={{textAlign:'center',color:'gray',fontSize:18}}>END</div>
        <img
          style={{width: '70%', marginLeft: '15%'}}
          src="imgs/workDetailPage/work-split-line.png"
          srcSet="imgs/workDetailPage/work-split-line@2X.png 2x" />
          
        <Share />
      </div>
    );
  }
});

module.exports = ActivityDetailPage;