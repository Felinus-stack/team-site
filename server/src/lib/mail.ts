import nodemailer from "nodemailer";

const requiredSettings = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "MAIL_FROM"] as const;

const getMissingSettings = (): string[] =>
  requiredSettings.filter((setting) => !process.env[setting]?.trim());

export const isMailConfigured = (): boolean => getMissingSettings().length === 0;

export const getMailConfigurationError = (): string =>
  `邮件服务未配置：${getMissingSettings().join("、")}`;

export const sendJoinAcceptedEmail = async (recipient: string): Promise<void> => {
  if (!isMailConfigured()) throw new Error(getMailConfigurationError());

  const port = Number(process.env.SMTP_PORT);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("SMTP_PORT 必须是有效端口号");
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const subject = "源境团队｜加入意向审核通过与报到通知";
  const text = [
    "你好，",
    "",
    "感谢你对源境团队的关注与加入意向。经过团队人工审核，你的加入意向已通过，欢迎加入源境团队。",
    "",
    "请在收到本邮件后一个星期内，前往以下地点完成报到：",
    "河南省新乡市红旗区平原（建业）体育中心（金穗大道 789 号）。",
    "",
    "后续的沟通、任务安排或活动通知，团队会通过此邮箱与你联系，请留意邮件并保持邮箱可用。",
    "",
    "源境团队",
  ].join("\n");

  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: recipient,
    subject,
    text,
    html: [
      "<p>你好，</p>",
      "<p>感谢你对源境团队的关注与加入意向。经过团队人工审核，你的加入意向已通过，欢迎加入源境团队。</p>",
      "<p>请在收到本邮件后<strong>一个星期内</strong>，前往以下地点完成报到：</p>",
      "<p><strong>河南省新乡市红旗区平原（建业）体育中心（金穗大道 789 号）</strong></p>",
      "<p>后续的沟通、任务安排或活动通知，团队会通过此邮箱与你联系，请留意邮件并保持邮箱可用。</p>",
      "<p>源境团队</p>",
    ].join(""),
  });
};
