import { Disclosure } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import { AppPage, AppPageInfo, navigationPages, pageInfo } from '../models/common/AppPage'

interface NavigationItem extends AppPageInfo {
  current: boolean
  children?: NavigationItem[]
}

interface Props {
  currentPage: AppPage
}

export default function SideBar(props: Props) {
  const { currentPage } = props

  const [isShowingLanguageDropdown, setShowingLangaugeDropdown] = useState(false)
  const [isShowingSettingsTooltip, setShowingSettingsTooltip] = useState(false)

  function handleSettingsButtonHoverIn(isMouseIn: boolean) {
    setShowingSettingsTooltip(isMouseIn)
    setShowingLangaugeDropdown(false)
  }

  function handleLanguageButtonClick() {
    setShowingLangaugeDropdown(!isShowingLanguageDropdown)
    setShowingSettingsTooltip(false)
  }

  const generalNavigation: NavigationItem[] = navigationPages.map(
    (item): NavigationItem => ({
      ...pageInfo[item],
      current: item == currentPage,
    }),
  )

  // Language and settings ref
  const languageDropdownRef = useRef<HTMLDivElement>(null)
  const settingTooltipRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.code === 'Escape') {
        setShowingLangaugeDropdown(false)
        setShowingSettingsTooltip(false)
      }
    }
    function handleClickOutside(event: MouseEvent) {
      // setShowingAddSongModal(false)
      const target = event.target as HTMLElement
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(target)) {
        setShowingLangaugeDropdown(false)
      }
      if (settingTooltipRef.current && !settingTooltipRef.current.contains(target)) {
        setShowingSettingsTooltip(false)
      }
    }

    document.addEventListener('keydown', handleEscapeKey)
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('keydown', handleEscapeKey)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const MobileSearch = () => {
    return (
      <form action="#" method="GET" className="lg:hidden">
        <label htmlFor="mobile-search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            name="email"
            id="mobile-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5"
            placeholder="Search"
          />
        </div>
      </form>
    )
  }

  const SettingsButton = () => {
    return (
      <a
        href="/settings/"
        data-tooltip-target="tooltip-settings"
        className={classNames(
          'inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100',
        )}
        onMouseEnter={() => handleSettingsButtonHoverIn(true)}
        onMouseLeave={() => handleSettingsButtonHoverIn(false)}
      >
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </a>
    )
  }

  const SettingsTooltip = () => {
    return (
      <div
        id="tooltip-settings"
        role="tooltip"
        className={classNames(
          'absolute z-10 inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip ',
          isShowingSettingsTooltip ? '' : 'hiddens',
        )}
        ref={settingTooltipRef}
      >
        Settings page
        <div className="tooltip-arrow" data-popper-arrow></div>
      </div>
    )
  }

  const LanguageButton = () => {
    return (
      <button
        type="button"
        data-dropdown-toggle="language-dropdown"
        className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 "
        onClick={() => {
          handleLanguageButtonClick()
        }}
      >
        <svg
          className="h-5 w-5 rounded-full mt-0.5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 3900 3900"
        >
          <path fill="#b22234" d="M0 0h7410v3900H0z"></path>
          <path
            d="M0 450h7410m0 600H0m0 600h7410m0 600H0m0 600h7410m0 600H0"
            stroke="#fff"
            stroke-width="300"
          ></path>
          <path fill="#3c3b6e" d="M0 0h2964v2100H0z"></path>
          <g fill="#fff">
            <g id="d">
              <g id="c">
                <g id="e">
                  <g id="b">
                    <path
                      id="a"
                      d="M247 90l70.534 217.082-184.66-134.164h228.253L176.466 307.082z"
                    ></path>
                    <use y="420"></use>
                    <use y="840"></use>
                    <use y="1260"></use>
                  </g>
                  <use y="1680"></use>
                </g>
                <use x="247" y="210"></use>
              </g>
              <use x="494"></use>
            </g>
            <use x="988"></use>
            <use x="1976"></use>
            <use x="2470"></use>
          </g>
        </svg>
      </button>
    )
  }

  const LanguageDropdown = () => {
    return (
      <div
        className={classNames(
          'absolute z-50 bottom-0 ml-28 mb-12 text-base list-none bg-white divide-y divide-gray-100 rounded shadow',
          isShowingLanguageDropdown ? '' : 'hidden',
        )}
        id="language-dropdown"
        ref={languageDropdownRef}
      >
        <ul className="py-1" role="none">
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
              role="menuitem"
            >
              <div className="inline-flex items-center">
                <svg
                  className="h-3.5 w-3.5 rounded-full mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  id="flag-icon-css-us"
                  viewBox="0 0 512 512"
                >
                  <g fill-rule="evenodd">
                    <g stroke-width="1pt">
                      <path
                        fill="#bd3d44"
                        d="M0 0h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0z"
                        transform="scale(3.9385)"
                      ></path>
                      <path
                        fill="#fff"
                        d="M0 10h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0z"
                        transform="scale(3.9385)"
                      ></path>
                    </g>
                    <path fill="#192f5d" d="M0 0h98.8v70H0z" transform="scale(3.9385)"></path>
                    <path
                      fill="#fff"
                      d="M8.2 3l1 2.8H12L9.7 7.5l.9 2.7-2.4-1.7L6 10.2l.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7L74 8.5l-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 7.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 24.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 21.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 38.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 35.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 52.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 49.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 66.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 63.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9z"
                      transform="scale(3.9385)"
                    ></path>
                  </g>
                </svg>
                English (US)
              </div>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
              role="menuitem"
            >
              <div className="inline-flex items-center">
                <svg
                  className="h-3.5 w-3.5 rounded-full mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  id="flag-icon-css-de"
                  viewBox="0 0 512 512"
                >
                  <path fill="#ffce00" d="M0 341.3h512V512H0z"></path>
                  <path d="M0 0h512v170.7H0z"></path>
                  <path fill="#d00" d="M0 170.7h512v170.6H0z"></path>
                </svg>
                Deutsch
              </div>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
              role="menuitem"
            >
              <div className="inline-flex items-center">
                <svg
                  className="h-3.5 w-3.5 rounded-full mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  id="flag-icon-css-it"
                  viewBox="0 0 512 512"
                >
                  <g fill-rule="evenodd" stroke-width="1pt">
                    <path fill="#fff" d="M0 0h512v512H0z"></path>
                    <path fill="#009246" d="M0 0h170.7v512H0z"></path>
                    <path fill="#ce2b37" d="M341.3 0H512v512H341.3z"></path>
                  </g>
                </svg>
                Italiano
              </div>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
              role="menuitem"
            >
              <div className="inline-flex items-center">
                <svg
                  className="h-3.5 w-3.5 rounded-full mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  id="flag-icon-css-cn"
                  viewBox="0 0 512 512"
                >
                  <defs>
                    <path id="a" fill="#ffde00" d="M1-.3L-.7.8 0-1 .6.8-1-.3z"></path>
                  </defs>
                  <path fill="#de2910" d="M0 0h512v512H0z"></path>
                  <use width="30" height="20" transform="matrix(76.8 0 0 76.8 128 128)"></use>
                  <use
                    width="30"
                    height="20"
                    transform="rotate(-121 142.6 -47) scale(25.5827)"
                  ></use>
                  <use width="30" height="20" transform="rotate(-98.1 198 -82) scale(25.6)"></use>
                  <use
                    width="30"
                    height="20"
                    transform="rotate(-74 272.4 -114) scale(25.6137)"
                  ></use>
                  <use
                    width="30"
                    height="20"
                    transform="matrix(16 -19.968 19.968 16 256 230.4)"
                  ></use>
                </svg>
                中文 (繁體)
              </div>
            </a>
          </li>
        </ul>
      </div>
    )
  }

  return (
    <div>
      <aside
        id="sidebar"
        className={classNames(
          'fixed z-20 hidden lg:block',
          'flex flex-col flex-shrink-0 w-64 h-full pt-16 font-normal duration-75 lg:flex transition-width',
        )}
        aria-label="Sidebar"
      >
        <div className="relative flex flex-col flex-1 min-h-0 pt-0 bg-white border-r border-gray-200  ">
          <div
            className={classNames(
              'flex flex-col flex-1 pt-5 pb-28 overflow-y-auto',
              'scrollbar scrollbar-w-2 scrollbar-thumb-rounded-[0.1667rem]',
              'scrollbar-thumb-slate-200 scrollbar-track-gray-400',
            )}
          >
            <div className="flex-1 px-3 space-y-1 bg-white divide-y divide-gray-200">
              <ul className="pb-2 space-y-2">
                <li>
                  <MobileSearch />
                </li>
                {generalNavigation.map((item) => (
                  <li key={item.name}>
                    {!!item.children ? (
                      <Disclosure as="div">
                        {({ open }) => (
                          <>
                            <Disclosure.Button
                              className={classNames(
                                item.current ? 'bg-gray-50' : 'hover:bg-gray-50',
                                'flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-gray-700',
                              )}
                            >
                              <item.icon
                                className="h-6 w-6 shrink-0 text-gray-400"
                                aria-hidden="true"
                              />
                              {item.name}
                              <ChevronRightIcon
                                className={classNames(
                                  open ? 'rotate-90 text-gray-500' : 'text-gray-400',
                                  'ml-auto h-5 w-5 shrink-0',
                                )}
                                aria-hidden="true"
                              />
                            </Disclosure.Button>
                            <Disclosure.Panel as="ul" className="mt-1 px-2">
                              {item.children?.map((subItem) => (
                                <li key={subItem.name}>
                                  {/* 44px */}
                                  <Disclosure.Button
                                    as="a"
                                    href={subItem.href}
                                    className={classNames(
                                      subItem.current ? 'bg-gray-50' : 'hover:bg-gray-50',
                                      'block rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-700',
                                    )}
                                  >
                                    {subItem.name}
                                  </Disclosure.Button>
                                </li>
                              ))}
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ) : (
                      <a
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-50 hover:bg-gray-200' : 'hover:bg-gray-50',
                          'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-700 group-hover:text-gray-900',
                        )}
                      >
                        <item.icon
                          className="h-6 w-6 shrink-0 text-gray-400 transition duration-75 group-hover:text-gray-900"
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    )}
                  </li>
                ))}{' '}
              </ul>
            </div>
          </div>
          <div
            className="border-t absolute bottom-0 left-0 justify-center hidden w-full p-4 space-x-4 bg-white lg:flex"
            sidebar-bottom-menu
          >
            <SettingsButton />
            <LanguageButton />
          </div>
          <SettingsTooltip />
          <LanguageDropdown />
        </div>
      </aside>

      <div className="fixed inset-0 z-10 hidden bg-gray-900/50 " id="sidebarBackdrop"></div>
    </div>
  )
}

{
  /* <script>
	const sidebar = document.getElementById('sidebar');

	if (sidebar) {
		const toggleSidebarMobile = (
			sidebar: HTMLElement,
			sidebarBackdrop: HTMLElement,
			toggleSidebarMobileHamburger: HTMLElement,
			toggleSidebarMobileClose: HTMLElement,
		) => {
			sidebar.classList.toggle('hidden');
			sidebarBackdrop.classList.toggle('hidden');
			toggleSidebarMobileHamburger.classList.toggle('hidden');
			toggleSidebarMobileClose.classList.toggle('hidden');
		};

		const toggleSidebarMobileEl = document.getElementById(
			'toggleSidebarMobile',
		);
		const sidebarBackdrop = document.getElementById('sidebarBackdrop')!;
		const toggleSidebarMobileHamburger = document.getElementById(
			'toggleSidebarMobileHamburger',
		)!;
		const toggleSidebarMobileClose = document.getElementById(
			'toggleSidebarMobileClose',
		)!;
		const toggleSidebarMobileSearch = document.getElementById(
			'toggleSidebarMobileSearch',
		)!;

		toggleSidebarMobileSearch?.addEventListener('click', () => {
			toggleSidebarMobile(
				sidebar,
				sidebarBackdrop,
				toggleSidebarMobileHamburger,
				toggleSidebarMobileClose,
			);
		});

		toggleSidebarMobileEl?.addEventListener('click', () => {
			toggleSidebarMobile(
				sidebar,
				sidebarBackdrop,
				toggleSidebarMobileHamburger,
				toggleSidebarMobileClose,
			);
		});

		sidebarBackdrop?.addEventListener('click', () => {
			toggleSidebarMobile(
				sidebar,
				sidebarBackdrop,
				toggleSidebarMobileHamburger,
				toggleSidebarMobileClose,
			);
		});
	}
</script> */
}
