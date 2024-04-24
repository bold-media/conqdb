import { Field } from 'payload/types'

type LinkType = (options?: { disableLabel?: boolean; overrides?: Record<string, unknown> }) => Field

// const link: LinkType = ({disableLabel = false, overrides = {}} = {}) => {
// 	const linkResult: Field = {
// 		name: 'link',
// 		type: "group",
// 		admin: {
// 			hideGutter: true
// 		},
// 		fields: [
// 			{
// 				type: "row",
// 				fields: [
// 					{
// 						name: "type",
// 						type: "radio",
// 						defaultValue: "reference",
// 						admin: {
// 							layout: "horizontal",
// 							width: "50%"
// 						},
// 						options: [
// 							{
// 								label: "Internal Link",
// 								value: "reference"
// 							},
// 							{
// 								label: "Custom URL",
// 								value: "custom"
// 							}
// 						],
// 					},
// 					{
// 						name: "newTab",
// 						label: "Open in new tab",
// 						type: "checkbox",
// 						admin: {
// 							width: "50%",
// 							style: {
// 								alignSelf: "flex-end"
// 							}
// 						}
// 					}
// 				]
// 			}
// 		]
// 	}

// 	const linkTypes: Field[] = [
// 		{
// 			name: "reference",
// 			label: "Document to link to",
// 			type: "relationship",
// 			relationTo: [],
// 			required: true,
// 			maxDepth: 1,
// 			admin: {
// 				condition: (_, siblingData) => siblingData?.type === "reference"
// 			}
// 		}
// 	]
// }

// import { Field, GroupField } from 'payload/types'
// import { deepMerge } from '../utilities/deepMerge'
// // import { linkEnabledSlugs } from '../constants'

// type LinkType = (options?: { overrides?: Partial<GroupField>; withLabel?: boolean }) => Field

// export const link: LinkType = ({ overrides = {}, withLabel = false } = {}) => {
//   let defaultLink: Field = {
//     name: 'link',
//     type: 'group',
//     interfaceName: 'LinkField',
//     admin: {
//       hideGutter: true,
//       ...(overrides?.admin || {}),
//     },
//     fields: [
//       {
//         name: 'label',
//         type: 'text',
//         label: {
//           en: 'Label',
//           ru: 'Метка',
//         },
//         admin: {
//           condition: () => withLabel,
//           description: {
//             en: "For external links, or if you want to override the page's title. If left empty, it will display the title of the document you link to.",
//             ru: 'Для внешних ссылок или если вы хотите заменить заголовок страницы. Если оставить пустым, то будет отображаться заголовок документа, на который вы ссылаетесь.',
//           },
//         },
//       },
//       {
//         type: 'row',
//         fields: [
//           {
//             name: 'type',
//             label: {
//               en: 'Type',
//               ru: 'Тип',
//             },
//             type: 'radio',
//             options: [
//               {
//                 label: {
//                   en: 'Internal link',
//                   ru: 'Внутренняя ссылка',
//                 },
//                 value: 'internal',
//               },
//               {
//                 label: {
//                   en: 'External',
//                   ru: 'Внешняя ссылка',
//                 },
//                 value: 'external',
//               },
//             ],
//             defaultValue: 'internal',
//             admin: {
//               layout: 'horizontal',
//               width: '50%',
//             },
//           },
//           {
//             name: 'newTab',
//             label: {
//               en: 'Open in new tab',
//               ru: 'Открыть в новой вкладке',
//             },
//             type: 'checkbox',
//             admin: {
//               width: '50%',
//               style: {
//                 alignSelf: 'center',
//               },
//             },
//           },
//         ],
//       },
//       {
//         name: 'internal',
//         label: {
//           en: 'Document to link to',
//           ru: 'Документ для ссылки',
//         },
//         type: 'relationship',
//         relationTo: linkEnabledSlugs,
//         required: true,
//         maxDepth: 1,
//         admin: {
//           condition: (_, siblingData) => siblingData?.type === 'internal',
//         },
//       },
//       {
//         name: 'external',
//         label: {
//           en: 'External URL',
//           ru: 'Внешний URL',
//         },
//         type: 'text',
//         required: true,
//         admin: {
//           condition: (_, siblingData) => siblingData?.type === 'external',
//         },
//       },
//     ],
//   }

//   return deepMerge(defaultLink, overrides)
// }
