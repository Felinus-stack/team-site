const { exec } = require("child_process");
const util = require("util");
const execAsync = util.promisify(exec);

async function runScript(scriptPath, description) {
  try {
    console.log(`\n🔄 ${description}...`);
    const { stdout, stderr } = await execAsync(`node ${scriptPath}`);
    
    if (stdout) console.log(stdout);
    if (stderr) console.error(stderr);
    
    console.log(`✅ ${description} 完成`);
  } catch (error) {
    console.error(`❌ ${description} 失败:`, error.message);
  }
}

async function restoreDatabase() {
  console.log("🚀 开始数据库完整恢复...");
  console.log("=====================================");
  
  try {
    // 1. 恢复管理员账户
    await runScript("prisma/restoreAdmin.js", "恢复管理员账户");
    
    // 2. 恢复团队成员数据  
    await runScript("prisma/restoreTeamMembers.js", "恢复团队成员数据");
    
    // 3. 恢复项目组件数据
    await runScript("prisma/restoreParts.js", "恢复项目组件数据");
    
    // 4. 运行现有的种子脚本（如果需要）
    await runScript("prisma/seedNews.js", "确保新闻数据完整");
    
    console.log("\n🎉 数据库恢复完成！");
    console.log("=====================================");
    console.log("📝 恢复内容包括:");
    console.log("  ✅ 管理员账户 (admin@teamsite.com / admin123456)");
    console.log("  ✅ 团队成员数据 (5个成员及其角色)");
    console.log("  ✅ 项目组件数据 (多个项目的组件信息)");
    console.log("  ✅ 新闻数据验证");
    console.log("\n⚠️  请登录后立即修改管理员密码！");
    
  } catch (error) {
    console.error("\n❌ 数据库恢复过程中出现错误:", error);
  }
}

restoreDatabase();
