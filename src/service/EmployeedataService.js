import axios from "axios";

const REST_BASE_URL = "http://localhost:7000";
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
  createEmployeeByID(name,desc){
     // var tempobj=obj;
    console.log("name="+name+"desc="+desc);
    return axios.post(`${REST_BASE_URL}/create`,{
            name:name,
            desciption:desc
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
  updateEmployeeByID(id,name,desc){
    return axios.post(`${REST_BASE_URL}/editEmp`,{
        id:id,
        name:name,
        desciption:desc
    }); 
  }
}



export default new EmployeedataService();