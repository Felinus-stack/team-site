import type { ReactNode } from "react";

interface AdminPageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  eyebrow?: string;
}

/** Shared title and action area used by the admin pages. */
const AdminPageHeader = ({
  title,
  description,
  actions,
  eyebrow = "ADMIN",
}: AdminPageHeaderProps) => (
  <div className="flex flex-wrap items-end justify-between gap-4">
    <div>
      <p className="font-semibold tracking-[0.18em] text-customRed">{eyebrow}</p>
      <h1 className="mt-2 text-4xl font-bold text-neutral-900 sm:text-5xl">{title}</h1>
      {description && <p className="mt-2 text-base text-neutral-500">{description}</p>}
    </div>
    {actions && <div className="flex items-center gap-3">{actions}</div>}
  </div>
);

export default AdminPageHeader;
