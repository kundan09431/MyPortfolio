async function testUpload() {
  const loginRes = await fetch('http://localhost:5000/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@portfolio.com', password: 'admin123456' }),
  });
  const loginData = await loginRes.json();
  const token = loginData.token;

  const formData = new FormData();
  const blob = new Blob(['PNG_TEST_CONTENT'], { type: 'image/png' });
  formData.append('file', blob, 'sample_avatar.png');

  const uploadRes = await fetch('http://localhost:5000/api/upload', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const uploadResult = await uploadRes.json();
  console.log('Upload Result:', uploadResult);

  if (!uploadResult.success || !uploadResult.url) {
    throw new Error('Upload failed');
  }
  console.log('✅ Upload endpoint verified successfully!');
}

testUpload().catch((err) => {
  console.error('❌ Upload test failed:', err);
  process.exit(1);
});
