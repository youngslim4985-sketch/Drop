export const sendWaitlistEmail = async (email: string, dropTitle: string) => {
  try {
    const response = await fetch('/api/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: email,
        subject: `Access Requested: ${dropTitle}`,
        text: `Your request for access to ${dropTitle} has been received. The Ritual has begun.`,
        html: `<h1>The Ritual Has Begun</h1><p>Your request for access to <strong>${dropTitle}</strong> has been received. Your standing is being evaluated.</p>`
      })
    });
    return await response.json();
  } catch (error) {
    console.error("Email failed:", error);
    return { success: false, error };
  }
};
