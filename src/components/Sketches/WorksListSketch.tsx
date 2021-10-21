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

  /**
   * basicMovementTypeは、マウスによってParticleがドラッグされていないときの挙動のタイプ を表す。
   * Inertia: 物理法則にしたがう
   *  Static: 動かない
   */
  type BasicMovementType = 'Inertia' | 'Static';

  /**
   * dragMovementTypeは、マウスによってParticleがドラッグされているときの挙動のタイプ を表す。
   * Pos-Vel: 位置と速度を変化させられる(ドラッグ状態でなくなると、その時の速度がParticleに与えられる)
   *     Pos: 位置のみを変化させられる(ドラッグ状態でなくなると、速度はドラッグされる前のものになる)
   *    None: ドラッグによって動かすことはできず、ドラッグしていない時と同様の挙動をする
   */
  type DragMovementType = 'Pos-Vel' | 'Pos' | 'None';

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
    for (let i = 0; i < 15; i++) {
      const x = p5.random(10, p5.width - 10);
      const y = p5.random(10, p5.height - 10);
      const velX = p5.random(-2, 2);
      const velY = p5.random(-2, 2);
      particleSystem.addParticle(x, y, 30, velX, velY, 'Inertia', 'None');
    }
  };

  const windowResized = (p5: p5Types) => {
    if (!containerRef.current) {
      return;
    }
    p5.resizeCanvas(containerRef.current.clientWidth - padding * 2, containerRef.current.clientHeight - padding * 2);
  };

  const draw = (p5: p5Types) => {
    p5.background(bgcolor);
    particleSystem.display();
  };

  const mousePressed = () => {
    particleSystem.catchParticles();
  };

  const mouseReleased = () => {
    particleSystem.releaseParticles();
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

    addParticle(
      x: number,
      y: number,
      r: number,
      velX = 0,
      velY = 0,
      basicMovementType: BasicMovementType = 'Inertia',
      dragMovementType: DragMovementType = 'None',
    ) {
      this.particles.push(new Particle(this.p5, x, y, r, velX, velY, basicMovementType, dragMovementType));
    }

    updateParticles() {
      this.particles.forEach((particle) => {
        particle.update();
        particle.bounseAtWall();
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

    calcSquaredDist(x1: number, y1: number, x2: number, y2: number) {
      return (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
    }

    findNeighbors() {
      for (let i = 0; i < this.particles.length; i++) {
        const p1 = this.particles[i];
        p1.clearNeighbors();
        for (let j = i + 1; j < this.particles.length; j++) {
          const p2 = this.particles[j];
          const squaredDist = this.calcSquaredDist(p1.x, p1.y, p2.x, p2.y);
          if (squaredDist < this.distThreshold * this.distThreshold) {
            p1.addNeighbor(p2);
          }
        }
      }
    }

    catchParticles() {
      this.particles.forEach((particle) => {
        if (
          this.calcSquaredDist(this.p5.mouseX, this.p5.mouseY, particle.x, particle.y) <
          particle.radius * particle.radius
        ) {
          particle.catch(this.p5.mouseX, this.p5.mouseY);
        }
      });
    }

    releaseParticles() {
      this.particles.forEach((particle) => {
        particle.release();
      });
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
    basicMovementType: BasicMovementType;
    dragMovementType: DragMovementType;
    isDragged: boolean;
    dragOffsetX: number;
    dragOffsetY: number;

    constructor(
      p5: p5Types,
      x: number,
      y: number,
      r: number,
      velX: number,
      velY: number,
      basicMovementType: BasicMovementType,
      dragMovementType: DragMovementType,
    ) {
      this.p5 = p5;
      this.x = x;
      this.y = y;
      this.radius = r;
      this.velX = velX;
      this.velY = velY;
      this.accX = 0;
      this.accY = 0;
      this.mass = this.radius * this.radius;
      this.neighbors = [];
      this.basicMovementType = basicMovementType;
      this.dragMovementType = dragMovementType;
      this.isDragged = false;
      this.dragOffsetX = 0;
      this.dragOffsetY = 0;
    }

    update() {
      if (this.isDragged) {
        this.dragUpdate();
      } else {
        this.basicUpdate();
      }
    }

    basicUpdate() {
      if (this.basicMovementType === 'Inertia') {
        this.x += this.velX;
        this.y += this.velY;
        this.velX += this.accX;
        this.velY += this.accY;
      } else {
        this.velX = 0;
        this.velY = 0;
      }
    }

    dragUpdate() {
      if (this.dragMovementType === 'None') {
        this.basicUpdate();
        return;
      }
      const newX = this.p5.mouseX - this.dragOffsetX;
      const newY = this.p5.mouseY - this.dragOffsetY;
      if (this.dragMovementType === 'Pos-Vel') {
        this.velX = newX - this.x;
        this.velY = newY - this.y;
      }
      this.x = newX;
      this.y = newY;
    }

    bounseAtWall() {
      if (
        this.radius <= this.x &&
        this.x <= this.p5.width - this.radius &&
        this.radius <= this.y &&
        this.y <= this.p5.height - this.radius
      ) {
        return;
      }
      if (this.isDragged) {
        this.release();
      }

      if (this.basicMovementType === 'Static') {
        if (this.x - this.radius < 0) {
          this.x = this.radius;
        }
        if (this.x + this.radius > this.p5.width) {
          this.x = this.p5.width - this.radius;
        }
        if (this.y - this.radius < 0) {
          this.y = this.radius;
        }
        if (this.y + this.radius > this.p5.height) {
          this.y = this.p5.height - this.radius;
        }
      } else {
        if (this.x - this.radius < 0) {
          this.x += 2 * (this.radius - this.x);
          this.velX *= -1;
        }
        if (this.x + this.radius > this.p5.width) {
          this.x -= 2 * (this.radius + this.x - this.p5.width);
          this.velX *= -1;
        }
        if (this.y - this.radius < 0) {
          this.y += 2 * (this.radius - this.y);
          this.velY *= -1;
        }
        if (this.y + this.radius > this.p5.height) {
          this.y -= 2 * (this.radius + this.y - this.p5.height);
          this.velY *= -1;
        }
      }
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

    catch(x: number, y: number) {
      this.isDragged = true;
      this.dragOffsetX = x - this.x;
      this.dragOffsetY = y - this.y;
    }

    release() {
      this.isDragged = false;
      this.dragOffsetX = 0;
      this.dragOffsetY = 0;
    }
  }

  return (
    <StyledContainer canvasWidth={width} canvasHeight={height} bgcolor={bgcolor} padding={padding} ref={containerRef}>
      <Sketch
        setup={setup}
        draw={draw}
        windowResized={windowResized}
        mousePressed={mousePressed}
        mouseReleased={mouseReleased}
      />
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
