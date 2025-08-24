import { Check, Clock } from "lucide-react";
import clsx from "clsx";

export function StepHeader({
  index,
  title,
  status
}: {
  index: number;
  title: string;
  status: "pending" | "approved";
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={clsx(
          "step-dot",
          status === "approved" ? "step-active" : "step-pending"
        )}
      >
        {status === "approved" ? <Check size={16} /> : <Clock size={16} />}
      </div>
      <div>
        <div className="text-sm text-neutral-500">Step {index}</div>
        <div className="font-semibold">{title}</div>
      </div>
      <div className="ml-auto">
        <span className="badge">
          {status === "approved" ? "Approved" : "Waiting"}
        </span>
      </div>
    </div>
  );
}
