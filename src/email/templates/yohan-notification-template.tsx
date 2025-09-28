import * as React from 'react';

// Template de notification pour Yohan
interface YohanNotificationProps {
  clientName: string;
  clientEmail: string;
  subject: string;
  message: string;
}

export function YohanNotificationTemplate({
  clientName,
  clientEmail,
  subject,
  message,
}: YohanNotificationProps) {
  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        lineHeight: '1.6',
        color: '#333',
      }}
    >
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ color: '#ff0015', marginBottom: '10px' }}>
            Nouveau message de contact
          </h1>
          <p style={{ color: '#666', fontSize: '14px' }}>
            Reçu depuis yohandoens.dev
          </p>
        </div>

        <div
          style={{
            backgroundColor: '#f9f9f9',
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '20px',
          }}
        >
          <h2 style={{ color: '#333', marginBottom: '15px' }}>
            Détails du contact
          </h2>

          <div style={{ marginBottom: '15px' }}>
            <strong>Nom :</strong> {clientName}
          </div>

          <div style={{ marginBottom: '15px' }}>
            <strong>Email :</strong>
            <a
              href={`mailto:${clientEmail}`}
              style={{
                color: '#ff0015',
                textDecoration: 'none',
                marginLeft: '5px',
              }}
            >
              {clientEmail}
            </a>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <strong>Sujet :</strong> {subject}
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#fff',
            padding: '20px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            marginBottom: '20px',
          }}
        >
          <h3 style={{ color: '#333', marginBottom: '15px' }}>Message</h3>
          <div
            style={{
              whiteSpace: 'pre-wrap',
              fontSize: '14px',
              lineHeight: '1.5',
            }}
          >
            {message}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <a
            href={`mailto:${clientEmail}?subject=Re: ${subject}`}
            style={{
              backgroundColor: '#ff0015',
              color: 'white',
              padding: '12px 24px',
              textDecoration: 'none',
              borderRadius: '6px',
              display: 'inline-block',
            }}
          >
            Répondre à {clientName}
          </a>
        </div>

        <div
          style={{
            borderTop: '1px solid #eee',
            paddingTop: '20px',
            fontSize: '12px',
            color: '#666',
            textAlign: 'center',
          }}
        >
          <p>
            Message reçu le{' '}
            {new Date().toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
