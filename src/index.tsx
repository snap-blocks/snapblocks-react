import * as React from "react"

import snapblocks from "snapblocks"

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  blockStyle?: "snap" | "snap-flat" | "scratch2" | "scratch3" | "scratch3-high-contrast"
  languages?: string[],
  wrap?: boolean,
  inline?: boolean,
  wrapSize?: number | null,
  zebraColoring?: boolean,
}

const SnapBlocks: React.FunctionComponent<Props> = ({
  blockStyle,
  languages,
  inline,
  wrap,
  wrapSize,
  zebraColoring,
  children,
  ...props
}) => {
  const ref = React.useRef(null)

  React.useEffect(() => {
    let options: any = {}
    if (blockStyle !== undefined) options.style = blockStyle
    if (languages !== undefined) options.languages = languages
    if (inline !== undefined) options.languages = inline
    if (wrap !== undefined) options.style = wrap
    if (wrapSize !== undefined) options.languages = wrapSize
    if (zebraColoring !== undefined) options.languages = zebraColoring

    const doc = snapblocks.parse(children, options)
    const svg = snapblocks.render(doc, options)

    ref.current.innerHTML = ""
    ref.current.appendChild(svg)
  }, [blockStyle, languages, children])

  return <div ref={ref} {...props} />
}

export default SnapBlocks
