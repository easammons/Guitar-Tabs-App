export default function MyButton({
        text,
        location,
        onClick,
        disabled
    }: { 
        text: string,
        location?: string,
        onClick?: () => void,
        disabled?: boolean
    }) {
    return (
        <a href ={location}><button className="upload-btn" onClick={onClick} disabled={disabled}>{text}</button></a>
    )
}