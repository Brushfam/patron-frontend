
export function CopyIcon(props: {open: boolean}) {
    return props.open ?
        <img
            src={"/icons/check-mark.svg"}
            alt={"copied icon"}
        /> :
        <img
            src={"/icons/copy.svg"}
            alt={"copy icon"}
        />
}