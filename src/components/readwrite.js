import { getDatabase, ref, onValue, set, get } from 'firebase/database'
import { db } from '../firebase'

let power_previous1 = 0
let power_previous2 = 0

// Function to update power and relay status
export const updatePowerAndRelay = (element) => {
  console.log('here')
  if (element == 1) {
    set(ref(db, 'Relay/relay1'), 1)
    set(ref(db, 'Relay/relay2'), 0)
  }
  if (element == 2) {
    set(ref(db, 'Relay/relay1'), 0)
    set(ref(db, 'Relay/relay2'), 1)
  }

  // Read values from the database
  var current1 = 5
  var current2 = 6
  var voltage1 = 20
  var voltage2 = 30

  // Read previous power values from the database

  // Calculate power1 and power2
  let power1 = current1 * voltage1
  let power2 = current2 * voltage2

  // Calculate power_new1 and power_new2
  let power_new1 = power_previous1 + power1
  let power_new2 = power_previous2 + power2
  console.log(current1)
  console.log(voltage1)
  console.log(typeof current1)

  setInterval(calc, 5000)
  function calc() {
    if (element == 1) {
      set(ref(db, 'Relay/relay1'), 0)
      set(ref(db, 'Relay/relay2'), 0)
    }
    if (element == 2) {
      set(ref(db, 'Relay/relay1'), 0)
      set(ref(db, 'Relay/relay2'), 0)
    }
  }

  // Update relay status based on power_new1 and power_new2
  // if (power_new1 >= 100 || power_new2 >= 100) {
  //   // Update relay status in the database
  //   set(ref(db, 'relay_status'), 0)
  //   return // If condition met, stop the function
  // } else {
  //   set(ref(db, 'relay_status'), 1)
  // }

  // Schedule the next execution after a delay of 10 seconds
  // setTimeout(() => {
  //   updatePowerAndRelay() // Call the function again after the delay
  // }, 10000) // 10000 milliseconds = 10 seconds
}
