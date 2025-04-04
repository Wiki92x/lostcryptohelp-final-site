export default function FAQ() {
  return (
    <section className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <details className="border border-gray-700 p-4 rounded-lg">
            <summary className="cursor-pointer font-medium">Is LostCryptoHelp really free?</summary>
            <p className="mt-2 text-gray-300">
              Yes, you can scan any wallet address for free. Only report submission requires a small payment for validation and verification.
            </p>
          </details>
          <details className="border border-gray-700 p-4 rounded-lg">
            <summary className="cursor-pointer font-medium">How does payment verification work?</summary>
            <p className="mt-2 text-gray-300">
              We verify your transaction hash on-chain to confirm payment. If verification fails, you can manually unlock the report form.
            </p>
          </details>
          <details className="border border-gray-700 p-4 rounded-lg">
            <summary className="cursor-pointer font-medium">Which blockchains are supported?</summary>
            <p className="mt-2 text-gray-300">
              We currently support Ethereum, BNB Smart Chain, and TRON. More networks will be added soon.
            </p>
          </details>
          <details className="border border-gray-700 p-4 rounded-lg">
            <summary className="cursor-pointer font-medium">Will I receive updates after submitting a report?</summary>
            <p className="mt-2 text-gray-300">
              Yes. We send Telegram alerts on successful submissions. You can also track responses via email if provided.
            </p>
          </details>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is LostCryptoHelp really free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, you can scan any wallet address for free. Only report submission requires a small payment for validation and verification."
            }
          },
          {
            "@type": "Question",
            "name": "How does payment verification work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We verify your transaction hash on-chain to confirm payment. If verification fails, you can manually unlock the report form."
            }
          },
          {
            "@type": "Question",
            "name": "Which blockchains are supported?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We currently support Ethereum, BNB Smart Chain, and TRON. More networks will be added soon."
            }
          },
          {
            "@type": "Question",
            "name": "Will I receive updates after submitting a report?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. We send Telegram alerts on successful submissions. You can also track responses via email if provided."
            }
          }
        ]
      })}} />
    </section>
  );
}
