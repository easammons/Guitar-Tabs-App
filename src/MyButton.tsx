export default function MyButton({ text, location }: { text: string, location: string }) {
    return <a href ={location}><button className="upload-btn">{text}</button></a>
}