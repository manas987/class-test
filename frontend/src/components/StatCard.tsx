import { useTheme } from "@/context/ThemeContext";
import { memo } from "react";

export const StatCard = memo(function StatCard({
  label,
  value,
  style,
}: {
  label: string;
  value: string | number;
  style?: React.CSSProperties;
}) {
  const { theme, toggleTheme } = useTheme();
  return (
    <div style={style} className="rounded border border-neutral-600 p-3">
      <div className="text-sm text-neutral-400">{label}</div>
      <div className="text-lg font-medium">{value}</div>
    </div>
  );
});
