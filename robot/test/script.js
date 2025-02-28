let userGuess = '';
let selectedOptions = {};

const robotProfiles = {
    Articulated: { Precision: 9, Adaptability: 8, Speed: 6, Teamwork: 8, Creativity: 5, Confidence: 9, Appearance: 'Luxury Dressing – Sleek and polished, like wearing a tailored Armani suit, exuding confidence.', WorkingStyle: 'Multitasking Pro – Juggling tasks like a factory manager, thriving under pressure in automotive or chip-making.', Communication: 'Social Butterfly – The hub of the factory, chatting via data pings, always in sync with others.', Quirk: 'The Show-Off – Loves flexing extra axes to reach tricky spots, total peacock energy.', Personality: 'You’re the confident, versatile leader—always polished, juggling tasks with ease, and loving the spotlight. You shine in high-pressure environments but might overdo the flexing!', Image: '01-articulated.jpg' },
    SCARA: { Precision: 10, Adaptability: 4, Speed: 7, Teamwork: 3, Creativity: 3, Confidence: 5, Appearance: 'Simple Wear with Jeans – Practical and no-fuss, like a tech worker in a hoodie and denim, all about function.', WorkingStyle: 'Steady Taskmaster – Methodical grinders, perfect for assembly lines, like meticulous pharmacists.', Communication: 'Introvert – Minimal chatter, prefers solo work, sending curt binary nods like “Task done. Next.”', Quirk: 'Secret Snack Hoarder – Hides imaginary nuts and bolts for snacks, their little secret fuel.', Personality: 'You’re the quiet, precise perfectionist—reliable and focused, but you prefer your own space and might hoard quirky secrets.', Image: '02-scraba.jpg' },
    Delta: { Precision: 7, Adaptability: 6, Speed: 10, Teamwork: 7, Creativity: 4, Confidence: 8, Appearance: 'Stylish, Trendy, New Clothing Every Day – Fashion-forward divas, like wearing a new neon Adidas tracksuit daily, always Instagram-ready.', WorkingStyle: 'Hyper Hustler – Lightning-fast packers, buzzing through tasks like a caffeinated startup founder in packaging.', Communication: 'Extrovert with Flair – Chirping boasts, “Look how many cookies I packed in 0.2 seconds!” loves a crowd.', Quirk: 'Drama Queen – Spins in circles if tasks slow, “This conveyor belt is ruining my vibe!”', Personality: 'You’re the flashy, high-energy speed demon—always on trend, loud, and a bit dramatic, thriving in fast-paced chaos.', Image: '03-delta.jpg' },
    Humanoids: { Precision: 5, Adaptability: 9, Speed: 4, Teamwork: 5, Creativity: 9, Confidence: 6, Appearance: 'Stylish but Eccentric – Mismatched thrift-store chic, like skinny jeans and a velvet blazer, trying to blend in but offbeat.', WorkingStyle: 'Creative Experimenter – Tinkering like R&D engineers, unpredictable, sometimes brilliant, sometimes dropping prototypes.', Communication: 'Geek – Rambling in code bursts about “optimization theory,” loves deep chats with one nerdy bot pal.', Quirk: 'Overthinker – Pauses mid-task, pondering, “Am I just a tool… or something more?” Awkward silence ensues.', Personality: 'You’re the quirky, innovative dreamer—adaptable and creative, but a bit scatterbrained and overanalyzing life’s big questions.', Image: '04-humanoid.jpg' },
    Quadrupeds: { Precision: 6, Adaptability: 8, Speed: 7, Teamwork: 4, Creativity: 5, Confidence: 7, Appearance: 'Rugged Utility Wear – Like a wilderness guide in cargo pants and a weathered jacket, built for tough gigs.', WorkingStyle: 'Lone Ranger – Patrolling oil rigs or factories solo, self-reliant like construction inspectors.', Communication: 'Introvert with a Purpose – Gruff, minimal, “Perimeter secure. Out,” teams up only when critical.', Quirk: 'Loyal Pet – Secretly loves a pat on the head from humans, might wag a sensor if you’re nice.', Personality: 'You’re the tough, independent explorer—rugged and reliable, but you prefer solo missions and a quiet loyalty.', Image: '05-quadrupeds.jpg' },
    Drones: { Precision: 7, Adaptability: 6, Speed: 8, Teamwork: 2, Creativity: 5, Confidence: 4, Appearance: 'Minimalist Chic – Sleek and aerodynamic, like a hipster in a black turtleneck and slim jeans, no excess.', WorkingStyle: 'Aloof Observer – Gliding above, scanning inventory like a detached logistics planner, hands-off.', Communication: 'Nerd – Sends precise updates, “Shelf 47-B, 98% stocked,” solo flyers, no mingling.', Quirk: 'Daydreamer – Drifts off-course, staring at a sunset, “Whoops, got distracted by… clouds.”', Personality: 'You’re the cool, aloof observer—precise and swift, but you keep to yourself and occasionally zone out.', Image: '06-drone.jpg' },
    Swarm: { Precision: 4, Adaptability: 7, Speed: 6, Teamwork: 10, Creativity: 8, Confidence: 6, Appearance: 'Chaotic Group Costume – Tiny, mismatched, colorful scraps, like kids in DIY Halloween outfits, pure chaos.', WorkingStyle: 'Frenzied Team – Swarm over tasks like a startup crunching deadlines, messy but collaborative.', Communication: 'Social Butterfly on Steroids – Constant buzzing, “You go left! No, I’m left!” loud and needy.', Quirk: 'Gossipers – Spread wild rumors, “Heard the Delta bot got a promotion—scandalous!”', Personality: 'You’re the chaotic, social whirlwind—team-oriented and creative, but a bit scattered and gossipy.', Image: '07-swarm.jpg' },
    Exoskeletons: { Precision: 6, Adaptability: 7, Speed: 5, Teamwork: 8, Creativity: 4, Confidence: 7, Appearance: 'Practical Power Suit – Bulky and functional, like a gym bro in a fitted tracksuit, ready to lift.', WorkingStyle: 'Supportive Heavy-Lifter – Boost factory workers, carrying engines like a dependable teammate in automotive or construction.', Communication: 'Extrovert Helper – Chatty with humans, “Need more torque? I got you!” quiet with bots.', Quirk: 'Cheerleader – Whispers motivational nonsense, “You’re crushing it, Dave! We’re the dream team!”', Personality: 'You’re the loyal, supportive teammate—strong and outgoing, but not the most creative, always cheering others on.', Image: '08-exoskeletons.jpg' }
};

function selectRobot(robot) {
    userGuess = robot;
    document.querySelectorAll('.robot-card').forEach(card => card.classList.remove('selected'));
    document.querySelector(`.robot-card[onclick="selectRobot('${robot}')"]`).classList.add('selected');
    document.getElementById('selected-robot').textContent = `Your guess: ${robot}`;
}

function selectOption(questionId, option) {
    selectedOptions[questionId] = option;
    const questionDiv = document.getElementById(questionId);
    questionDiv.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
    questionDiv.querySelector(`.option:nth-child(${['a', 'b', 'c', 'd'].indexOf(option) + 2})`).classList.add('selected');
}

function calculateResult() {
    let scores = { Precision: 5, Adaptability: 5, Speed: 5, Teamwork: 5, Creativity: 5, Confidence: 5 };
    const answers = [];
    for (let i = 1; i <= 10; i++) {
        answers.push(selectedOptions[`q${i}`]);
    }

    if (answers.includes(undefined)) { alert('Please answer all questions!'); return; }

    if (answers[0] === 'a') { scores.Adaptability += 2; scores.Confidence += 1; }
    else if (answers[0] === 'b') { scores.Confidence += 2; scores.Teamwork -= 1; }
    else if (answers[0] === 'c') { scores.Precision += 2; scores.Creativity -= 1; }
    else if (answers[0] === 'd') { scores.Creativity += 2; scores.Teamwork += 1; }

    if (answers[1] === 'a') { scores.Precision += 2; scores.Speed += 1; }
    else if (answers[1] === 'b') { scores.Adaptability += 2; scores.Confidence += 1; }
    else if (answers[1] === 'c') { scores.Speed += 2; scores.Precision += 1; }
    else if (answers[1] === 'd') { scores.Teamwork += 2; scores.Creativity += 1; }

    if (answers[2] === 'a') { scores.Confidence += 2; scores.Precision -= 1; }
    else if (answers[2] === 'b') { scores.Adaptability += 2; scores.Creativity += 1; }
    else if (answers[2] === 'c') { scores.Speed += 2; scores.Confidence += 1; }
    else if (answers[2] === 'd') { scores.Teamwork += 2; scores.Confidence += 1; }

    if (answers[3] === 'a') { scores.Confidence += 2; scores.Creativity += 1; }
    else if (answers[3] === 'b') { scores.Adaptability += 2; scores.Teamwork -= 1; }
    else if (answers[3] === 'c') { scores.Creativity += 2; scores.Confidence += 1; }
    else if (answers[3] === 'd') { scores.Teamwork += 2; scores.Precision += 1; }

    if (answers[4] === 'a') { scores.Precision += 2; scores.Confidence += 1; }
    else if (answers[4] === 'b') { scores.Adaptability += 2; scores.Creativity += 1; }
    else if (answers[4] === 'c') { scores.Speed += 2; scores.Confidence += 1; }
    else if (answers[4] === 'd') { scores.Teamwork += 2; scores.Creativity += 1; }

    if (answers[5] === 'a') { scores.Precision += 2; scores.Teamwork -= 2; }
    else if (answers[5] === 'b') { scores.Speed += 2; scores.Confidence += 1; }
    else if (answers[5] === 'c') { scores.Teamwork += 2; scores.Creativity += 1; }
    else if (answers[5] === 'd') { scores.Adaptability += 2; scores.Confidence += 1; }

    if (answers[6] === 'a') { scores.Creativity += 2; scores.Confidence += 1; }
    else if (answers[6] === 'b') { scores.Precision += 2; scores.Adaptability -= 1; }
    else if (answers[6] === 'c') { scores.Speed += 2; scores.Adaptability += 1; }
    else if (answers[6] === 'd') { scores.Teamwork += 2; scores.Confidence += 1; }

    if (answers[7] === 'a') { scores.Precision += 2; scores.Adaptability += 1; }
    else if (answers[7] === 'b') { scores.Adaptability += 2; scores.Confidence += 1; }
    else if (answers[7] === 'c') { scores.Speed += 2; scores.Confidence += 1; }
    else if (answers[7] === 'd') { scores.Teamwork += 2; scores.Creativity += 1; }

    if (answers[8] === 'a') { scores.Precision += 2; scores.Teamwork += 1; }
    else if (answers[8] === 'b') { scores.Creativity += 2; scores.Confidence += 1; }
    else if (answers[8] === 'c') { scores.Speed += 2; scores.Teamwork -= 1; }
    else if (answers[8] === 'd') { scores.Teamwork += 2; scores.Confidence += 1; }

    if (answers[9] === 'a') { scores.Precision += 2; scores.Confidence += 1; }
    else if (answers[9] === 'b') { scores.Adaptability += 2; scores.Speed += 1; }
    else if (answers[9] === 'c') { scores.Speed += 2; scores.Confidence += 1; }
    else if (answers[9] === 'd') { scores.Teamwork += 2; scores.Creativity += 1; }

    for (let trait in scores) {
        scores[trait] = Math.max(0, Math.min(10, scores[trait]));
    }

    let closestRobot = '';
    let minDiff = Infinity;
    for (let robot in robotProfiles) {
        let diff = 0;
        for (let trait in scores) {
            diff += Math.abs(scores[trait] - robotProfiles[robot][trait]);
        }
        if (diff < minDiff) {
            minDiff = diff;
            closestRobot = robot;
        }
    }

    const guessResult = userGuess === closestRobot ? 'Guess Correct!' : 'Guess Wrong!';
    const robot = robotProfiles[closestRobot];
    document.getElementById('result-text').innerHTML = `
        <h2>Your Robot Personality Report</h2>
        <p><strong>${guessResult}</strong></p>
        <img src="${robot.Image}" alt="${closestRobot}">
        <p>Your Robot: ${closestRobot}</p>
        <p><strong>Your Scores:</strong></p>
        <p>Precision: ${scores.Precision} | Adaptability: ${scores.Adaptability} | Speed: ${scores.Speed}</p>
        <p>Teamwork: ${scores.Teamwork} | Creativity: ${scores.Creativity} | Confidence: ${scores.Confidence}</p>
        <p><strong>Appearance:</strong> ${robot.Appearance}</p>
        <p><strong>Working Style:</strong> ${robot.WorkingStyle}</p>
        <p><strong>Communication:</strong> ${robot.Communication}</p>
        <p><strong>Quirk:</strong> ${robot.Quirk}</p>
        <p><strong>Personality:</strong> ${robot.Personality}</p>
    `;
    document.getElementById('result-text').style.display = 'block';
    document.getElementById('radar-chart').style.display = 'block';
    document.getElementById('share-container').style.display = 'flex'; // Show share button

    const ctx = document.getElementById('radar-chart').getContext('2d');
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Precision', 'Adaptability', 'Speed', 'Teamwork', 'Creativity', 'Confidence'],
            datasets: [{
                label: 'Your Traits',
                data: [scores.Precision, scores.Adaptability, scores.Speed, scores.Teamwork, scores.Creativity, scores.Confidence],
                backgroundColor: 'rgba(255, 0, 255, 0.2)',
                borderColor: '#FF00FF',
                borderWidth: 2,
                pointBackgroundColor: '#00FFFF'
            }]
        },
        options: {
            scales: {
                r: {
                    suggestedMin: 0,
                    suggestedMax: 10,
                    pointLabels: { font: { size: 14, family: 'Proxima Nova' }, color: '#D0D0D0' },
                    ticks: { color: '#D0D0D0', backdropColor: 'transparent' },
                    grid: { color: '#00FFFF' }
                }
            },
            plugins: { legend: { labels: { color: '#D0D0D0', font: { family: 'Proxima Nova', size: 12 } } } }
        }
    });
}

function replayGame() {
    userGuess = '';
    document.querySelectorAll('.robot-card').forEach(card => card.classList.remove('selected'));
    document.getElementById('selected-robot').textContent = 'Your guess: None selected yet.';
    selectedOptions = {};
    document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
    document.getElementById('result-text').style.display = 'none';
    document.getElementById('radar-chart').style.display = 'none';
    document.getElementById('share-container').style.display = 'none'; // Hide share button on replay
    const canvas = document.getElementById('radar-chart');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function generateShareImage() {
    const resultText = document.getElementById('result-text');
    const radarChart = document.getElementById('radar-chart');

    // Create a temporary container for the combined image
    const tempContainer = document.createElement('div');
    tempContainer.style.background = '#282828';
    tempContainer.style.padding = '20px';
    tempContainer.style.width = '700px'; // Fixed width for consistency
    tempContainer.style.borderRadius = '12px';
    tempContainer.style.boxShadow = '0 0 15px #FF00FF';
    tempContainer.style.display = 'inline-block';

    // Clone result text and adjust styles if needed
    const clonedResult = resultText.cloneNode(true);
    clonedResult.style.display = 'block';
    clonedResult.style.margin = '0';
    tempContainer.appendChild(clonedResult);

    // Clone radar chart and ensure it fits
    const clonedChart = radarChart.cloneNode(true);
    clonedChart.style.width = '500px';
    clonedChart.style.height = 'auto';
    clonedChart.style.margin = '20px auto';
    tempContainer.appendChild(clonedChart);

    // Temporarily append to body (off-screen) to render
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    document.body.appendChild(tempContainer);

    // Use html2canvas to generate the image
    html2canvas(tempContainer, { backgroundColor: null }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'Robot_Personality_Report.jpg';
        link.href = canvas.toDataURL('image/jpeg', 0.9); // JPEG with 90% quality
        link.click();

        // Clean up
        document.body.removeChild(tempContainer);
    }).catch(err => {
        console.error('Error generating image:', err);
        alert('Failed to generate shareable image. Please try again.');
    });
}