import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

console.log('🔗 Testing Supabase connection...');
console.log('URL:', supabaseUrl);
console.log('Key:', supabaseKey ? 'Present' : 'Missing');

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    // Test basic connection
    const { data, error } = await supabase.from('pandagarde_users').select('count').limit(1);
    
    if (error) {
      console.error('❌ Connection failed:', error.message);
      return false;
    }
    
    console.log('✅ Database connection successful!');
    
    // Test auth
    const { data: authData, error: authError } = await supabase.auth.getSession();
    if (authError) {
      console.log('ℹ️  Auth not initialized (this is normal)');
    } else {
      console.log('✅ Auth service working');
    }
    
    return true;
  } catch (err) {
    console.error('❌ Connection test failed:', err.message);
    return false;
  }
}

testConnection().then(success => {
  if (success) {
    console.log('🎉 All tests passed! Your database is ready.');
  } else {
    console.log('💡 Please run the setup-database.sql file in your Supabase SQL Editor first.');
  }
});