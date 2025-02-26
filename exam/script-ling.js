document.addEventListener('DOMContentLoaded', () => {
    const quizContent = document.getElementById('quiz-content');
    const submitAllBtn = document.getElementById('submit-all');
    const reportContent = document.getElementById('report-content');
    const retryBtn = document.getElementById('retry-btn');
    const progressSpan = document.getElementById('progress');

    const questions = [
        {
            question: "What is the term for when a bilingual speaker unintentionally mixes elements of two languages in a single sentence?",
            options: ["A) Code-switching", "B) Language interference", "C) Bilingual convergence", "D) Lexical borrowing"],
            correct: "B) Language interference",
            subtopic: "Language Contact and Interaction",
            strength: "Strong grasp of key bilingualism concepts and terminology",
            weakness: "Limited understanding of how languages interact in bilingual speech",
            suggestedTopic: "Code-switching vs. interference and other language contact phenomena"
        },
        {
            question: "Which brain region is most commonly associated with language processing and shows increased activity in bilingual individuals when switching languages?",
            options: ["A) Amygdala", "B) Prefrontal cortex", "C) Hippocampus", "D) Cerebellum"],
            correct: "B) Prefrontal cortex",
            subtopic: "Neurolinguistics of Bilingualism",
            strength: "Solid understanding of the brain’s role in bilingual processing",
            weakness: "Weak knowledge of neurolinguistic foundations",
            suggestedTopic: "Brain mechanisms in bilingualism (e.g., executive control and language switching)"
        },
        {
            question: "In bilingual education, the “immersion” approach typically involves:",
            options: ["A) Teaching all subjects in the second language", "B) Alternating days between two languages", "C) Using the first language to explain the second", "D) Focusing only on grammar drills"],
            correct: "A) Teaching all subjects in the second language",
            subtopic: "Bilingual Education",
            strength: "Knowledge of educational strategies for bilingualism",
            weakness: "Lack of familiarity with bilingual teaching models",
            suggestedTopic: "Types of bilingual education programs (immersion, dual-language, transitional)"
        },
        {
            question: "Which of these is a common cognitive advantage of bilingualism supported by research?",
            options: ["A) Improved short-term memory", "B) Enhanced multitasking abilities", "C) Faster reaction times in physical tasks", "D) Better musical pitch recognition"],
            correct: "B) Enhanced multitasking abilities",
            subtopic: "Cognitive Effects of Bilingualism",
            strength: "Awareness of bilingualism’s impact on cognition",
            weakness: "Misunderstanding of cognitive outcomes",
            suggestedTopic: "Cognitive advantages (e.g., executive function, attention control)"
        },
        {
            question: "What is the “critical period hypothesis” in the context of bilingualism?",
            options: ["A) The idea that languages must be learned before puberty for native-like proficiency", "B) The theory that bilingualism delays cognitive development", "C) The belief that adults cannot learn a second language", "D) The notion that bilingualism only benefits young children"],
            correct: "A) The idea that languages must be learned before puberty for native-like proficiency",
            subtopic: "Second Language Acquisition",
            strength: "Strong theoretical knowledge of language acquisition",
            weakness: "Confusion about age-related language learning theories",
            suggestedTopic: "Critical period hypothesis and age effects in bilingualism"
        },
        {
            question: "A child raised in a household where parents speak different native languages is an example of:",
            options: ["A) Sequential bilingualism", "B) Simultaneous bilingualism", "C) Passive bilingualism", "D) Subtractive bilingualism"],
            correct: "B) Simultaneous bilingualism",
            subtopic: "Types of Bilingualism",
            strength: "Ability to distinguish bilingual development types",
            weakness: "Weak differentiation between bilingualism categories",
            suggestedTopic: "Simultaneous vs. sequential bilingualism and their contexts"
        },
        {
            question: "Which sociolinguistic factor most influences a bilingual individual’s language choice in a conversation?",
            options: ["A) The weather", "B) The social context", "C) The time of day", "D) The speaker’s height"],
            correct: "B) The social context",
            subtopic: "Sociolinguistics of Bilingualism",
            strength: "Insight into social dynamics of bilingualism",
            weakness: "Lack of understanding of sociolinguistic principles",
            suggestedTopic: "Language choice, diglossia, and social factors"
        },
        {
            question: "What does “subtractive bilingualism” refer to?",
            options: ["A) Learning a second language while maintaining the first", "B) Losing proficiency in the first language as a second is learned", "C) Using two languages interchangeably in all contexts", "D) Developing equal fluency in two languages"],
            correct: "B) Losing proficiency in the first language as a second is learned",
            subtopic: "Language Maintenance and Shift",
            strength: "Understanding of language loss and attrition",
            weakness: "Misconception about bilingual proficiency dynamics",
            suggestedTopic: "Additive vs. subtractive bilingualism and language shift"
        },
        {
            question: "In psycholinguistic studies, what is “cross-linguistic influence” most likely to affect?",
            options: ["A) Vocabulary size", "B) Pronunciation and grammar", "C) Emotional expression", "D) Physical coordination"],
            correct: "B) Pronunciation and grammar",
            subtopic: "Psycholinguistics of Bilingualism",
            strength: "Knowledge of how languages influence each other mentally",
            weakness: "Poor grasp of psycholinguistic interactions",
            suggestedTopic: "Cross-linguistic influence and transfer effects"
        },
        {
            question: "Which policy approach aims to promote bilingualism by recognizing two official languages in a country?",
            options: ["A) Monolingualism", "B) Linguistic assimilation", "C) Official bilingualism", "D) Language suppression"],
            correct: "C) Official bilingualism",
            subtopic: "Language Policy and Planning",
            strength: "Awareness of bilingualism in policy contexts",
            weakness: "Limited understanding of language policy implications",
            suggestedTopic: "Language policies (e.g., official bilingualism in Canada, Switzerland)"
        }
    ];

    let answers = new Array(questions.length);

    function loadQuestions() {
        quizContent.innerHTML = questions.map((q, index) => `
            <div class="question">
                <h4>${index + 1}. ${q.question}</h4>
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
                        <p><strong>Suggested Study Topic:</strong> ${q.suggestedTopic}</p>
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
                        <p>You’ve mastered bilingualism concepts with a perfect score—well done! Keep exploring to maintain your expertise.</p>
                    </div>
                `;
                break;
            case 'Excellent':
                encouragement = `
                    <div class="encouragement">
                        <h3>Excellent Work!</h3>
                        <p>Your understanding of bilingualism is outstanding! Continue refining your knowledge for even greater success.</p>
                    </div>
                `;
                break;
            case 'Good':
                encouragement = `
                    <div class="encouragement">
                        <h3>Great Effort!</h3>
                        <p>You’re doing well! Review the areas for improvement to achieve excellence in your bilingualism studies.</p>
                    </div>
                `;
                break;
            case 'Fair':
                encouragement = `
                    <div class="encouragement">
                        <h3>Good Progress!</h3>
                        <p>You’re on the right track! Focus on the suggested topics to strengthen your bilingualism knowledge for your exam.</p>
                    </div>
                `;
                break;
            case 'Needs Improvement':
                encouragement = `
                    <div class="encouragement">
                        <h3>Keep Going!</h3>
                        <p>Don’t be discouraged—every mistake is a learning opportunity! Review the suggested topics, practice regularly, and you’ll improve significantly. We believe in your potential!</p>
                    </div>
                `;
                break;
        }

        reportHtml += encouragement;
        reportContent.innerHTML = reportHtml;
        reportContent.style.display = 'block';
        retryBtn.style.display = 'block';
        submitAllBtn.style.display = 'none';
    }

    retryBtn.addEventListener('click', () => {
        answers = new Array(questions.length);
        reportContent.style.display = 'none';
        retryBtn.style.display = 'none';
        submitAllBtn.style.display = 'block';
        loadQuestions();
    });

    loadQuestions();
});