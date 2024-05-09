import { getDatabase, ref, onValue, set } from 'firebase/database'
import { db } from '../firebase'

// Function to update power and relay status
export const updatePowerAndRelay = () => {
  console.log('here')

  // Read values from the database
  const current1 = ref(db, 'current1')
  const current2 = ref(db, 'current2')
  const voltage1 = ref(db, 'voltage1')
  const voltage2 = ref(db, 'voltage2')

  // Read previous power values from the database
  let power_previous1 = 0
  let power_previous2 = 0

  // Calculate power1 and power2
  let power1 = current1 * voltage1
  let power2 = current2 * voltage2

  // Calculate power_new1 and power_new2
  let power_new1 = power_previous1 + power1
  let power_new2 = power_previous2 + power2

  // Update relay status based on power_new1 and power_new2
  if (power_new1 >= 100 || power_new2 >= 100) {
    // Update relay status in the database
    set(ref(db, 'relay_status'), 'off')
    return // If condition met, stop the function
  } else {
    set(ref(db, 'relay_status'), 'on')
  }

  // Schedule the next execution after a delay of 10 seconds
  setTimeout(() => {
    updatePowerAndRelay() // Call the function again after the delay
  }, 10000) // 10000 milliseconds = 10 seconds
}
