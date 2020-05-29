import axios from "axios";

const REST_BASE_URL = "https://springboot-crud-rest.herokuapp.com";
//const REST_BASE_URL = "http://localhost:7000";
const REST_BASE_URL_GETALL = `${REST_BASE_URL}/getEmp`;
class EmployeedataService {
  retrieveAllEmployee() {
    return axios.get(`${REST_BASE_URL_GETALL}`);
  }

  retrieveEmployeeByID(id) {
      var tmpid=id;
      return  axios.get(`${REST_BASE_URL}/getEmpById`,{
        params: {
            id: tmpid
          }
    });
  }
  createEmployeeByID(name,emailid,desc,pass,source){
    return axios.post(`${REST_BASE_URL}/create`,{
            name:name,
            desciption:desc,
            email:emailid,
            pwd:pass,
            source:source
    });
  }
  deleteEmployeeByID(id){
    var tmpid=id;
    return axios.delete(`${REST_BASE_URL}/deleteEmp`,{
        params: {
            id: tmpid
          }
    });
  }
  updateEmployeeByID(id,name,desc,pass){
    return axios.post(`${REST_BASE_URL}/editEmp`,{
        id:id,
        name:name,
        desciption:desc,
        pwd:pass
    }); 
  }
  sendMail(frommail,tomail,message){
    return axios.post(`${REST_BASE_URL}/sendmail`,{
      fromMail:frommail,
      toMail:tomail,
      message:message
  });
  }
  login(uname,pass){//getEmpByEmail
    var name=uname;
    return axios.get(`${REST_BASE_URL}/getEmpByEmail`,{
      params: {
          email: name,
          pass:pass
        }
  });
  }
}



export default new EmployeedataService();