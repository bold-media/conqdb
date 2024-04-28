import { convertLexicalNodesToReactNode, serializeLexical } from '../serializeLexical'
import type { HTMLConverter } from '../types'
import { ModuleHtmlConverter } from './blocks/module'
// import YoutubeBlock from "@/modules/blog/lexical/converters/blocks/YoutubeBlock";

export const BlockHtmlConverter: HTMLConverter<any> = {
  async converter({ node, childIndex, converters, parent }) {
    switch (node.fields.blockType) {
      // case "youtube":
      //     return <YoutubeBlock node={node} />
      case 'login':
        return <div>test</div>
      default:
        return <span>Unknown block type {node?.value?.blockType}</span>
    }
  },
  nodeTypes: ['block'],
}
