export default function CopyrightNotice() {
  return (
    <>
      <p className="my-10 text-sm text-center text-gray-500">
        &copy; 2023 - {new Date().getFullYear()} —
        <a href="https://flowbite.com/" className="hover:underline" target="_blank">
          muhuiyu.grace@gmail.com
        </a>
        . All rights reserved.
      </p>
    </>
  )
}
