import { formatAIText } from "../utils/formatAI";

export default function MessageBubble({ role, content }) {

    const isUser = role === "user";

    return (
        <div
            className={`d-flex mb-2 ${isUser ? "justify-content-end" : "justify-content-start"
                }`}
        >
            <div
                className={`p-3 rounded ${isUser ? "bg-primary text-white" : "bg-light"
                    }`}
                style={{
                    maxWidth: "70%",
                    whiteSpace: "pre-wrap",
                    lineHeight: "1.4",
                    fontSize: "15px"
                }}
                dangerouslySetInnerHTML={{
                    __html: isUser
                        ? content
                        : formatAIText(content)
                }}
            />
        </div>
    );
}