export interface Point {
	x: number;
	y: number;
}

/** Evenly spaced points on a circle, starting at the top and going clockwise. */
export function radialLayout(count: number, radius: number, centre: Point): Point[] {
	return Array.from({ length: count }, (_, i) => {
		const angle = -Math.PI / 2 + (2 * Math.PI * i) / Math.max(count, 1);
		return { x: centre.x + radius * Math.cos(angle), y: centre.y + radius * Math.sin(angle) };
	});
}
