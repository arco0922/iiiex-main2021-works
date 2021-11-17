import React from 'react';
import Sketch from 'react-p5';
import p5Types from 'p5';
import styled from 'styled-components';
import { worksInfoArr } from 'constants/WorksInfo';
import { theme } from 'constants/Theme';
import { useHistory } from 'react-router';
import { Coord, mapCoordsArr, MapModeId } from 'constants/MapCoords';
import { LayoutType } from 'constants/Layout';
import { sideDetailWidth } from 'pages/TopPage/WorksDetail';
import { bottomDetailHeight } from 'pages/TopPage/WorksDetailBottom';
import { Visited } from 'AppRoot';
import { carouselSpaceHeight } from 'pages/TopPage/Carousel';
import { InitialAnimationStatus } from 'pages/TopPage/TopPage';

interface Props {
  width: string;
  height: string;
  selectIdRef: React.MutableRefObject<number>;
  setSelectId: (id: number) => void;
  initialAnimationStatusRef: React.MutableRefObject<InitialAnimationStatus>;
  setIsShowDetail: (isShowDetail: boolean) => void;
  isShowDetailRef: React.MutableRefObject<boolean>;
  isShowHamburgerRef: React.MutableRefObject<boolean>;
  layoutRef: React.MutableRefObject<LayoutType>;
  setMapModeId: (mapMode: MapModeId) => void;
  mapModeIdRef: React.MutableRefObject<MapModeId>;
  setCoords: (coords: Coord[]) => void;
  visitedRef: React.MutableRefObject<Visited>;
  isCursorOnCarouselRef: React.MutableRefObject<boolean>;
  bgcolor?: string;
  padding?: number;
}

interface ParticleImage {
  id: number;
  img: p5Types.Image;
}

export const WorksListSketch = React.memo<Props>(
  ({
    width,
    height,
    selectIdRef,
    setSelectId,
    initialAnimationStatusRef,
    setIsShowDetail,
    isShowDetailRef,
    isShowHamburgerRef,
    layoutRef,
    setMapModeId,
    mapModeIdRef,
    setCoords,
    visitedRef,
    isCursorOnCarouselRef,
    bgcolor = 'black',
    padding = 5,
  }) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const history = useHistory();

    // modern Chrome requires { passive: false } when adding event
    let supportsPassive = false;

    React.useEffect(() => {
      try {
        window.addEventListener(
          'test',
          () => null,
          Object.defineProperty({}, 'passive', {
            get: function () {
              // eslint-disable-next-line react-hooks/exhaustive-deps
              supportsPassive = true;
            },
          }),
        );
      } catch (e) {}
    }, []);

    React.useEffect(() => {
      return () => {
        const coords: Coord[] = obstacleSystem.particles.map((particle) => {
          return { id: particle.id, x: particle.x, y: particle.y };
        });
        setCoords(coords);
      };
    });

    const wheelOpt: boolean | AddEventListenerOptions = supportsPassive ? { passive: false } : false;
    const preventDefault = (e: MouseEvent | WheelEvent | TouchEvent) => e.preventDefault();

    /**
     * basicMovementTypeは、マウスによってParticleがドラッグされていないときの挙動のタイプ を表す。
     * Inertia: 物理法則にしたがう → dragMovementTypeはNoneかPos-Velを想定
     *  Static: 動かない → dragMovementTypeはNoneかPosを想定
     * Gravitational: 衝突は非弾性で、ターゲットにひきつけられる
     */
    type BasicMovementType = 'Inertia' | 'Static' | 'Gravitational';

    /**
     * dragMovementTypeは、マウスによってParticleがドラッグされているときの挙動のタイプ を表す。
     * Pos-Vel: 位置と速度を変化させられる(ドラッグ状態でなくなると、その時の速度がParticleに与えられる)
     *     Pos: 位置のみを変化させられる(ドラッグ状態でなくなると、速度はドラッグされる前のものになる)
     *    None: ドラッグによって動かすことはできず、ドラッグしていない時と同様の挙動をする
     */
    type DragMovementType = 'Pos-Vel' | 'Pos' | 'None';

    let obstacleSystem: ParticleSystem;

    let grid: Grid;

    const obstacleColor = 'rgba(255,255,255,1)';
    const obstacleStrokeColor = 'rgba(255,255,255,1)';
    const obstacleTriangleColor = 'rgba(220,220,220,0.2)';

    const selectColor = theme.color.primary;

    let prevMapModeId: MapModeId;

    let prevCanvasWidth: number;
    let prevCanvasHeight: number;

    let isWorldInitialized = false;
    let isFirstZoomExperienced = false;

    let worldOffsetX: number; // ワールドの中心がスクリーンのどこにあるか
    let worldOffsetY: number; // ワールドの中心がスクリーンのどこにあるか
    let worldOffsetScale: number; // ワールドのスクリーン上での縮尺

    const worldWidth = 20000; // ワールドの横幅 ※canvasの横幅とは異なる
    const worldHeight = 20000; // ワールドの縦幅 ※canvasの縦幅とは異なる
    const particleRadius = 100;

    let limitWorldOffsetMinX: number;
    let limitWorldOffsetMaxX: number;
    let limitWorldOffsetMinY: number;
    let limitWorldOffsetMaxY: number;
    let limitWorldOffsetMinScale: number;
    let limitWorldOffsetMaxScale: number;

    let isWorldLocked = false;
    let isZoomEnabled = false;
    let oldMouseX = 0;
    let oldMouseY = 0;

    let oldTouchInterval = 0;

    let navigationBtn: p5Types.Element;

    const navigationBtnStyleChange = (p5: p5Types, isHover: boolean) => {
      if (isHover) {
        navigationBtn.style(`cursor: pointer; background-color: ${theme.color.primary}; color: white;`);
      } else {
        navigationBtn.style(`cursor: default; background-color: black; color: white;`);
      }
    };

    const navigateToIndividual = () => {
      if (selectIdRef.current === null || isWorldLocked) {
        return;
      }
      history.push(`/works/${selectIdRef.current}`);
    };

    let isAdjustingWorld = true;
    let targetWorldOffsetX: number;
    let targetWorldOffsetY: number;
    let targetWorldOffsetScale: number;

    const adjustWorldToTarget = () => {
      if (!isAdjustingWorld) {
        return;
      }
      worldOffsetX += (targetWorldOffsetX - worldOffsetX) * 0.04;
      worldOffsetY += (targetWorldOffsetY - worldOffsetY) * 0.04;
      worldOffsetScale += (targetWorldOffsetScale - worldOffsetScale) * 0.1;
      if (
        Math.max(
          Math.abs(targetWorldOffsetX - worldOffsetX),
          Math.abs(targetWorldOffsetY - worldOffsetY),
          Math.abs(targetWorldOffsetScale - worldOffsetScale),
        ) < 0.01 ||
        isWorldLocked ||
        isZoomEnabled
      ) {
        isAdjustingWorld = false;
      }
    };

    const setWorldTarget = (
      newTargetWorldOffsetX: number,
      newTargetWorldOffsetY: number,
      newTargetWorldOffsetScale: number,
    ) => {
      isAdjustingWorld = true;
      isZoomEnabled = false;
      targetWorldOffsetX = newTargetWorldOffsetX;
      targetWorldOffsetY = newTargetWorldOffsetY;
      targetWorldOffsetScale = newTargetWorldOffsetScale;
    };

    const calcSquaredDist = (x1: number, y1: number, x2: number, y2: number) =>
      (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);

    const initWorldPosScale = (p5: p5Types, mapModeId: MapModeId) => {
      const mapCoord = mapCoordsArr.filter(({ modeId }) => modeId === mapModeId)[0];
      const width =
        layoutRef.current !== 'NARROW' && initialAnimationStatusRef.current !== 'END'
          ? p5.width - sideDetailWidth
          : p5.width;
      const height = layoutRef.current === 'NARROW' ? p5.height - bottomDetailHeight - carouselSpaceHeight : p5.height;
      const newTargetWorldOffsetScale = p5.min(
        width / p5.max(mapCoord.border.maxX - mapCoord.border.minX, 1),
        height / p5.max(mapCoord.border.maxY - mapCoord.border.minY, 1),
      );
      const newTargetWorldOffsetX = width / 2 - mapCoord.center.x * newTargetWorldOffsetScale;
      let newTargetWorldOffsetY = height / 2 - mapCoord.center.y * newTargetWorldOffsetScale;
      if (layoutRef.current === 'NARROW') {
        newTargetWorldOffsetY += carouselSpaceHeight;
      }
      if (!isWorldInitialized) {
        worldOffsetX = newTargetWorldOffsetX;
        worldOffsetY = newTargetWorldOffsetY;
        worldOffsetScale = newTargetWorldOffsetScale;
        isWorldInitialized = true;
      }
      setWorldTarget(newTargetWorldOffsetX, newTargetWorldOffsetY, newTargetWorldOffsetScale);
    };

    const calcWorldCoord = (
      x: number,
      y: number,
      worldOffsetX: number,
      worldOffsetY: number,
      worldOffsetScale: number,
    ) => {
      /** canvas座標 → ワールド座標の計算 */
      return {
        x: (x - worldOffsetX) / worldOffsetScale,
        y: (y - worldOffsetY) / worldOffsetScale,
      };
    };

    const calcWorldLimit = (p5: p5Types, mapModeId: MapModeId) => {
      const mapCoord = mapCoordsArr.filter(({ modeId }) => modeId === mapModeId)[0];
      const width =
        layoutRef.current !== 'NARROW' && initialAnimationStatusRef.current !== 'END'
          ? p5.width - sideDetailWidth
          : p5.width;
      const height = layoutRef.current === 'NARROW' ? p5.height - bottomDetailHeight - carouselSpaceHeight : p5.height;

      limitWorldOffsetMinScale = p5.min([
        width / p5.max(mapCoord.border.maxX - mapCoord.border.minX, 1),
        height / p5.max(mapCoord.border.maxY - mapCoord.border.minY, 1),
        0.5,
      ]);
      limitWorldOffsetMaxScale = p5.min(width, height) / (particleRadius * 2);
      limitWorldOffsetMinX = -mapCoord.border.maxX * worldOffsetScale;
      limitWorldOffsetMaxX = width - mapCoord.border.minX * worldOffsetScale;
      limitWorldOffsetMinY = -mapCoord.border.maxY * worldOffsetScale;
      limitWorldOffsetMaxY = p5.height - mapCoord.border.minY * worldOffsetScale;
    };

    const limitDisplayMove = (p5: p5Types) => {
      worldOffsetX = p5.constrain(worldOffsetX, limitWorldOffsetMinX, limitWorldOffsetMaxX);
      worldOffsetY = p5.constrain(worldOffsetY, limitWorldOffsetMinY, limitWorldOffsetMaxY);
    };

    const zoom = (centerX: number, centerY: number, scaleDiff: number) => {
      if (!isWorldInitialized) {
        return;
      }
      isZoomEnabled = true;
      /** centerX, centerY は canvas座標 */
      let newOffsetScale = worldOffsetScale * (1 + scaleDiff);
      newOffsetScale = Math.min(Math.max(newOffsetScale, limitWorldOffsetMinScale), limitWorldOffsetMaxScale);
      worldOffsetX = (newOffsetScale * worldOffsetX - (newOffsetScale - worldOffsetScale) * centerX) / worldOffsetScale;
      worldOffsetY = (newOffsetScale * worldOffsetY - (newOffsetScale - worldOffsetScale) * centerY) / worldOffsetScale;
      worldOffsetScale = newOffsetScale;
    };

    const mouseWheel = (e: WheelEvent) => {
      preventDefault(e);
      const top = containerRef.current?.getBoundingClientRect().top || 0;
      const left = containerRef.current?.getBoundingClientRect().left || 0;
      zoom(e.clientX - left, e.clientY - top, -e.deltaY * 0.001);
    };

    React.useEffect(() => {
      const container = containerRef.current;
      if (container !== null) {
        container.addEventListener('wheel', mouseWheel);
      }
      return () => {
        if (container !== null) {
          container.removeEventListener('wheel', mouseWheel);
        }
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const mapModeIdChangeHandler = (p5: p5Types, newMapModeId: MapModeId) => {
      initWorldPosScale(p5, newMapModeId);
      const mapCoordsGroup = mapCoordsArr.filter(({ modeId }) => modeId === newMapModeId)[0];
      mapCoordsGroup.coords.forEach(({ id, x, y }) => obstacleSystem.setTargetPos({ id, x, y }));
      obstacleSystem.setDistThreshold(mapCoordsGroup.threshold.dist);
      setIsShowDetail(true);
    };

    let thumbnails: ParticleImage[];
    let checkmark: p5Types.Image;

    const preload = (p5: p5Types) => {
      thumbnails = worksInfoArr.map((worksInfo) => {
        return {
          id: worksInfo.id,
          img: p5.loadImage(`/static/assets/thumbnails-cropped/${worksInfo.thumbnailBaseName}.png`),
        };
      });
      checkmark = p5.loadImage('/static/assets/check/check_mark.png');
    };

    const setup = (p5: p5Types, canvasParentRef: Element) => {
      if (!containerRef.current) {
        return;
      }

      p5.createCanvas(
        containerRef.current.clientWidth - padding * 2,
        containerRef.current.clientHeight - padding * 2,
      ).parent(canvasParentRef);

      prevCanvasWidth = p5.width;
      prevCanvasHeight = p5.height;

      navigationBtn = p5.createButton('作品を見る');
      navigationBtn.parent(containerRef.current);
      navigationBtn.style(
        `padding: 4px; border: none; transform: translateX(-50%); width: fit-content; border: 2px solid ${selectColor}; background-color: black; color: white; word-break: keep-all`,
      );
      navigationBtn.mouseOver(() => navigationBtnStyleChange(p5, true));
      navigationBtn.mouseOut(() => navigationBtnStyleChange(p5, false));
      navigationBtn.mouseClicked(() => navigateToIndividual());

      const initialMapModeId = mapModeIdRef.current;
      prevMapModeId = initialMapModeId;

      initWorldPosScale(p5, initialMapModeId);
      calcWorldLimit(p5, initialMapModeId);

      grid = new Grid(p5, worldWidth, worldHeight, 100);

      obstacleSystem = new ParticleSystem(
        p5,
        obstacleStrokeColor,
        obstacleTriangleColor,
        450,
        15,
        worldWidth,
        worldHeight,
      );

      const mapCoordsGroup = mapCoordsArr.filter(({ modeId }) => modeId === initialMapModeId)[0];
      mapCoordsGroup.coords.forEach(({ id, x, y }) => {
        switch (initialMapModeId) {
          case 5:
            const randy = p5.random(-200, 200);
            obstacleSystem.addParticle(
              id,
              x * 0.8,
              randy,
              particleRadius,
              0,
              0,
              1,
              obstacleColor,
              'Gravitational',
              'Pos',
            );
            break;
          default:
            obstacleSystem.addParticle(
              id,
              x * 0.7,
              y * 0.7,
              particleRadius,
              0,
              0,
              1,
              obstacleColor,
              'Gravitational',
              'Pos',
            );
        }
        obstacleSystem.setTargetPos({ id, x, y });
      });
      obstacleSystem.setTextures(thumbnails);

      obstacleSystem.setSelectId(selectIdRef.current);

      obstacleSystem.setVisited(visitedRef.current);

      obstacleSystem.setDistThreshold(mapCoordsGroup.threshold.dist);
    };

    const draw = (p5: p5Types) => {
      if (
        containerRef.current !== null &&
        (prevCanvasWidth !== containerRef.current.clientWidth - padding * 2 ||
          prevCanvasHeight !== containerRef.current.clientHeight - padding * 2)
      ) {
        const newWidth = containerRef.current.clientWidth - padding * 2;
        const newHeight = containerRef.current.clientHeight - padding * 2;
        p5.resizeCanvas(newWidth, newHeight);
        if (initialAnimationStatusRef.current === 'END') {
          worldOffsetX += (newWidth - prevCanvasWidth) / 2;
          worldOffsetY += (newHeight - prevCanvasHeight) / 2;
          targetWorldOffsetX += (newWidth - prevCanvasWidth) / 2;
          targetWorldOffsetY += (newHeight - prevCanvasHeight) / 2;
        }
      }
      prevCanvasWidth = p5.width;
      prevCanvasHeight = p5.height;

      if (mapModeIdRef.current !== prevMapModeId) {
        mapModeIdChangeHandler(p5, mapModeIdRef.current);
      }
      prevMapModeId = mapModeIdRef.current;

      adjustWorldToTarget();

      if (initialAnimationStatusRef.current === 'END') {
        calcWorldLimit(p5, prevMapModeId);
      }
      limitDisplayMove(p5);

      if (p5.frameCount > 20 && !isFirstZoomExperienced && initialAnimationStatusRef.current === 'END') {
        isFirstZoomExperienced = true;
        obstacleSystem.setSelectIdFromOther(selectIdRef.current);
      }

      if (selectIdRef.current !== obstacleSystem.selectId) {
        isFirstZoomExperienced = true;
        obstacleSystem.setSelectIdFromOther(selectIdRef.current);
      }

      p5.background(bgcolor);

      p5.push();
      p5.translate(worldOffsetX, worldOffsetY);
      p5.scale(worldOffsetScale);
      grid.display();
      obstacleSystem.changeWorldOffset(worldOffsetX, worldOffsetY, worldOffsetScale);
      obstacleSystem.display();
      p5.pop();

      if (obstacleSystem.isCursorOnParticles()) {
        p5.cursor('grab');
      } else {
        p5.cursor('move');
      }
    };

    const isPointOnCanvas = (p5: p5Types, x: number, y: number) => {
      const height =
        layoutRef.current === 'NARROW' && isShowDetailRef.current ? p5.height - bottomDetailHeight : p5.height;
      return x >= 0 && x <= p5.width && y >= 0 && y <= height;
    };

    const isCursorOnCanvas = (p5: p5Types) => {
      return isPointOnCanvas(p5, p5.mouseX, p5.mouseY) && !isCursorOnCarouselRef.current;
    };

    const mousePressed = (p5: p5Types) => {
      if (!isCursorOnCanvas(p5) || isShowHamburgerRef.current) {
        return;
      }
      if (p5.touches.length === 2) {
        obstacleSystem.releaseParticles();
        isWorldLocked = true;
        const x1 = (p5.touches[0] as p5Types.Vector).x;
        const y1 = (p5.touches[0] as p5Types.Vector).y;
        const x2 = (p5.touches[1] as p5Types.Vector).x;
        const y2 = (p5.touches[1] as p5Types.Vector).y;
        oldTouchInterval = Math.sqrt(calcSquaredDist(x1, y1, x2, y2));
        return;
      }
      if (obstacleSystem.isCursorOnParticles()) {
        obstacleSystem.catchParticles();
      } else {
        isWorldLocked = true;
        oldMouseX = p5.mouseX;
        oldMouseY = p5.mouseY;
      }
    };

    const mouseDragged = (p5: p5Types) => {
      if (!isCursorOnCanvas(p5) || !isWorldLocked) {
        return;
      }
      if (p5.touches.length === 2) {
        const x1 = (p5.touches[0] as p5Types.Vector).x;
        const y1 = (p5.touches[0] as p5Types.Vector).y;
        const x2 = (p5.touches[1] as p5Types.Vector).x;
        const y2 = (p5.touches[1] as p5Types.Vector).y;
        const touchInterval = Math.sqrt(calcSquaredDist(x1, y1, x2, y2));
        zoom((x1 + x2) / 2, (y1 + y2) / 2, touchInterval / oldTouchInterval - 1);
        oldTouchInterval = touchInterval;
        return;
      }
      worldOffsetX += p5.mouseX - oldMouseX;
      worldOffsetY += p5.mouseY - oldMouseY;
      oldMouseX = p5.mouseX;
      oldMouseY = p5.mouseY;
    };

    const mouseReleased = (p5: p5Types) => {
      obstacleSystem.releaseParticles();
      if (p5.touches.length === 1) {
        oldMouseX = (p5.touches[0] as p5Types.Vector).x;
        oldMouseY = (p5.touches[0] as p5Types.Vector).y;
      }
      if (p5.touches.length === 0) {
        isWorldLocked = false;
      }
    };

    class ParticleSystem {
      p5: p5Types;
      particles: Particle[];
      strokeColor: string;
      triangleColor: string;
      distThreshold: number;
      connectionLimit: number;
      worldWidth: number;
      worldHeight: number;
      /** worldOffsetは、壁との判定や、マウスが入っているかの判定のみに使う */
      worldOffsetX: number;
      worldOffsetY: number;
      worldOffsetScale: number;
      selectId: number;
      textures: ParticleImage[];
      visited: Visited | null;

      constructor(
        p5: p5Types,
        strokeColor: string,
        triangleColor: string,
        distThreshold: number,
        connectionLimit: number,
        worldWidth: number,
        worldHeight: number,
        selectId = -1,
      ) {
        this.p5 = p5;
        this.particles = [];
        this.strokeColor = strokeColor;
        this.triangleColor = triangleColor;
        this.distThreshold = distThreshold;
        this.connectionLimit = connectionLimit;
        this.worldWidth = worldWidth;
        this.worldHeight = worldHeight;
        this.worldOffsetX = 0;
        this.worldOffsetY = 0;
        this.worldOffsetScale = 1;
        this.selectId = selectId;
        this.textures = [];
        this.visited = null;
      }

      setSelectId(id: number) {
        this.selectId = id;
      }

      setSelectIdFromOther(id: number) {
        this.setSelectId(id);
        const particle = this.particles.filter((particle) => particle.id === id)[0];
        if (particle.targetX !== undefined && particle.targetY !== undefined) {
          const width =
            layoutRef.current !== 'NARROW' && initialAnimationStatusRef.current !== 'END'
              ? this.p5.width - sideDetailWidth
              : this.p5.width;
          const height =
            layoutRef.current === 'NARROW' ? this.p5.height - bottomDetailHeight - carouselSpaceHeight : this.p5.height;
          const newTargetWorldOffsetScale = limitWorldOffsetMaxScale / 5;
          const newTargetWorldOffsetX = width / 2 - particle.targetX * newTargetWorldOffsetScale;
          let newTargetWorldOffsetY = height / 2 - particle.targetY * newTargetWorldOffsetScale - 20;
          if (layoutRef.current === 'NARROW') {
            newTargetWorldOffsetY += carouselSpaceHeight;
          }
          setWorldTarget(newTargetWorldOffsetX, newTargetWorldOffsetY, newTargetWorldOffsetScale);
        }
      }

      setTextures(textures: ParticleImage[]) {
        this.textures = textures;
      }

      setVisited(visited: Visited) {
        this.visited = visited;
      }

      setDistThreshold(dist: number) {
        this.distThreshold = dist;
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
          new Particle(
            this.p5,
            id,
            x,
            y,
            r,
            velX,
            velY,
            mass,
            color,
            basicMovementType,
            dragMovementType,
            this.worldOffsetX,
            this.worldOffsetY,
            this.worldOffsetScale,
          ),
        );
      }

      setTargetPos({ id, x, y }: { id: number; x?: number; y?: number }) {
        this.particles.forEach((particle) => {
          if (particle.id !== id) {
            return;
          }
          particle.setTargetPos({ x, y });
        });
      }

      updateParticles() {
        for (let i = 0; i < this.particles.length; i++) {
          const particle = this.particles[i];
          particle.update();
          particle.bounseAtWall(-this.worldWidth / 2, this.worldWidth / 2, -this.worldHeight / 2, this.worldHeight / 2);
          for (let j = i + 1; j < this.particles.length; j++) {
            const other = this.particles[j];
            const [isIntersect, disanceVect, interSectLength] = particle.calcIntersection(other);
            if (!isIntersect) {
              continue;
            }
            particle.collideWithOther(other);
            particle.correctIntersection(other);
          }
          particle.bounseAtWall(-this.worldWidth / 2, this.worldWidth / 2, -this.worldHeight / 2, this.worldHeight / 2);
        }
      }

      displayParticles() {
        this.particles.forEach((particle) => {
          const matchingTexture = this.textures.filter(({ id, img }) => id === particle.id)[0];
          const texture = matchingTexture ? matchingTexture.img : null;
          particle.display(texture);
        });
        this.particles.forEach((particle) => {
          if (particle.id === this.selectId) {
            particle.displaySelection();
          }
        });
        this.particles.forEach((particle) => {
          if (this.visited && this.visited[particle.id]) {
            particle.checkAsVisited();
          }
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

      isCursorOnParticles() {
        // どれか一つのParticleの上に乗っていればtrue
        let flg = false;
        this.particles.forEach((particle) => {
          flg = flg || particle.isCursorOn();
        });
        return flg;
      }

      changeWorldOffset(newOffsetX: number, newOffsetY: number, newOffsetScale: number) {
        this.worldOffsetX = newOffsetX;
        this.worldOffsetY = newOffsetY;
        this.worldOffsetScale = newOffsetScale;
        this.particles.forEach((particle) => {
          particle.changeWorldOffset(this.worldOffsetX, this.worldOffsetY, this.worldOffsetScale);
        });
      }

      catchParticles() {
        this.particles.forEach((particle) => {
          if (particle.isCursorOn()) {
            document.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
            this.setSelectId(particle.id);
            selectIdRef.current = particle.id;
            setSelectId(particle.id);
            setIsShowDetail(true);
            particle.catch();
          }
        });
      }

      releaseParticles() {
        this.particles.forEach((particle) => {
          if (particle.isDragged) {
            document.removeEventListener('touchmove', preventDefault, wheelOpt); // mobile
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
      worldOffsetX: number;
      worldOffsetY: number;
      worldOffsetScale: number;
      targetX: number | undefined;
      targetY: number | undefined;

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
        worldOffsetX: number,
        worldOffsetY: number,
        worldOffsetScale: number,
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
        this.worldOffsetX = worldOffsetX;
        this.worldOffsetY = worldOffsetY;
        this.worldOffsetScale = worldOffsetScale;
      }

      update() {
        if (this.isDragged) {
          this.dragUpdate();
        } else {
          this.basicUpdate();
        }
      }

      basicUpdate() {
        switch (this.basicMovementType) {
          case 'Gravitational':
            if (this.targetX !== undefined) {
              this.velX = (this.targetX - this.x) * 0.04;
            }
            if (this.targetY !== undefined) {
              this.velY = (this.targetY - this.y) * 0.04;
            }
            this.x += this.velX;
            this.y += this.velY;
            this.velX += this.accX;
            this.velY += this.accY;
            break;
          case 'Inertia':
            this.x += this.velX;
            this.y += this.velY;
            this.velX += this.accX;
            this.velY += this.accY;
            break;
          case 'Static':
            this.velX = 0;
            this.velY = 0;
            break;
        }
      }

      setTargetPos({ x, y }: { x?: number; y?: number }) {
        if (x !== undefined) {
          this.targetX = x;
        }
        if (y !== undefined) {
          this.targetY = y;
        }
      }

      dragUpdate() {
        if (this.dragMovementType === 'None') {
          this.basicUpdate();
          return;
        }
        const mousePos = this.calcWorldCoord(this.p5.mouseX, this.p5.mouseY);
        const newX = mousePos.x - this.dragOffsetX;
        const newY = mousePos.y - this.dragOffsetY;

        this.velX = newX - this.x;
        this.velY = newY - this.y;
        this.x = newX;
        this.y = newY;
      }

      bounseAtWall(left: number, right: number, bottom: number, top: number) {
        if (
          this.x - this.radius >= left &&
          this.x + this.radius <= right &&
          this.y - this.radius >= bottom &&
          this.y + this.radius <= top
        ) {
          return;
        }

        if (this.basicMovementType === 'Static') {
          if (this.x - this.radius < left) {
            this.x = left + this.radius;
          }
          if (this.x + this.radius > right) {
            this.x = right - this.radius;
          }
          if (this.y - this.radius < bottom) {
            this.y = bottom + this.radius;
          }
          if (this.y + this.radius > top) {
            this.y = top - this.radius;
          }
        } else {
          if (this.x - this.radius < left) {
            this.x += 2 * (left - this.x + this.radius);
            this.velX *= -1;
          }
          if (this.x + this.radius > right) {
            this.x -= 2 * (this.x + this.radius - right);
            this.velX *= -1;
          }
          if (this.y - this.radius < bottom) {
            this.y += 2 * (bottom - this.y + this.radius);
            this.velY *= -1;
          }
          if (this.y + this.radius > top) {
            this.y -= 2 * (this.y + this.radius - top);
            this.velY *= -1;
          }
        }

        if (this.isDragged) {
          if (this.isCursorOn()) {
            const mousePos = this.calcWorldCoord(this.p5.mouseX, this.p5.mouseY);
            this.dragOffsetX = mousePos.x - this.x;
            this.dragOffsetY = mousePos.y - this.y;
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
            if (intersectLength > this.radius) {
              this.release();
            }
          }
        }
        if (other.isDragged) {
          if (this.basicMovementType === 'Static') {
            if (intersectLength > this.radius) {
              other.release();
            }
          }
        }

        let selfCorrectionLength = 0;
        let otherCorrectionLength = 0;
        if (
          this.basicMovementType === other.basicMovementType ||
          this.basicMovementType === 'Gravitational' ||
          other.basicMovementType === 'Gravitational'
        ) {
          if (this.isDragged) {
            otherCorrectionLength = intersectLength;
          } else if (other.isDragged) {
            selfCorrectionLength = intersectLength;
          } else {
            selfCorrectionLength = intersectLength / 2;
            otherCorrectionLength = intersectLength / 2;
          }
        } else if (this.basicMovementType === 'Inertia' && other.basicMovementType === 'Static') {
          selfCorrectionLength = intersectLength;
        } else if (other.basicMovementType === 'Inertia' && this.basicMovementType === 'Static') {
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

        if (
          (this.basicMovementType === 'Static' && other.basicMovementType === 'Static') ||
          this.basicMovementType === 'Gravitational' ||
          other.basicMovementType === 'Gravitational'
        ) {
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
            vFinal[1].x =
              ((other.mass - this.mass) * vTemp[1].x + 2 * this.mass * vTemp[0].x) / (this.mass + other.mass);
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
          vFinal[0].x =
            ((this.mass - other.mass) * vTemp[0].x + 2 * other.mass * vTemp[1].x) / (this.mass + other.mass);
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

      display(texture: p5Types.Image | null) {
        this.p5.noStroke();
        this.p5.fill(this.color);
        this.p5.ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
        if (texture) {
          this.p5.image(
            texture,
            this.x - this.radius + 5,
            this.y - this.radius + 5,
            this.radius * 2 - 10,
            this.radius * 2 - 10,
          );
        }
      }

      displaySelection() {
        this.p5.stroke(selectColor);
        this.p5.strokeWeight(10);
        this.p5.noFill();
        this.p5.ellipse(this.x, this.y, this.radius * 2 + 20, this.radius * 2 + 20);
        const navPos = this.calcCanvasCoord(this.x, this.y + this.radius);
        navigationBtn.style(`font-size: ${this.worldOffsetScale * 20}px;`);
        if (isPointOnCanvas(this.p5, navPos.x, navPos.y)) {
          navigationBtn.style('display: block');
        } else {
          navigationBtn.style('display: none');
        }
        navigationBtn.position(navPos.x + padding, navPos.y + padding);
      }

      checkAsVisited() {
        this.p5.image(
          checkmark,
          this.x + this.radius * 0.5,
          this.y + this.radius * 0.5,
          this.radius * 0.5,
          this.radius * 0.5,
        );
      }

      isCursorOn() {
        const mousePos = this.calcWorldCoord(this.p5.mouseX, this.p5.mouseY);
        return calcSquaredDist(mousePos.x, mousePos.y, this.x, this.y) < this.radius * this.radius;
      }

      changeWorldOffset(newOffsetX: number, newOffsetY: number, newOffsetScale: number) {
        this.worldOffsetX = newOffsetX;
        this.worldOffsetY = newOffsetY;
        this.worldOffsetScale = newOffsetScale;
      }

      calcWorldCoord(x: number, y: number) {
        /** canvas座標 → ワールド座標の計算 */
        return {
          x: (x - this.worldOffsetX) / this.worldOffsetScale,
          y: (y - this.worldOffsetY) / this.worldOffsetScale,
        };
      }

      calcCanvasCoord(x: number, y: number) {
        /** ワールド座標 → canvas座標の計算*/
        return {
          x: x * this.worldOffsetScale + this.worldOffsetX,
          y: y * this.worldOffsetScale + this.worldOffsetY,
        };
      }

      catch() {
        if (this.dragMovementType !== 'None') {
          this.isDragged = true;
          this.basicMovementType = 'Static';
          const mousePos = this.calcWorldCoord(this.p5.mouseX, this.p5.mouseY);
          this.dragOffsetX = mousePos.x - this.x;
          this.dragOffsetY = mousePos.y - this.y;
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

    class Grid {
      p5: p5Types;
      width: number;
      height: number;
      interval: number;

      constructor(p5: p5Types, width: number, height: number, interval: number) {
        this.p5 = p5;
        this.width = width;
        this.height = height;
        this.interval = interval;
      }

      display() {
        this.p5.stroke(80);
        this.p5.beginShape(this.p5.LINES);
        for (let i = 0; i < this.width; i += this.interval) {
          this.p5.vertex(i - this.width / 2, -this.height / 2);
          this.p5.vertex(i - this.width / 2, this.height / 2);
        }
        for (let j = 0; j < this.height; j += this.interval) {
          this.p5.vertex(-this.width / 2, j - this.height / 2);
          this.p5.vertex(this.width / 2, j - this.height / 2);
        }
        this.p5.endShape();
      }
    }

    return (
      <StyledContainer canvasWidth={width} canvasHeight={height} bgcolor={bgcolor} padding={padding} ref={containerRef}>
        <Sketch
          preload={preload}
          setup={setup}
          draw={draw}
          mousePressed={mousePressed}
          mouseDragged={mouseDragged}
          mouseReleased={mouseReleased}
        />
      </StyledContainer>
    );
  },
);

interface StyledContainerProps {
  canvasWidth: string;
  canvasHeight: string;
  bgcolor: string;
  padding: number;
}

const StyledContainer = styled.div<StyledContainerProps>`
  box-sizing: content-box;
  width: ${({ canvasWidth, padding }) => `calc(${canvasWidth} - ${padding * 2}px)`};
  height: ${({ canvasHeight, padding }) => `calc(${canvasHeight} - ${padding * 2}px)`};
  padding: ${({ padding }) => `${padding}px`};
  background-color: ${({ bgcolor }) => bgcolor};
`;
