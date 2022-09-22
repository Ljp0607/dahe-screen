
import request from '../index';


const fanwenapi = () => request.get("fanwenapi/vedioCountList.do")

export default { fanwenapi }
