import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { logout } from '../api/providers/FirebaseProvider'
import SearchInput from '../components/SearchInput'
import { AppPage } from '../models/common/AppPage'
import User from '../models/user/User'
import { logoImageUrl } from '../modules/common/assets/AppImages'

interface Props {
  currentPage: AppPage
  user: User | null | undefined
}

export default function NavBar({ currentPage, user }: Props) {
  const [isUserDropdownVisible, setUserDropdownVisible] = useState(false)
  const [isNotificationDropdownVisible, setNotificationDropdownVisible] = useState(false)

  const handleUserButtonClick = () => {
    setUserDropdownVisible(!isUserDropdownVisible)
    setNotificationDropdownVisible(false)
  }

  const handleNotificationButtonClick = () => {
    setNotificationDropdownVisible(!isNotificationDropdownVisible)
    setUserDropdownVisible(false)
  }

  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.code === 'Escape') {
        setUserDropdownVisible(false)
        setNotificationDropdownVisible(false)
      }
    }
    document.addEventListener('keydown', handleEscapeKey)
    return () => document.removeEventListener('keydown', handleEscapeKey)
  }, [])

  const ToggleSideBarMobile = () => {
    return (
      <button
        id="toggleSidebarMobile"
        aria-expanded="true"
        aria-controls="sidebar"
        className="p-2 text-gray-600 rounded cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 "
      >
        <svg
          id="toggleSidebarMobileHamburger"
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <svg
          id="toggleSidebarMobileClose"
          className="hidden w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
    )
  }

  const ToggleSidebarMobileSearch = () => {
    return (
      <button
        id="toggleSidebarMobileSearch"
        type="button"
        className="p-2 text-gray-500 rounded-lg lg:hidden hover:text-gray-900 hover:bg-gray-100 "
      >
        <span className="sr-only">Search</span>

        <svg
          className="w-6 h-6"
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
      </button>
    )
  }

  const NotificationButton = () => {
    return (
      <button
        type="button"
        className="p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100"
        onClick={handleNotificationButtonClick}
      >
        <span className="sr-only">View notifications</span>

        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
        </svg>
      </button>
    )
  }

  const NotificationDropdown = () => {
    return (
      <div
        className={classNames(
          'z-50 absolute max-w-sm my-4 overflow-hidden text-base list-none bg-white divide-y divide-gray-100 rounded shadow-lg',
          isNotificationDropdownVisible ? '' : 'hidden',
        )}
      >
        <div className="block px-4 py-2 text-base font-medium text-center text-gray-700 bg-gray-50 ">
          Notifications
        </div>
        <div>
          <a href="#" className="flex px-4 py-3 border-b hover:bg-gray-100 ">
            <div className="flex-shrink-0">
              <img
                className="rounded-full w-11 h-11"
                src="assets/images/users/bonnie-green.png"
                alt="Jese image"
              />
              <div className="absolute flex items-center justify-center w-5 h-5 ml-6 -mt-5 border border-white rounded-full bg-primary-700 ">
                <svg
                  className="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                  <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                </svg>
              </div>
            </div>
            <div className="w-full pl-3">
              <div className="text-gray-500 font-normal text-sm mb-1.5 ">
                New message from <span className="font-semibold text-gray-900 ">Bonnie Green</span>:
                "Hey, what's up? All set for the presentation?"
              </div>
              <div className="text-xs font-medium text-primary-700 ">a few moments ago</div>
            </div>
          </a>
          <a href="#" className="flex px-4 py-3 border-b hover:bg-gray-100 ">
            <div className="flex-shrink-0">
              <img
                className="rounded-full w-11 h-11"
                src="assets/images/users/jese-leos.png"
                alt="Jese image"
              />
              <div className="absolute flex items-center justify-center w-5 h-5 ml-6 -mt-5 bg-gray-900 border border-white rounded-full ">
                <svg
                  className="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
                </svg>
              </div>
            </div>
            <div className="w-full pl-3">
              <div className="text-gray-500 font-normal text-sm mb-1.5 ">
                <span className="font-semibold text-gray-900 ">Jese leos</span> and{' '}
                <span className="font-medium text-gray-900 ">5 others</span> started following you.
              </div>
              <div className="text-xs font-medium text-primary-700 ">10 minutes ago</div>
            </div>
          </a>
          <a href="#" className="flex px-4 py-3 border-b hover:bg-gray-100 ">
            <div className="flex-shrink-0">
              <img
                className="rounded-full w-11 h-11"
                src="assets/images/users/joseph-mcfall.png"
                alt="Joseph image"
              />
              <div className="absolute flex items-center justify-center w-5 h-5 ml-6 -mt-5 bg-red-600 border border-white rounded-full ">
                <svg
                  className="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
            <div className="w-full pl-3">
              <div className="text-gray-500 font-normal text-sm mb-1.5 ">
                <span className="font-semibold text-gray-900 ">Joseph Mcfall</span> and{' '}
                <span className="font-medium text-gray-900 ">141 others</span> love your story. See
                it and view more stories.
              </div>
              <div className="text-xs font-medium text-primary-700 ">44 minutes ago</div>
            </div>
          </a>
          <a href="#" className="flex px-4 py-3 border-b hover:bg-gray-100 ">
            <div className="flex-shrink-0">
              <img
                className="rounded-full w-11 h-11"
                src="assets/images/users/leslie-livingston.png"
                alt="Leslie image"
              />
              <div className="absolute flex items-center justify-center w-5 h-5 ml-6 -mt-5 bg-green-400 border border-white rounded-full ">
                <svg
                  className="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
            <div className="w-full pl-3">
              <div className="text-gray-500 font-normal text-sm mb-1.5 ">
                <span className="font-semibold text-gray-900 ">Leslie Livingston</span> mentioned
                you in a comment:{' '}
                <span className="font-medium text-primary-700 ">@bonnie.green</span> what do you
                say?
              </div>
              <div className="text-xs font-medium text-primary-700 ">1 hour ago</div>
            </div>
          </a>
          <a href="#" className="flex px-4 py-3 hover:bg-gray-100 ">
            <div className="flex-shrink-0">
              <img
                className="rounded-full w-11 h-11"
                src="assets/images/users/robert-brown.png"
                alt="Robert image"
              />
              <div className="absolute flex items-center justify-center w-5 h-5 ml-6 -mt-5 bg-purple-500 border border-white rounded-full ">
                <svg
                  className="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
                </svg>
              </div>
            </div>
            <div className="w-full pl-3">
              <div className="text-gray-500 font-normal text-sm mb-1.5 ">
                <span className="font-semibold text-gray-900 ">Robert Brown</span> posted a new
                video: Glassmorphism - learn how to implement the new design trend.
              </div>
              <div className="text-xs font-medium text-primary-700 ">3 hours ago</div>
            </div>
          </a>
        </div>
        <a
          href="#"
          className="block py-2 text-base font-normal text-center text-gray-900 bg-gray-50 hover:bg-gray-100"
        >
          <div className="inline-flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
              <path
                fill-rule="evenodd"
                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            View all
          </div>
        </a>
      </div>
    )
  }

  const UserButton = () => {
    return (
      <div>
        <button
          type="button"
          className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
          onClick={handleUserButtonClick}
        >
          <span className="sr-only">Open user menu</span>
          <img className="w-8 h-8 rounded-full" src={user?.imageUrlString} alt="user photo" />
        </button>
      </div>
    )
  }

  function handleLogout() {
    logout()
  }

  const UserDropdown = () => {
    const items = [
      {
        name: 'Dashboard',
        textStyle: 'block px-4 py-2 text-gray-700 text-sm hover:bg-gray-100',
        href: '/dashboard',
        isLogout: false,
      },
      {
        name: 'Settings',
        textStyle: 'block px-4 py-2 text-gray-700 text-sm hover:bg-gray-100',
        href: '/settings',
        isLogout: false,
      },
      {
        name: 'Sign out',
        textStyle: 'block px-4 py-2 text-red-500 text-sm hover:bg-gray-100 w-full text-left',
        href: '/login',
        isLogout: true,
      },
    ]
    return (
      <div
        className={classNames(
          'z-50 absolute text-base list-none bg-white divide-y divide-gray-100 rounded shadow',
          isUserDropdownVisible ? '' : 'hidden',
        )}
      >
        <div className="px-4 py-3" role="none">
          <p className="text-sm text-gray-900" role="none">
            {user?.name}
          </p>
          <p className="text-sm font-medium text-gray-900 truncate" role="none">
            {user?.email}
          </p>
        </div>
        <ul className="py-1" role="none">
          {items.map((item, index) => (
            <li>
              {item.isLogout ? (
                <button onClick={handleLogout} className={item.textStyle}>
                  {item.name}
                </button>
              ) : (
                <a href={item.href} className={item.textStyle} role="menuitem">
                  {item.name}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <>
      <nav className="fixed z-30 w-full bg-white border-b border-gray-200">
        <div className="px-3 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <ToggleSideBarMobile />
              <a href="/" className="flex ml-2 md:mr-24">
                <img src={logoImageUrl} className="h-12 mr-3" alt="St. George Church Logo" />
              </a>
              <SearchInput />
            </div>

            <div className="flex items-center mr-4 gap-2">
              <ToggleSidebarMobileSearch />
              <NotificationButton />
              <UserButton />
            </div>
          </div>
          <div className="flex justify-end">
            <NotificationDropdown />
            <UserDropdown />
          </div>
        </div>
      </nav>
    </>
  )
}
