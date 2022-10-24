
import request from '../index';


const vedioCount = () => request.get("fanwenapi/vedioCountList.do")
const getApiData = () => request.get("fanwenapi/getApiData.do?pagesize=10&urlName=Client831/PaperLayout")
const newsreport = () => request.get("fanwenapi/newsreportercountList.do")
const getApiData3 = (data: any) => request.get("fanwenapi/getApiData3.do", data)
export default { vedioCount, getApiData, newsreport, getApiData3 }
