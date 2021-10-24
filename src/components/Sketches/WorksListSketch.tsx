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

export const WorksListSketch = React.memo<Props>(({ width, height, bgcolor = 'black', padding = 5 }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  // modern Chrome requires { passive: false } when adding event
  let supportsPassive = false;
  try {
    window.addEventListener(
      'test',
      () => null,
      Object.defineProperty({}, 'passive', {
        get: function () {
          supportsPassive = true;
        },
      }),
    );
  } catch (e) {}

  const wheelOpt: boolean | AddEventListenerOptions = supportsPassive ? { passive: false } : false;
  const preventDefault = (e: TouchEvent) => e.preventDefault();

  /**
   * basicMovementTypeは、マウスによってParticleがドラッグされていないときの挙動のタイプ を表す。
   * Inertia: 物理法則にしたがう → dragMovementTypeはNoneかPos-Velを想定
   *  Static: 動かない → dragMovementTypeはNoneかPosを想定
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
  let particleSystem2: ParticleSystem;
  let obstacleSystem: ParticleSystem;

  const particleColor = 'rgba(255,255,255,0)';
  const particleStrokeColor = 'rgba(120,120,120,0.05)';
  const particleTriangleColor = 'rgba(255,255,255,0.03)';

  const particleColor2 = 'rgba(255,255,255,0)';
  const particleStrokeColor2 = 'rgba(255,100,100,0.05)';
  const particleTriangleColor2 = 'rgba(255,100,100,0.03)';

  const obstacleColor = 'rgba(255,255,255,1)';
  const obstacleStrokeColor = 'rgba(255,255,255,1)';
  const obstacleTriangleColor = 'rgba(220,220,220,0.4)';

  const selectColor = 'rgba(255,100,100,1)';

  const calcSquaredDist = (x1: number, y1: number, x2: number, y2: number) =>
    (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    if (!containerRef.current) {
      return;
    }
    p5.createCanvas(
      containerRef.current.clientWidth - padding * 2,
      containerRef.current.clientHeight - padding * 2,
    ).parent(canvasParentRef);

    particleSystem = new ParticleSystem(p5, particleStrokeColor, particleTriangleColor, 180, 2);
    particleSystem2 = new ParticleSystem(p5, particleStrokeColor2, particleTriangleColor2, 180, 2);
    obstacleSystem = new ParticleSystem(p5, obstacleStrokeColor, obstacleTriangleColor, 300, 15);
    for (let i = 0; i < 150; i++) {
      const x = p5.random(10, p5.width - 10);
      const y = p5.random(10, p5.height - 10);
      const velX = p5.random(-2, 2);
      const velY = p5.random(-2, 2);
      particleSystem.addParticle(i, x, y, 1, velX, velY, 7, particleColor, 'Inertia', 'None');
    }
    for (let i = 0; i < 150; i++) {
      const x = p5.random(10, p5.width - 10);
      const y = p5.random(10, p5.height - 10);
      const velX = p5.random(-2, 2);
      const velY = p5.random(-2, 2);
      particleSystem2.addParticle(i, x, y, 1, velX, velY, 7, particleColor2, 'Inertia', 'None');
    }

    for (let i = 0; i < 15; i++) {
      const x = p5.random(10, p5.width - 10);
      const y = p5.random(10, p5.height - 10);
      obstacleSystem.addParticle(i, x, y, 70, 0, 0, 1, obstacleColor, 'Static', 'Pos');
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
    particleSystem2.display();
    obstacleSystem.display();
  };

  const mousePressed = () => {
    obstacleSystem.catchParticles();
  };

  const mouseReleased = () => {
    obstacleSystem.releaseParticles();
  };

  class ParticleSystem {
    p5: p5Types;
    particles: Particle[];
    strokeColor: string;
    triangleColor: string;
    distThreshold: number;
    connectionLimit: number;
    selectId: number;

    constructor(
      p5: p5Types,
      strokeColor: string,
      triangleColor: string,
      distThreshold: number,
      connectionLimit: number,
      selectId = -1,
    ) {
      this.p5 = p5;
      this.particles = [];
      this.strokeColor = strokeColor;
      this.triangleColor = triangleColor;
      this.distThreshold = distThreshold;
      this.connectionLimit = connectionLimit;
      this.selectId = selectId;
    }

    display() {
      this.updateParticles();
      this.findNeighbors();
      this.drawConnections();
      this.displayParticles();
    }

    addParticle(
      id: number,
      x: number,
      y: number,
      r: number,
      velX = 0,
      velY = 0,
      mass = 1,
      color = 'rgba(0,0,0,0)',
      basicMovementType: BasicMovementType = 'Inertia',
      dragMovementType: DragMovementType = 'None',
    ) {
      this.particles.push(
        new Particle(this.p5, id, x, y, r, velX, velY, mass, color, basicMovementType, dragMovementType),
      );
    }

    updateParticles() {
      for (let i = 0; i < this.particles.length; i++) {
        const particle = this.particles[i];
        particle.update();
        particle.bounseAtWall();
        for (let j = i + 1; j < this.particles.length; j++) {
          const other = this.particles[j];
          const [isIntersect, disanceVect, interSectLength] = particle.calcIntersection(other);
          if (!isIntersect) {
            continue;
          }
          particle.correctIntersection(other);
          particle.collideWithOther(other);
          particle.correctIntersection(other);
        }
        particle.bounseAtWall();
      }
    }

    displayParticles() {
      this.particles.forEach((particle) => {
        particle.display(particle.id === this.selectId);
      });
    }

    drawConnections() {
      this.p5.stroke(this.strokeColor);
      this.p5.strokeWeight(1);
      this.p5.fill(this.triangleColor);
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
              if (calcSquaredDist(p1.x, p1.y, p2.x, p2.y) < this.distThreshold * this.distThreshold) {
                this.p5.beginShape(this.p5.TRIANGLES);
                this.p5.vertex(particle.x, particle.y);
                this.p5.vertex(p1.x, p1.y);
                this.p5.vertex(p2.x, p2.y);
                this.p5.endShape();
              } else {
                this.p5.beginShape(this.p5.LINES);
                if (p1.neighbors.length >= 2) {
                  this.p5.vertex(particle.x, particle.y);
                  this.p5.vertex(p1.x, p1.y);
                }
                if (p2.neighbors.length >= 2) {
                  this.p5.vertex(particle.x, particle.y);
                  this.p5.vertex(p2.x, p2.y);
                }
                this.p5.endShape();
              }
            }
          }
        }
      });
    }

    findNeighbors() {
      for (let i = 0; i < this.particles.length; i++) {
        const p1 = this.particles[i];
        p1.clearNeighbors();
        for (let j = i + 1; j < this.particles.length; j++) {
          if (p1.neighbors.length > this.connectionLimit) {
            break;
          }
          const p2 = this.particles[j];
          const squaredDist = calcSquaredDist(p1.x, p1.y, p2.x, p2.y);
          if (squaredDist < this.distThreshold * this.distThreshold) {
            p1.addNeighbor(p2);
          }
        }
      }
    }

    catchParticles() {
      this.particles.forEach((particle) => {
        if (
          calcSquaredDist(this.p5.mouseX, this.p5.mouseY, particle.x, particle.y) <
          particle.radius * particle.radius
        ) {
          window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
          this.selectId = particle.id;
          particle.catch(this.p5.mouseX, this.p5.mouseY);
        }
      });
    }

    releaseParticles() {
      this.particles.forEach((particle) => {
        if (particle.isDragged) {
          window.removeEventListener('touchmove', preventDefault, wheelOpt); // mobile
          particle.release();
        }
      });
    }
  }

  class Particle {
    p5: p5Types;
    id: number;
    x: number;
    y: number;
    velX: number;
    velY: number;
    accX: number;
    accY: number;
    radius: number;
    mass: number;
    color: string;
    neighbors: Particle[];
    initialBasicMovementType: BasicMovementType;
    basicMovementType: BasicMovementType;
    dragMovementType: DragMovementType;
    isDragged: boolean;
    dragOffsetX: number;
    dragOffsetY: number;

    constructor(
      p5: p5Types,
      id: number,
      x: number,
      y: number,
      r: number,
      velX: number,
      velY: number,
      mass: number,
      color: string,
      basicMovementType: BasicMovementType,
      dragMovementType: DragMovementType,
    ) {
      this.p5 = p5;
      this.id = id;
      this.x = x;
      this.y = y;
      this.radius = r;
      this.velX = velX;
      this.velY = velY;
      this.accX = 0;
      this.accY = 0;
      this.mass = mass;
      this.color = color;
      this.neighbors = [];
      this.initialBasicMovementType = basicMovementType;
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

      this.velX = newX - this.x;
      this.velY = newY - this.y;
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

      if (this.isDragged) {
        if (calcSquaredDist(this.p5.mouseX, this.p5.mouseY, this.x, this.y) < this.radius * this.radius) {
          this.dragOffsetX = this.p5.mouseX - this.x;
          this.dragOffsetY = this.p5.mouseY - this.y;
        } else {
          this.release();
        }
      }
    }

    calcIntersection(other: Particle): [boolean, p5Types.Vector, number] {
      const dx = other.x - this.x;
      const dy = other.y - this.y;
      const rSum = this.radius + other.radius;
      const distanceVect = this.p5.createVector(dx, dy);
      const distance = distanceVect.mag();
      const intersectLength = rSum - distance;
      const isIntersect = intersectLength > 0;
      return [isIntersect, distanceVect, intersectLength];
    }

    correctIntersection(other: Particle) {
      const [isIntersect, distanceVect, intersectLength] = this.calcIntersection(other);
      if (intersectLength <= 0) {
        return;
      }
      if (this.isDragged) {
        if (other.basicMovementType === 'Static') {
          if (intersectLength > 50) {
            this.release();
          }
        }
      }
      if (other.isDragged) {
        if (this.basicMovementType === 'Static') {
          if (intersectLength > 50) {
            other.release();
          }
        }
      }

      let selfCorrectionLength = 0;
      let otherCorrectionLength = 0;
      if (this.basicMovementType === other.basicMovementType) {
        if (this.isDragged) {
          otherCorrectionLength = intersectLength;
        } else if (other.isDragged) {
          selfCorrectionLength = intersectLength;
        } else {
          selfCorrectionLength = intersectLength / 2;
          otherCorrectionLength = intersectLength / 2;
        }
      } else if (this.basicMovementType === 'Inertia') {
        selfCorrectionLength = intersectLength;
      } else {
        otherCorrectionLength = intersectLength;
      }
      const selfD = distanceVect.copy();
      const otherD = distanceVect.copy();
      const selfCorrectionVec = selfD.normalize().mult(selfCorrectionLength);
      const otherCorrectionVec = otherD.normalize().mult(otherCorrectionLength);
      this.x -= selfCorrectionVec.x;
      this.y -= selfCorrectionVec.y;
      other.x += otherCorrectionVec.x;
      other.y += otherCorrectionVec.y;
    }

    collideWithOther(other: Particle) {
      const [isIntersect, distanceVect, interSectLength] = this.calcIntersection(other);

      if (this.basicMovementType === 'Static' && other.basicMovementType === 'Static') {
        return;
      }
      const theta = distanceVect.heading();
      const sine = this.p5.sin(theta);
      const cosine = this.p5.cos(theta);

      const bTemp: p5Types.Vector[] = [this.p5.createVector(), this.p5.createVector()];

      bTemp[1].x = cosine * distanceVect.x + sine * distanceVect.y;
      bTemp[1].y = cosine * distanceVect.y - sine * distanceVect.x;

      const vTemp: p5Types.Vector[] = [this.p5.createVector(), this.p5.createVector()];

      vTemp[0].x = cosine * this.velX + sine * this.velY;
      vTemp[0].y = -sine * this.velX + cosine * this.velY;
      vTemp[1].x = cosine * other.velX + sine * other.velY;
      vTemp[1].y = -sine * other.velX + cosine * other.velY;

      const vFinal: p5Types.Vector[] = [this.p5.createVector(), this.p5.createVector()];

      if (this.basicMovementType === 'Static' && other.basicMovementType === 'Inertia') {
        if (this.isDragged) {
          vFinal[1].x = ((other.mass - this.mass) * vTemp[1].x + 2 * this.mass * vTemp[0].x) / (this.mass + other.mass);
        } else {
          vFinal[1].x = -vTemp[1].x;
        }
      } else if (this.basicMovementType === 'Inertia' && other.basicMovementType === 'Static') {
        if (other.isDragged) {
          vFinal[0].x =
            ((this.mass - other.mass) * vTemp[0].x + 2 * other.mass * vTemp[1].x) / (this.mass + other.mass);
        } else {
          vFinal[0].x = -vTemp[0].x;
        }
      } else {
        vFinal[0].x = ((this.mass - other.mass) * vTemp[0].x + 2 * other.mass * vTemp[1].x) / (this.mass + other.mass);
        vFinal[1].x = ((other.mass - this.mass) * vTemp[1].x + 2 * this.mass * vTemp[0].x) / (this.mass + other.mass);
      }

      vFinal[0].y = vTemp[0].y;
      vFinal[1].y = vTemp[1].y;

      bTemp[0].x += vFinal[0].x;
      bTemp[1].x += vFinal[1].x;

      const bFinal: p5Types.Vector[] = [this.p5.createVector(), this.p5.createVector()];

      bFinal[0].x = cosine * bTemp[0].x - sine * bTemp[0].y;
      bFinal[0].y = sine * bTemp[0].x + cosine * bTemp[0].y;
      bFinal[1].x = cosine * bTemp[1].x - sine * bTemp[1].y;
      bFinal[1].y = sine * bTemp[1].x + cosine * bTemp[1].y;

      other.x = this.x + bFinal[1].x;
      other.y = this.y + bFinal[1].y;

      this.x += bFinal[0].x;
      this.y += bFinal[0].y;

      this.velX = cosine * vFinal[0].x - sine * vFinal[0].y;
      this.velY = sine * vFinal[0].x + cosine * vFinal[0].y;
      other.velX = cosine * vFinal[1].x - sine * vFinal[1].y;
      other.velY = sine * vFinal[1].x + cosine * vFinal[1].y;
    }

    clearNeighbors() {
      this.neighbors = [];
    }

    addNeighbor(particle: Particle) {
      this.neighbors.push(particle);
    }

    display(isSelected: boolean) {
      this.p5.noStroke();
      this.p5.fill(this.color);
      this.p5.ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
      if (isSelected) {
        this.p5.stroke(selectColor);
        this.p5.strokeWeight(5);
        this.p5.noFill();
        this.p5.ellipse(this.x, this.y, this.radius * 2 + 20, this.radius * 2 + 20);
      }
    }

    catch(x: number, y: number) {
      if (this.dragMovementType !== 'None') {
        this.isDragged = true;
        this.basicMovementType = 'Static';
        this.dragOffsetX = x - this.x;
        this.dragOffsetY = y - this.y;
      }
    }

    release() {
      this.isDragged = false;
      if (this.dragMovementType === 'Pos' || this.initialBasicMovementType === 'Static') {
        this.velX = 0;
        this.velY = 0;
      }
      this.basicMovementType = this.initialBasicMovementType;
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
});

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
