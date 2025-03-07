import { Fragment, useState, useEffect } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
	ChevronDownIcon,
	FunnelIcon,
	MinusIcon,
	PlusIcon,
	Squares2X2Icon,
} from "@heroicons/react/20/solid";



const SideBar = ({children,heading,icon}) => {
const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
	return (
		<>
		<Transition.Root show={mobileFiltersOpen} as={Fragment}>
				<Dialog
					as="div"
					className="relative z-40 lg:hidden"
					onClose={setMobileFiltersOpen}
				>
					<Transition.Child
						as={Fragment}
						enter="transition-opacity ease-linear duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="transition-opacity ease-linear duration-300"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-25" />
					</Transition.Child>

					<div className="fixed inset-0 z-40 flex">
						<Transition.Child
							as={Fragment}
							enter="transition ease-in-out duration-300 transform"
							enterFrom="translate-x-[-100%]"
							enterTo="translate-x-0"
							leave="transition ease-in-out duration-300 transform"
							leaveFrom="translate-x-0"
							leaveTo="translate-x-[-100%]"
						>
							<Dialog.Panel className="relative flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
								<div className="flex items-center justify-between px-4">
									<h2 className="text-lg font-medium text-gray-900">
										{heading}
									</h2>
									<button
										type="button"
										className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
										onClick={() =>
											setMobileFiltersOpen(false)
										}
									>
										<span className="sr-only">
											Close menu
										</span>
										<XMarkIcon
											className="h-6 w-6"
											aria-hidden="true"
										/>
									</button>
								</div>

								{/* Filters */}
								{children}
							
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition.Root>
			<div className=" lg:hidden flex items-center">
							<button
								type="button"
								className="p-2 text-gray-400  hover:text-gray-500 sm:ml-6 lg:hidden"
								onClick={() => {setMobileFiltersOpen(true)
													console.log("hi")
													}}
							>
								<span className="sr-only">{heading}</span>
								<div className="text-xl ">
								{icon}
								</div>
							</button>
							{/*<h3 className="w-max m-auto px-5 text-xl pb-1">
				Admin Panel
			</h3>*/}
				</div>
	
		</>
	)
}

export default SideBar