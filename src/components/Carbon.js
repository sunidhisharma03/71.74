import React from 'react'
import '../App.css'

import './Carbon.css'

function Carbon() {
  return (
    <div class="container d-flex justify-content-center padding">
      <div class="row">
        <div class="col-md-9 col-sm-6">
          <div class="progress blue">
            <span class="progress-left">
              <span class="progress-bar"></span>
            </span>
            <span class="progress-right">
              <span class="progress-bar"></span>
            </span>
            <div class="progress-value">100%</div>
          </div>
        </div>

        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
          crossorigin="anonymous"
        ></script>
      </div>
    </div>
  )
}

export default Carbon
