/**
 * An interface defined for services that can be deactivated.
 * This should be done when modes are switched.
 * The goal is to prevent issues where some service, for instance a move service, is activated in move mode
 * and stays active when the mode is switched resulting in undefined behavior.
 */
export interface Deactivatable {
  deactivate(): void;
}
