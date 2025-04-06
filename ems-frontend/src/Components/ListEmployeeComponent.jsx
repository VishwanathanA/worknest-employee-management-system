import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    deleteEmployeeById,
    listEmployees
} from '../Service/EmployeeService';

export const ListEmployeeComponent = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = () => {
        listEmployees()
            .then((response) => {
                setEmployees(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching employees:', error);
                setError('Failed to fetch employees');
                setLoading(false);
            });
    };

    function addNewEmployee() {
        navigate('/add-employee');
    }

    function updateEmployee(id) {
        navigate(`/edit-employee/${id}`);
    }

    function deleteEmployee(id) {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            deleteEmployeeById(id)
                .then(() => {
                    setEmployees(employees.filter(emp => emp.id !== id));
                })
                .catch((error) => {
                    console.error('Error deleting employee:', error);
                    alert("Failed to delete employee");
                });
        }
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className='container'>
            <h1 className="text-center">List of Employees</h1>
            <button type="button" className="btn btn-primary mb-2" onClick={addNewEmployee}>
                Add Employee
            </button>
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr className="text-center">
                        <th>Employee ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map((employee) => (
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.email}</td>
                                <td style={{ display: 'flex', gap: '5px', padding: 0 }}>
                                    <button
                                        type="button"
                                        className="btn btn-primary w-100"
                                        onClick={() => updateEmployee(employee.id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-danger w-100"
                                        onClick={() => deleteEmployee(employee.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};
