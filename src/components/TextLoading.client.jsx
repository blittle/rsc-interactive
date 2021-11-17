export default function({height, width, style = {}}) {
    return <span style={{
        ...style,
        height: height + 'px',
        width: width + 'px',
    }} className="text-loading"></span>;
}