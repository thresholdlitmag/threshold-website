/**
 * Fire-and-forget trigger for the falling-petal celebration.
 *
 * Anywhere in the app can call showerPetals(); the <FlowerEffects />
 * component mounted in the layout listens for it and does the drawing,
 * so no component needs to know where the effect lives.
 */
export const PETAL_EVENT = "threshold:petals";

export function showerPetals(): void {
  window.dispatchEvent(new CustomEvent(PETAL_EVENT));
}
