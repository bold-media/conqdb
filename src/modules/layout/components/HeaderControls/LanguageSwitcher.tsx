'use client'

import { Menu, Text } from '@mantine/core'
import React from 'react'
import { HeaderControl } from './HeaderControl'
import { useLocale } from 'next-intl'
import { localesData } from '@/locales'
import { usePathname, useRouter } from '@/navigation'
import { useDisclosure } from '@mantine/hooks'
import classes from './LanguageSwitcher.module.css'
import ReactCountryFlag from 'react-country-flag'
import { getDirFromLocale } from '@/utils/getDirFromLocale'

export const LanguageSwitcher = ({ label }: { label: string }) => {
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale()
  const dir = getDirFromLocale(locale)

  const [opened, { toggle }] = useDisclosure(false)

  return (
    <Menu opened={opened} onChange={toggle} position="bottom" withArrow>
      <HeaderControl tooltip={label} disabled={opened}>
        <Menu.Target>
          <Text size="xs" className={classes.key}>
            <ReactCountryFlag
              countryCode={(localesData as any)[locale]?.countryCode}
              svg
              style={{
                width: '1rem',
                height: '1rem',
              }}
            />
          </Text>
        </Menu.Target>
      </HeaderControl>
      <Menu.Dropdown>
        {Object.keys(localesData).map((key) => {
          const navigate = () => {
            router.replace(pathname, { locale: key })
          }
          return (
            <Menu.Item
              key={key}
              disabled={locale === key}
              onClick={locale !== key ? navigate : undefined}
            >
              <ReactCountryFlag
                countryCode={(localesData as any)[key]?.countryCode}
                svg
                style={{
                  width: '0.8rem',
                  height: '0.8rem',
                  marginRight: dir === 'ltr' ? '0.42rem' : undefined,
                  marginLeft: dir === 'rtl' ? '0.42rem' : undefined,
                }}
              />
              {(localesData as any)[key]?.label}
            </Menu.Item>
          )
        })}
      </Menu.Dropdown>
    </Menu>
  )
}
