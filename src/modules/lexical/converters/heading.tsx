import type { HTMLConverter } from '../types'

import { convertLexicalNodesToReactNode } from '../serializeLexical'
import { Title } from '@mantine/core'

export const HeadingHTMLConverter: HTMLConverter<any> = {
  async converter({ converters, node, parent }) {
    const childrenText = await convertLexicalNodesToReactNode({
      converters,
      lexicalNodes: node.children,
      parent: {
        ...node,
        parent,
      },
    })
    //need to convert heading tags to MantineTitleOrder
    return <Title order={node?.tag}>{childrenText}</Title>
  },
  nodeTypes: ['heading'],
}
