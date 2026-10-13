import assert from 'node:assert/strict';
import test from 'node:test';
import { render } from '@react-email/render';
import { ClientConfirmationTemplate } from '../src/email/templates/email-template';
import { YohanNotificationTemplate } from '../src/email/templates/yohan-notification-template';

test('both email templates render without sending an email', async () => {
  const confirmation = await render(
    ClientConfirmationTemplate({ clientName: 'Camille', subject: 'Projet 3D' })
  );
  const notification = await render(
    YohanNotificationTemplate({
      clientName: 'Camille',
      clientEmail: 'camille@example.com',
      subject: 'Projet 3D',
      message: '<script>unsafe</script>',
    })
  );
  assert.match(confirmation, /Camille/);
  assert.match(notification, /camille@example.com/);
  assert.doesNotMatch(notification, /<script>unsafe<\/script>/);
});
