"use client";

import { ChangeEvent, useEffect, useState } from "react";

export const CalendarExample = () => {
    const [selectedDateRange, setSelectedDateRange] = useState("-");
    const [selectedDateMulti, setSelectedDateMulti] = useState("-");
    const [selectedDate, setSelectedDate] = useState("");

    useEffect(() => {
        setSelectedDate(new Date().toLocaleString());
        import("cally");
    }, []);

    return (
        <div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-4">
                <div className="card card-border bg-base-100">
                    <div className="card-body">
                        <div className="card-title">Date Picker</div>
                        <div className="mt-3">
                            <p className="label text-sm">Input Field</p>
                            <div className="dropdown dropdown-start mt-1 w-full">
                                <div tabIndex={0} role="button" className="input flex w-full items-center gap-2">
                                    <input
                                        className="grow [appearance:none] [&::-webkit-calendar-picker-indicator]:hidden"
                                        placeholder="Pick a day"
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                        value={selectedDate}
                                        type="date"
                                    />
                                    <div className="btn btn-xs btn-circle btn-ghost">
                                        <span className="iconify lucide--calendar text-base-content/70 size-4.5"></span>
                                    </div>
                                </div>
                                <div tabIndex={0} className="dropdown-content mt-2">
                                    <calendar-date
                                        className="cally bg-base-100 rounded-box shadow-md transition-all hover:shadow-lg"
                                        value={selectedDate}
                                        onchange={(e: ChangeEvent<HTMLInputElement>) =>
                                            setSelectedDate(e.target.value)
                                        }>
                                        <span className="iconify lucide--chevron-left" slot="previous"></span>
                                        <span className="iconify lucide--chevron-right" slot="next"></span>
                                        <calendar-month></calendar-month>
                                    </calendar-date>
                                </div>
                            </div>
                            <p className="label mt-3 text-sm">Your birthdate (Single)</p>
                            <div className="dropdown mt-1 w-full">
                                <div
                                    tabIndex={0}
                                    role="button"
                                    className="btn btn-outline border-base-300 flex items-center gap-2">
                                    <span className="iconify lucide--cake text-base-content/80 size-4.5"></span>
                                    <p className="text-start">{selectedDate.toString()}</p>
                                    <span className="iconify lucide--chevron-down text-base-content/70 size-4"></span>
                                </div>
                                <div tabIndex={0} className="dropdown-content mt-2">
                                    <calendar-date
                                        className="cally bg-base-100 rounded-box shadow-md transition-all hover:shadow-lg"
                                        value={selectedDate}
                                        onchange={(e: ChangeEvent<HTMLInputElement>) =>
                                            setSelectedDate(e.target.value)
                                        }>
                                        <span className="iconify lucide--chevron-left" slot="previous"></span>
                                        <span className="iconify lucide--chevron-right" slot="next"></span>
                                        <calendar-month></calendar-month>
                                    </calendar-date>
                                </div>
                            </div>
                            <p className="label mt-3 text-sm">Priority dates (Multi)</p>
                            <div className="dropdown dropdown-start w-full">
                                <div
                                    tabIndex={0}
                                    role="button"
                                    className="btn btn-outline border-base-300 flex items-center gap-3">
                                    <span className="iconify lucide--stars text-base-content/80 size-4.5 shrink-0"></span>
                                    <p className="line-clamp-1 text-start">{selectedDateMulti.toString()}</p>
                                    <span className="iconify lucide--calendar-days text-base-content/70 size-4.5 shrink-0"></span>
                                </div>
                                <div tabIndex={0} className="dropdown-content mt-2">
                                    <calendar-multi
                                        className="cally bg-base-100 rounded-box shadow-md transition-all hover:shadow-lg"
                                        value={selectedDateMulti}
                                        onchange={(e: ChangeEvent<HTMLInputElement>) =>
                                            setSelectedDateMulti(e.target.value)
                                        }>
                                        <span className="iconify lucide--chevron-left" slot="previous"></span>
                                        <span className="iconify lucide--chevron-right" slot="next"></span>
                                        <calendar-month></calendar-month>
                                    </calendar-multi>
                                </div>
                            </div>
                            <p className="label mt-3 text-sm">Your travel dates (Range)</p>
                            <div className="dropdown dropdown-start mt-1 w-full">
                                <div
                                    tabIndex={0}
                                    role="button"
                                    className="btn btn-outline border-base-300 flex items-center gap-3">
                                    <span className="iconify lucide--plane-takeoff text-base-content/80 size-4.5"></span>
                                    <p className="text-start">{selectedDateRange.toString()}</p>
                                    <span className="iconify lucide--calendar-range text-base-content/70 size-4.5"></span>
                                </div>
                                <div tabIndex={0} className="dropdown-content mt-2">
                                    <calendar-range
                                        className="cally bg-base-100 rounded-box shadow-md transition-all hover:shadow-lg"
                                        value={selectedDate}
                                        onchange={(e: ChangeEvent<HTMLInputElement>) =>
                                            setSelectedDateRange(e.target.value)
                                        }>
                                        <span className="iconify lucide--chevron-left" slot="previous"></span>
                                        <span className="iconify lucide--chevron-right" slot="next"></span>
                                        <calendar-month></calendar-month>
                                    </calendar-range>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card card-border bg-base-100">
                    <div className="card-body">
                        <div className="card-title">Inline</div>
                        <div className="mt-4">
                            <calendar-date className="cally bg-base-100 border-base-300 rounded-box w-full border pt-1">
                                <span className="iconify lucide--chevron-left" slot="previous"></span>
                                <span className="iconify lucide--chevron-right" slot="next"></span>
                                <calendar-month></calendar-month>
                            </calendar-date>
                        </div>
                    </div>
                </div>
                <div className="card card-border bg-base-100">
                    <div className="card-body">
                        <div className="card-title">Control: Icon</div>
                        <div className="mt-4">
                            <calendar-date className="cally bg-base-100 border-base-300 rounded-box w-full border pt-1">
                                <span className="iconify lucide--chevrons-left" slot="previous"></span>
                                <span className="iconify lucide--chevrons-right" slot="next"></span>
                                <calendar-month></calendar-month>
                            </calendar-date>
                        </div>
                    </div>
                </div>
                <div className="card card-border bg-base-100">
                    <div className="card-body">
                        <div className="card-title">Control: Text</div>
                        <div className="mt-4">
                            <calendar-date className="cally bg-base-100 border-base-300 rounded-box w-full border pt-1">
                                <span slot="previous">Prev</span>
                                <span slot="next">Next</span>
                                <calendar-month></calendar-month>
                            </calendar-date>
                        </div>
                    </div>
                </div>
                <div className="card card-border bg-base-100">
                    <div className="card-body">
                        <div className="card-title">Show outside days</div>
                        <div className="mt-4">
                            <calendar-date
                                className="cally bg-base-100 border-base-300 rounded-box w-full border pt-1"
                                show-outside-days="">
                                <span className="iconify lucide--chevron-left" slot="previous"></span>
                                <span className="iconify lucide--chevron-right" slot="next"></span>
                                <calendar-month></calendar-month>
                            </calendar-date>
                        </div>
                    </div>
                </div>
                <div className="card card-border bg-base-100">
                    <div className="card-body">
                        <div className="card-title">Different Heading</div>
                        <div className="mt-4">
                            <calendar-date className="cally bg-base-100 border-base-300 rounded-box w-full border pt-1">
                                <span className="iconify lucide--chevron-left" slot="previous"></span>
                                <span className="iconify lucide--chevron-right" slot="next"></span>
                                <p slot="heading" className="text-center font-medium">
                                    Your Time, Your Way
                                </p>
                                <calendar-month></calendar-month>
                            </calendar-date>
                        </div>
                    </div>
                </div>
                <div className="card card-border bg-base-100">
                    <div className="card-body">
                        <div className="card-title">Week start: Sunday</div>
                        <div className="mt-4">
                            <calendar-date
                                className="cally bg-base-100 border-base-300 rounded-box w-full border pt-1"
                                first-day-of-week="0">
                                <span className="iconify lucide--chevron-left" slot="previous"></span>
                                <span className="iconify lucide--chevron-right" slot="next"></span>
                                <calendar-month></calendar-month>
                            </calendar-date>
                        </div>
                    </div>
                </div>
                <div className="card card-border bg-base-100">
                    <div className="card-body">
                        <div className="card-title">Multi Select</div>
                        <div className="mt-4">
                            <calendar-multi className="cally bg-base-100 border-base-300 rounded-box w-full border pt-1">
                                <span className="iconify lucide--chevron-left" slot="previous"></span>
                                <span className="iconify lucide--chevron-right" slot="next"></span>
                                <calendar-month></calendar-month>
                            </calendar-multi>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-6">
                <div className="card card-border bg-base-100">
                    <div className="card-body">
                        <div className="card-title">Range Select</div>
                        <div className="mt-4">
                            <calendar-range
                                className="cally bg-base-100 border-base-300 rounded-box border pt-1"
                                show-outside-days="">
                                <span className="iconify lucide--chevron-left" slot="previous"></span>
                                <span className="iconify lucide--chevron-right" slot="next"></span>
                                <calendar-month></calendar-month>
                            </calendar-range>
                        </div>
                    </div>
                </div>
                <div className="card card-border bg-base-100">
                    <div className="card-body">
                        <div className="card-title">Range Select: Multi Month</div>
                        <div className="mt-4">
                            <calendar-range
                                className="cally bg-base-100 border-base-300 rounded-box border pt-1"
                                show-outside-days=""
                                months={2}>
                                <span className="iconify lucide--chevron-left" slot="previous"></span>
                                <span className="iconify lucide--chevron-right" slot="next"></span>
                                <div className="flex gap-2 max-md:flex-wrap">
                                    <calendar-month></calendar-month>
                                    <calendar-month offset={1}></calendar-month>
                                </div>
                            </calendar-range>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
