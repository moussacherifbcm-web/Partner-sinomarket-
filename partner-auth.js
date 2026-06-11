// api/partner-auth.js — Vérification PIN admin partenaire
// Variable Vercel à créer : PARTNER_ADMIN_PIN

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Méthode non autorisée' });

  const { pin } = req.body || {};
  if (!pin) return res.status(400).json({ ok: false });

  const PARTNER_ADMIN_PIN = process.env.PARTNER_ADMIN_PIN;
  if (!PARTNER_ADMIN_PIN) return res.status(500).json({ error: 'PARTNER_ADMIN_PIN non configuré sur Vercel' });

  if (pin === PARTNER_ADMIN_PIN) {
    // Token valable 2 heures
    const token = Buffer.from('partner_admin:' + Date.now()).toString('base64');
    return res.status(200).json({ ok: true, token });
  } else {
    return res.status(401).json({ ok: false });
  }
};
