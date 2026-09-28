// Legal page content. DRAFT / PLACEHOLDER: structure follows a typical terms
// and privacy policy for a talent platform, but the wording is not legal advice
// and must be reviewed by counsel. Items in [brackets] need real values.

export type Block =
  | { type: "p"; text: string; style?: "plain" | "emphasis" | "caps" }
  | { type: "ul"; items: string[] };

export interface LegalSection {
  title: string;
  blocks: Block[];
}

export interface LegalDoc {
  title: string;
  updated: string;
  intro: Block[];
  sections: LegalSection[];
}

const p = (text: string, style?: "plain" | "emphasis" | "caps"): Block => ({ type: "p", text, style });
const ul = (...items: string[]): Block => ({ type: "ul", items });

export const draftNotice =
  "Draft for review: this text has not yet been reviewed by a lawyer and may change before launch.";

export const terms: LegalDoc = {
  title: "Terms of Service",
  updated: "September 20, 2026",
  intro: [
    p('These Terms of Service ("Terms") apply to your access to and use of (a) the website located at [website address] (or any successor links) and all associated web pages, websites, and social media pages (the "Website") provided by [Company legal name] ("Company," "we," "our," or "us") and (b) any online services ((a) and (b), collectively, our "Services").'),
    p("By using our Services, you expressly agree to these Terms. Please carefully review these Terms before using our Services, including, without limitation, the warranty disclaimers and releases set out in the section on Disclaimer and Release, which limit our liability and your ability to bring certain claims against us.", "emphasis"),
    p("BY AGREEING TO THESE TERMS, EXCEPT FOR CERTAIN TYPES OF DISPUTES DESCRIBED IN THE SECTION ON DISPUTE RESOLUTION, YOU AGREE THAT DISPUTES BETWEEN YOU AND COMPANY WILL BE RESOLVED ON AN INDIVIDUAL BASIS [CONFIRM WITH COUNSEL: ARBITRATION AND CLASS-ACTION WAIVER].", "caps"),
    p("We may indicate that different or additional agreements, terms, conditions, guidelines, policies, or rules apply to certain features or products. Where we do, those additional terms are part of these Terms for that feature or product."),
  ],
  sections: [
    {
      title: "Eligibility and Accounts",
      blocks: [
        p("You must be at least [minimum age] years old, and able to form a binding contract, to use our Services. If you use the Services on behalf of a production, studio, or company, you confirm that you have authority to bind it."),
        p("You may need an account to use some features. Keep your login details secure, give accurate information, and tell us promptly if you suspect unauthorised access. You are responsible for activity under your account."),
      ],
    },
    {
      title: "Your Information",
      blocks: [
        p("Your use of the Services is also governed by our Privacy Policy, which explains what information we collect and how we use it. By using the Services you consent to that collection and use."),
      ],
    },
    {
      title: "User Content and Publicity",
      blocks: [
        p("You keep ownership of the profiles, reels, posts, messages, and other material you submit (\"User Content\"). You grant Company a non-exclusive, worldwide, royalty-free licence to host, display, reproduce, and distribute your User Content as needed to operate, promote, and improve the Services."),
        p("You confirm that you have the rights needed to submit your User Content and that it does not infringe anyone else's rights. With your permission, we may feature completed projects and member profiles in promotional material."),
      ],
    },
    {
      title: "Prohibited Conduct",
      blocks: [
        p("You agree not to:"),
        ul(
          "Break the law or infringe the rights of others, including copyright and privacy rights.",
          "Post false, misleading, or fraudulent profiles, credits, or job listings.",
          "Harass, threaten, or discriminate against other members.",
          "Collect other members' information by scraping or automated means.",
          "Interfere with the security or operation of the Services.",
          "Circumvent the Services to avoid fees, or resell access without our permission.",
        ),
      ],
    },
    {
      title: "Jobs, Collaborations, and Production Rooms",
      blocks: [
        p("Norrick helps members find each other and work together. We are not a party to any agreement between members and do not employ, represent, or guarantee any member. Members are responsible for agreeing the scope, credit, payment, and schedule of their own work, and for complying with applicable employment and contract laws."),
        p("Job posts and applications must be accurate. Unpaid or collaborative projects must be described as such."),
      ],
    },
    {
      title: "Paid Plans, Billing, and Refunds",
      blocks: [
        p("Some features require a paid plan, as described on our Pricing page. Prices, billing periods, and included features may change with notice. Plans renew automatically until cancelled, and you can cancel at any time in your account settings; cancellation takes effect at the end of the current billing period."),
        p("[Refund policy: describe when refunds are or are not available.] You are responsible for applicable taxes."),
      ],
    },
    {
      title: "Ownership; Limited License",
      blocks: [
        p("The Services, including their design, software, text, and branding (other than User Content), are owned by Company or its licensors and protected by intellectual property laws. We grant you a limited, revocable, non-exclusive, non-transferable licence to use the Services for their intended purpose in accordance with these Terms."),
      ],
    },
    {
      title: "Trademarks",
      blocks: [
        p("Norrick and related names and logos are trademarks of Company. You may not use them without our prior written permission. Other names and logos may be trademarks of their respective owners."),
      ],
    },
    {
      title: "Feedback",
      blocks: [
        p("If you send us ideas or suggestions, we may use them without obligation or compensation to you."),
      ],
    },
    {
      title: "Third-Party Materials",
      blocks: [
        p("The Services may link to or include third-party websites, tools, or content. We do not control them and are not responsible for them. Your use of third-party materials is at your own risk and subject to their terms."),
      ],
    },
    {
      title: "Indemnification",
      blocks: [
        p("To the extent permitted by law, you agree to defend and indemnify Company and its team against claims, losses, and expenses (including reasonable legal fees) arising from your User Content, your use of the Services, or your breach of these Terms."),
      ],
    },
    {
      title: "Disclaimer and Release",
      blocks: [
        p('THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE." TO THE FULLEST EXTENT PERMITTED BY LAW, COMPANY DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE, OR THAT ANY MEMBER OR OPPORTUNITY WILL MEET YOUR EXPECTATIONS.', "caps"),
        p("You are solely responsible for your dealings with other members. [Confirm release wording with counsel.]"),
      ],
    },
    {
      title: "Limitation of Liability",
      blocks: [
        p("TO THE FULLEST EXTENT PERMITTED BY LAW, COMPANY WILL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR FOR LOST PROFITS, DATA, OR GOODWILL. OUR TOTAL LIABILITY FOR ANY CLAIM RELATING TO THE SERVICES WILL NOT EXCEED [AMOUNT OR FEES PAID IN THE PRECEDING 12 MONTHS].", "caps"),
      ],
    },
    {
      title: "Dispute Resolution",
      blocks: [
        p("[Governing law, venue, and any arbitration or informal-resolution process to be confirmed with counsel.] Before starting a formal dispute, please contact us so we can try to resolve it informally."),
      ],
    },
    {
      title: "Termination",
      blocks: [
        p("You may stop using the Services at any time. We may suspend or end your access if you breach these Terms or if we need to protect the Services or other members. Sections that by their nature should survive termination will do so."),
      ],
    },
    {
      title: "Changes to These Terms",
      blocks: [
        p("We may update these Terms from time to time. If a change is material, we will give reasonable notice, for example by email or a notice on the Website. Continuing to use the Services after a change takes effect means you accept the updated Terms."),
      ],
    },
    {
      title: "Contact",
      blocks: [p("Questions about these Terms? Contact us at [contact email].")],
    },
  ],
};

export const privacy: LegalDoc = {
  title: "Privacy Policy",
  updated: "September 20, 2026",
  intro: [
    p('This Privacy Policy explains how [Company legal name] ("Company," "we," "our," or "us") collects, uses, and shares information when you use our website at [website address] and related online services (the "Services"), and the choices you have.'),
    p("By using our Services, you acknowledge the practices described in this Privacy Policy. If you do not agree with them, please do not use the Services.", "emphasis"),
  ],
  sections: [
    {
      title: "Information We Collect",
      blocks: [
        p("We collect information in three ways:"),
        ul(
          "Information you give us: account details (name, email, location), profile content (credits, reels, categories, bio), job posts and applications, messages, and anything you send to our support team.",
          "Information collected automatically: device and browser type, IP address, pages viewed, and how you use the Services, through cookies and similar technologies.",
          "Information from others: details another member includes about you, and information from sign-in providers such as Google if you choose to use them.",
        ),
        p("Payment details are handled by our payment processor. We do not store full card numbers."),
      ],
    },
    {
      title: "How We Use Information",
      blocks: [
        p("We use information to:"),
        ul(
          "Provide, maintain, and improve the Services, including matching members with collaborators and opportunities.",
          "Create and manage accounts, profiles, production rooms, and messages.",
          "Process payments and send receipts, service notices, and security alerts.",
          "Understand how the Services are used and to prevent fraud and abuse.",
          "Send updates and marketing where permitted, which you can opt out of at any time.",
        ),
      ],
    },
    {
      title: "How We Share Information",
      blocks: [
        p("We share information:"),
        ul(
          "With other members, according to your profile and privacy settings. Public profile information is visible to anyone.",
          "With service providers who help us run the Services, such as hosting, analytics, email, and payments, under confidentiality obligations.",
          "When required by law, or to protect the rights, safety, and security of members and the Services.",
          "In connection with a merger, acquisition, or sale of assets, with notice where required.",
        ),
        p("We do not sell your personal information."),
      ],
    },
    {
      title: "Cookies and Analytics",
      blocks: [
        p("We use cookies and similar technologies to keep you signed in, remember preferences, and measure usage. You can control cookies through your browser settings; some features may not work without them. [Describe any analytics tools in use.]"),
      ],
    },
    {
      title: "Your Choices and Rights",
      blocks: [
        p("Depending on where you live, you may have the right to access, correct, delete, or export your personal information, to object to or restrict certain processing, and to withdraw consent. You can update most information in your account settings, or contact us at [contact email] to make a request. We may need to verify your identity first."),
      ],
    },
    {
      title: "Data Retention",
      blocks: [
        p("We keep personal information for as long as your account is active and as needed to provide the Services, meet legal obligations, resolve disputes, and enforce our agreements. You can ask us to delete your account at any time."),
      ],
    },
    {
      title: "Security",
      blocks: [
        p("We use reasonable technical and organisational measures to protect information. No system is completely secure, so we cannot guarantee absolute security. Please use a strong, unique password."),
      ],
    },
    {
      title: "International Transfers",
      blocks: [
        p("Our members and service providers are located in different countries. Your information may be processed in countries other than your own, where we apply appropriate safeguards as required by law. [Confirm transfer mechanism.]"),
      ],
    },
    {
      title: "Children's Privacy",
      blocks: [
        p("The Services are not directed to anyone under [minimum age]. We do not knowingly collect personal information from them. If you believe we have, contact us and we will delete it."),
      ],
    },
    {
      title: "Changes to This Policy",
      blocks: [
        p("We may update this Privacy Policy from time to time. If a change is material, we will give reasonable notice. The date at the top shows when it was last updated."),
      ],
    },
    {
      title: "Contact Us",
      blocks: [p("Questions or requests about privacy? Contact us at [contact email] or [postal address].")],
    },
  ],
};
