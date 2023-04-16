import { Disclosure } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import classNames from 'classnames'
import { AppPage, AppPageInfo, allAppPages, pageInfo } from '../models/AppPage'

interface NavigationItem extends AppPageInfo {
  current: boolean
  children?: NavigationItem[]
}

interface Props {
  currentPage: AppPage
  onUpdateSelection(selected: boolean): void
}

export default function SideBar(props: Props) {
  const { currentPage, onUpdateSelection } = props

  const generalNavigation: NavigationItem[] = allAppPages.slice(0, 5).map(
    (item): NavigationItem => ({
      ...pageInfo[item],
      current: item == currentPage,
    }),
  )

  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 max-w-[300px]">
      <div className="flex h-16 shrink-0 items-center py-12">
        <img
          className="h-12 w-auto"
          src="https://stgeorges.org.sg/wp-content/uploads/SGC-logo-Red-R3-300x75.png"
          alt="St George Church"
        />
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
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
                            <item.Icon
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
                        item.current ? 'bg-gray-50' : 'hover:bg-gray-50',
                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-700',
                      )}
                    >
                      <item.Icon className="h-6 w-6 shrink-0 text-gray-400" aria-hidden="true" />
                      {item.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </li>        </ul>
      </nav>
    </div>
  )
}
