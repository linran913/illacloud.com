import NextLink from 'next/link'
import { useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { useClickAway } from 'react-use'
import { SelectIcon, SelectIconBlack } from '@/img/home/svg'
import clsx from 'clsx'
import { sendTagEvent } from '@/utils/gtag'

const options = [
  {
    label: '简体中文',
    value: 'zh-CN',
    tagCategory: 'homepage_menu_language_zh_click',
  },
  {
    label: 'English',
    value: 'en-US',
    tagCategory: 'homepage_menu_language_en_click',
  },
]

export const LanguageSelect = ({ buttonColorChange = true }) => {
  const [expandPanel, setExpandPanel] = useState(false)

  const ref = useRef(null)

  const router = useRouter()
  useClickAway(ref, () => {
    setExpandPanel(false)
  })

  return (
    <div
      ref={ref}
      className="flex flex-col bg-transparent items-center h-[48px] cursor-pointer  justify-between relative"
    >
      <div
        className={clsx(
          'text-[16px] h-full w-full flex flex-row items-center justify-between px-[16px]',
          {
            'text-white-01': buttonColorChange,
            'text-gray-01': !buttonColorChange,
          },
        )}
        onClick={() => {
          sendTagEvent({
            action: 'click',
            category: 'homepage_menu_language_click',
            label: router.locale === 'en-US' ? 'English' : '简体中文',
          })
          setExpandPanel(() => !expandPanel)
        }}
      >
        <span className="mr-[10px]">
          {router.locale === 'en-US' ? 'English' : '简体中文'}
        </span>
        {buttonColorChange ? <SelectIcon /> : <SelectIconBlack />}
      </div>
      <div
        className={clsx(
          'text-[14px] transition-height duration-200 absolute top-[48px] flex flex-col items-center justify-center w-[121px] rounded-[8px] shadow-[0px_2px_16px_0px_rgba(0,0,0,0.16)] overflow-y-hidden',
          {
            'bg-gray-02 text-white-01': buttonColorChange,
            'bg-white text-gray-01': !buttonColorChange,
          },
        )}
        style={{
          height: `${expandPanel ? 96 : 0}px `,
        }}
      >
        {options.map((option) => (
          <NextLink
            key={option.value}
            href={router.pathname}
            locale={option.value}
          >
            <div
              className={clsx(
                'h-[40px] leading-[40px] text-center w-full hover:bg-white-09',
                {
                  'hover:bg-white-09': buttonColorChange,
                  'hover:bg-[#f2f3f5]': !buttonColorChange,
                },
              )}
              onClick={() => {
                sendTagEvent({
                  action: 'click',
                  category: option.tagCategory,
                  label: option.label,
                })
              }}
            >
              {option.label}
            </div>
          </NextLink>
        ))}
      </div>
    </div>
  )
}
