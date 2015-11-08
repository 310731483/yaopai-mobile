var React = require('react');
var DocumentTitle = require('react-document-title');

import BookTicketRow from './BookTicketRow';

var ConfirmBookDialog = React.createClass({
  render: function() {
    var style = {
      confirmBookDialog: {
        backgroundColor: 'black',
        textAlign: 'center',
        minHeight: '100%',
        position: 'absolute',
        width: '100%',
        color:'#ffffff'
      },
      confirmHint: {

      },
      confirmTitle: {
        fontSize:'1.666666667em',
      },
      actionBar: {
        paddingTop: 22.5,
        height: 103.5,
        textAlign: 'center'
      },
      confirmBox: {
        float: 'left',
        marginLeft: '20.2666667%'
      },
      cancelFrame: {
        float: 'right',
        marginRight: '20.2666667%'
      }
    };

    return (
      <DocumentTitle title="个人中心">
      <div 
        style={style.confirmBookDialog}
        className="confirmBookDialog">
        <span style={style.confirmHint} ref="confirmHint">请您再次确认预约信息，核对拍摄时间！</span>
        <br />
        <span style={style.confirmTitle} ref="confirmTitle">确认预约信息</span>

        <BookTicketRow confirm={true}/>

        <div style={style.actionBar} className="actionBar">
          <div style={style.confirmBox} className="confirmBox">
            <img ref="confirmImage"
                src="imgs/userCenterPage/confirm-circle-image.png"
                srcSet="imgs/userCenterPage/confirm-circle-image@2X.png 2x" />
            <span ref="confirmText">确定</span>
          </div>

          <div style={style.cancelFrame} className="cancelFrame">
            <img ref="cancelImage"
                src="imgs/userCenterPage/cancel-circle-image.png"
                srcSet="imgs/userCenterPage/cancel-circle-image@2X.png 2x" />
            <span ref="cancelText">取消</span>
          </div>
        </div>
      </div>
      </DocumentTitle>
    );
  }
});

module.exports = ConfirmBookDialog;