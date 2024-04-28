import type { HTMLConverter } from '../../types'
// import YoutubeBlock from "@/modules/blog/lexical/converters/blocks/YoutubeBlock";

export const ModuleHtmlConverter: HTMLConverter<any> = {
  converter({ node }) {
    switch (node.fields.blockType) {
      // case "youtube":
      //     return <YoutubeBlock node={node} />
      case 'login':
        return <div>test</div>
      default:
        return <span>Unknown module type {node?.value?.blockType}</span>
    }
  },
  nodeTypes: ['module'],
}
