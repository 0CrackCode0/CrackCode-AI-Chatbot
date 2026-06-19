export function formatAIText(text) {

    if (!text) return "";

    let formatted = text;

    // Headings
    formatted = formatted
        .replace(/^### (.*$)/gm, "<h6 class='fw-bold mt-2 mb-1'>$1</h6>")
        .replace(/^## (.*$)/gm, "<h5 class='fw-bold mt-2 mb-1'>$1</h5>");

    // Bold text
    formatted = formatted.replace(
        /\*\*(.*?)\*\*/g,
        "<strong>$1</strong>"
    );

    // Bullet points
    formatted = formatted.replace(
        /^[\*\-]\s+(.*)$/gm,
        "• $1"
    );

    // Numbered lists
    formatted = formatted.replace(
        /^\d+\.\s+(.*)$/gm,
        "<div class='ms-2'>• $1</div>"
    );

    // Remove excessive line breaks (IMPORTANT FIX)
    formatted = formatted.replace(/\n{3,}/g, "\n\n");

    // Convert single line breaks ONLY (not double spacing)
    formatted = formatted.replace(/\n/g, "<br/>");

    return formatted;
}