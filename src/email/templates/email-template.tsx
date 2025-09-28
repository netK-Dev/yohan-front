import * as React from 'react';

// Template de confirmation pour le client
interface ClientConfirmationProps {
  clientName: string;
  subject: string;
}

export function ClientConfirmationTemplate({
  clientName,
  subject,
}: ClientConfirmationProps) {
  const subjectLabels: Record<string, string> = {
    quote: 'Demande de devis',
    project: 'Nouveau projet',
    collab: 'Collaboration',
    other: 'Autre',
  };

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
            Yohan Doens
          </h1>
          <p style={{ color: '#666', fontSize: '14px' }}>DOENS Production</p>
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
            Bonjour {clientName},
          </h2>

          <p style={{ marginBottom: '15px' }}>
            Merci pour votre message concernant :{' '}
            <strong>{subjectLabels[subject] || subject}</strong>
          </p>

          <p style={{ marginBottom: '15px' }}>
            Votre demande a bien été reçue et je vous recontacterai dans les
            plus brefs délais, généralement sous 24 heures.
          </p>

          <p style={{ marginBottom: '15px' }}>
            En attendant, n&apos;hésitez pas à consulter mes dernières
            réalisations sur mon portfolio.
          </p>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <a
            href="https://yohandoens.dev"
            style={{
              backgroundColor: '#ff0015',
              color: 'white',
              padding: '12px 24px',
              textDecoration: 'none',
              borderRadius: '6px',
              display: 'inline-block',
            }}
          >
            Voir mes réalisations
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
          <p>Yohan Doens - Développeur Full-Stack</p>
          <p>📧 contact@yohandoens.dev | 🌐 yohandoens.dev</p>
        </div>
      </div>
    </div>
  );
}
