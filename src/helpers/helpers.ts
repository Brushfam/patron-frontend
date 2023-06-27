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
