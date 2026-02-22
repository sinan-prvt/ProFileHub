export const salaryNegotiationData = {
    goldenRules: [
        { title: "Never say the first number", desc: "Let them make the first offer. Say: 'I'd love to hear what range you have in mind for this role.'" },
        { title: "Always negotiate", desc: "The first offer is almost never the best. Companies expect negotiation — not negotiating leaves money on the table." },
        { title: "Use silence", desc: "After receiving an offer, pause for 2-3 seconds. Silence creates pressure and shows you're thinking." },
        { title: "Get it in writing", desc: "Never accept verbally. Always ask for the offer letter with all details including salary, benefits, joining date, and notice period." },
        { title: "Compare total compensation", desc: "Salary isn't everything — factor in bonuses, equity, insurance, remote work, learning budget, leave policy." },
        { title: "Research market rates", desc: "Use Glassdoor, LinkedIn Salary, Levels.fyi, and AmbitionBox to know your worth before negotiating." },
    ],
    scripts: [
        {
            id: "sn1",
            title: "When asked salary expectations early",
            script: `"I'd prefer to learn more about the role and responsibilities before discussing numbers. I'm confident we can find a number that works for both of us. What range does the team have budgeted?"`,
        },
        {
            id: "sn2",
            title: "When you receive the first offer",
            script: `"Thank you for the offer — I'm really excited about the role. I appreciate the number, but based on my research and the value I'd bring, I was looking at something closer to [X]. Is there flexibility to discuss this?"`,
        },
        {
            id: "sn3",
            title: "Countering a low offer",
            script: `"I really appreciate the offer and I'm enthusiastic about joining [Company]. However, the current offer is below market rate for this role and my skill level. Based on my research and experience with [specific achievements], I'd be looking for [X amount]. Would you be open to revisiting this?"`,
        },
        {
            id: "sn4",
            title: "If they say the offer is final",
            script: `"I understand the salary may be fixed. Could we explore other aspects — perhaps a signing bonus, early performance review, additional leave days, remote work flexibility, or a learning/certification budget? These would mean a lot to me."`,
        },
        {
            id: "sn5",
            title: "Accepting the offer",
            script: `"Thank you so much — I'm thrilled to accept! Could you please send me the offer letter with all the details? I'd also love to know the next steps for onboarding. I'm really looking forward to contributing to the team."`,
        },
    ],
    marketResearch: [
        { platform: "Glassdoor", url: "https://www.glassdoor.co.in/Salaries/", use: "Company-specific salary data" },
        { platform: "LinkedIn Salary", url: "https://www.linkedin.com/salary/", use: "Role-based salary insights" },
        { platform: "AmbitionBox", url: "https://www.ambitionbox.com/salaries/", use: "Indian market salaries + reviews" },
        { platform: "Levels.fyi", url: "https://www.levels.fyi/", use: "Tech company compensation data" },
        { platform: "PayScale", url: "https://www.payscale.com/", use: "Personalized salary reports" },
    ],
};
