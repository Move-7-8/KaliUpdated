// src/app/terms/components/TermsOfService.tsx
// Reusable Terms of Service component (website use only)

export default function TermsOfService() {
    return (
        <main className="bg-base-200 text-base-content font-blog">
            <section className="mx-auto max-w-3xl px-4 py-12 md:px-6 lg:px-8">
                <div className="mb-8 text-center">
                    <h1 className="font-heading text-4xl font-extrabold tracking-tight md:text-5xl">
                        Terms of Service
                    </h1>
                    <p className="mt-2 opacity-80">Effective date: 30 August 2025</p>
                </div>

                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body space-y-6 leading-relaxed">
                        <section>
                            <h2 className="text-2xl font-bold">Who we are</h2>
                            <p className="mt-2">
                                Kali Capital Pty Ltd trading as <strong>Kali Software</strong> (“Kali Software”, “we”,
                                “us”, or “our”) operates this website from Australia.
                            </p>
                            <ul className="mt-3 list-disc pl-6">
                                <li>
                                    <strong>ABN:</strong> 47 656 408 678
                                </li>
                                <li>
                                    <strong>ACN:</strong> 656 408 678
                                </li>
                                <li>
                                    <strong>Office:</strong> 333 George St, Sydney NSW 2000, Australia
                                </li>
                                <li>
                                    <strong>Contact:</strong>{" "}
                                    <a className="link link-primary-content" href="mailto:connor@kalicapital.io">
                                        connor@kalicapital.io
                                    </a>
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold">Acceptance</h2>
                            <p className="mt-2">
                                By using this website, you agree to these Terms of Service (“Terms”). If you don’t
                                agree, please don’t use the site.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold">Website use</h2>
                            <ul className="mt-2 list-disc pl-6">
                                <li>Use the site lawfully and for legitimate business purposes only.</li>
                                <li>Don’t interfere with the site’s operation or security.</li>
                                <li>Don’t copy, scrape, or reuse content except as allowed below.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold">Content &amp; intellectual property</h2>
                            <p className="mt-2">
                                Unless stated otherwise, the website (including text, branding and graphics) is owned by
                                us or our licensors. You may view the site and make a single copy for your internal use.
                                Any other use (including reproduction, redistribution or commercial use) requires our
                                prior written permission.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold">Information only</h2>
                            <p className="mt-2">
                                Content on this website is general information, not advice. You should seek your own
                                professional advice before acting on any information here.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold">Third-party links</h2>
                            <p className="mt-2">
                                Links to third-party sites are provided for convenience. We don’t endorse and aren’t
                                responsible for their content, availability, or policies.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold">Privacy</h2>
                            <p className="mt-2">
                                We handle personal information in line with our{" "}
                                <a className="link link-primary-content" href="/privacypolicy">
                                    Privacy Policy
                                </a>
                                .
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold">Disclaimers &amp; liability</h2>
                            <p className="mt-2">
                                The website is provided “as is”. To the extent permitted by law, we exclude all
                                warranties about the site’s accuracy, availability or fitness for a particular purpose.
                                Nothing in these Terms excludes rights or remedies that cannot be excluded under the{" "}
                                <em>Australian Consumer Law</em>. If any liability cannot be excluded, it is limited to
                                the minimum extent permitted by law.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold">Changes to the site or these Terms</h2>
                            <p className="mt-2">
                                We may update the site and these Terms from time to time. The updated Terms apply from
                                the “Effective date” above.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold">Governing law</h2>
                            <p className="mt-2">
                                These Terms are governed by the laws of New South Wales, Australia. Disputes are subject
                                to the exclusive jurisdiction of the courts of New South Wales and the Commonwealth of
                                Australia.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold">Contact</h2>
                            <p className="mt-2">
                                <strong>Kali Software (Kali Capital Pty Ltd)</strong>
                                <br />
                                Email:{" "}
                                <a className="link link-primary-content" href="mailto:connor@kalicapital.io">
                                    connor@kalicapital.io
                                </a>
                                <br />
                                Office: 333 George St, Sydney NSW 2000, Australia
                            </p>
                            <p className="mt-2 opacity-80">Last updated: 30 October 2025</p>
                        </section>
                    </div>
                </div>
            </section>
        </main>
    );
}
