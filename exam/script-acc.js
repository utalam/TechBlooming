document.addEventListener('DOMContentLoaded', () => {
    const quizContent = document.getElementById('quiz-content');
    const submitAllBtn = document.getElementById('submit-all');
    const reportContent = document.getElementById('report-content');
    const retryBtn = document.getElementById('retry-btn');
    const progressSpan = document.getElementById('progress');

    const questions = [
        {
            question: "What are the key differences between a review and an audit of financial statements?",
            options: ["A) Review provides limited assurance, audit provides reasonable assurance", "B) Review provides reasonable assurance, audit provides limited assurance", "C) Both provide reasonable assurance", "D) Both provide limited assurance"],
            correct: "A) Review provides limited assurance, audit provides reasonable assurance",
            subtopic: "Auditing and Attestation",
            strength: "Strong understanding of audit vs. review distinctions (Auditing and Attestation).",
            weakness: "Weak on audit vs. review assurance levels—review Auditing and Attestation basics."
        },
        {
            question: "Explain the concept of economic value added (EVA) and how it is calculated.",
            options: ["A) EVA = Gross Profit - Operating Expenses", "B) EVA = Net Profit + Cost of Capital", "C) EVA = Net Operating Profit After Taxes - Capital Charge", "D) EVA = Operating Income - Non-operating Expenses"],
            correct: "C) EVA = Net Operating Profit After Taxes - Capital Charge",
            subtopic: "Business Environment and Concepts",
            strength: "Solid grasp of economic value added (EVA) in business analysis (Business Environment and Concepts).",
            weakness: "Unclear on EVA calculation—study Business Environment and Concepts financial metrics."
        },
        {
            question: "What are the main components of the Statement of Cash Flows?",
            options: ["A) Operating, Financing, and Depreciation Activities", "B) Operating, Investing, and Financing Activities", "C) Operating, Investing, and Depreciation Activities", "D) Operating, Financing, and Investing Activities"],
            correct: "B) Operating, Investing, and Financing Activities",
            subtopic: "Financial Accounting and Reporting",
            strength: "Clear knowledge of cash flow statement components (Financial Accounting and Reporting).",
            weakness: "Confused on cash flow components—revisit Financial Accounting and Reporting statements."
        },
        {
            question: "Describe the difference between a tax credit and a tax deduction.",
            options: ["A) Tax credit reduces taxable income, tax deduction reduces tax owed", "B) Tax deduction reduces taxable income, tax credit reduces tax owed", "C) Both reduce taxable income", "D) Both reduce tax owed"],
            correct: "B) Tax deduction reduces taxable income, tax credit reduces tax owed",
            subtopic: "Regulation",
            strength: "Good comprehension of tax credits vs. deductions (Regulation).",
            weakness: "Mix-up on tax credits vs. deductions—focus on Regulation tax rules."
        },
        {
            question: "What is the purpose of the audit risk model, and what are its components?",
            options: ["A) To assess detection risk only", "B) To assess inherent risk, control risk, and detection risk", "C) To assess control risk only", "D) To assess inherent risk only"],
            correct: "B) To assess inherent risk, control risk, and detection risk",
            subtopic: "Auditing and Attestation",
            strength: "Effective understanding of the audit risk model (Auditing and Attestation).",
            weakness: "Unsure of audit risk model—practice Auditing and Attestation risk concepts."
        },
        {
            question: "Explain the concept of Just-In-Time (JIT) inventory system and its benefits.",
            options: ["A) Produces goods in advance to meet future demand", "B) Produces goods only as they are needed, reducing inventory costs", "C) Keeps high levels of inventory for safety stock", "D) Focuses on selling products quickly"],
            correct: "B) Produces goods only as they are needed, reducing inventory costs",
            subtopic: "Business Environment and Concepts",
            strength: "Strong insight into Just-In-Time inventory benefits (Business Environment and Concepts).",
            weakness: "Weak on JIT inventory—review Business Environment and Concepts operational strategies."
        },
        {
            question: "What is the difference between the FIFO and LIFO inventory valuation methods?",
            options: ["A) FIFO assumes newest inventory sold first, LIFO assumes oldest inventory sold first", "B) FIFO assumes oldest inventory sold first, LIFO assumes newest inventory sold first", "C) Both assume newest inventory sold first", "D) Both assume oldest inventory sold first"],
            correct: "B) FIFO assumes oldest inventory sold first, LIFO assumes newest inventory sold first",
            subtopic: "Financial Accounting and Reporting",
            strength: "Accurate knowledge of FIFO vs. LIFO methods (Financial Accounting and Reporting).",
            weakness: "Unclear on FIFO vs. LIFO—study Financial Accounting and Reporting inventory methods."
        },
        {
            question: "What are the primary characteristics of a partnership, and how is it taxed?",
            options: ["A) Single owner, taxed at corporate rates", "B) Two or more owners, taxed at corporate rates", "C) Two or more owners, pass-through taxation", "D) Single owner, pass-through taxation"],
            correct: "C) Two or more owners, pass-through taxation",
            subtopic: "Regulation",
            strength: "Clear understanding of partnership taxation (Regulation).",
            weakness: "Confused on partnership taxation—revisit Regulation entity rules."
        },
        {
            question: "What is the role of the internal control system in an audit?",
            options: ["A) Ensure profitability of the company", "B) Ensure reliability of financial reporting, compliance, and efficiency", "C) Ensure accuracy of tax returns", "D) Ensure competitive advantage in the market"],
            correct: "B) Ensure reliability of financial reporting, compliance, and efficiency",
            subtopic: "Auditing and Attestation",
            strength: "Solid grasp of internal control roles in auditing (Auditing and Attestation).",
            weakness: "Weak on internal controls—focus on Auditing and Attestation fundamentals."
        },
        {
            question: "Define the term 'cost of capital' and explain its significance in capital budgeting.",
            options: ["A) The cost of acquiring new customers, significant for sales strategy", "B) The cost of debt only, significant for loan management", "C) The rate of return required by a company to cover capital costs, significant for investment decisions", "D) The cost of equity only, significant for share issuance"],
            correct: "C) The rate of return required by a company to cover capital costs, significant for investment decisions",
            subtopic: "Business Environment and Concepts",
            strength: "Good understanding of cost of capital in capital budgeting (Business Environment and Concepts).",
            weakness: "Unsure of cost of capital—review Business Environment and Concepts capital budgeting."
        }
    ];

    let answers = new Array(questions.length);

    function loadQuestions() {
        quizContent.innerHTML = questions.map((q, index) => `
            <div class="question">
                <h4>Question ${index + 1} of 10</h4>
                <p>${q.question}</p>
                ${q.options.map(option => `
                    <button class="option" data-question="${index}" data-value="${option}">${option}</button>
                `).join('')}
            </div>
        `).join('');
        document.querySelectorAll('.option').forEach(button => {
            button.addEventListener('click', () => selectOption(button));
        });
        updateProgress();
    }

    function selectOption(button) {
        const questionIndex = parseInt(button.dataset.question);
        const selected = button.dataset.value;
        answers[questionIndex] = selected;
        document.querySelectorAll(`.option[data-question="${questionIndex}"]`).forEach(opt => {
            opt.classList.remove('selected');
        });
        button.classList.add('selected');
        updateProgress();
    }

    function updateProgress() {
        const answered = answers.filter(a => a !== undefined).length;
        const progress = ((answered / questions.length) * 100).toFixed(0);
        progressSpan.textContent = `${progress}%`;
    }

    submitAllBtn.addEventListener('click', () => {
        if (answers.some(a => a === undefined)) {
            alert('Please answer all questions before submitting!');
            return;
        }
        generateReport();
    });

    function generateReport() {
        let score = 0;
        questions.forEach((q, index) => {
            if (answers[index] === q.correct) {
                score += 10; // 10 points per correct answer for a total of 100
            }
        });

        const percentage = (score / 100) * 100; // Calculate percentage
        let grade = '';
        if (percentage === 100) {
            grade = 'Well Done';
        } else if (percentage >= 90) {
            grade = 'Excellent';
        } else if (percentage >= 80) {
            grade = 'Good';
        } else if (percentage >= 60) {
            grade = 'Fair';
        } else {
            grade = 'Needs Improvement';
        }

        let reportHtml = '<h3>Results Summary</h3>';
        reportHtml += `<p>Your Score: ${score} out of 100 (${percentage.toFixed(0)}%)</p>`;
        reportHtml += `<p>Grade: ${grade}</p>`;
        
        reportHtml += '<h3>Detailed Feedback</h3>';
        questions.forEach((q, index) => {
            const isCorrect = answers[index] === q.correct;
            reportHtml += `
                <div class="report-section">
                    <h3>Question ${index + 1}: ${q.question}</h3>
                    <p><strong>Your Answer:</strong> ${answers[index]}</p>
                    <p><strong>Correct Answer:</strong> ${q.correct}</p>
                    ${isCorrect ? `
                        <p><strong>Strength:</strong> ${q.strength}</p>
                    ` : `
                        <p><strong>Weakness:</strong> ${q.weakness}</p>
                    `}
                </div>
            `;
        });

        // Encouraging words based on grade
        let encouragement = '';
        switch (grade) {
            case 'Well Done':
                encouragement = `
                    <div class="encouragement">
                        <h3>Congratulations!</h3>
                        <p>You’ve mastered CPA concepts with a perfect score—well done! Keep practicing to maintain your expertise for the exam.</p>
                    </div>
                `;
                break;
            case 'Excellent':
                encouragement = `
                    <div class="encouragement">
                        <h3>Excellent Work!</h3>
                        <p>Your understanding of CPA topics is outstanding! Continue refining your knowledge for even greater success on the exam.</p>
                    </div>
                `;
                break;
            case 'Good':
                encouragement = `
                    <div class="encouragement">
                        <h3>Great Effort!</h3>
                        <p>You’re doing well! Review the areas for improvement to achieve excellence in your CPA exam preparation.</p>
                    </div>
                `;
                break;
            case 'Fair':
                encouragement = `
                    <div class="encouragement">
                        <h3>Good Progress!</h3>
                        <p>You’re on the right track! Focus on the weaknesses to strengthen your CPA knowledge for the exam.</p>
                    </div>
                `;
                break;
            case 'Needs Improvement':
                encouragement = `
                    <div class="encouragement">
                        <h3>Keep Going!</h3>
                        <p>Don’t be discouraged—every mistake is a learning opportunity! Review the weaknesses, practice regularly, and you’ll improve significantly. We believe in your potential to excel in the CPA exam!</p>
                    </div>
                `;
                break;
        }

        reportHtml += encouragement;
        reportContent.innerHTML = reportHtml;
        reportContent.style.display = 'block';
        retryBtn.style.display = 'block';
        submitAllBtn.style.display = 'none';
        window.scrollTo(0, document.body.scrollHeight); // Scroll to the report at the bottom
    }

    retryBtn.addEventListener('click', () => {
        answers = new Array(questions.length);
        reportContent.style.display = 'none';
        retryBtn.style.display = 'none';
        submitAllBtn.style.display = 'block';
        loadQuestions();
        window.scrollTo(0, 0); // Scroll back to the top
    });

    loadQuestions();
});