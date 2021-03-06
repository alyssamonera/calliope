import React, {Component} from 'react'

class Footer extends Component {
  render(){
    return (
      <footer>
        <div className="footer-about">
          <h3>About</h3>
            <p>This website is currently under construction. If you encounter any issues, please contact me via Github or Twitter. Please read the about section for warnings and rules.</p>
        </div>

        <div className="footer-connect">
          <h3>Links</h3>
          <ul>
            <li><a href="https://github.com/alyssamonera">Github</a></li>
            <li><a href="https://www.linkedin.com/in/alyssa-monera/">LinkedIn</a></li>
            <li><a href="https://twitter.com/alyssadmonera">Twitter</a></li>
            <li><a href="https://favqs.com/api">Quotes API</a></li>
          </ul>
        </div>

      </footer>
    )
  }
}

export default Footer
