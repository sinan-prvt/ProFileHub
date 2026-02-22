import { useState } from "react";

const Workflow = () => {
    const [activeTab, setActiveTab] = useState("workflow");

    const steps = [
        { id: 1, title: "Discovery", description: "Research target companies, job boards, and networking. Identify 5-10 companies that match your skills and interests." },
        { id: 2, title: "Precision Tailoring", description: "Customize resume and cover letter for each role. Highlight relevant keywords from the job description." },
        { id: 3, title: "Deployment", description: "Submit applications, connect with recruiters on LinkedIn, and send follow-up emails within 3-5 days." },
        { id: 4, title: "Technical Dialogue", description: "Prepare for technical interviews: DSA, system design, and project deep-dives. Practice on LeetCode and mock interviews." },
        { id: 5, title: "Execution", description: "Ace the interviews — be confident, ask questions, and showcase your projects and problem-solving skills." },
        { id: 6, title: "Finalization", description: "Negotiate salary, review the offer letter carefully, and confirm joining date. Send a professional acceptance email." },
    ];

    const researchChecklist = [
        {
            category: "Company Basics", items: [
                "Company name, industry, and founding year",
                "Company mission and values statement",
                "Key products/services they offer",
                "Company size and office locations",
                "Recent news or press releases",
            ]
        },
        {
            category: "Role Research", items: [
                "Read full job description 3 times — highlight key skills",
                "Identify required vs. nice-to-have skills",
                "Match your experience to each requirement",
                "Research typical salary range for this role",
                "Understand the team structure and reporting line",
            ]
        },
        {
            category: "People Research", items: [
                "Find the hiring manager on LinkedIn",
                "Look up interviewers' backgrounds",
                "Check team members' profiles and tech talks",
                "Read company engineering blog (if available)",
                "Look for recent company posts on LinkedIn/Twitter",
            ]
        },
        {
            category: "Tech Stack", items: [
                "Identify their tech stack (StackShare, job listing, GitHub)",
                "Review any open-source repos the company maintains",
                "Understand their architecture patterns if possible",
                "Prepare to discuss overlaps with your experience",
            ]
        },
    ];

    const tabs = [
        { key: "workflow", label: "🔄 Workflow" },
        { key: "research", label: "🔍 Research" },
    ];

    return (
        <section id="workflow">
            <div className="section-header">
                <span className="section-tag">Strategy</span>
                <h2 className="section-title">Application Playbook</h2>
            </div>

            <div className="tab-bar">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        className={`tab-btn ${activeTab === tab.key ? "tab-btn--active" : ""}`}
                        onClick={() => setActiveTab(tab.key)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {activeTab === "workflow" && (
                <div className="timeline">
                    {steps.map((step) => (
                        <div
                            key={step.id}
                            className="timeline-step"
                            data-step={String(step.id).padStart(2, "0")}
                        >
                            <h3 className="timeline-step__title">{step.title}</h3>
                            <p className="timeline-step__desc">{step.description}</p>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === "research" && (
                <div className="stack stack--lg">
                    {researchChecklist.map((group, gi) => (
                        <div key={gi}>
                            <h3 className="tips-heading tips-heading--do">{group.category}</h3>
                            <div className="checklist-list">
                                {group.items.map((item, i) => (
                                    <label key={i} className="checklist-item">
                                        <input type="checkbox" className="checklist-item__check" />
                                        <span className="checklist-item__text">{item}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default Workflow;
