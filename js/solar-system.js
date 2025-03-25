// 太阳系动画
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('solarCanvas');
    const ctx = canvas.getContext('2d');
    
    // 设置画布尺寸
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // 行星数据
    const planets = [
        { name: 'Sun', radius: 30, distance: 0, speed: 0, color: '#FFD700', angle: 0 },
        { name: 'Mercury', radius: 5, distance: 60, speed: 0.02, color: '#A9A9A9', angle: Math.random() * Math.PI * 2 },
        { name: 'Venus', radius: 9, distance: 90, speed: 0.015, color: '#FFA07A', angle: Math.random() * Math.PI * 2 },
        { name: 'Earth', radius: 10, distance: 130, speed: 0.01, color: '#1E90FF', angle: Math.random() * Math.PI * 2 },
        { name: 'Mars', radius: 7, distance: 170, speed: 0.008, color: '#FF6347', angle: Math.random() * Math.PI * 2 },
        { name: 'Jupiter', radius: 20, distance: 230, speed: 0.005, color: '#F4A460', angle: Math.random() * Math.PI * 2 },
        { name: 'Saturn', radius: 18, distance: 290, speed: 0.003, color: '#DAA520', angle: Math.random() * Math.PI * 2, hasRing: true },
        { name: 'Uranus', radius: 14, distance: 350, speed: 0.002, color: '#AFEEEE', angle: Math.random() * Math.PI * 2 },
        { name: 'Neptune', radius: 13, distance: 410, speed: 0.001, color: '#4682B4', angle: Math.random() * Math.PI * 2 }
    ];
    
    // 星星数据
    const stars = [];
    for (let i = 0; i < 200; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5,
            alpha: Math.random() * 0.8 + 0.2,
            speed: Math.random() * 0.2
        });
    }
    
    // 动画函数
    function animate() {
        // 清除画布
        ctx.fillStyle = 'rgba(10, 10, 30, 0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // 绘制星星
        drawStars();
        
        // 计算中心点 (稍微偏左上方)
        const centerX = canvas.width * 0.4;
        const centerY = canvas.height * 0.4;
        
        // 绘制行星
        planets.forEach(planet => {
            // 更新行星角度
            planet.angle += planet.speed;
            
            // 计算行星位置
            const planetX = centerX + Math.cos(planet.angle) * planet.distance;
            const planetY = centerY + Math.sin(planet.angle) * planet.distance;
            
            // 绘制轨道
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(100, 100, 150, 0.2)';
            ctx.arc(centerX, centerY, planet.distance, 0, Math.PI * 2);
            ctx.stroke();
            
            // 绘制行星
            ctx.beginPath();
            ctx.fillStyle = planet.color;
            ctx.arc(planetX, planetY, planet.radius, 0, Math.PI * 2);
            ctx.fill();
            
            // 土星环
            if (planet.hasRing) {
                ctx.beginPath();
                ctx.strokeStyle = 'rgba(218, 165, 32, 0.7)';
                ctx.lineWidth = 4;
                ctx.ellipse(planetX, planetY, planet.radius * 2, planet.radius * 0.7, 0, 0, Math.PI * 2);
                ctx.stroke();
            }
            
            // 太阳光晕
            if (planet.name === 'Sun') {
                const gradient = ctx.createRadialGradient(planetX, planetY, 0, planetX, planetY, planet.radius * 3);
                gradient.addColorStop(0, 'rgba(255, 215, 0, 0.8)');
                gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
                
                ctx.beginPath();
                ctx.fillStyle = gradient;
                ctx.arc(planetX, planetY, planet.radius * 3, 0, Math.PI * 2);
                ctx.fill();
            }
        });
        
        requestAnimationFrame(animate);
    }
    
    // 绘制星星
    function drawStars() {
        stars.forEach(star => {
            // 更新星星位置 (模拟视差效果)
            star.y += star.speed;
            if (star.y > canvas.height) {
                star.y = 0;
                star.x = Math.random() * canvas.width;
            }
            
            // 绘制星星
            ctx.beginPath();
            ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fill();
        });
    }
    
    // 启动动画
    animate();
});