import ReactMarkdown from "react-markdown"
import './_markdown.scss'

function Markdown({ children }: { children: string }) {
  return (
    <div className='markdown'>
      <ReactMarkdown>{children}</ReactMarkdown>
    </div>
  )
}

export default Markdown
