export function checkUrlParam(param: string, value: string): boolean {
    const urlParams = new URLSearchParams(window.location.search).get(param)?.split(",");
    if (urlParams && urlParams.includes(value)) {
        return true;
    }
    return false;
}

export function getUrlParam(param: string): string | null {
    return new URLSearchParams(window.location.search).get(param);
}

export function log(message: string): void {
    if (checkUrlParam("debug", "true")) {
        console.log(message);
    }
}