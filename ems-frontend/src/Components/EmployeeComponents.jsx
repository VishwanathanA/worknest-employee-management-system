import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createEmployee, getEmployeeById, updateEmployeeById } from '../Service/EmployeeService';

const EmployeeComponents = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const { id } = useParams();
    const navigator = useNavigate();

    const [error, setError] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });

    
    useEffect(() => {
        if (id) {
            getEmployeeById(id)
                .then((res) => {
                    setFirstName(res.data.firstName);
                    setLastName(res.data.lastName);
                    setEmail(res.data.email);
                })
                .catch((err) => console.log("Error loading employee: ", err));
        }
    }, [id]);

    function validateForm() {
        let isValid = true;
        const errorCopy = { ...error };

        if (firstName.trim()) {
            errorCopy.firstName = '';
        } else {
            errorCopy.firstName = 'Please enter your first name';
            isValid = false;
        }

        if (lastName.trim()) {
            errorCopy.lastName = '';
        } else {
            errorCopy.lastName = 'Please enter your last name';
            isValid = false;
        }

        if (email.trim()) {
            errorCopy.email = '';
        } else {
            errorCopy.email = 'Please enter your email';
            isValid = false;
        }

        setError(errorCopy);
        return isValid;
    }

    function saveOrUpdateEmployee(e) {
        e.preventDefault();
        if (!validateForm()) return;

        const employee = { firstName, lastName, email };

        if (id) {
            updateEmployeeById(id, employee).then(() => {
                navigator('/employees');
            });
        } else {
            createEmployee(employee).then(() => {
                navigator('/employees');
            });
        }
    }

    function pageTitle() {
        return id ? <h2 className='text-center mt-3'>Edit Employee</h2> : <h2 className='text-center mt-3'>Add Employee</h2>;
    }

    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='card col-md-6 mt-4'>
                    {pageTitle()}
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-3'>
                                <label className="form-label">First Name</label>
                                <input
                                    type="text"
                                    placeholder='Enter Employee First Name'
                                    value={firstName}
                                    className={`form-control ${error.firstName ? 'is-invalid' : ''}`}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                {error.firstName && <div className='invalid-feedback'>{error.firstName}</div>}
                            </div>

                            <div className='form-group mb-3'>
                                <label className="form-label">Last Name</label>
                                <input
                                    type="text"
                                    placeholder='Enter Employee Last Name'
                                    value={lastName}
                                    className={`form-control ${error.lastName ? 'is-invalid' : ''}`}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                                {error.lastName && <div className='invalid-feedback'>{error.lastName}</div>}
                            </div>

                            <div className='form-group mb-3'>
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    placeholder='Enter Employee Email'
                                    value={email}
                                    className={`form-control ${error.email ? 'is-invalid' : ''}`}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {error.email && <div className='invalid-feedback'>{error.email}</div>}
                            </div>

                            <button className='btn btn-success' onClick={saveOrUpdateEmployee}>
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeComponents;
