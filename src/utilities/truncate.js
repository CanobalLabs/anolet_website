/**
 * Truncates a string to the specified limit with an ellipsis or a character that you specify.
 * @param str The string to truncate.
 * @param limit The number of characters that the function should not truncate.
 * @param end An optional character to append at the end of the truncated string.
 */
export default function truncate(str, limit, end = '…') {
    let truncated = ""
    if (str.length > limit) {
        truncated = str.substring(0, limit)
        truncated += end
    } else truncated = str
    
    return truncated;
}