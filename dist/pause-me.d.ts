/**
 * @summary JavaScript setTimeout and setInterval utility that allows pausing, resuming, stopping, and starting a setTimeout
 * @license {@link https://github.com/jpehman/pause-mejs/blob/master/LICENSE}
 * @author Jonathan Ehman
 * @example
 * const pauseMe = require("pause-me");
 * 
 * const myTimeout = pauseMe(() => {
 *  console.log("timed out!");
 * }, 5000);
 */

export type TPauseMeCallback = () => void | null | undefined | any;

export interface IPauseMeTimer {
  /**
   * Starts a stopped timer
   */
  start(): void;
  
  /**
   * Pauses the timer
   */
  pause(): void;
  
  /**
   * Resumes a paused timer
   */
  resume(): void;
  
  /**
   * Restarts the timer from the beginning
   */
  restart(): void;
  
  /**
   * Stops the timer and resets it
   */
  stop(): void;
  
  /**
   * Returns the timer instance or null if not running
   * @returns The timer instance or null
   */
  timer(): NodeJS.Timeout | null;
}

/**
 * Creates a pausable timer 
 * @param callback - Function to execute after the timer completes
 * @param duration - Duration in milliseconds
 * @throws {Error} If callback is not a function
 * @throws {Error} If duration is not a number
 * @throws {Error} If duration is less than 0
 * @returns A pausable timer object
*/ 
export function getTimeout(callback: TPauseMeCallback, duration: number): IPauseMeTimer;

/**
 * Creates a pausable repeating timer
 * @param callback - Function to execute after the timer completes
 * @param duration - Duration in milliseconds
 * @throws {Error} If callback is not a function
 * @throws {Error} If duration is not a number
 * @throws {Error} If duration is less than 0
 * @returns A pausable timer object
*/ 
export function getInterval(callback: TPauseMeCallback, duration: number): IPauseMeTimer;

/**
 * Creates a pausable timer
 * @param callback - Function to execute after the timer completes
 * @param duration - Duration in milliseconds
 * @param repeating - When true, the timer behaves like setInterval
 * @throws {Error} If callback is not a function
 * @throws {Error} If duration is not a number
 * @throws {Error} If duration is less than 0
 * @returns A pausable timer object
 */
export default function pauseMe(callback: TPauseMeCallback, duration: number, repeating?: boolean): IPauseMeTimer;
