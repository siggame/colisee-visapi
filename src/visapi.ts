// offload functionality to testable function
export function visapi(num: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        resolve();
    });
}