import { PropsWithChildren } from "react";

export default function EditorCard({
  title,
  description,
  actions,
  children
}: PropsWithChildren<{
  title: string;
  description?: string;
  actions?: React.ReactNode;
}>) {
  return (
    <div className="card p-5 space-y-4">
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{title}</h3>
          {description && (
            <p className="text-sm text-neutral-500 mt-1">{description}</p>
          )}
        </div>
        {actions}
      </div>
      <div>{children}</div>
    </div>
  );
}
