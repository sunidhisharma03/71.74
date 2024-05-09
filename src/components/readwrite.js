import { getDatabase, ref, onValue, set } from "firebase/database";
import StartFirebase from "./StartFirebase";

// Function to update power and relay status
const updatePowerAndRelay = (db) => {
  // Read values from the database
  const current1Ref = ref(db, 'current1');
  const current2Ref = ref(db, 'current2');
  const voltage1Ref = ref(db, 'voltage1');
  const voltage2Ref = ref(db, 'voltage2');
  
  // Read previous power values from the database
  let power_previous1 = 0;
  let power_previous2 = 0;

  // Calculate power1 and power2
  let power1 = current1 * voltage1;
  let power2 = current2 * voltage2;

  // Calculate power_new1 and power_new2
  let power_new1 = power_previous1 + power1;
  let power_new2 = power_previous2 + power2;

  // Update relay status based on power_new1 and power_new2
  if (power_new1 >= 100 || power_new2 >= 100) {
    // Update relay status in the database
    set(ref(db, 'relay_status'), 'on');
  } else {
    set(ref(db, 'relay_status'), 'off');
  }

  // Check if the condition is met
  if (power_new1 >= 100 || power_new2 >= 100) {
    return; // If condition met, stop the function
  }

  // Schedule the next execution after a delay of 10 seconds
  setTimeout(() => {
    updatePowerAndRelay(db); // Call the function again after the delay
  }, 10000); // 10000 milliseconds = 10 seconds
};