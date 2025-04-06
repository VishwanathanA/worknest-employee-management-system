import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/employees';

export const createEmployee = (employee) => axios.post(BASE_URL, employee);
export const getEmployeeById = (id) => axios.get(`${BASE_URL}/${id}`);
export const updateEmployeeById = (id, employee) => axios.put(`${BASE_URL}/${id}`, employee);
export const listEmployees = () => axios.get(BASE_URL);
export const deleteEmployeeById = (id) => axios.delete(`${BASE_URL}/${id}`);