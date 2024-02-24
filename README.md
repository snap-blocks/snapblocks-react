# snapblocks-react

Render [snapblocks](https://github.com/snap-blocks/snapblocks) in React!

## Installation

```bash
npm install snapblocks snapblocks-react
# or
yarn add snaphblocks snapblocks-react
```

Note that in addition to the `snapblocks-react` package, you must have `snapblocks` installed (and `react`).

## Usage

### Simple

```jsx
import SnapBlocks from "snapblocks-react"

function MyComponent() {
  return (
    <SnapBlocks blockStyle="snap">
      {`
        when green flag clicked
        forever {
          move (10) steps
        }
      `}
    </SnapBlocks>
  )
}
```

### Dynamic

In this example, the user can edit the Scratch code.

```jsx
import SnapBlocks from "snapblocks-react"

function MyComponent() {
  const [code, setCode] = useState("move (10) steps")

  return (
    <div>
      <textarea
        value={code}
        onChange={(event) => setCode(event.target.value)}
      />
      <SnapBlocks blockStyle="scratch3">{code}</SnapBlocks>
    </div>
  )
}
```

### Non-English Languages

```jsx
import SnapBlocks from "snapblocks-react"

// Load some extra languages (English comes loaded by default)
import snapblocks from "snapblocks"
import es from "snapblocks/locales/es.json" // Spanish
import de from "snapblocks/locales/de.json" // German

// Register the language files with snapblocks
snapblocks.loadLanguages({ es, de })

function MyComponent() {
  return (
    <SnapBlocks
      blockStyle="scratch3"
      languages={["en", "es", "de"]} // Choose which languages to allow
    >
      {`
        when green flag clicked
        por siempre
          gehe (10) er Schritt
        fin
      `}
    </SnapBlocks>
  )
}
```

## Available Props

| Name          | Default  | Valid Values                                                             | Description                                                                           |
| ------------- | ------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| blockStyle    | "snap"  | "snap", "snap-flat", "scratch2", "scratch3", or "scratch3-high-contrast" | Changes the visual style of the rendered blocks.                                      |
| languages     | ["en"]  | An array of language codes such as ["en", "de"]                          | Enables the use of non-english languages. Requires additional setup.                  |
| ... and more! |         |                                                                          | All other props (such as "className" and "style") will be passed directly to the div. |
