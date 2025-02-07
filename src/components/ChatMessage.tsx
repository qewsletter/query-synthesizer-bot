import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: string;
  isAi: boolean;
}

export const ChatMessage = ({ message, isAi }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "p-4 rounded-lg animate-fade-in",
        isAi ? "bg-secondary" : "bg-primary text-primary-foreground"
      )}
    >
      <div className="flex items-start gap-3">
        <div className="min-w-[24px] pt-1">
          {isAi ? "🤖" : "👤"}
        </div>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message}</p>
      </div>
    </div>
  );
};