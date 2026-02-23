export const mockMessages = [
    {
        id: 1,
        patient: 'Sarah Johnson',
        age: 45,
        message: 'I\'ve been having severe chest pain for the past 2 hours. It radiates to my left arm and I feel short of breath.',
        category: 'urgent',
        timestamp: '10 minutes ago',
        language: 'en',
        medications: ['Lisinopril 10mg', 'Metformin 500mg']
    },
    {
        id: 2,
        patient: 'Maria Garcia',
        age: 62,
        message: 'Necesito un resurtido de mi medicamento para la presión arterial. Se me está acabando.',
        category: 'refill',
        timestamp: '1 hour ago',
        language: 'es',
        medications: ['Amlodipine 5mg', 'Atorvastatin 20mg']
    },
    {
        id: 3,
        patient: 'James Chen',
        age: 34,
        message: 'My allergies have been really bad this week. Can I get a refill on my Claritin prescription?',
        category: 'refill',
        timestamp: '2 hours ago',
        language: 'en',
        medications: ['Loratadine 10mg']
    },
    {
        id: 4,
        patient: 'Patricia Williams',
        age: 58,
        message: 'I need to schedule my annual physical exam. I\'m available next week on Tuesday or Thursday.',
        category: 'scheduling',
        timestamp: '3 hours ago',
        language: 'en',
        medications: ['Synthroid 75mcg']
    },
    {
        id: 5,
        patient: 'Robert Taylor',
        age: 71,
        message: 'I got my lab results but I don\'t understand what they mean. My cholesterol numbers look different from last time.',
        category: 'routine',
        timestamp: '4 hours ago',
        language: 'en',
        medications: ['Simvastatin 40mg', 'Aspirin 81mg']
    }
];

export const templates = {
    refill: {
        en: 'Thank you for your refill request. I have reviewed your medication history and approved a 90-day supply of [MEDICATION]. You can pick this up at your pharmacy within 24 hours. Please schedule a follow-up appointment within the next 3 months to monitor your progress.',
        es: 'Gracias por su solicitud de resurtido. He revisado su historial de medicamentos y aprobé un suministro de 90 días de [MEDICATION]. Puede recogerlo en su farmacia dentro de 24 horas. Por favor programe una cita de seguimiento dentro de los próximos 3 meses para monitorear su progreso.'
    },
    scheduling: {
        en: 'Thank you for requesting an appointment. I have availability on [DATE/TIME]. Please confirm if this works for your schedule. If not, please provide 2-3 alternative times that work best for you.',
        es: 'Gracias por solicitar una cita. Tengo disponibilidad el [DATE/TIME]. Por favor confirme si esto funciona con su horario. Si no, por favor proporcione 2-3 horarios alternativos que funcionen mejor para usted.'
    },
    routine: {
        en: 'Thank you for reaching out. I have reviewed your message and [ASSESSMENT]. I recommend [RECOMMENDATION]. Please let me know if you have any additional questions or concerns.',
        es: 'Gracias por comunicarse. He revisado su mensaje y [ASSESSMENT]. Recomiendo [RECOMMENDATION]. Por favor hágame saber si tiene preguntas o inquietudes adicionales.'
    }
};