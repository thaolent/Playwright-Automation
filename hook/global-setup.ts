
import fs from 'fs';
import path from 'path';

async function globalSetup() {
  console.log('🔥 GLOBAL SETUP IS RUNNING');

  const dir = path.join(process.cwd(), '__screenshots__');

  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
    console.log('✅ Old screenshots deleted');
  }

  fs.mkdirSync(dir, { recursive: true });

  console.log('✅ New screenshot folder created');
}

export default globalSetup;
