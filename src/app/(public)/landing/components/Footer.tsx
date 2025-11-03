// src/components/Footer.tsx
// Updated to include a Privacy Policy link that navigates to /privacypolicy
import Link from "next/link";

import { Logo } from "@/components/Logo";

export const Footer = () => {
    return (
        <div className="relative">
            <div className="grainy absolute inset-0 z-0 opacity-20"></div>

            <div className="relative z-[2] container pt-8 md:pt-12 xl:pt-16 2xl:pt-24">
                <div className="grid grid-cols-2 gap-6 md:grid-cols-5">
                    {/* <div className="col-span-2">
                        <Logo />

                        <p className="text-base-content/80 mt-3">
                            Kickstart your next project with a platform built for effortless customization, streamlining
                            your development process
                        </p>
                        <div className="mt-6 flex items-center gap-2.5 xl:mt-16">
                            <Link className="btn btn-sm btn-circle" href="https://github.com/" target="_blank">
                                <span className="iconify lucide--github size-4" />
                            </Link>
                            <Link className="btn btn-sm btn-circle" href="https://x.com/" target="_blank">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    className="size-4">
                                    <path
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.7"
                                        d="m3 21l7.548-7.548M21 3l-7.548 7.548m0 0L8 3H3l7.548 10.452m2.904-2.904L21 21h-5l-5.452-7.548"
                                        color="currentColor"
                                    />
                                </svg>
                            </Link>
                            <button className="btn btn-sm btn-circle">
                                <span className="iconify lucide--link size-3.5" />
                            </button>
                        </div>
                    </div> */}
                    <div className="max-md:hidden xl:col-span-1"></div>
                    {/* <div className="col-span-1">
                        <p className="font-medium">Quick Links</p>
                        <div className="text-base-content/80 *:hover:text-base-content mt-5 flex flex-col space-y-1.5 *:cursor-pointer">
                            <span>Dashboard</span>
                            <span>UI Kit</span>
                            <span>Login</span>
                            <p className="flex items-center gap-1.5">
                                Feedback <span className="badge badge-sm h-4.5 rounded-full px-1.5">New</span>
                            </p>
                        </div>
                    </div> */}
                    {/* <div className="col-span-1">
                        <p className="font-medium">Company</p>
                        <div className="text-base-content/80 *:hover:text-base-content mt-5 flex flex-col space-y-1.5 *:cursor-pointer">
                            <span>About</span>
                            <span>Contact</span>
                        </div>
                    </div> */}
                </div>

                <div className="border-base-300 mt-12 flex flex-col items-start justify-between gap-3 border-t py-6 text-sm md:flex-row md:items-center">
                    <div className="flex flex-col gap-1">
                        <span>
                            Kali Software Pty Ltd. <br />
                            ACN 656 408 678
                        </span>
                        <address className="not-italic">
                            <Link
                                href="https://www.google.com/maps?q=333+George+St,+Sydney+NSW+2000"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="link link-hover">
                                333 George St, Sydney NSW 2000
                            </Link>
                        </address>
                    </div>

                    <div className="flex items-center gap-4" aria-label="Footer links">
                        <Link href="/privacypolicy" className="link link-hover">
                            Privacy Policy
                        </Link>
                        <span className="text-base-content/50 inline-block text-lg select-none" aria-hidden="true">
                            ·
                        </span>
                        <Link href="/terms" className="link link-hover">
                            Terms of Service
                        </Link>

                        <span className="text-base-content/50 inline-block text-lg select-none" aria-hidden="true">
                            ·
                        </span>

                        {/* Social icons */}
                        <div className="flex items-center gap-3" aria-label="Social links">
                            <Link
                                href="https://www.linkedin.com/company/kalisoftware"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Kali Software on LinkedIn"
                                className="inline-flex h-7 w-7 items-center justify-center rounded-full transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    className="h-4 w-4"
                                    aria-hidden="true">
                                    <path
                                        d="M4.983 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.983 0ZM.5 8.25h4.966V24H.5V8.25Zm7.356 0h4.767v2.142h.066c.664-1.26 2.287-2.588 4.712-2.588 5.038 0 5.966 3.319 5.966 7.63V24h-4.966v-6.973c0-1.663-.03-3.8-2.316-3.8-2.318 0-2.673 1.81-2.673 3.683V24H7.856V8.25Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </Link>
                            <Link
                                href="https://x.com/kalisoftware_io"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Kali Software on X (Twitter)"
                                className="inline-flex h-7 w-7 items-center justify-center rounded-full transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    className="h-4 w-4"
                                    aria-hidden="true">
                                    <path
                                        d="M18.244 2H21.5l-7.5 8.57L23 22h-6.18l-4.83-6.092L6.5 22H3.243l8.02-9.17L2.5 2h6.32l4.37 5.667L18.244 2Zm-1.08 18h1.69L7.92 4h-1.8l10.043 16Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
