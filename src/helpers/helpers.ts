export function parseAddress(address: string) {
    return address.slice(0, 8) + "..." + address.slice(-8)
}

export function parseAddressPTag(address: string) {
    return address.slice(0, 8) + "... " + address.slice(-8)
}

export function parseDate(timestamp: number) {
    let date = new Date(timestamp * 1000).toString()
    return date.replace(/\s*\(.*?\)\s*/g, "")
}

export function parseCodeHash(hash: string | null) {
    return hash?.slice(0, 19) + "..."
}

export function textContainString(text: string = "", stringToSearch: string) {
    return (
        !stringToSearch.replace(/\s/g, '').length ||
        (stringToSearch && text.toLowerCase().includes(stringToSearch.trim().toLowerCase()))
    )
}

export function setFileNameLength(name: string) {
    return name.length > 26 ? name.slice(0,26) + "..." : name
}

export function getHashFromString(text: string) {
    if (!text.length) return 0;
    let hash = 0;

    for (let i = 0; i < text.length; i++) {
        hash = ((hash << 5) - hash) + text.charCodeAt(i)
        hash |= hash
    }

    return hash
}
