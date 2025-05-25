import React from 'react';
import './WorkEx.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import BottomNavigation from '../BottomNavigation/BottomNavigation';
import TextField from '../../InputComponents/TextField/TextField';
import { updateWorkEx, addArrayElement, removeArrayElement, updateErrorMessages } from '../../../ReduxManager/dataStoreSlice';

const WorkEx = () => {
    const navigate = useNavigate();
    const workHeads = useSelector(state => state.dataStore.workEx);
    const dispatch = useDispatch();
    const errorMessages = useSelector(state => state.dataStore.errorMessages);
    const workExErrorMessages = errorMessages.workEx || [];

    // ✅ Rename for clarity
    const hasErrors = workExErrorMessages.some(msgGroup =>
        Object.values(msgGroup).some(msg => msg !== '')
    );

    const validateFields = (field, value) => {
        if (['jobTitle', 'employer', 'location'].includes(field)) {
            return value.trim() === '' ? `${field} is required` : '';
        }
        return '';
    };

    const onChangeHandler = (key, value, index) => {
        const errorMessage = validateFields(key, value);
        dispatch(updateWorkEx({ key, value, index }));
        dispatch(updateErrorMessages({
            index,
            key,
            value: errorMessage || ''
        }));
    };

    const goBack = () => {
        navigate('/progress/KeySkills');
    };

    const AddWorkExp = () => {
        dispatch(addArrayElement({
            key: 'workEx',
            element: {
                id: uuidv4(),
                jobTitle: "",
                employer: "",
                location: "",
                startMonth: "",
                startYear: "",
                endMonth: "",
                endYear: ""
            }
        }));

        dispatch(addArrayElement({
            key: 'errorMessages',
            element: {
                jobTitle: '',
                employer: '',
                location: ''
            }
        }));
    };

    const RemoveWorkExp = (index) => {
        if (workHeads.length > 1) {
            dispatch(removeArrayElement({ key: 'workEx', index }));
            dispatch(removeArrayElement({ key: 'errorMessages', index }));
        }
    };

    const yearRange = (start, end) =>
        Array.from({ length: end - start + 1 }, (_, i) => start + i);

    const years = yearRange(1980, new Date().getFullYear());
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    return (
        <div className="workexp-container">
            <div className='workexp-left'>
                <button onClick={goBack} className="back">
                    <span><i className="bi bi-arrow-left"></i></span> Go Back
                </button>
                <p className='h1'>Tell us about your most recent job</p>
                <p className="h2">We’ll start there and work backward.</p>
                <p style={{marginBottom:'18px'}}><span style={{color:'red', margin:'0px 5px'}}>*</span>indicates a required field</p>

                {workHeads.map((work, index) => (
                    <div className="workexp-input-container" key={work.id} style={{ marginTop: index === 0 ? '0px' : '50px' }}>
                        <div className="workexp-inputs">
                            <TextField
                                label="JOB TITLE"
                                elementId="jobTitle"
                                placeholder="e.g. Software Developer"
                                type="text"
                                value={work.jobTitle || ""}
                                validation={{ required: true }}
                                errorMessage={workExErrorMessages[index]?.jobTitle || ''}
                                onChange={(val) => onChangeHandler('jobTitle', val, index)}
                            />
                        </div>

                        <div className="workexp-inputs">
                            <TextField
                                label="EMPLOYER"
                                elementId="employer"
                                placeholder="e.g. Amazon, Google, Facebook"
                                type="text"
                                value={work.employer || ""}
                                validation={{ required: true }}
                                errorMessage={workExErrorMessages[index]?.employer || ''}
                                onChange={(val) => onChangeHandler('employer', val, index)}
                            />
                        </div>

                        <div className="workexp-inputs">
                            <TextField
                                label="LOCATION"
                                elementId="location"
                                placeholder="e.g. New Delhi, India"
                                type="text"
                                value={work.location || ""}
                                validation={{ required: true }}
                                errorMessage={workExErrorMessages[index]?.location || ''}
                                onChange={(val) => onChangeHandler('location', val, index)}
                            />
                        </div>

                        <div className="workexp-dates-row">
                            <div className="date-field">
                                <label className='text-label'>START DATE</label>
                                <select
                                    className="workexp-select"
                                    value={work.startMonth}
                                    onChange={(e) => onChangeHandler('startMonth', e.target.value, index)}>
                                    <option value="">Month</option>
                                    {months.map((month, i) => (
                                        <option key={i} value={month}>{month}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="date-field">
                                <label>&nbsp;</label>
                                <select
                                    className="workexp-select"
                                    value={work.startYear}
                                    onChange={(e) => onChangeHandler('startYear', e.target.value, index)}>
                                    <option value="">Year</option>
                                    {years.map((yr, i) => (
                                        <option key={i} value={yr}>{yr}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="date-field">
                                <label className='text-label'>END DATE</label>
                                <select
                                    className="workexp-select"
                                    value={work.endMonth}
                                    onChange={(e) => onChangeHandler('endMonth', e.target.value, index)}>
                                    <option value="">Month</option>
                                    {months.map((month, i) => (
                                        <option key={i} value={month}>{month}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="date-field">
                                <label>&nbsp;</label>
                                <select
                                    className="workexp-select"
                                    value={work.endYear}
                                    onChange={(e) => onChangeHandler('endYear', e.target.value, index)}>
                                    <option value="">Year</option>
                                    {years.map((yr, i) => (
                                        <option key={i} value={yr}>{yr}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="workexp-buttons">
                            {index === workHeads.length - 1 && (
                                <button className="workexp-button" onClick={AddWorkExp}>Add new</button>
                            )}
                            {workHeads.length > 1 && (
                                <button className="workexp-button" onClick={() => RemoveWorkExp(index)} disabled={index === 0}>Remove</button>
                            )}
                        </div>
                    </div>
                ))}

                <BottomNavigation
                    nextPagePath='/progress/summary'
                    isFormValid={!hasErrors}
                    onNext={() => navigate('/progress/summary')}
                />
            </div>

            <div className="workexp-right">
                {/* <p style={{ textAlign: 'center', color: '#aaa' }}>Preview or Template area</p> */}
            </div>
        </div>
    );
};

export default WorkEx;
