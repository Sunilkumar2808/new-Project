import React, { useState } from 'react';

const Stepper = () => {
    const initialFormData = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        age: '',
        gender: '',
        occupation: '',
        additionalInfo: '' // New field
    };

    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState(initialFormData);
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    };

    const validateStep = () => {
        const newErrors = {};
        const { firstName, lastName, email, phone, street, city, state, zip, country, age, gender, occupation, additionalInfo } = formData;

        // Step 1 Validation
        if (currentStep === 1) {
            if (!firstName) newErrors.firstName = 'First name is required.';
            if (!lastName) newErrors.lastName = 'Last name is required.';
            if (!email) {
                newErrors.email = 'Email is required.';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
                newErrors.email = 'Invalid email address.';
            }
            if (!phone) {
                newErrors.phone = 'Phone number is required.';
            } else if (!/^\+?[0-9]{10,15}$/.test(phone)) {
                newErrors.phone = 'Invalid phone number.';
            }
        }

        // Step 2 Validation
        if (currentStep === 2) {
            if (!street) newErrors.street = 'Street address is required.';
            if (!city) newErrors.city = 'City is required.';
            if (!state) newErrors.state = 'State is required.';
            if (!zip) {
                newErrors.zip = 'Zip code is required.';
            } else if (!/^\d{6}(-\d{6})?$/.test(zip)) {
                newErrors.zip = 'Invalid zip code.';
            }
            if (!country) newErrors.country = 'Country is required.';
        }

        // Step 3 Validation
        if (currentStep === 3) {
            if (!age) newErrors.age = 'Age is required.';
            if (!occupation) newErrors.occupation = 'Occupation is required.';
            if (!gender) newErrors.gender = 'Gender is required.';
            if (!additionalInfo) newErrors.additionalInfo = 'Additional info is required.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const nextStep = () => {
        if (validateStep()) {
            if (currentStep === 3) {
                handleSubmit();
            } else {
                setCurrentStep((prevStep) => Math.min(prevStep + 1, 4));
            }
        }
    };

    const prevStep = () => {
        setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
    };

    const handleSubmit = () => {
        if (validateStep()) {
            setSubmitted(true);
            setCurrentStep(4);
        }
    };

    const resetStepper = () => {
        setFormData(initialFormData);
        setCurrentStep(1);
        setSubmitted(false);
    };

    const renderStepIndicator = (step) => {
        if (step < currentStep) {
            return <div className='d-flex justify-content-center align-items-center'><i className="bi bi-check-circle-fill fs-3 me-2"></i> Step {step}</div>; // Completed step icon
        } else if (step === currentStep) {
            return <span>{`Step ${step}`}</span>; // Current step text
        }
        return <span>{`Step ${step}`}</span>; // Upcoming steps text
    }

    const renderSummary = () => {
        return (
            <div>
                <h4>Submitted Form Details:</h4>
                <ul>
                    <li><strong>First Name:</strong> {formData.firstName}</li>
                    <li><strong>Last Name:</strong> {formData.lastName}</li>
                    <li><strong>Email:</strong> {formData.email}</li>
                    <li><strong>Phone:</strong> {formData.phone}</li>
                    <li><strong>Street:</strong> {formData.street}</li>
                    <li><strong>City:</strong> {formData.city}</li>
                    <li><strong>State:</strong> {formData.state}</li>
                    <li><strong>Zip Code:</strong> {formData.zip}</li>
                    <li><strong>Country:</strong> {formData.country}</li>
                    <li><strong>Age:</strong> {formData.age}</li>
                    <li><strong>Gender:</strong> {formData.gender}</li>
                    <li><strong>Occupation:</strong> {formData.occupation}</li>
                    <li><strong>Additional Info:</strong> {formData.additionalInfo}</li>
                </ul>
            </div>
        );
    };

    return (
        <div className="container mt-5 mb-5">
            <h1 className='text-center'>Multi-Step Form</h1>
            <ul className="nav nav-pills mb-4 d-flex justify-content-evenly align-items-center mt-5">
                {[1, 2, 3, 4].map((step) => (
                    <li className="nav-item" key={step}>
                        <a className={`nav-link ${currentStep === step ? 'active' : ''}`}>
                            {renderStepIndicator(step)}
                        </a>
                    </li>
                ))}
            </ul>

            <div className="step-content mb-5">
                {currentStep === 1 && (
                    <div className='card p-2'>
                        <h4>Step 1: Personal Details</h4>
                        <form>
                            <div className='row p-3 d-flex justify-content-center align-items-center'>
                                <div className="mb-3 col-6 text-start">
                                    <label className="form-label ps-2 fw-bold">First Name :</label>
                                    <input type="text" className="form-control" name="firstName" value={formData.firstName} onChange={handleChange} required />
                                    {errors.firstName && <small className="text-danger">{errors.firstName}</small>}
                                </div>
                                <div className="mb-3 col-6 text-start">
                                    <label className="form-label ps-2 fw-bold">Last Name :</label>
                                    <input type="text" className="form-control" name="lastName" value={formData.lastName} onChange={handleChange} required />
                                    {errors.lastName && <small className="text-danger">{errors.lastName}</small>}
                                </div>
                                <div className="mb-3 col-6 text-start">
                                    <label className="form-label ps-2 fw-bold">Email :</label>
                                    <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
                                    {errors.email && <small className="text-danger">{errors.email}</small>}
                                </div>
                                <div className="mb-3 col-6 text-start">
                                    <label className="form-label ps-2 fw-bold">Phone :</label>
                                    <input type="tel" className="form-control" name="phone" value={formData.phone} onChange={handleChange} required />
                                    {errors.phone && <small className="text-danger">{errors.phone}</small>}
                                </div>
                            </div>
                            <div className='d-flex justify-content-end'>
                                <button type="button" className="btn btn-primary" onClick={nextStep}>Next</button>
                            </div>
                        </form>
                    </div>
                )}

                {currentStep === 2 && (
                    <div className='card p-2'>
                        <h4>Step 2: Address Information</h4>
                        <form>
                            <div className='row p-3 d-flex justify-content-start align-items-center'>
                                <div className="mb-3 col-6 text-start">
                                    <label className="form-label ps-2 fw-bold">Street :</label>
                                    <input type="text" className="form-control" name="street" value={formData.street} onChange={handleChange} required />
                                    {errors.street && <small className="text-danger">{errors.street}</small>}
                                </div>
                                <div className="mb-3 col-6 text-start">
                                    <label className="form-label ps-2 fw-bold">City :</label>
                                    <input type="text" className="form-control" name="city" value={formData.city} onChange={handleChange} required />
                                    {errors.city && <small className="text-danger">{errors.city}</small>}
                                </div>
                                <div className="mb-3 col-6 text-start">
                                    <label className="form-label ps-2 fw-bold">State :</label>
                                    <input type="text" className="form-control" name="state" value={formData.state} onChange={handleChange} required />
                                    {errors.state && <small className="text-danger">{errors.state}</small>}
                                </div>
                                <div className="mb-3 col-6 text-start">
                                    <label className="form-label ps-2 fw-bold">Zip Code :</label>
                                    <input type="text" className="form-control" name="zip" value={formData.zip} onChange={handleChange} required />
                                    {errors.zip && <small className="text-danger">{errors.zip}</small>}
                                </div>
                                <div className="mb-3 col-6 text-start">
                                    <label className="form-label ps-2 fw-bold">Country :</label>
                                    <input type="text" className="form-control" name="country" value={formData.country} onChange={handleChange} required />
                                    {errors.country && <small className="text-danger">{errors.country}</small>}
                                </div>
                            </div>
                            <div className='d-flex justify-content-end'>
                                <button type="button" className="btn btn-secondary me-4" onClick={prevStep}>Previous</button>
                                <button type="button" className="btn btn-primary" onClick={nextStep}>Next</button>
                            </div>
                        </form>
                    </div>
                )}

                {currentStep === 3 && (
                    <div className='card p-2'>
                        <h4>Step 3: Additional Information</h4>
                        <form>
                            <div className='row p-3 d-flex justify-content-start align-items-center'>
                                <div className="mb-3 col-6 text-start">
                                    <label className="form-label ps-2 fw-bold">Age :</label>
                                    <input type="number" className="form-control" name="age" value={formData.age} onChange={handleChange} required />
                                    {errors.age && <small className="text-danger">{errors.age}</small>}
                                </div>
                                <div className="mb-3 col-6 text-start">
                                    <label className="form-label ps-2 fw-bold">Occupation :</label>
                                    <input type="text" className="form-control" name="occupation" value={formData.occupation} onChange={handleChange} required />
                                    {errors.occupation && <small className="text-danger">{errors.occupation}</small>}
                                </div>
                                <div className="mb-3 col-6 text-start">
                                    <label className="form-label ps-2 fw-bold">Gender :</label>
                                    <input type="text" className="form-control" name="gender" value={formData.gender} onChange={handleChange} required />
                                    {errors.gender && <small className="text-danger">{errors.gender}</small>}
                                </div>
                                <div className="mb-3 col-6 text-start">
                                    <label className="form-label ps-2 fw-bold">Additional Info :</label>
                                    <input type="text" className="form-control" name="additionalInfo" value={formData.additionalInfo} onChange={handleChange} required />
                                    {errors.additionalInfo && <small className="text-danger">{errors.additionalInfo}</small>}
                                </div>
                            </div>
                            <div className='d-flex justify-content-end'>
                                <button type="button" className="btn btn-secondary me-4" onClick={prevStep}>Previous</button>
                                <button type="button" className="btn btn-primary" onClick={nextStep}>Next</button>
                            </div>
                        </form>
                    </div>
                )}

                {currentStep === 4 && (
                    <div className='card p-3'>
                        <h4>Step 4: Confirmation</h4>
                        <p>Please review your details before submitting:</p>
                        <table className="table table-striped text-start">
                            <tbody>
                                <tr>
                                    <td className='ps-3'><strong>First Name :</strong></td>
                                    <td>{formData.firstName}</td>
                                </tr>
                                <tr>
                                    <td className='ps-3'><strong>Last Name :</strong></td>
                                    <td>{formData.lastName}</td>
                                </tr>
                                <tr>
                                    <td className='ps-3'><strong>Email :</strong></td>
                                    <td>{formData.email}</td>
                                </tr>
                                <tr>
                                    <td className='ps-3'><strong>Phone :</strong></td>
                                    <td>{formData.phone}</td>
                                </tr>
                                <tr>
                                    <td className='ps-3'><strong>Street :</strong></td>
                                    <td>{formData.street}</td>
                                </tr>
                                <tr>
                                    <td className='ps-3'><strong>City :</strong></td>
                                    <td>{formData.city}</td>
                                </tr>
                                <tr>
                                    <td className='ps-3'><strong>State :</strong></td>
                                    <td>{formData.state}</td>
                                </tr>
                                <tr>
                                    <td className='ps-3'><strong>Zip :</strong></td>
                                    <td>{formData.zip}</td>
                                </tr>
                                <tr>
                                    <td className='ps-3'><strong>Country :</strong></td>
                                    <td>{formData.country}</td>
                                </tr>
                                <tr>
                                    <td className='ps-3'><strong>Age :</strong></td>
                                    <td>{formData.age}</td>
                                </tr>
                                <tr>
                                    <td className='ps-3'><strong>Gender :</strong></td>
                                    <td>{formData.gender}</td>
                                </tr>
                                <tr>
                                    <td className='ps-3'><strong>Occupation :</strong></td>
                                    <td>{formData.occupation}</td>
                                </tr>
                                <tr>
                                    <td className='ps-3'><strong>Additional Info :</strong></td>
                                    <td>{formData.additionalInfo}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                            <button type="button" className="btn btn-secondary me-4" onClick={prevStep}>Previous</button>
                            <button type="button" className="btn btn-success" onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
                )}
                {submitted && (
                    <div className='alert alert-success mt-3'>
                        Form submitted successfully!
                        <button className="btn btn-info ms-3" onClick={resetStepper}>Reset</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Stepper;
