
import request from '../index';


const reporter = (data: any) => request.get("fanwenapi/reporterTransmissionList", data)

export default reporter 
