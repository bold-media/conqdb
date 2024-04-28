import type { HTMLConverter } from '../types'
import { Text } from '@mantine/core'

import { convertLexicalNodesToReactNode } from '../serializeLexical'

export const ParagraphHTMLConverter: HTMLConverter<any> = {
  async converter({ converters, node, parent }) {
    const childrenText = await convertLexicalNodesToReactNode({
      converters,
      lexicalNodes: node.children,
      parent: {
        ...node,
        parent,
      },
    })
    return <Text>{childrenText}</Text>
  },
  nodeTypes: ['paragraph'],
}
