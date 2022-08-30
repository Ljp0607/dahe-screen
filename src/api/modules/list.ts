
import request from '../index';


//根据活动编码获取抽奖配置  
const findDraw = (data: any) => request.get("app/daheDrawActivityConfig/findDrawActivityConfigByAactivityNo", data, '')
//抽奖人员名单
const drawRecordList = (data: any) => request.get("app/daheDrawActivityConfig/drawRecordLists", data, '')
//获取邀请码和邀请记录
const getUserCode = (data: any) => request.get("app/daheDrawActivityConfig/getUserCodeAndinvitationList", data, '')
//抽奖
const toDraw = (data: any) => request.get("app/daheDrawActivityConfig/toDraw", data, '')

const fanwenapi = () => request.get("fanwenapi/vedioCountList.do")

export default { findDraw, drawRecordList, getUserCode, toDraw, fanwenapi }
