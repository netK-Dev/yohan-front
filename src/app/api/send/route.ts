import { ClientConfirmationTemplate } from '../../../email/templates/email-template';
import { YohanNotificationTemplate } from '../../../email/templates/yohan-notification-template';
import { Resend } from 'resend';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

// Schema de validation pour les données du formulaire
const contactFormSchema = z.object({
  fullName: z.string().min(1, 'Le nom est requis'),
  email: z.string().email('Email invalide'),
  subject: z.string().min(1, 'Le sujet est requis'),
  message: z
    .string()
    .min(10, 'Le message doit contenir au moins 10 caractères'),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validation des données
    const validatedData = contactFormSchema.parse(body);
    const { fullName, email, subject, message } = validatedData;

    // Email de confirmation pour le client
    const confirmationResult = await resend.emails.send({
      from:
        process.env.RESEND_FROM_CLIENT || 'Yohan Doens <onboarding@resend.dev>',
      to: [email],
      subject: 'Confirmation de réception de votre message',
      react: ClientConfirmationTemplate({
        clientName: fullName,
        subject,
      }),
    });

    if (confirmationResult.error) {
      console.error('Erreur envoi confirmation:', confirmationResult.error);
    }

    // Email de notification pour Yohan
    const notificationResult = await resend.emails.send({
      from:
        process.env.RESEND_FROM_NOTIF ||
        'Portfolio Contact <onboarding@resend.dev>',
      to: [
        process.env.RESEND_FROM_CLIENT?.split('<')[1]?.split('>')[0] ||
          'doenshugo@gmail.com',
      ],
      subject: `Nouveau contact: ${fullName} - ${subject}`,
      react: YohanNotificationTemplate({
        clientName: fullName,
        clientEmail: email,
        subject,
        message,
      }),
    });

    if (notificationResult.error) {
      console.error('Erreur envoi notification:', notificationResult.error);
      // On continue même si la notification échoue
    }

    // Si au moins la confirmation a été envoyée, c'est un succès
    if (!confirmationResult.error) {
      return Response.json({
        success: true,
        message: 'Message envoyé avec succès',
      });
    } else {
      return Response.json(
        {
          error: "Erreur lors de l'envoi du message",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Erreur API send:', error);

    if (error instanceof z.ZodError) {
      return Response.json(
        {
          error: 'Données invalides',
          details: error.errors,
        },
        { status: 400 }
      );
    }

    return Response.json(
      {
        error: 'Erreur interne du serveur',
      },
      { status: 500 }
    );
  }
}
