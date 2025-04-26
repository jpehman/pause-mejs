/**
 * This file tests that type declarations are correctly set up
 * It doesn't contain runtime tests, but will fail to compile if types are incorrect
 */

// Test default import
import defaultImport from "./pause-me";

// Test ESM specific import
import esmImport from "../dist/pause-me.mjs";

// Test CJS import
import pauseMeCjs from "../dist/pause-me.cjs";

// Test UMD import
import pauseMeUmd from "../dist/pause-me.umd";

// Test that the imported types match the expected interface
const testDefaultImport: {
  start(): void;
  pause(): void;
  resume(): void;
  restart(): void;
  stop(): void;
  timer(): NodeJS.Timeout | null;
} = defaultImport(() => {}, 1000);

// Test that ESM import has the same type
const testEsmImport: typeof testDefaultImport = esmImport(() => {}, 1000);

// This function doesn't run, it just verifies types
export function verifyTypeDeclarations(): void {
  // Verify function signatures
  defaultImport(() => {}, 1000);
  defaultImport(() => {}, 1000, true);
  
  // Verify error cases (these should show type errors)
  // @ts-expect-error - duration should be a number
  defaultImport(() => {}, "1000");
  
  // Verify method existence
  testDefaultImport.start();
  testDefaultImport.pause();
  testDefaultImport.resume();
  testDefaultImport.restart();
  testDefaultImport.stop();
  const timer = testDefaultImport.timer();
  
  // Verify ESM import has the same methods
  testEsmImport.start();
  testEsmImport.pause();
  testEsmImport.resume();
  testEsmImport.restart();
  testEsmImport.stop();
  const esmTimer = testEsmImport.timer();
  if (esmTimer) {
    esmTimer; // This is just to avoid unused variable error
  }

  // Verify CJS import has the same methods
  pauseMeCjs(() => {}, 1000);
  const testCjsImport = pauseMeCjs(() => {}, 1000, true);
  testCjsImport.start();
  testCjsImport.pause();
  testCjsImport.resume();
  testCjsImport.restart();
  testCjsImport.stop();
  const cjsTimer = testCjsImport.timer();
  if (cjsTimer) {
    cjsTimer; // This is just to avoid unused variable error
  }

  // Verify UMD import has the same methods
  pauseMeUmd(() => {}, 1000);
  const testUmdImport = pauseMeUmd(() => {}, 1000, true);
  testUmdImport.start();
  testUmdImport.pause();
  testUmdImport.resume();
  testUmdImport.restart();
  testUmdImport.stop();
  const umdTimer = testUmdImport.timer();
  if (umdTimer) {
    umdTimer; // This is just to avoid unused variable error
  }
}