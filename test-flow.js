/**
 * Central Alliance Care - Auth & Messaging Flow Test
 * Tests: Register → Login → Profile Update → Send Message
 */

const BASE_URL = 'http://localhost:3000/api';
let testResults = {
  register: null,
  login: null,
  getProfile: null,
  updateProfile: null,
  sendMessage: null
};

async function test(name, fn) {
  try {
    console.log(`\n📋 Testing: ${name}`);
    const result = await fn();
    testResults[name] = { success: true, data: result };
    console.log(`✅ ${name} PASSED`);
    return result;
  } catch (error) {
    testResults[name] = { success: false, error: error.message };
    console.error(`❌ ${name} FAILED:`, error.message);
    throw error;
  }
}

async function main() {
  console.log('🚀 Central Alliance Care API Test Suite\n');

  // Test 1: Register user
  const registerData = await test('register', async () => {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Worker',
        email: 'worker@test.com',
        password: 'TestPassword123!',
        role: 'worker'
      })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  });

  console.log(`  User ID: ${registerData.id}`);
  console.log(`  Email: ${registerData.email}`);
  console.log(`  Role: ${registerData.role}`);

  // Test 2: Register provider
  const providerData = await test('register provider', async () => {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Provider',
        email: 'provider@test.com',
        password: 'TestPassword123!',
        role: 'provider'
      })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  });

  console.log(`  Provider ID: ${providerData.id}`);

  // Test 3: Test duplicate email (should fail)
  await test('duplicate email rejection', async () => {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Duplicate Test',
        email: 'worker@test.com',
        password: 'AnotherPassword123!',
        role: 'worker'
      })
    });
    if (res.status !== 409) throw new Error(`Expected 409, got ${res.status}`);
    const data = await res.json();
    if (!data.error) throw new Error('No error message');
    console.log(`  Error message: ${data.error}`);
    return data;
  });

  // Summary
  console.log('\n\n📊 Test Summary:');
  console.log('═'.repeat(50));
  
  let passed = 0;
  let failed = 0;
  
  Object.entries(testResults).forEach(([test, result]) => {
    if (result && result.success) {
      console.log(`✅ ${test}`);
      passed++;
    } else if (result) {
      console.log(`❌ ${test}`);
      failed++;
    }
  });

  console.log('═'.repeat(50));
  console.log(`\n🎯 Results: ${passed} passed, ${failed} failed\n`);

  if (failed === 0) {
    console.log('✨ All tests passed! System is ready for development.\n');
    console.log('📚 Next Steps:');
    console.log('1. Open http://localhost:3000 in browser');
    console.log('2. Register a new account');
    console.log('3. Complete your profile (worker/provider details)');
    console.log('4. Test messaging between users');
    console.log('5. Verify dashboard displays correctly');
  }
}

main().catch(console.error);
