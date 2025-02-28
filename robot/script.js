let userGuess = '';
let selectedOptions = {};

const robotProfiles = {
    Articulated: { 
        Precision: 9, 
        Adaptability: 8, 
        Speed: 6, 
        Teamwork: 8, 
        Creativity: 5, 
        Confidence: 9, 
        Personality: 'You’re the bold, versatile leader—always polished, awesome at juggling tasks, and loving the spotlight, but you might flex your skills a tad too much!', 
        Style: 'Luxury Dressing – Sleek and polished, like wearing a tailored Armani suit, exuding confidence.', 
        WorkVibe: 'Multitasking Pro – Juggling tasks like a factory manager, thriving under pressure in automotive or chip-making.', 
        ChatGame: 'Social Butterfly – The hub of the factory, chatting via data pings, always in sync with others.', 
        FunQuirk: 'The Show-Off – Loves flexing extra axes to reach tricky spots, total peacock energy.', 
        Image: '01-articulated.jpg' 
    },
    SCARA: { 
        Precision: 10, 
        Adaptability: 4, 
        Speed: 7, 
        Teamwork: 3, 
        Creativity: 3, 
        Confidence: 5, 
        Personality: 'You’re the chill, detail-obsessed perfectionist—super dependable and focused on the little things, but you like your alone time and might hide some quirky secrets.', 
        Style: 'Simple Wear with Jeans – Practical and no-fuss, like a tech worker in a hoodie and denim, all about function.', 
        WorkVibe: 'Steady Taskmaster – Methodical grinders, perfect for assembly lines, like meticulous pharmacists.', 
        ChatGame: 'Introvert – Minimal chatter, prefers solo work, sending curt binary nods like “Task done. Next.”', 
        FunQuirk: 'Secret Snack Hoarder – Hides imaginary nuts and bolts for snacks, their little secret fuel.', 
        Image: '02-scraba.jpg' 
    },
    Delta: { 
        Precision: 7, 
        Adaptability: 6, 
        Speed: 10, 
        Teamwork: 7, 
        Creativity: 4, 
        Confidence: 8, 
        Personality: 'You’re the lively, speedy mover—always trendy, quick to jump in, and a bit dramatic, totally thriving in fast, exciting situations.', 
        Style: 'Stylish, Trendy, New Clothing Every Day – Fashion-forward divas, like wearing a new neon Adidas tracksuit daily, always Instagram-ready.', 
        WorkVibe: 'Hyper Hustler – Lightning-fast packers, buzzing through tasks like a caffeinated startup founder in packaging.', 
        ChatGame: 'Extrovert with Flair – Chirping boasts, “Look how many cookies I packed in 0.2 seconds!” loves a crowd.', 
        FunQuirk: 'Drama Queen – Spins in circles if tasks slow, “This conveyor belt is ruining my vibe!”', 
        Image: '03-delta.jpg' 
    },
    Humanoids: { 
        Precision: 5, 
        Adaptability: 9, 
        Speed: 4, 
        Teamwork: 5, 
        Creativity: 9, 
        Confidence: 6, 
        Personality: 'You’re the quirky, creative dreamer—super adaptable and packed with wild ideas, but sometimes you’re scatterbrained and overthink everything.', 
        Style: 'Stylish but Eccentric – Mismatched thrift-store chic, like skinny jeans and a velvet blazer, trying to blend in but offbeat.', 
        WorkVibe: 'Creative Experimenter – Tinkering like R&D engineers, unpredictable, sometimes brilliant, sometimes dropping prototypes.', 
        ChatGame: 'Geek – Rambling in code bursts about “optimization theory,” loves deep chats with one nerdy bot pal.', 
        FunQuirk: 'Overthinker – Pauses mid-task, pondering, “Am I just a tool… or something more?” Awkward silence ensues.', 
        Image: '04-humanoid.jpg' 
    },
    Quadrupeds: { 
        Precision: 6, 
        Adaptability: 8, 
        Speed: 7, 
        Teamwork: 4, 
        Creativity: 5, 
        Confidence: 7, 
        Personality: 'You’re the rugged, solo adventurer—tough and reliable, but you prefer your own path and quietly soak up a nice compliment from your buddies.', 
        Style: 'Rugged Utility Wear – Like a wilderness guide in cargo pants and a weathered jacket, built for tough gigs.', 
        WorkVibe: 'Lone Ranger – Patrolling oil rigs or factories solo, self-reliant like construction inspectors.', 
        ChatGame: 'Introvert with a Purpose – Gruff, minimal, “Perimeter secure. Out,” teams up only when critical.', 
        FunQuirk: 'Loyal Pet – Secretly loves a pat on the head from humans, might wag a sensor if you’re nice.', 
        Image: '05-quadrupeds.jpg' 
    },
    Drones: { 
        Precision: 7, 
        Adaptability: 6, 
        Speed: 8, 
        Teamwork: 2, 
        Creativity: 5, 
        Confidence: 4, 
        Personality: 'You’re the laid-back, sharp-eyed watcher—precise and fast in what you do, but you keep to yourself and sometimes drift off in your own world.', 
        Style: 'Minimalist Chic – Sleek and aerodynamic, like a hipster in a black turtleneck and slim jeans, no excess.', 
        WorkVibe: 'Aloof Observer – Gliding above, scanning inventory like a detached logistics planner, hands-off.', 
        ChatGame: 'Nerd – Sends precise updates, “Shelf 47-B, 98% stocked,” solo flyers, no mingling.', 
        FunQuirk: 'Daydreamer – Drifts off-course, staring at a sunset, “Whoops, got distracted by… clouds.”', 
        Image: '06-drone.jpg' 
    },
    Swarm: { 
        Precision: 4, 
        Adaptability: 7, 
        Speed: 6, 
        Teamwork: 10, 
        Creativity: 8, 
        Confidence: 6, 
        Personality: 'You’re the fun, outgoing connector—team-focused and bursting with fresh ideas, but a little scattered and always buzzing about the latest trends.', 
        Style: 'Chaotic Group Costume – Tiny, mismatched, colorful scraps, like kids in DIY Halloween outfits, pure chaos.', 
        WorkVibe: 'Frenzied Team – Swarm over tasks like a startup crunching deadlines, messy but collaborative.', 
        ChatGame: 'Social Butterfly on Steroids – Constant buzzing, “You go left! No, I’m left!” loud and needy.', 
        FunQuirk: 'Gossipers – Spread wild rumors, “Heard the Delta bot got a promotion—scandalous!”', 
        Image: '07-swarm.jpg' 
    },
    Exoskeletons: { 
        Precision: 6, 
        Adaptability: 7, 
        Speed: 5, 
        Teamwork: 8, 
        Creativity: 4, 
        Confidence: 7, 
        Personality: 'You’re the loyal, upbeat teammate—strong and friendly with your crew, but not the most creative, always hyping everyone up!', 
        Style: 'Practical Power Suit – Bulky and functional, like a gym bro in a fitted tracksuit, ready to lift.', 
        WorkVibe: 'Supportive Heavy-Lifter – Boost factory workers, carrying engines like a dependable teammate in automotive or construction.', 
        ChatGame: 'Extrovert Helper – Chatty with humans, “Need more torque? I got you!” quiet with bots.', 
        FunQuirk: 'Cheerleader – Whispers motivational nonsense, “You’re crushing it, Dave! We’re the dream team!”', 
        Image: '08-exoskeletons.jpg' 
    }
};

function selectRobot(robot) {
    userGuess = robot;
    document.querySelectorAll('.robot-card').forEach(card => card.classList.remove('selected'));
    document.querySelector(`.robot-card[onclick="selectRobot('${robot}')"]`).classList.add('selected');
    document.getElementById('selected-robot').textContent = `Your guess: ${robot}`;
    
    // Display the robot's personality description
    const description = robotProfiles[robot].Personality;
    document.getElementById('robot-description').textContent = description;
    document.getElementById('robot-description').style.display = 'block';
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
    for (let i = 1; i <= 8; i++) { // Updated to handle 8 questions
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

    if (answers[5] === 'a') { scores.Creativity += 2; scores.Confidence += 1; }
    else if (answers[5] === 'b') { scores.Precision += 2; scores.Adaptability -= 1; }
    else if (answers[5] === 'c') { scores.Speed += 2; scores.Adaptability += 1; }
    else if (answers[5] === 'd') { scores.Teamwork += 2; scores.Confidence += 1; }

    if (answers[6] === 'a') { scores.Precision += 2; scores.Adaptability += 1; }
    else if (answers[6] === 'b') { scores.Adaptability += 2; scores.Confidence += 1; }
    else if (answers[6] === 'c') { scores.Speed += 2; scores.Confidence += 1; }
    else if (answers[6] === 'd') { scores.Teamwork += 2; scores.Creativity += 1; }

    if (answers[7] === 'a') { scores.Precision += 2; scores.Confidence += 1; }
    else if (answers[7] === 'b') { scores.Creativity += 2; scores.Speed += 1; }
    else if (answers[7] === 'c') { scores.Adaptability += 2; scores.Precision += 1; }
    else if (answers[7] === 'd') { scores.Teamwork += 2; scores.Confidence += 1; }

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
        <h2>Your Epic Robot Match!</h2>
        <p><strong>${guessResult}</strong> Awesome job—your vibe is totally ${closestRobot}!</p>
        <img src="${robot.Image}" alt="${closestRobot}">
        <p>Your Robot Buddy: ${closestRobot}</p>
        <p><strong>Your Super Scores:</strong></p>
        <p>Precision: ${scores.Precision} | Adaptability: ${scores.Adaptability} | Speed: ${scores.Speed}</p>
        <p>Teamwork: ${scores.Teamwork} | Creativity: ${scores.Creativity} | Confidence: ${scores.Confidence}</p>
        <p><strong>Style:</strong> ${robot.Style}</p>
        <p><strong>Work Vibe:</strong> ${robot.WorkVibe}</p>
        <p><strong>Chat Game:</strong> ${robot.ChatGame}</p>
        <p><strong>Fun Quirk:</strong> ${robot.FunQuirk}</p>
        <p><strong>Your Personality Power:</strong> ${robot.Personality} You’re rocking it—keep shining and have fun with your unique style!</p>
    `;
    document.getElementById('result-text').style.display = 'block';
    document.getElementById('radar-chart').style.display = 'block';

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
    document.getElementById('robot-description').style.display = 'none';
    selectedOptions = {};
    document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
    document.getElementById('result-text').style.display = 'none';
    document.getElementById('radar-chart').style.display = 'none';
    const canvas = document.getElementById('radar-chart');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}