import { Employee } from '../types/Employee';

const API_BASE_URL = 'http://localhost:8080/api/employees';

export const employeeApi = {
  // Get all employees with optional sorting and filtering
  getAllEmployees: async (sortBy = 'id', sortOrder = 'asc', keyword?: string) => {
    const params = new URLSearchParams({
      sortBy,
      sortOrder,
      ...(keyword && { keyword }),
    });
    const response = await fetch(`${API_BASE_URL}?${params}`);
    return response.json();
  },

  // Get employee by ID
  getEmployeeById: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    return response.json();
  },

  // Create new employee
  createEmployee: async (employee: Employee) => {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employee),
    });
    return response.json();
  },

  // Update employee
  updateEmployee: async (id: number, employee: Employee) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employee),
    });
    return response.json();
  },

  // Delete employee
  deleteEmployee: async (id: number) => {
    await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
  },
};