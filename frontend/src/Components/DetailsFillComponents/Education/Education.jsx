import React, { useState } from 'react';
import './Education.css';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import TextField from '../../InputComponents/TextField/TextField';
import SelectField from '../../InputComponents/SelectField/SelectField'
import { updateEducation, addArrayElement, removeArrayElement, updateErrorMessages } from '../../../ReduxManager/dataStoreSlice';
import BottomNavigation from '../BottomNavigation/BottomNavigation';

const Education = () => {
    const navigate = useNavigate();
    const educationHeads = useSelector(state => state.dataStore.education);
    const [submitted, setSubmitted] = useState(false);
    const dispatch = useDispatch();

    const onChangeHandler = (key, value, index, errorMessage = undefined) => {
        dispatch(updateEducation({
            key: key,
            value: value,
            index: index,
        }));
        if (errorMessage !== undefined) {
            dispatch(updateErrorMessages({
                key: key,
                value: errorMessage,
                index: index,
            }));
        }
    };

    const goBack = () => {
        navigate('/progress/personalInfo')
    }

    function AddEducation() {
        dispatch(addArrayElement({
            key: 'education',
            element: {
                id: uuidv4(),
                schoolName: "",
                schoolLocation: "",
                degree: "",
                otherDegree: "",
                fieldOfStudy: "",
                gradMonth: "",
                gradYear: ""
            }
        }));
    }

    function RemoveEducation(index) {
        if (educationHeads.length > 1) {
            dispatch(removeArrayElement({ key: "education", index }));
            dispatch(updateErrorMessages({ key: 'SchoolName', value: "", index }));
            dispatch(updateErrorMessages({ key: 'Degree', value: "", index }));
        }
    }

    function yearRange(start, end) {
        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    }

    const handleNext = () => {
        setSubmitted(true);
        if (isFormValid) {
            navigate('/progress/keyskills');
        }
    };

    const isFormValid = educationHeads.every((edu) =>
        edu.schoolName.trim() !== "" &&
        edu.degree.trim() !== "" &&
        (edu.degree !== "Select different degree" ? true : edu.otherDegree.trim() !== "") &&
        edu.gradMonth.trim() !== "" &&
        edu.gradYear.toString().trim() !== ""
    )

    const years = yearRange(1980, new Date().getFullYear());
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return (
        <div className="education-container">

            <div className="education-left">
                <button onClick={goBack} className="back"> <span><i className="bi bi-arrow-left"></i></span> Go Back</button>

                <p className='h1'>Tell us about your education</p>
                <p className='h2'>Enter your education experience so far, even if you are a current student or did not graduate.</p>
                <p style={{ marginBottom: '18px' }}><span style={{ color: 'red', margin: '0px 5px' }}>*</span>indicates a required field</p>

                {educationHeads.map((education, index) => (
                    <div className="education-input-container" key={education.id} style={{ marginTop: index === 0 ? '0px' : '50px' }}>

                        <div className="education-inputs">
                            <TextField
                                label="SCHOOL NAME"
                                elementId="schoolName"
                                placeholder="e.g. SentJosphen"
                                type="text"
                                value={education.schoolName || ""}
                                validation={{ required: true }}
                                onChange={(val, error) => onChangeHandler('schoolName', val, index, error)}
                            />
                        </div>

                        <div className="education-inputs">
                            <TextField
                                label="School Location"
                                elementId="schoolLocation"
                                placeholder="Gulbarga"
                                type="text"
                                value={education.schoolLocation || ""}
                                validation={{ required: true }}
                                onChange={(val, error) => onChangeHandler('schoolLocation', val, index, error)}
                            />
                        </div>

                        <div className="education-inputs">
                            <SelectField
                                label="Degree"
                                elementId="degree"
                                value={education.degree}
                                onChange={(value) => onChangeHandler('degree', value, index)}
                                options={[
                                    "No Degree",
                                    "High School Diploma",
                                    "MBA",
                                    "Bachelor’s Degree",
                                    "Master’s Degree",
                                    "Doctorate",
                                    "Select different degree"
                                ]}
                            />
                        </div>

                        {/* Conditionally show Other Degree input */}
                        <div className={`education-inputs ${education.degree === "Select different degree" ? 'show' : 'hide'}`}>
                            <TextField
                                label="Other Degree"
                                elementId="otherDegree"
                                placeholder="Enter your degree"
                                type="text"
                                value={education.otherDegree || ""}
                                validation={{ required: true }}
                                onChange={(val, error) => onChangeHandler('otherDegree', val, index, error)}
                            />
                        </div>

                        {/* Field of Study Always on its own row */}
                        <div className="education-inputs">
                            <TextField
                                label="Field of Study"
                                type="text"
                                elementId="fieldOfStudy"
                                placeholder="e.g. Financial Accounting"
                                value={education.fieldOfStudy}
                                onChange={(value) => onChangeHandler('fieldOfStudy', value, index)}
                            />
                        </div>

                        <div className="education-shortInput-container">
                            <div className="education-short-inputs">
                                <label className='text-label'>Graduation Month</label>
                                <select
                                    className="education-select"
                                    value={education.gradMonth}
                                    onChange={(e) => onChangeHandler('gradMonth', e.target.value, index)}>
                                    <option value="">Month</option>
                                    {months.map((month, i) => (
                                        <option key={i} value={month}>{month}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="education-col">
                                <label className='text-label'>Graduation Year</label>
                                <select
                                    className="education-select"
                                    value={education.gradYear}
                                    onChange={(e) => onChangeHandler('gradYear', e.target.value, index)}>
                                    <option value="">Year</option>
                                    {years.map((yr, i) => (
                                        <option key={i} value={yr}>{yr}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="education-buttons">
                            {index === educationHeads.length - 1 && (
                                <button className="education-button" onClick={AddEducation}>Add new</button>
                            )}
                            {educationHeads.length > 1 && (
                                <button className="education-button" onClick={() => RemoveEducation(index)} disabled={index === 0}>Remove</button>
                            )}
                        </div>
                    </div>
                ))}

                <BottomNavigation
                    prevPagePath="/"
                    onNext={handleNext}
                    nextPagePath='/ProgressStatus/keyskills'
                    isFormValid={isFormValid} />
            </div>

            <div className="education-right">
                {/* <p style={{ textAlign: 'center', color: '#aaa' }}>Preview or Template area</p> */}
            </div>

        </div>
    );
};
export default Education;