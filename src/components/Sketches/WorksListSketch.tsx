import React from 'react';
import Sketch from 'react-p5';
import p5Types from 'p5';
import styled from 'styled-components';

interface Props {
  width: string;
  height: string;
  bgcolor?: string;
  padding?: number;
}

export const WorksListSketch: React.VFC<Props> = ({ width, height, bgcolor = 'black', padding = 5 }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  let particleSystem: ParticleSystem;

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    if (!containerRef.current) {
      return;
    }
    p5.createCanvas(
      containerRef.current.clientWidth - padding * 2,
      containerRef.current.clientHeight - padding * 2,
    ).parent(canvasParentRef);

    particleSystem = new ParticleSystem(p5, 100);
  };

  const windowResized = (p5: p5Types) => {
    if (!containerRef.current) {
      return;
    }
    p5.resizeCanvas(containerRef.current.clientWidth - padding * 2, containerRef.current.clientHeight - padding * 2);
  };

  const mouseClicked = (p5: p5Types) => {
    particleSystem.addParticle(p5.mouseX, p5.mouseY);
  };

  const draw = (p5: p5Types) => {
    p5.background(bgcolor);
    particleSystem.display();
  };

  class ParticleSystem {
    p5: p5Types;
    particles: Particle[];
    distThreshold: number;

    constructor(p5: p5Types, distThreshold: number) {
      this.p5 = p5;
      this.particles = [];
      this.distThreshold = distThreshold;
    }

    display() {
      this.updateParticles();
      this.displayParticles();
    }

    addParticle(x: number, y: number) {
      this.particles.push(new Particle(this.p5, x, y));
    }

    updateParticles() {
      this.particles.forEach((particle) => {
        particle.update();
        this.bounseAtWall(particle);
      });
    }

    displayParticles() {
      this.particles.forEach((particle) => {
        particle.display();
      });
    }

    bounseAtWall(p: Particle) {
      if (p.radius <= p.x && p.x <= this.p5.width - p.radius && p.radius <= p.y && p.y <= this.p5.height - p.radius) {
        return;
      }
      if (p.x - p.radius < 0) {
        p.x += 2 * (p.radius - p.x);
        p.velX *= -1;
      }
      if (p.x + p.radius > this.p5.width) {
        p.x -= 2 * (p.radius + p.x - this.p5.width);
        p.velX *= -1;
      }
      if (p.y - p.radius < 0) {
        p.y += 2 * (p.radius - p.y);
        p.velY *= -1;
      }
      if (p.y + p.radius > this.p5.height) {
        p.y -= 2 * (p.radius + p.y - this.p5.height);
        p.velY *= -1;
      }
    }
  }

  class Particle {
    p5: p5Types;
    x: number;
    y: number;
    velX: number;
    velY: number;
    accX: number;
    accY: number;
    radius: number;
    mass: number;
    neighbors: Particle[];

    constructor(p5: p5Types, x: number, y: number) {
      this.p5 = p5;
      this.x = x;
      this.y = y;
      this.radius = (this.p5.random(1, 3) * this.p5.width) / 600;
      this.velX = this.p5.random(-5, 5);
      this.velY = this.p5.random(-5, 5);
      this.accX = 0;
      this.accY = 0;
      this.mass = this.radius * this.radius;
      this.neighbors = [];
    }

    update() {
      this.x += this.velX;
      this.y += this.velY;
      this.velX += this.accX;
      this.velY += this.accY;
    }

    addNeighbor(particle: Particle) {
      this.neighbors.push(particle);
    }

    display() {
      this.p5.fill(255);
      this.p5.ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
    }
  }

  return (
    <StyledContainer canvasWidth={width} canvasHeight={height} bgcolor={bgcolor} padding={padding} ref={containerRef}>
      <Sketch setup={setup} draw={draw} windowResized={windowResized} mouseClicked={mouseClicked} />
    </StyledContainer>
  );
};

interface StyledContainerProps {
  canvasWidth: string;
  canvasHeight: string;
  bgcolor: string;
  padding: number;
}

const StyledContainer = styled.div<StyledContainerProps>`
  width: ${({ canvasWidth, padding }) => `calc(${canvasWidth} - ${padding * 2}px)`};
  height: ${({ canvasHeight, padding }) => `calc(${canvasHeight} - ${padding * 2}px)`};
  padding: ${({ padding }) => `${padding}px`};
  background-color: ${({ bgcolor }) => bgcolor};
`;
