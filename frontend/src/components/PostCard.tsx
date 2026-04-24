import { useTheme } from "@/context/ThemeContext";
import { memo } from "react";

export interface Post {
  id: string;
  title: string;
  body: string;
  status: string;
  tags: string[];
  views: number;
  createdAt: string;
}

export const PostCard = memo(function PostCard({
  post,
  onDelete,
  highlight,
  meta,
}: {
  post: Post;
  onDelete: (id: string) => void;
  highlight: boolean;
  meta: { version: number };
}) {
  const { theme, toggleTheme } = useTheme();
  return (
    <article
      className={
        "rounded border border-neutral-600 p-3 " +
        (highlight ? "border-amber-500" : "")
      }>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="font-medium">{post.title}</h3>
          <p className="text-sm text-neutral-400 line-clamp-2">{post.body}</p>
          <div className="mt-2 flex flex-wrap gap-1 text-xs text-neutral-500">
            {post.tags.map((t) => (
              <span
                key={t}
                className={`rounded ${theme === "light" ? "bg-neutral-200" : "bg-neutral-900"} px-2 py-0.5`}>
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="text-right text-xs text-neutral-500 ">
          <div>{post.status}</div>
          <div>{post.views} views</div>
          <div>v{meta.version}</div>
        </div>
      </div>
      <button
        type="button"
        className="mt-2 text-sm text-red-400"
        onClick={() => onDelete(post.id)}>
        Delete
      </button>
    </article>
  );
});
