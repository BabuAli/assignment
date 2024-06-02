import { useRef, useEffect } from 'react';
import Head from 'next/head';

const CanvasAnimationPage = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) {
            console.error("Canvas element not found");
            return;
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) {
            console.error("Failed to get canvas context");
            return;
        }

        console.log("Canvas and context successfully obtained");

        const particles: Particle[] = [];
        const numParticles = 100;

        class Particle {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 5 + 1;
                this.speedX = Math.random() * 3 - 1.5;
                this.speedY = Math.random() * 3 - 1.5;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.size > 0.2) this.size -= 0.1;
            }
            draw() {
                ctx.fillStyle = 'white';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }
        }

        const init = () => {
            for (let i = 0; i < numParticles; i++) {
                particles.push(new Particle());
            }
        };

        const handleParticles = () => {
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = 'white';
                        ctx.lineWidth = 0.2;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                        ctx.closePath();
                    }
                }
                if (particles[i].size <= 0.2) {
                    particles.splice(i, 1);
                    particles.push(new Particle()); // Replenish particle
                    i--;
                }
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            handleParticles();
            requestAnimationFrame(animate);
        };

        init();
        animate();
    }, []);

    return (
        <>
            <Head>
                <title>Canvas Animation</title>
            </Head>
            <div className="flex justify-center items-center h-screen bg-black">
                <canvas ref={canvasRef} width={800} height={600} className="border" />
            </div>
        </>
    );
};

export default CanvasAnimationPage;
