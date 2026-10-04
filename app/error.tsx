"use client";
export default function ErrorPage({ reset }: { reset: () => void }) { return <section className="empty-state"><h1>Something interrupted your launch.</h1><p>Your saved demo stays in this browser. Try loading this screen again.</p><button className="button button-primary" onClick={reset}>Try again</button></section>; }
