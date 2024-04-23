export const populatePathname = ({ data }: { data: any }) => {
  return {
    ...data,
    pathname: data?.breadcrumbs?.at(-1).url,
  }
}
