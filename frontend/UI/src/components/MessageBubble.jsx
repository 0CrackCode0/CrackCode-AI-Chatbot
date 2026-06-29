import { formatAIText } from "../utils/formatAI";

export default function MessageBubble({ role, content }) {
    const isUser = role === "user";

    return (
        <div
            className={`d-flex mb-3 ${isUser ? "justify-content-end" : "justify-content-start"
                }`}
        >
            <div
                className={`message-bubble ${isUser
                    ? "bg-primary text-white"
                    : "bg-light border"
                    }`}
                dangerouslySetInnerHTML={{
                    __html: isUser
                        ? content
                        : formatAIText(content),
                }}
            />
        </div>
    );
}