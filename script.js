const canvas = document.getElementById('graph');
const ctx = canvas.getContext('2d');
const button = document.querySelector('button');

canvas.width = 800;
canvas.height = 400;

let startTime; // Variable to store the start time

function drawGraph(odd) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw x and y axis
    ctx.beginPath();
    ctx.moveTo(50, 0);
    ctx.lineTo(50, canvas.height - 50);
    ctx.lineTo(canvas.width, canvas.height - 50);
    ctx.stroke();
    
    // Draw odd line
    ctx.beginPath();
    ctx.moveTo(50, canvas.height - 50);
    ctx.lineTo(50 + odd * 70, canvas.height - 50 - odd * 70); // Adjust scaling to match the y-axis
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Label x-axis with time in seconds
    if (startTime) {
        const currentTime = ((Date.now() - startTime) / 1000).toFixed(2);
        ctx.font = '12px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText(currentTime, canvas.width - 50, canvas.height - 20);
    }
    
    // Label y-axis with fixed odds to two decimal places
    for (let i = 0; i < 10; i++) {
        ctx.beginPath();
        ctx.arc(50, canvas.height - 50 - i * 35, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'black';
        ctx.fill();
        ctx.font = '12px Arial';
        const oddValue = (i * 0.5).toFixed(2); // Calculate odd value based on y-axis position
        ctx.fillText(oddValue, 15, canvas.height - 50 - i * 35 + 5);
    }
    
}

function simulateOdd() {
    startTime = Date.now(); // Start the timer
    const predeterminedOdd = (Math.random() * (4 - 1) + 1).toFixed(2);
    
    let currentOdd = 0;
    const interval = setInterval(() => {
        currentOdd += 0.01;
        drawGraph(currentOdd);
        
        if (currentOdd >= predeterminedOdd) {
            clearInterval(interval);
            
            // Display determined odd at the center
            ctx.font = 'bold 24px Arial';
            ctx.fillStyle = 'black';
            ctx.fillText(`x: ${predeterminedOdd}`, canvas.width / 2 - 120, canvas.height / 2);
        }
    }, 30);
}
