import axios from 'axios';
import { Employee } from '../types/Employee';

const API_BASE_URL = 'http://localhost:8080/api/employees';

export const fetchEmployees = async () => {
  const response = await axios.get<Employee[]>(API_BASE_URL);
  return response.data;
};

export const fetchEmployeeById = async (id: number) => {
  const response = await axios.get<Employee>(`${API_BASE_URL}/${id}`);
  return response.data;
};

export const createEmployee = async (employee: Employee) => {
  const response = await axios.post<Employee>(API_BASE_URL, employee);
  return response.data;
};

export const updateEmployee = async (id: number, employee: Employee) => {
  const response = await axios.put<Employee>(`${API_BASE_URL}/${id}`, employee);
  return response.data;
};

export const deleteEmployee = async (id: number) => {
  await axios.delete(`${API_BASE_URL}/${id}`);
};
