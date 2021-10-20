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
      this.findNeighbors();
      this.displayParticles();
      this.drawConnections();
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

    drawConnections() {
      this.p5.stroke(150);
      this.p5.strokeWeight(1);
      this.p5.fill(255, 40);
      this.particles.forEach((particle) => {
        if (particle.neighbors.length === 1) {
          this.p5.beginShape(this.p5.LINES);
          this.p5.vertex(particle.x, particle.y);
          this.p5.vertex(particle.neighbors[0].x, particle.neighbors[0].y);
          this.p5.endShape();
        }
        if (particle.neighbors.length >= 2) {
          for (let i = 0; i < particle.neighbors.length; i++) {
            for (let j = 0; j < particle.neighbors.length; j++) {
              const p1 = particle.neighbors[i];
              const p2 = particle.neighbors[j];
              this.p5.beginShape(this.p5.TRIANGLES);
              this.p5.vertex(particle.x, particle.y);
              this.p5.vertex(p1.x, p1.y);
              this.p5.vertex(p2.x, p2.y);
              this.p5.endShape();
            }
          }
        }
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

    calcSquaredDist(p1: Particle, p2: Particle) {
      return (p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y);
    }

    findNeighbors() {
      for (let i = 0; i < this.particles.length; i++) {
        const p1 = this.particles[i];
        p1.clearNeighbors();
        for (let j = i + 1; j < this.particles.length; j++) {
          const p2 = this.particles[j];
          const squaredDist = this.calcSquaredDist(p1, p2);
          if (squaredDist < this.distThreshold * this.distThreshold) {
            p1.addNeighbor(p2);
          }
        }
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
      this.radius = Math.max(this.p5.width / 600, 2);
      this.velX = this.p5.random(-3, 3);
      this.velY = this.p5.random(-3, 3);
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

    clearNeighbors() {
      this.neighbors = [];
    }

    addNeighbor(particle: Particle) {
      this.neighbors.push(particle);
    }

    display() {
      this.p5.noStroke();
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
