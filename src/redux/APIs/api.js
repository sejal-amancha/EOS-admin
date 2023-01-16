import axios from "axios";

const token = JSON.parse(sessionStorage.getItem("ADMIN_TOKEN"));
const headersParam = {
    "Authorization" : `Bearer ${token}`,
};

export const adminLoginApi = async (user) => await axios.post(`http://localhost:9000/api/user/Login`, user);

export const userChangePassApi = async (userPass) => await axios.post(`http://localhost:9000/api/user/change_password`, userPass, { headers: headersParam });

export const adminForgotPassApi = async (forgotPass) => await axios.post(`http://localhost:9000/api/user/forgot_password`, forgotPass);

// export const adminLogoutApi = async () => await axios.delete(`http://localhost:9091/api/user/logout`, { headers: headersParam });

export const loadUsersApi = async () => await axios.get(`http://localhost:9000/api/user/GetallUser`, { headers: headersParam });

// export const addEmployeeApi = async (newEmployee) => await axios.post(`http://localhost:9091/api/employee/create`, newEmployee, { headers: headersParam });

// export const updateEmployeeApi = async (updateEmployee) => await axios.put(`http://localhost:9091/api/employee/${updateEmployee.id}`, updateEmployee, { headers: headersParam });

export const deleteUserApi = async (userId) => await axios.delete(`http://localhost:9000/api/user/${userId}`, { headers: headersParam });

export const getSingleUserApi = async (singUser) => await axios.get(`http://localhost:9000/api/user/${singUser}`, { headers: headersParam } );

// export const getSingleEmployeeAssignmentApi = async (singlemployeeAssignment) => await axios.get(`http://localhost:9091/api/employee/combo-details/${singlemployeeAssignment}`, { headers : headersParam});


