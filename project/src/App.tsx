// import React, { useState, useEffect } from 'react';
// import { Employee } from './types/Employee';
// import { employeeApi } from './services/api';
// import EmployeeForm from './components/EmployeeForm';
// import { Search, SortAsc, SortDesc, Pencil, Trash2 } from 'lucide-react';

// function App() {
//   const [employees, setEmployees] = useState<Employee[]>([]);
//   const [sortBy, setSortBy] = useState('id');
//   const [sortOrder, setSortOrder] = useState('asc');
//   const [keyword, setKeyword] = useState('');
//   const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
//   const [isFormOpen, setIsFormOpen] = useState(false);

//   const loadEmployees = async () => {
//     try {
//       const data = await employeeApi.getAllEmployees(sortBy, sortOrder, keyword);
//       setEmployees(data);
//     } catch (error) {
//       console.error('Error loading employees:', error);
//     }
//   };

//   useEffect(() => {
//     loadEmployees();
//   }, [sortBy, sortOrder, keyword]);

//   const handleSort = (field: string) => {
//     if (sortBy === field) {
//       setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
//     } else {
//       setSortBy(field);
//       setSortOrder('asc');
//     }
//   };

//   const handleSubmit = async (employee: Employee) => {
//     try {
//       if (selectedEmployee?.id) {
//         await employeeApi.updateEmployee(selectedEmployee.id, employee);
//       } else {
//         await employeeApi.createEmployee(employee);
//       }
//       setIsFormOpen(false);
//       setSelectedEmployee(null);
//       loadEmployees();
//     } catch (error) {
//       console.error('Error saving employee:', error);
//     }
//   };

//   const handleDelete = async (id: number) => {
//     if (window.confirm('Are you sure you want to delete this employee?')) {
//       try {
//         await employeeApi.deleteEmployee(id);
//         loadEmployees();
//       } catch (error) {
//         console.error('Error deleting employee:', error);
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         <div className="bg-white shadow-sm rounded-lg overflow-hidden">
//           <div className="px-4 py-5 sm:p-6">
//             <div className="sm:flex sm:items-center">
//               <div className="sm:flex-auto">
//                 <h1 className="text-2xl font-semibold text-gray-900">Employee Management</h1>
//               </div>
//               <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
//                 <button
//                   onClick={() => {
//                     setSelectedEmployee(null);
//                     setIsFormOpen(true);
//                   }}
//                   className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
//                 >
//                   Add Employee
//                 </button>
//               </div>
//             </div>

//             <div className="mt-4">
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Search className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type="text"
//                   value={keyword}
//                   onChange={(e) => setKeyword(e.target.value)}
//                   placeholder="Search employees..."
//                   className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 />
//               </div>
//             </div>

//             {isFormOpen && (
//               <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
//                 <div className="bg-white rounded-lg p-6 max-w-md w-full">
//                   <h2 className="text-xl font-semibold mb-4">
//                     {selectedEmployee ? 'Edit Employee' : 'Add Employee'}
//                   </h2>
//                   <EmployeeForm
//                     employee={selectedEmployee || undefined}
//                     onSubmit={handleSubmit}
//                     onCancel={() => {
//                       setIsFormOpen(false);
//                       setSelectedEmployee(null);
//                     }}
//                   />
//                 </div>
//               </div>
//             )}

//             <div className="mt-8 flex flex-col">
//               <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
//                 <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
//                   <table className="min-w-full divide-y divide-gray-300">
//                     <thead>
//                       <tr>
//                         <th
//                           onClick={() => handleSort('id')}
//                           className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
//                         >
//                           <div className="flex items-center">
//                             ID
//                             {sortBy === 'id' && (
//                               sortOrder === 'asc' ? <SortAsc className="ml-1 h-4 w-4" /> : <SortDesc className="ml-1 h-4 w-4" />
//                             )}
//                           </div>
//                         </th>
//                         <th
//                           onClick={() => handleSort('name')}
//                           className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
//                         >
//                           <div className="flex items-center">
//                             Name
//                             {sortBy === 'name' && (
//                               sortOrder === 'asc' ? <SortAsc className="ml-1 h-4 w-4" /> : <SortDesc className="ml-1 h-4 w-4" />
//                             )}
//                           </div>
//                         </th>
//                         <th
//                           onClick={() => handleSort('email')}
//                           className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
//                         >
//                           <div className="flex items-center">
//                             Email
//                             {sortBy === 'email' && (
//                               sortOrder === 'asc' ? <SortAsc className="ml-1 h-4 w-4" /> : <SortDesc className="ml-1 h-4 w-4" />
//                             )}
//                           </div>
//                         </th>
//                         <th
//                           onClick={() => handleSort('salary')}
//                           className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
//                         >
//                           <div className="flex items-center">
//                             Salary
//                             {sortBy === 'salary' && (
//                               sortOrder === 'asc' ? <SortAsc className="ml-1 h-4 w-4" /> : <SortDesc className="ml-1 h-4 w-4" />
//                             )}
//                           </div>

//                         </th>

//                         <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
//                           Actions
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-200">
//                       {employees.map((employee) => (
//                         <tr key={employee.id}>
//                           <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
//                             {employee.id}
//                           </td>
//                           <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
//                             {employee.name}
//                           </td>
//                           <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
//                             {employee.email}
//                           </td>
//                           <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
//                             {employee.salary.toLocaleString()}
//                           </td>
//                           <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
//                             <button
//                               onClick={() => {
//                                 setSelectedEmployee(employee);
//                                 setIsFormOpen(true);
//                               }}
//                               className="text-indigo-600 hover:text-indigo-900 mr-4"
//                             >
//                               <Pencil className="h-4 w-4" />
//                             </button>
//                             <button
//                               onClick={() => employee.id && handleDelete(employee.id)}
//                               className="text-red-600 hover:text-red-900"
//                             >
//                               <Trash2 className="h-4 w-4" />
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;



import React, { useState, useEffect } from 'react';
import { Employee } from './types/Employee';
import { employeeApi } from './services/api';
import EmployeeForm from './components/EmployeeForm';
import { Search, SortAsc, SortDesc, Pencil, Trash2, Mail } from 'lucide-react'; // Import Mail icon
import axios from 'axios';


function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [sortBy, setSortBy] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');
  const [keyword, setKeyword] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const loadEmployees = async () => {
    try {
      const data = await employeeApi.getAllEmployees(sortBy, sortOrder, keyword);
      setEmployees(data);
    } catch (error) {
      console.error('Error loading employees:', error);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, [sortBy, sortOrder, keyword]);

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleSubmit = async (employee: Employee) => {
    try {
      if (selectedEmployee?.id) {
        await employeeApi.updateEmployee(selectedEmployee.id, employee);
      } else {
        await employeeApi.createEmployee(employee);
      }
      setIsFormOpen(false);
      setSelectedEmployee(null);
      loadEmployees();
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await employeeApi.deleteEmployee(id);
        loadEmployees();
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

  

  const sendEmailToEmployee = async (id: number) => {
    try {
      const response = await axios.post(`http://localhost:8080/api/employees/sendEmail/${id}`);
      alert('Email sent successfully!');
    } catch (error: any) {
      console.error('Error sending email:', error);

      // Extract error message properly
      const errorMessage =
        error.response?.data?.message || error.response?.data || error.message || 'Unknown error';

      alert('Error sending email: ' + errorMessage);
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-2xl font-semibold text-gray-900">Employee Management</h1>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <button
                  onClick={() => {
                    setSelectedEmployee(null);
                    setIsFormOpen(true);
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Add Employee
                </button>
              </div>
            </div>

            <div className="mt-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Search employees..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            {isFormOpen && (
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg p-6 max-w-md w-full">
                  <h2 className="text-xl font-semibold mb-4">
                    {selectedEmployee ? 'Edit Employee' : 'Add Employee'}
                  </h2>
                  <EmployeeForm
                    employee={selectedEmployee || undefined}
                    onSubmit={handleSubmit}
                    onCancel={() => {
                      setIsFormOpen(false);
                      setSelectedEmployee(null);
                    }}
                  />
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-col">
              <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr>
                        <th
                          onClick={() => handleSort('id')}
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                        >
                          ID
                        </th>
                        <th
                          onClick={() => handleSort('name')}
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                        >
                          Name
                        </th>
                        <th
                          onClick={() => handleSort('email')}
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                        >
                          Email
                        </th>
                        <th
                          onClick={() => handleSort('salary')}
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                        >
                          Salary
                        </th>
                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Add Date
                        </th>
                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Last Update
                        </th>
                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {employees.map((employee) => (
                        <tr key={employee.id}>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{employee.id}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{employee.name}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{employee.email}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{employee.salary.toLocaleString()}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {new Date(employee.addDate).toLocaleDateString()}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {new Date(employee.lastUpdate).toLocaleDateString()}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm">
                            <div className="flex items-center">
                              <button
                                onClick={() => {
                                  setSelectedEmployee(employee);
                                  setIsFormOpen(true);
                                }}
                                className="text-indigo-600 hover:text-indigo-900 mr-4"
                              >
                                <Pencil className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => employee.id && handleDelete(employee.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => sendEmailToEmployee(employee.id)} // Fix: Pass id instead of email
                                className="text-blue-600 hover:text-blue-900 ml-4"
                              >
                                <Mail className="h-4 w-4" />
                              </button>

                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;







