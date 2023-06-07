import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import classNames from 'classnames'
import { Fragment } from 'react'
import { AppPage, pageInfo } from '../models/common/AppPage'
import User from '../models/user/User'

const items = [
  { name: 'Account Settings', isDestructive: false, href: '/settings' },
  { name: 'Logout', isDestructive: true, href: '/logout' },
]

interface Props {
  currentPage: AppPage
  user: User | null | undefined
}

export default function NavigationBar({ currentPage, user }: Props) {
  return (
    <div className="flex flex-row justify-between items-center pb-10">
      <div className="sm:flex-auto">
        <h2 className="text-2xl font-semibold leading-6 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          {pageInfo[currentPage].name}
        </h2>
        {/* <p className="mt-2 text-sm text-gray-700">
          A list of all the users including their name, title, email and role.
        </p> */}
      </div>
      {/* notification */}
      <div className="flex flex-row items-center gap-1">
        <button
          id="dropdownNotificationButton"
          data-dropdown-toggle="dropdownNotification"
          data-dropdown-placement="bottom"
          className="inline-flex items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400"
          type="button"
        >
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
          </svg>
          <div className="relative flex">
            <div className="relative inline-flex w-3 h-3 bg-red-500 border-2 border-white rounded-full -top-2 right-3 dark:border-gray-900"></div>
          </div>
        </button>

        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex items-center w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              <img
                className="h-8 w-8 rounded-full bg-gray-50"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <span aria-hidden="true">{user?.firstName ?? 'guest'}</span>
              <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {items.map((item) => (
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href={item.href}
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          item.isDestructive ? 'text-red-500' : '',
                          'block px-4 py-2 text-sm',
                        )}
                      >
                        {item.name}
                      </a>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  )
}
