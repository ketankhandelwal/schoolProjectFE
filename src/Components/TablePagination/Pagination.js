import React from 'react';
import iconNext from '../../assets/Icons/iconNext.svg';
import iconPrev from '../../assets/Icons/iconPrev.svg';

export default function Pagination() {
  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-lg text-gray-700 italic">
            (Showing <span className="font-medium border-2 px-2 py-1">6</span> of{' '}
            <span className="font-medium">200</span> results)
          </p>
        </div>
        <div>
          <nav className="relative z-0 inline-flex bg-bodyColor rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <a
              href="#"
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-bodyColor text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Previous</span>
              <img src={iconPrev} />
            </a>
            <a
              href="#"
              aria-current="page"
              className="hover:bg-gray-50 bg-bodyColor relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            >
              1
            </a>
            <a
              href="#"
              className="bg-bodyColor border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            >
              2
            </a>
            <a
              href="#"
              className="bg-bodyColor border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
            >
              3
            </a>
            <a
              href="#"
              className="bg-bodyColor border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
            >
              4
            </a>
            <a
              href="#"
              className="bg-bodyColor border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
            >
              5
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-bodyColor text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Next</span>
              <img src={iconNext} />
            </a>
          </nav>
        </div>
      </div>
    </div>
  )
}