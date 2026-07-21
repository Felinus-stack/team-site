interface AdminPageLoadingProps {
  text?: string;
}

/** Consistent loading state while the shared admin authentication check runs. */
const AdminPageLoading = ({ text = "正在验证管理员登录状态…" }: AdminPageLoadingProps) => (
  <main className="min-h-screen bg-neutral-100 px-5 py-28 text-center text-neutral-500">
    {text}
  </main>
);

export default AdminPageLoading;
