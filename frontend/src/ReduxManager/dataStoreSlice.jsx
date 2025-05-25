import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export const dataStoreSlice = createSlice({
  name: 'dataStore',
  initialState: {
    personalInfo: {
      firstName: "",
      lastName: "",
      state: "",
      country: "",
      pinCode: "",
      email: "",
      phone: "",
    },

    summary: {
      objective: ""
    },

    workEx: [
      {
        id: uuidv4(),
        jobTitle: "",
        employer: "",
        location: "",
        startMonth: "",
        startYear: "",
        endMonth: "",
        endYear: ""
      }
    ],
    education: [
      {
        id: uuidv4(),
        schoolName: "",
        schoolLocation: "",
        degree: "No Degree",
        otherDegree: "",
        fieldOfStudy: "",
        gradMonth: "",
        gradYear: ""
      }
    ],
    skills: [],
    selectedTemplate: "",
    imageFile: null,
    errorMessages: {
      objective: "",
    },
    showErrorMessages: false,
  },

  reducers: {
    setSelectedTemplate: (state, action) => {
      state.selectedTemplate = action.payload;
    },

    updatePersonalInfo: (state, action) => {
      state.personalInfo[action.payload.key] = action.payload.value;
    },

    updateSummary: (state, action) => {
      state.summary[action.payload.key] = action.payload.value;
    },

    updateWorkEx: (state, action) => {
      const { key, value, index } = action.payload;
      if (state.workEx[index]) {
        state.workEx[index][key] = value;
      }
    },

    updateEducation: (state, action) => {
      const { key, value, index } = action.payload;
      if (state.education[index]) {
        state.education[index][key] = value;
      }
    },

    updateSkills: (state, action) => {
      state.skills[action.payload.index][action.payload.key] = action.payload.value;
    },

    updateState: (state, action) => {
      state[action.payload.key] = action.payload.value;
    },

    updateErrorMessages: (state, action) => {
      const { key, value } = action.payload;
      state.errorMessages[key] = value;
    },

    addArrayElement: (state, action) => {
      const { key, element } = action.payload;
      if (!Array.isArray(state[key])) {
        console.error(`Expected state[${key}] to be an array, but got`, state[key]);
        return;
      }

      state[key].push(element);
    },

    removeArrayElement: (state, action) => {
      const { key, index } = action.payload;
      if (Array.isArray(state[key])) {
        state[key] = state[key].filter((_, i) => i !== index);
      }
    },
  }
});

export const { updatePersonalInfo, updateWorkEx, updateEducation, updateSkills, updateErrorMessages, setSelectedTemplate, updateState, addArrayElement, removeArrayElement, updateSummary } = dataStoreSlice.actions;
export default dataStoreSlice.reducer;
