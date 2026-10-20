const BASE_URL = 'http://localhost:5000/api';

const runTests = async () => {
  console.log('--- Starting API Health & Verification Tests ---');
  let passed = 0;
  let failed = 0;

  const test = async (name, fn) => {
    try {
      await fn();
      console.log(`✅ [PASS] ${name}`);
      passed++;
    } catch (err) {
      console.error(`❌ [FAIL] ${name}:`, err.message);
      failed++;
    }
  };

  let token = null;

  // 1. Health check
  await test('GET /api/health', async () => {
    const res = await fetch(`${BASE_URL}/health`);
    const data = await res.json();
    if (data.status !== 'healthy') throw new Error('Unhealthy status');
  });

  // 2. Public Profile
  await test('GET /api/profile', async () => {
    const res = await fetch(`${BASE_URL}/profile`);
    const data = await res.json();
    if (!data.success || !data.data.name) throw new Error('Failed to get profile');
  });

  // 3. Public Skills
  await test('GET /api/skills', async () => {
    const res = await fetch(`${BASE_URL}/skills`);
    const data = await res.json();
    if (!data.success || !Array.isArray(data.data)) throw new Error('Failed to get skills');
  });

  // 4. Public Projects
  await test('GET /api/projects', async () => {
    const res = await fetch(`${BASE_URL}/projects`);
    const data = await res.json();
    if (!data.success || data.count < 1) throw new Error('No projects returned');
  });

  // 5. Public Education
  await test('GET /api/education', async () => {
    const res = await fetch(`${BASE_URL}/education`);
    const data = await res.json();
    if (!data.success) throw new Error('Failed to get education');
  });

  // 6. Public Experience
  await test('GET /api/experience', async () => {
    const res = await fetch(`${BASE_URL}/experience`);
    const data = await res.json();
    if (!data.success) throw new Error('Failed to get experience');
  });

  // 7. Public Certificates
  await test('GET /api/certificates', async () => {
    const res = await fetch(`${BASE_URL}/certificates`);
    const data = await res.json();
    if (!data.success) throw new Error('Failed to get certificates');
  });

  // 8. Submit Contact Message
  await test('POST /api/contact', async () => {
    const res = await fetch(`${BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Automated Tester',
        email: 'test@example.com',
        subject: 'Verification Inquiry',
        message: 'This is an automated verification message test from test-api script.',
      }),
    });
    const data = await res.json();
    if (!data.success) throw new Error(`Failed to submit contact inquiry: ${data.message}`);
  });

  // 9. Admin Login
  await test('POST /api/admin/login', async () => {
    const res = await fetch(`${BASE_URL}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@portfolio.com',
        password: 'admin123456',
      }),
    });
    const data = await res.json();
    if (!data.success || !data.token) throw new Error(`Admin login failed: ${data.message}`);
    token = data.token;
  });

  // 10. Protected Admin Profile
  await test('GET /api/admin/profile (Protected)', async () => {
    const res = await fetch(`${BASE_URL}/admin/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (!data.success || !data.data.email) throw new Error('Protected profile fetch failed');
  });

  // 11. Protected Contact Messages
  await test('GET /api/contact (Protected)', async () => {
    const res = await fetch(`${BASE_URL}/contact`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (!data.success || !Array.isArray(data.data)) throw new Error('Protected messages fetch failed');
  });

  console.log(`\n--- Test Results: ${passed} Passed, ${failed} Failed ---`);
  if (failed > 0) process.exit(1);
  process.exit(0);
};

runTests();
