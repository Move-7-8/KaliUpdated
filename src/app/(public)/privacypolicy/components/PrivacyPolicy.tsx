// src/components/legal/PrivacyPolicy.tsx
// Reusable Privacy Policy component (no client-side hooks required)

export default function PrivacyPolicy() {
    return (
        <main className="bg-base-200 text-base-content">
            <section className="mx-auto max-w-3xl px-4 py-12 md:px-6 lg:px-8">
                <div className="mb-8 text-center">
                    <h1 className="font-ocr text-4xl font-extrabold tracking-tight md:text-5xl">Privacy Policy</h1>
                    <p className="mt-2 opacity-80">Effective date: 2 October 2025</p>
                </div>

                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body space-y-6 leading-relaxed">
                        <section>
                            <h2 className="text-2xl font-bold">Who we are</h2>
                            <p className="mt-2">
                                Kali Capital Pty Ltd trading as <strong>Kali Software</strong> (“Kali Software”, “we”,
                                “us”, or “our”) provides software and automation services in Australia.
                            </p>
                            <ul className="mt-3 list-disc pl-6">
                                <li>
                                    <strong>ABN:</strong> 47 656 408 678
                                </li>
                                <li>
                                    <strong>ACN:</strong> 656 408 678
                                </li>
                                <li>
                                    ASIC record:{" "}
                                    <a
                                        className="link link-primary"
                                        href="https://connectonline.asic.gov.au/"
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        View on the ASIC website
                                    </a>
                                </li>
                            </ul>
                            <p className="mt-3">
                                We are committed to protecting your privacy in accordance with the{" "}
                                <em>Privacy Act 1988 (Cth)</em> and the Australian Privacy Principles (APPs).
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold">What we collect</h2>
                            <p className="mt-2">
                                We do <strong>not</strong> offer account log-ins on our website. The only personal
                                information we collect is what you <strong>voluntarily submit</strong> via our contact
                                form:
                            </p>
                            <ul className="mt-3 list-disc pl-6">
                                <li>Name</li>
                                <li>Email address</li>
                                <li>Company</li>
                                <li>What you want to do (your enquiry details)</li>
                            </ul>
                            <p className="mt-3">
                                We do not intentionally collect sensitive information. Please avoid including sensitive
                                information in your form message.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold">How we use your information</h2>
                            <p className="mt-2">We use the information you provide to:</p>
                            <ul className="mt-3 list-disc pl-6">
                                <li>Read and respond to your enquiry</li>
                                <li>Contact you about the services you requested</li>
                                <li>Keep basic records of enquiries and our communications</li>
                                <li>Send you service updates if you’ve asked us to (you can opt out at any time)</li>
                            </ul>
                            <p className="mt-3">
                                We collect personal information by lawful and fair means and only where reasonably
                                necessary for our business activities.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold">Disclosure to third parties</h2>
                            <p className="mt-2">We may share your information with:</p>
                            <ul className="mt-3 list-disc pl-6">
                                <li>
                                    Trusted service providers who operate our website, email, and related systems (e.g.,
                                    hosting, email delivery, CRM)
                                </li>
                                <li>Professional advisers (e.g., legal or accounting) where reasonably necessary</li>
                                <li>Government authorities where required by law</li>
                            </ul>
                            <p className="mt-3">
                                We require our service providers to handle personal information in accordance with
                                applicable privacy laws and only for the purposes we specify.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold">Overseas disclosure</h2>
                            <p className="mt-2">
                                Some service providers may store or process information outside Australia (for example,
                                in cloud data centres). Where this occurs, we take reasonable steps to ensure those
                                providers protect your information in a way that is consistent with the APPs.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold">Retention</h2>
                            <p className="mt-2">
                                We keep enquiry records only for as long as needed for our business purposes and to
                                comply with legal obligations. When information is no longer required, we take
                                reasonable steps to delete or de-identify it.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold">Security</h2>
                            <p className="mt-2">
                                We use reasonable administrative, technical and organisational measures to protect
                                personal information from misuse, interference, loss, and unauthorised access,
                                modification or disclosure. No method of transmission or storage is completely secure;
                                if you suspect any misuse or loss, please contact us immediately.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold">Cookies and analytics</h2>
                            <p className="mt-2">
                                We do not collect personal information through log-ins. If we use basic website
                                analytics or cookies in future, they will be for functionality and aggregate insight
                                only, not to identify you personally. We will update this policy if our use of cookies
                                or analytics materially changes.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold">Your rights (access &amp; correction)</h2>
                            <p className="mt-2">
                                You may request access to the personal information we hold about you and ask us to
                                correct it if it is inaccurate, out of date, incomplete, irrelevant or misleading. We
                                will respond within a reasonable time.
                            </p>
                            <p className="mt-3">To make a request, please contact us using the details below.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold">Making a privacy complaint</h2>
                            <p className="mt-2">
                                If you have concerns about how we have handled your personal information, please contact
                                us first and we’ll do our best to resolve the issue quickly. If you are not satisfied
                                with our response, you may contact the Office of the Australian Information Commissioner
                                (OAIC).
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold">Updates to this policy</h2>
                            <p className="mt-2">
                                We may update this Privacy Policy from time to time. The updated version will be posted
                                on our website with a new effective date.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold">Contact us</h2>
                            <p className="mt-2">
                                <strong>Kali Software (Kali Capital Pty Ltd)</strong>
                                <br />
                                Email:{" "}
                                <a className="link link-primary" href="mailto:connor@kalicapital.io">
                                    connor@kalicapital.io
                                </a>
                            </p>
                            <p className="mt-2 opacity-80">Last updated: 2 October 2025</p>
                        </section>

                        <div className="divider" />

                        <div className="text-sm opacity-70">
                            <p></p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
