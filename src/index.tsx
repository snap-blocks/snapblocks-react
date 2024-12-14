import * as React from "react"

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  blockStyle?: "snap" | "snap-flat" | "scratch2" | "scratch3" | "scratch3-high-contrast",
  languages?: string[],
  inline?: boolean,
  wrap?: boolean,
  wrapSize?: number | null,
  zebraColoring?: boolean,
  showSpaces?: boolean,
  santa?: boolean,
}

interface Options {
  style?: "snap" | "snap-flat" | "scratch2" | "scratch3" | "scratch3-high-contrast",
  languages?: string[],
  inline?: boolean,
  wrap?: boolean,
  wrapSize?: number | null,
  zebraColoring?: boolean,
  showSpaces?: boolean,
  santa?: boolean,
}


class SnapBlocks extends React.Component {
  snapblocks: any
  isBrowser: boolean
  blockRef: React.RefObject<any>
  props: Props

  constructor(props: Props) {
    super(props)
  
    this.snapblocks = null
    this.isBrowser = typeof window != 'undefined'
    this.blockRef = React.createRef()
  }

  async importSnapblocks() {
    const snapblocks = await import('snapblocks')
    return snapblocks.default
  }

  async renderBlocks() {
    const snapblocks = await this.importSnapblocks()

    let options: Options = {
      wrap: true,
      zebraColoring: true,
      showSpaces: true,
    }
    if (this.props.blockStyle !== undefined) options.style = this.props.blockStyle
    if (this.props.languages !== undefined) options.languages = this.props.languages
    if (this.props.inline !== undefined) options.inline = this.props.inline
    if (this.props.wrap !== undefined) options.wrap = this.props.wrap
    if (this.props.wrapSize !== undefined) options.wrapSize = this.props.wrapSize
    if (this.props.zebraColoring !== undefined) options.zebraColoring = this.props.zebraColoring
    if (this.props.showSpaces !== undefined) options.showSpaces = this.props.showSpaces
    if (this.props.santa !== undefined) options.santa = this.props.santa

    const doc = snapblocks.parse(this.props.children, options)
    const svg = snapblocks.render(doc, options)

    const node: any = this.blockRef.current
    if (node == null) {
      return
    }
    node.innerHTML = ""
    node.appendChild(svg)
  }

  setBlockCode() {
    const node: any = this.blockRef.current
    if (node == null) {
      return
    }
    node.innerHTML = ""
    let el = <code>{this.props.children}</code>
    if (!this.props.inline) {
      el = <pre>{el}</pre>
    }
    node.appendChild(el)
  }

  componentDidMount() {
    if (this.isBrowser) {
      this.renderBlocks()
    } else {
      this.setBlockCode()
    }
  }

  render() {
    if (this.props.inline) {
      return <span ref={this.blockRef}></span>
    } else {
      return <div ref={this.blockRef}></div>
    }
  }
}

export default SnapBlocks
