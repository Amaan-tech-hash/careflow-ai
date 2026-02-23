import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Clock, FileText, MessageSquare, BarChart3, Send, Languages, Pill, FileStack } from 'lucide-react';

const CareFlowAI = () => {
  const [activeTab, setActiveTab] = useState('triage');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [editedResponse, setEditedResponse] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const mockMessages = [
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

  const templates = {
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

  const checkDrugInteractions = (medications) => {
    const interactions = [];
    const meds = medications.map(m => m.toLowerCase());

    if (meds.some(m => m.includes('lisinopril')) && meds.some(m => m.includes('potassium'))) {
      interactions.push({ severity: 'moderate', warning: 'ACE inhibitor + Potassium may increase hyperkalemia risk' });
    }
    if (meds.some(m => m.includes('simvastatin')) && meds.some(m => m.includes('amlodipine'))) {
      interactions.push({ severity: 'moderate', warning: 'Simvastatin dose should not exceed 20mg with Amlodipine' });
    }
    if (meds.some(m => m.includes('aspirin')) && meds.some(m => m.includes('ibuprofen'))) {
      interactions.push({ severity: 'high', warning: 'NSAIDs may reduce aspirin\'s cardioprotective effects' });
    }

    return interactions;
  };

  const applyTemplate = (templateType) => {
    const template = templates[templateType]?.[selectedLanguage] || '';
    setEditedResponse(template);
  };

  const getCategoryStyle = (category) => {
    switch (category) {
      case 'urgent': return { backgroundColor: '#fee2e2', color: '#991b1b', border: '2px solid #fca5a5' };
      case 'routine': return { backgroundColor: '#dbeafe', color: '#1e3a8a', border: '2px solid #93c5fd' };
      case 'refill': return { backgroundColor: '#dcfce7', color: '#166534', border: '2px solid #86efac' };
      case 'scheduling': return { backgroundColor: '#f3e8ff', color: '#6b21a8', border: '2px solid #d8b4fe' };
      default: return { backgroundColor: '#f3f4f6', color: '#374151', border: '2px solid #d1d5db' };
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'urgent': return <AlertCircle size={16} />;
      case 'routine': return <MessageSquare size={16} />;
      case 'refill': return <Pill size={16} />;
      case 'scheduling': return <Clock size={16} />;
      default: return <FileText size={16} />;
    }
  };

  const renderTriage = () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h3 style={{ fontWeight: 600, color: '#374151', marginBottom: '12px', fontSize: '16px' }}>
          Patient Messages ({mockMessages.length})
        </h3>
        {mockMessages.map(msg => (
          <div
            key={msg.id}
            onClick={() => {
              setSelectedMessage(msg);
              setEditedResponse('');
            }}
            style={{
              padding: '16px',
              borderRadius: '8px',
              border: selectedMessage?.id === msg.id ? '2px solid #3b82f6' : '2px solid #e5e7eb',
              backgroundColor: selectedMessage?.id === msg.id ? '#eff6ff' : '#ffffff',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              if (selectedMessage?.id !== msg.id) {
                e.currentTarget.style.borderColor = '#d1d5db';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedMessage?.id !== msg.id) {
                e.currentTarget.style.borderColor = '#e5e7eb';
              }
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <div>
                <p style={{ fontWeight: 500, color: '#111827', marginBottom: '4px' }}>{msg.patient}</p>
                <p style={{ fontSize: '14px', color: '#6b7280' }}>{msg.age} years old</p>
              </div>
              <div style={{
                ...getCategoryStyle(msg.category),
                padding: '4px 8px',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                {getCategoryIcon(msg.category)}
                {msg.category}
              </div>
            </div>
            <p style={{
              fontSize: '14px',
              color: '#4b5563',
              marginBottom: '8px',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical'
            }}>
              {msg.message}
            </p>
            <p style={{ fontSize: '12px', color: '#9ca3af' }}>{msg.timestamp}</p>
          </div>
        ))}
      </div>

      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        border: '2px solid #e5e7eb',
        padding: '24px',
        minHeight: '600px'
      }}>
        {selectedMessage ? (
          <>
            <div style={{ marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div>
                  <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#111827', marginBottom: '4px' }}>
                    {selectedMessage.patient}
                  </h2>
                  <p style={{ fontSize: '14px', color: '#6b7280' }}>
                    {selectedMessage.age} years old • {selectedMessage.timestamp}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Languages size={20} color="#9ca3af" />
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    style={{
                      padding: '4px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                  >
                    <option value="en">English</option>
                    <option value="es">Español</option>
                  </select>
                </div>
              </div>

              <div style={{
                backgroundColor: '#f9fafb',
                padding: '16px',
                borderRadius: '8px',
                marginBottom: '12px'
              }}>
                <p style={{ fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '4px' }}>
                  Patient Message:
                </p>
                <p style={{ color: '#111827' }}>{selectedMessage.message}</p>
              </div>

              <div style={{
                backgroundColor: '#eff6ff',
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid #bfdbfe'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Pill size={16} color="#2563eb" />
                  <p style={{ fontSize: '14px', fontWeight: 500, color: '#1e3a8a' }}>
                    Current Medications:
                  </p>
                </div>
                <ul style={{ fontSize: '14px', color: '#1e40af', margin: 0, paddingLeft: '20px' }}>
                  {selectedMessage.medications.map((med, idx) => (
                    <li key={idx} style={{ marginBottom: '4px' }}>{med}</li>
                  ))}
                </ul>

                {checkDrugInteractions(selectedMessage.medications).length > 0 && (
                  <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #bfdbfe' }}>
                    <p style={{ fontSize: '14px', fontWeight: 500, color: '#c2410c', marginBottom: '4px' }}>
                      ⚠️ Potential Interactions:
                    </p>
                    {checkDrugInteractions(selectedMessage.medications).map((interaction, idx) => (
                      <p key={idx} style={{
                        fontSize: '12px',
                        color: '#ea580c',
                        backgroundColor: '#ffedd5',
                        padding: '8px',
                        borderRadius: '4px',
                        marginTop: '4px'
                      }}>
                        {interaction.warning}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ fontSize: '14px', fontWeight: 500, color: '#374151', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FileStack size={16} />
                  Quick Templates
                </label>
              </div>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                <button
                  onClick={() => applyTemplate('refill')}
                  style={{
                    padding: '8px 12px',
                    fontSize: '14px',
                    backgroundColor: '#dcfce7',
                    color: '#166534',
                    borderRadius: '6px',
                    border: '1px solid #86efac',
                    cursor: 'pointer'
                  }}
                >
                  Refill Template
                </button>
                <button
                  onClick={() => applyTemplate('scheduling')}
                  style={{
                    padding: '8px 12px',
                    fontSize: '14px',
                    backgroundColor: '#f3e8ff',
                    color: '#6b21a8',
                    borderRadius: '6px',
                    border: '1px solid #d8b4fe',
                    cursor: 'pointer'
                  }}
                >
                  Scheduling Template
                </button>
                <button
                  onClick={() => applyTemplate('routine')}
                  style={{
                    padding: '8px 12px',
                    fontSize: '14px',
                    backgroundColor: '#dbeafe',
                    color: '#1e3a8a',
                    borderRadius: '6px',
                    border: '1px solid #93c5fd',
                    cursor: 'pointer'
                  }}
                >
                  Routine Template
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <label style={{ fontSize: '14px', fontWeight: 500, color: '#374151' }}>
                Compose Response:
              </label>
              <textarea
                value={editedResponse}
                onChange={(e) => setEditedResponse(e.target.value)}
                style={{
                  width: '100%',
                  height: '192px',
                  padding: '12px',
                  border: '2px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontFamily: 'inherit',
                  resize: 'vertical'
                }}
                placeholder="Type your response here or use a template above..."
              />
              <div style={{ display: 'flex', gap: '12px' }}>
                <button style={{
                  flex: 1,
                  padding: '8px 16px',
                  backgroundColor: '#16a34a',
                  color: 'white',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  fontWeight: 500
                }}>
                  <Send size={16} />
                  Send Response
                </button>
                <button style={{
                  padding: '8px 16px',
                  border: '2px solid #d1d5db',
                  color: '#374151',
                  borderRadius: '8px',
                  backgroundColor: 'white',
                  cursor: 'pointer'
                }}>
                  Save Draft
                </button>
              </div>
            </div>
          </>
        ) : (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            color: '#9ca3af'
          }}>
            <div style={{ textAlign: 'center' }}>
              <MessageSquare size={64} style={{ margin: '0 auto 12px', opacity: 0.5 }} />
              <p>Select a patient message to begin</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
      <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', border: '2px solid #e5e7eb' }}>
        <h3 style={{ fontWeight: 600, color: '#111827', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Clock size={20} color="#2563eb" />
          Time Saved This Week
        </h3>
        <p style={{ fontSize: '36px', fontWeight: 700, color: '#2563eb', marginBottom: '8px' }}>12.5 hours</p>
        <p style={{ fontSize: '14px', color: '#6b7280' }}>↑ 34% from last week</p>
        <div style={{ marginTop: '16px', height: '8px', backgroundColor: '#e5e7eb', borderRadius: '9999px', overflow: 'hidden' }}>
          <div style={{ height: '100%', backgroundColor: '#2563eb', width: '75%' }}></div>
        </div>
      </div>

      <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', border: '2px solid #e5e7eb' }}>
        <h3 style={{ fontWeight: 600, color: '#111827', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <MessageSquare size={20} color="#16a34a" />
          Messages Processed
        </h3>
        <p style={{ fontSize: '36px', fontWeight: 700, color: '#16a34a', marginBottom: '8px' }}>487</p>
        <p style={{ fontSize: '14px', color: '#6b7280' }}>Average response: 8 minutes</p>
        <div style={{ marginTop: '16px', height: '8px', backgroundColor: '#e5e7eb', borderRadius: '9999px', overflow: 'hidden' }}>
          <div style={{ height: '100%', backgroundColor: '#16a34a', width: '92%' }}></div>
        </div>
      </div>

      <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', border: '2px solid #e5e7eb' }}>
        <h3 style={{ fontWeight: 600, color: '#111827', marginBottom: '16px' }}>Message Categories</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', color: '#6b7280' }}>Urgent</span>
            <span style={{ fontSize: '14px', fontWeight: 500 }}>23 (5%)</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', color: '#6b7280' }}>Refill Requests</span>
            <span style={{ fontSize: '14px', fontWeight: 500 }}>198 (41%)</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', color: '#6b7280' }}>Scheduling</span>
            <span style={{ fontSize: '14px', fontWeight: 500 }}>156 (32%)</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', color: '#6b7280' }}>Routine Inquiries</span>
            <span style={{ fontSize: '14px', fontWeight: 500 }}>110 (22%)</span>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', border: '2px solid #e5e7eb' }}>
        <h3 style={{ fontWeight: 600, color: '#111827', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlertCircle size={20} color="#ea580c" />
          Drug Interactions Flagged
        </h3>
        <p style={{ fontSize: '36px', fontWeight: 700, color: '#ea580c', marginBottom: '8px' }}>12</p>
        <p style={{ fontSize: '14px', color: '#6b7280' }}>Prevented potential adverse events</p>
        <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ fontSize: '12px', backgroundColor: '#ffedd5', padding: '8px', borderRadius: '4px', border: '1px solid #fdba74' }}>
            <span style={{ fontWeight: 500 }}>High severity:</span> 3 cases
          </div>
          <div style={{ fontSize: '12px', backgroundColor: '#fef3c7', padding: '8px', borderRadius: '4px', border: '1px solid #fde047' }}>
            <span style={{ fontWeight: 500 }}>Moderate severity:</span> 9 cases
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #eff6ff, #e0e7ff)',
      padding: '24px'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '30px', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>
            CareFlow AI
          </h1>
          <p style={{ color: '#6b7280' }}>AI-Powered Clinical Documentation Assistant</p>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          <button
            onClick={() => setActiveTab('triage')}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s',
              backgroundColor: activeTab === 'triage' ? '#2563eb' : 'white',
              color: activeTab === 'triage' ? 'white' : '#6b7280',
              border: 'none',
              cursor: 'pointer',
              boxShadow: activeTab === 'triage' ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' : 'none'
            }}
          >
            <MessageSquare size={16} />
            Message Triage
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s',
              backgroundColor: activeTab === 'analytics' ? '#2563eb' : 'white',
              color: activeTab === 'analytics' ? 'white' : '#6b7280',
              border: 'none',
              cursor: 'pointer',
              boxShadow: activeTab === 'analytics' ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' : 'none'
            }}
          >
            <BarChart3 size={16} />
            Analytics
          </button>
        </div>

        {activeTab === 'triage' && renderTriage()}
        {activeTab === 'analytics' && renderAnalytics()}
      </div>
    </div>
  );
};

export default CareFlowAI;