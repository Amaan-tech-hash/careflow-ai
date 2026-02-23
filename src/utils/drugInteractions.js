export const checkDrugInteractions = (medications) => {
    const interactions = [];
    const meds = medications.map(m => m.toLowerCase());

    if (meds.some(m => m.includes('lisinopril')) && meds.some(m => m.includes('potassium'))) {
        interactions.push({
            severity: 'moderate',
            warning: 'ACE inhibitor + Potassium may increase hyperkalemia risk'
        });
    }

    if (meds.some(m => m.includes('simvastatin')) && meds.some(m => m.includes('amlodipine'))) {
        interactions.push({
            severity: 'moderate',
            warning: 'Simvastatin dose should not exceed 20mg with Amlodipine'
        });
    }

    if (meds.some(m => m.includes('aspirin')) && meds.some(m => m.includes('ibuprofen'))) {
        interactions.push({
            severity: 'high',
            warning: 'NSAIDs may reduce aspirin\'s cardioprotective effects'
        });
    }

    if (meds.some(m => m.includes('warfarin')) && meds.some(m => m.includes('aspirin'))) {
        interactions.push({
            severity: 'high',
            warning: 'Warfarin + Aspirin significantly increases bleeding risk'
        });
    }

    return interactions;
};