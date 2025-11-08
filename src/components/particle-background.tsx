"use client";

import { useEffect, useRef } from "react";

interface Mouse {
  x: number | null;
  y: number | null;
  radius: number;
}

class Particle {
  x: number;
  y: number;
  directionX: number;
  directionY: number;
  size: number;
  color: string;
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  mouse: Mouse;

  constructor(
    x: number,
    y: number,
    directionX: number,
    directionY: number,
    size: number,
    color: string,
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    mouse: Mouse
  ) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
    this.ctx = ctx;
    this.canvas = canvas;
    this.mouse = mouse;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }

  update() {
    if (this.x > this.canvas.width || this.x < 0) {
      this.directionX = -this.directionX;
    }
    if (this.y > this.canvas.height || this.y < 0) {
      this.directionY = -this.directionY;
    }

    // Collision detection with mouse
    if (this.mouse.x !== null && this.mouse.y !== null) {
      const dx = this.mouse.x - this.x;
      const dy = this.mouse.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < this.mouse.radius + this.size) {
        if (this.mouse.x < this.x && this.x < this.canvas.width - this.size * 10) {
          this.x += 5;
        }
        if (this.mouse.x > this.x && this.x > this.size * 10) {
          this.x -= 5;
        }
        if (this.mouse.y < this.y && this.y < this.canvas.height - this.size * 10) {
          this.y += 5;
        }
        if (this.mouse.y > this.y && this.y > this.size * 10) {
          this.y -= 5;
        }
      }
    }

    this.x += this.directionX;
    this.y += this.directionY;
    this.draw();
  }
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<Mouse>({ x: null, y: null, radius: 0 });
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      mouseRef.current.radius = (canvas.height / 100) * (canvas.width / 100);
    };

    setCanvasSize();

    // Mouse position tracking
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = event.x;
      mouseRef.current.y = event.y;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Initialize particles
    const init = () => {
      particlesRef.current = [];
      const numberOfParticles = (canvas.height * canvas.width) / 9000;
      const isDarkMode = document.documentElement.classList.contains("dark");

      for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 2 + 1;
        const x = Math.random() * ((canvas.width - size * 2) - size * 2) + size * 2;
        const y = Math.random() * ((canvas.height - size * 2) - size * 2) + size * 2;
        const directionX = (Math.random() * 0.4) - 0.2;
        const directionY = (Math.random() * 0.4) - 0.2;
        const color = isDarkMode ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.4)";

        particlesRef.current.push(
          new Particle(x, y, directionX, directionY, size, color, ctx, canvas, mouseRef.current)
        );
      }
    };

    // Connect particles with lines
    const connect = () => {
      if (!ctx || !canvas) return;
      const isDarkMode = document.documentElement.classList.contains("dark");

      for (let a = 0; a < particlesRef.current.length; a++) {
        for (let b = a; b < particlesRef.current.length; b++) {
          const distance =
            (particlesRef.current[a].x - particlesRef.current[b].x) *
              (particlesRef.current[a].x - particlesRef.current[b].x) +
            (particlesRef.current[a].y - particlesRef.current[b].y) *
              (particlesRef.current[a].y - particlesRef.current[b].y);

          if (distance < (canvas.width / 7) * (canvas.height / 7)) {
            const opacityValue = 1 - distance / 20000;
            const color = isDarkMode
              ? `rgba(147, 197, 253, ${opacityValue})`
              : `rgba(79, 70, 229, ${opacityValue})`;
            ctx.strokeStyle = color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesRef.current[a].x, particlesRef.current[a].y);
            ctx.lineTo(particlesRef.current[b].x, particlesRef.current[b].y);
            ctx.stroke();
          }
        }
      }
    };

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;
      animationFrameRef.current = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particlesRef.current.length; i++) {
        particlesRef.current[i].update();
      }
      connect();
    };

    // Handle resize
    const handleResize = () => {
      setCanvasSize();
      init();
    };

    window.addEventListener("resize", handleResize);

    // Initialize and start animation
    init();
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ background: "transparent" }}
    />
  );
}

