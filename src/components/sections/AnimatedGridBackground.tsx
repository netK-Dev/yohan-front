'use client';

/**
 * AnimatedGridBackground
 *
 * Arrière-plan animé haute-performance basé sur Canvas:
 * - Rendu d'un quadrillage discret sur fond noir (#000002)
 * - Allumage aléatoire de cases en rouge (avec décroissance progressive)
 * - Pré-rendu d'un calque statique du quadrillage pour minimiser le coût par frame
 * - Prise en charge du devicePixelRatio (jusqu'à 2x) pour netteté sans surcoût excessif
 *
 * Props clés:
 * - className: classes utilitaires pour positionnement (ex: "absolute inset-0")
 * - forcedHeightPx: force une hauteur explicite si le parent n'a pas de hauteur déterminée
 * - density: densité relative d'allumage par frame (0.5 = défaut). >1 augmente la fréquence
 * - speed: vitesse de décroissance (1 = défaut). >1 = extinction plus rapide des cases
 * - rhythm: contrôle couplé du rythme visuel (0.1 à 3 recommandé). Plus il est
 *   haut, plus de cases s'allument et plus elles s'éteignent vite. Plus il est
 *   bas, moins de cases s'allument et plus elles persistent.
 *
 * Notes perf:
 * - Le quadrillage (lignes blanches très subtiles) est dessiné une seule fois sur un
 *   canvas offscreen (gridLayer), puis reblitté chaque frame.
 * - Seules les cases allumées sont peintes à chaque frame, avec un mode 'lighter' pour un glow léger.
 * - Le nombre de colonnes est calculé dynamiquement selon la largeur du conteneur pour garder
 *   une densité visuelle cohérente sur toutes résolutions.
 */

import React from 'react';

type AnimatedGridBackgroundProps = {
  className?: string;
  /** Force une hauteur en pixels (utile pour sections avec hauteur fixe). Si absent, prend 100% du conteneur parent. */
  forcedHeightPx?: number;
  /** Densité relative d'allumage (0.5 = défaut). */
  density?: number;
  /** Vitesse de décroissance (1 = défaut, plus grand = plus rapide). */
  speed?: number;
  /** Couleur de fond (hexadécimal, ex: #000002). */
  backgroundHex?: string;
  /** Couleur des cases (hexadécimal, ex: #ff0015). */
  cellHex?: string;
  /** Rythme couplé (0.1 à 3 recommandé). Haut = plus d'allumages + décroissance plus rapide. */
  rhythm?: number;
};

export default function AnimatedGridBackground({
  className,
  forcedHeightPx,
  density = 0.5,
  speed = 1,
  backgroundHex = '#000002',
  cellHex = '#ff0015',
  rhythm = 3,
}: AnimatedGridBackgroundProps) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const cont = container as HTMLDivElement;
    const c = canvas as HTMLCanvasElement;
    const context = ctx as CanvasRenderingContext2D;

    let animationFrameId = 0;
    let lastTimestamp = 0;

    // Paramètres de grille calculés au resize
    let cols = 0; // colonnes visibles
    let rows = 0; // lignes visibles
    let cellSize = 24; // taille d'une cellule en pixels CSS
    // Intensité résiduelle par cellule (0 -> éteint, 1 -> plein éclat)
    let heats: Float32Array = new Float32Array(0);
    // Calque statique (quadrillage) rendu une seule fois
    let gridLayer: HTMLCanvasElement | null = null;

    // Accumulateur: convertit un débit d'allumages/seconde en allumages entiers par frame
    let ignitionAccumulator = 0;

    // Utilitaire: hex -> rgb
    function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
      const value = hex.trim().replace('#', '');
      if (value.length === 3) {
        const r = parseInt(value[0] + value[0], 16);
        const g = parseInt(value[1] + value[1], 16);
        const b = parseInt(value[2] + value[2], 16);
        if (Number.isNaN(r + g + b)) return null;
        return { r, g, b };
      }
      if (value.length === 6) {
        const r = parseInt(value.slice(0, 2), 16);
        const g = parseInt(value.slice(2, 4), 16);
        const b = parseInt(value.slice(4, 6), 16);
        if (Number.isNaN(r + g + b)) return null;
        return { r, g, b };
      }
      return null;
    }

    const cellRgb = hexToRgb(cellHex) ?? { r: 255, g: 0, b: 21 };

    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    /**
     * Construit le calque statique (fond noir + lignes du quadrillage) à la bonne taille.
     */
    function buildGridLayer(width: number, height: number) {
      gridLayer = document.createElement('canvas');
      gridLayer.width = Math.floor(width * dpr);
      gridLayer.height = Math.floor(height * dpr);
      const gctx = gridLayer.getContext('2d');
      if (!gctx) return;
      gctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      gctx.clearRect(0, 0, width, height);
      gctx.fillStyle = backgroundHex;
      gctx.fillRect(0, 0, width, height);
      gctx.strokeStyle = 'rgba(255,255,255,0.03)';
      gctx.lineWidth = 1;
      for (let x = 0; x <= cols; x++) {
        const px = Math.floor(x * cellSize) + 0.5;
        gctx.beginPath();
        gctx.moveTo(px, 0);
        gctx.lineTo(px, height);
        gctx.stroke();
      }
      for (let y = 0; y <= rows; y++) {
        const py = Math.floor(y * cellSize) + 0.5;
        gctx.beginPath();
        gctx.moveTo(0, py);
        gctx.lineTo(width, py);
        gctx.stroke();
      }
    }

    /**
     * Adapte le canvas à la taille du conteneur et recalcule la grille.
     */
    function resize() {
      const width = Math.max(1, cont.clientWidth);
      const height = Math.max(1, forcedHeightPx ?? cont.clientHeight);
      c.style.width = width + 'px';
      c.style.height = height + 'px';
      c.width = Math.floor(width * dpr);
      c.height = Math.floor(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const targetCols = Math.min(64, Math.max(32, Math.round(width / 28)));
      cellSize = Math.max(16, Math.min(48, Math.floor(width / targetCols)));
      cols = Math.ceil(width / cellSize);
      rows = Math.ceil(height / cellSize);
      heats = new Float32Array(cols * rows);

      buildGridLayer(width, height);
    }

    /**
     * Allume aléatoirement un petit nombre de cases par frame.
     * La quantité s'adapte à la taille de la grille, modulée par 'density'.
     */
    function igniteRandomCells(ignitionCount: number) {
      for (let i = 0; i < ignitionCount; i++) {
        const idx = Math.floor(Math.random() * heats.length);
        heats[idx] = Math.max(heats[idx], 1);
      }
    }

    /**
     * Boucle d'animation: reblit le calque statique puis peint les cases actives
     * avec décroissance temporelle.
     */
    function drawFrame(ts: number) {
      const now = ts || performance.now();
      const deltaMs = lastTimestamp ? now - lastTimestamp : 16;
      lastTimestamp = now;
      const deltaSec = deltaMs / 1000;

      const width = c.width / dpr;
      const height = c.height / dpr;

      if (gridLayer) {
        context.drawImage(gridLayer, 0, 0);
      } else {
        context.clearRect(0, 0, width, height);
      }

      // Mapping du rythme non borné → 0..1 (r/(1+r)) pour permettre des valeurs élevées
      const rhythmPos = Math.max(0, rhythm);
      const rhythmN = rhythmPos / (1 + rhythmPos); // 0..1 saturant
      const speedMultiplier = 0.6 + 1.4 * rhythmN; // 0.6x .. 2.0x

      // Décroissance: plus 'rhythm' est grand, plus la chaleur disparaît vite
      const decayPerSec = 0.85 * speed * speedMultiplier;
      const decay = decayPerSec * deltaSec;

      // Débit d'allumage: ignitions/seconde = (cells * baseRatePerCell) * density * rateMultiplier
      // - baseRatePerCell plus élevé pour que les rythmes forts soient très visibles
      const baseRatePerCell = 0.03;
      const cells = cols * rows;
      const rateMultiplier = 0.25 + 2.75 * rhythmN; // 0.25 .. 3.0
      const ignitionsPerSecond =
        cells * baseRatePerCell * Math.max(0, density) * rateMultiplier;

      // Convertit le débit en allumages entiers par frame via l'accumulateur
      ignitionAccumulator += ignitionsPerSecond * deltaSec;
      const ignitionCount = Math.floor(ignitionAccumulator);
      ignitionAccumulator -= ignitionCount;
      if (ignitionCount > 0) igniteRandomCells(ignitionCount);

      context.save();
      // 'lighter' pour simuler un glow additif subtil
      context.globalCompositeOperation = 'lighter';
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = y * cols + x;
          let h = heats[i];
          if (h <= 0.01) {
            heats[i] = 0;
            continue;
          }
          h = Math.max(0, h - decay);
          heats[i] = h;
          const alpha = 0.06 + 0.22 * h;
          context.fillStyle = `rgba(${cellRgb.r}, ${cellRgb.g}, ${cellRgb.b}, ${alpha.toFixed(3)})`;
          context.fillRect(
            x * cellSize + 1,
            y * cellSize + 1,
            cellSize - 2,
            cellSize - 2
          );
        }
      }
      context.restore();

      animationFrameId = window.requestAnimationFrame(drawFrame);
    }

    const handleResize = () => resize();
    resize();
    animationFrameId = window.requestAnimationFrame(drawFrame);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [density, speed, forcedHeightPx, backgroundHex, cellHex, rhythm]);

  return (
    <div
      ref={containerRef}
      className={className ?? 'pointer-events-none absolute inset-0'}
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
